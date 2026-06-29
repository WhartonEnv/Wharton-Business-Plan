"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EditableNumber } from "../EditableNumber";

const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

export function BonusTab() {
  const members = useQuery(api.teamMembers.list);
  const settings = useQuery(api.settings.get);
  const me = useQuery(api.teamMembers.myRole);
  const updateMember = useMutation(api.teamMembers.update);
  const canEdit = me?.role === "admin";

  if (members === undefined || settings === undefined) {
    return <div className="note-box">Loading team data…</div>;
  }

  const niRate = settings.employerNiRate ?? 0.138;
  let totSal = 0, tot6m = 0, totYe = 0, totTot = 0;
  const rows = members.map((p) => {
    const monthly = p.salary / 12;
    const b6 = monthly * 0.5;
    const bye = monthly * 1.0;
    const tot = b6 + bye;
    totSal += p.salary; tot6m += b6; totYe += bye; totTot += tot;
    return { p, monthly, b6, bye, tot };
  });
  const withNI = totTot * (1 + niRate);

  return (
    <div className="page active">
      <div className="sec">Bonus structure — confirmed live for 2026/27</div>
      <div className="panel">
        <h3>How the bonus works — confirmed model</h3>
        <div className="sub">
          Two payment events per year. Both are conditional on the company hitting its financial targets.
          Both have been paid in 2025/26 — this is a confirmed, live scheme.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr><th>Payment</th><th>Trigger</th><th>Amount</th><th>Timing</th><th>Condition</th></tr>
            </thead>
            <tbody>
              <tr><td className="bold">6-month bonus</td><td>Company achieves H1 financial target (net profit on track)</td><td>0.5 × monthly salary</td><td>October 2026</td><td>H1 revenue ≥ £650k AND net profit margin on track</td></tr>
              <tr><td className="bold">Year-end bonus</td><td>Company achieves full-year financial target</td><td>1.0 × monthly salary</td><td>April / May 2027</td><td>Full year revenue ≥ £1.3m AND net profit ≥ £300k</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h3>Bonus cost modelling — at target performance</h3>
        <div className="sub">
          Total bonus liability at current salaries if both targets are hit.
          {canEdit ? " Click a salary to edit it — changes save instantly to all tabs." : ""}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr><th>Name</th><th>Annual salary</th><th>Monthly salary</th><th>6-month bonus (0.5×)</th><th>Year-end bonus (1×)</th><th>Total bonus</th></tr>
            </thead>
            <tbody>
              {rows.map(({ p, monthly, b6, bye, tot }) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>
                    <EditableNumber
                      value={p.salary}
                      canEdit={canEdit}
                      prefix="£"
                      format={(n) => Math.round(n).toLocaleString("en-GB")}
                      onCommit={(salary) => updateMember({ id: p._id, salary })}
                    />
                  </td>
                  <td>{fmt(monthly)}</td>
                  <td className="green">{fmt(b6)}</td>
                  <td className="green">{fmt(bye)}</td>
                  <td style={{ fontWeight: 600 }}>{fmt(tot)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600, background: "var(--color-background-secondary)" }}>
                <td>TOTAL</td><td>{fmt(totSal)}</td><td>—</td><td>{fmt(tot6m)}</td><td>{fmt(totYe)}</td><td>{fmt(totTot)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="note-box" style={{ marginTop: 10 }}>
          Total bonus liability with employer NI ({(niRate * 100).toFixed(1)}%) = approximately <strong>{fmt(withNI)}</strong>.
          This must be reserved monthly — approximately <strong>{fmt(withNI / 12)}</strong> set aside each month to fund both payments.
        </div>
      </div>

      <div className="two">
        <div className="ib g"><h4>Why this bonus model is strong</h4><p>It is conditional on company performance — so it self-funds. It pays out twice a year which maintains engagement. It is transparent and the same for everyone (proportionate to salary). It directly connects individual effort to company outcome. It has already been paid — which means the team trusts it.</p></div>
        <div className="ib a"><h4>One risk to manage</h4><p>If the 6-month target is missed, team motivation can dip in H2. Consider a stretch incentive: if H1 is missed but the full year is still achieved, the 6-month bonus is paid alongside the year-end bonus. This keeps effort high even if Q1/Q2 are difficult.</p></div>
      </div>
    </div>
  );
}
