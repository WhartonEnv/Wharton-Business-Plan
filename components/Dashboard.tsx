"use client";

import { useState } from "react";
import { Authenticated, AuthLoading, useQuery } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { RevenueTab } from "./tabs/RevenueTab";
import { PLTab } from "./tabs/PLTab";
import { UtilisationTab } from "./tabs/UtilisationTab";
import { KpiTab } from "./tabs/KpiTab";
import { SalaryTab } from "./tabs/SalaryTab";
import { BonusTab } from "./tabs/BonusTab";
import { ActionsTab } from "./tabs/ActionsTab";

const TABS = [
  { id: "revenue", label: "Revenue model" },
  { id: "pl", label: "P&L forecast" },
  { id: "util", label: "Utilisation calculator" },
  { id: "kpi", label: "KPI framework" },
  { id: "salary", label: "Salary progression" },
  { id: "bonus", label: "Bonus model" },
  { id: "actions", label: "Priority actions" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AppBar() {
  const me = useQuery(api.teamMembers.myRole);
  const isAdmin = me?.role === "admin";
  return (
    <div className="appbar">
      {me && (
        <span className={`role-pill${isAdmin ? " admin" : ""}`}>
          {isAdmin ? "Admin — can edit" : "Viewer"}
        </span>
      )}
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

export function Dashboard() {
  const [tab, setTab] = useState<TabId>("revenue");

  return (
    <>
      <Authenticated>
        <AppBar />
      </Authenticated>

      <div className="wrap">
        <div className="hdr">
          <div className="bdg gold">Business plan 2026/27</div>
          <div className="bdg teal" style={{ marginLeft: 6 }}>Revenue target: £1.3m</div>
          <div className="bdg blue" style={{ marginLeft: 6 }}>Net profit target: £300k–£350k</div>
          <h1>Wharton Natural Infrastructure Consultants — growth plan &amp; KPI framework</h1>
          <p>
            Built from confirmed P&amp;L actuals, team salaries, charge-out rates and utilisation targets.
            All revenue calculations use actual available hours after leave and bank holidays. Navigate using the tabs below.
          </p>
        </div>

        <div className="tabs">
          {TABS.map((t) => (
            <div
              key={t.id}
              className={`tab${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </div>
          ))}
        </div>

        {tab === "revenue" && <RevenueTab />}
        {tab === "pl" && <PLTab />}
        {tab === "util" && (
          <DataGate>
            <UtilisationTab />
          </DataGate>
        )}
        {tab === "kpi" && <KpiTab />}
        {tab === "salary" && (
          <DataGate>
            <SalaryTab />
          </DataGate>
        )}
        {tab === "bonus" && (
          <DataGate>
            <BonusTab />
          </DataGate>
        )}
        {tab === "actions" && <ActionsTab />}
      </div>
    </>
  );
}

/** Wraps Convex-backed tabs so they only render once auth is resolved. */
function DataGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <div className="note-box">Loading live data…</div>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
    </>
  );
}
