"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EditableNumber } from "../EditableNumber";

const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");
const num = (n: number) => Math.round(n).toLocaleString("en-GB");

// --- Interactive what-if calculator (client-side modelling tool) ---
function Calculator() {
  const [u, setU] = useState({ asst: 65, eco: 80, seco: 80, sarb: 80, arb: 80, dir: 50, rate: 100 });
  const set = (k: keyof typeof u) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setU((prev) => ({ ...prev, [k]: parseInt(e.target.value) }));

  const hrs = 1798;
  const m = u.rate / 100;
  const r = { asst: 60 * m, eco: 70 * m, seco: 77.5 * m, sarb: 77.5 * m, arb: 70 * m, dir: 105 };
  const rev = {
    asst: Math.round(hrs * (u.asst / 100) * r.asst * 2),
    eco: Math.round(hrs * (u.eco / 100) * r.eco * 5),
    seco: Math.round(hrs * (u.seco / 100) * r.seco * 2),
    sarb: Math.round(hrs * (u.sarb / 100) * r.sarb * 1),
    arb: Math.round(hrs * (u.arb / 100) * r.arb * 1),
    dir: Math.round(hrs * (u.dir / 100) * r.dir * 1),
  };
  const total = Object.values(rev).reduce((a, b) => a + b, 0) + 41000 + 42000;
  const col = (v: number) => (v >= 1300000 ? "green" : v >= 1100000 ? "amber" : "red");

  const sliders: { k: keyof typeof u; label: string; min: number; max: number }[] = [
    { k: "asst", label: "Assistant Eco (2 people, £60/hr)", min: 40, max: 90 },
    { k: "eco", label: "Eco Consultant (5 people, £70/hr)", min: 40, max: 95 },
    { k: "seco", label: "Senior Eco (2 people, £77.50/hr)", min: 40, max: 95 },
    { k: "sarb", label: "Senior Arb (1 person, £77.50/hr)", min: 40, max: 95 },
    { k: "arb", label: "Arb Consultant (1 person, £70/hr)", min: 40, max: 95 },
    { k: "dir", label: "Director (1 person, £105/hr)", min: 30, max: 70 },
    { k: "rate", label: "Fee rate multiplier", min: 90, max: 115 },
  ];

  return (
    <div className="panel">
      <h3>Revenue sensitivity to utilisation — adjust to model</h3>
      <div className="sub">Move the sliders to see immediate revenue impact at each grade level.</div>
      {sliders.map((s) => (
        <div className="util-slider-wrap" key={s.k}>
          <label>{s.label}</label>
          <input type="range" min={s.min} max={s.max} step={1} value={u[s.k]} onChange={set(s.k)} />
          <div className="rv">{u[s.k]}%</div>
        </div>
      ))}
      <div className="revenue-output">
        <div className="ro-card"><div className="rl">Asst Eco (×2)</div><div className="rv2">{fmt(rev.asst)}</div></div>
        <div className="ro-card"><div className="rl">Eco Consultant (×5)</div><div className="rv2">{fmt(rev.eco)}</div></div>
        <div className="ro-card"><div className="rl">Senior Eco (×2)</div><div className="rv2">{fmt(rev.seco)}</div></div>
        <div className="ro-card"><div className="rl">Senior Arb (×1)</div><div className="rv2">{fmt(rev.sarb)}</div></div>
        <div className="ro-card"><div className="rl">Arb Consultant (×1)</div><div className="rv2">{fmt(rev.arb)}</div></div>
        <div className="ro-card"><div className="rl">Director</div><div className="rv2">{fmt(rev.dir)}</div></div>
        <div className="ro-card"><div className="rl">+ mileage/other</div><div className="rv2">£83,000</div></div>
        <div className="ro-card" style={{ border: "2px solid #1c3444" }}>
          <div className="rl" style={{ fontWeight: 700 }}>Total turnover</div>
          <div className={`rv2 ${col(total)}`}>{fmt(total)}</div>
        </div>
      </div>
    </div>
  );
}

// --- Per-person target tracker (Convex-backed, admin editable) ---
function Tracker() {
  const members = useQuery(api.teamMembers.list);
  const settings = useQuery(api.settings.get);
  const me = useQuery(api.teamMembers.myRole);
  const updateMember = useMutation(api.teamMembers.update);
  const canEdit = me?.role === "admin";

  if (members === undefined || settings === undefined) {
    return <div className="panel"><div className="note-box">Loading team data…</div></div>;
  }

  const fullWeek = settings.fullTimeWeekHours ?? 39.5;
  const baseHrs = settings.availableHoursPerYear ?? 1798;
  const feeEarners = members.filter((p) => p.feeEarner);

  let totalRevenue = 0;
  const rows = feeEarners.map((p) => {
    const contracted = p.contractedHoursPerWeek ?? fullWeek;
    const util = (p.targetUtilPct ?? 0) / 100;
    const rate = p.ratePerHour ?? 0;
    const availableHrs = baseHrs * (contracted / fullWeek);
    const chargeableWeek = contracted * util;
    const chargeableYear = availableHrs * util;
    const targetRevenue = chargeableYear * rate;
    totalRevenue += targetRevenue;
    return { p, contracted, util, rate, chargeableWeek, chargeableYear, targetRevenue };
  });

  return (
    <div className="panel">
      <h3>Utilisation by person — target tracker</h3>
      <div className="sub">
        These are the individual weekly chargeable hour targets each person must hit. Based on 39.5hr week at target
        utilisation rate.{canEdit ? " Admins can edit target util %, rate and contracted hours inline." : ""}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="t">
          <thead>
            <tr>
              <th>Name</th><th>Grade</th><th>Target util%</th><th>Contracted hrs/wk</th>
              <th>Chargeable hrs/week</th><th>Chargeable hrs/year</th><th>Rate/hr</th><th>Target annual revenue</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ p, contracted, chargeableWeek, chargeableYear, rate, targetRevenue }) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.grade}</td>
                <td>
                  <EditableNumber value={p.targetUtilPct ?? 0} canEdit={canEdit} suffix="%"
                    onCommit={(targetUtilPct) => updateMember({ id: p._id, targetUtilPct })} />
                </td>
                <td>
                  <EditableNumber value={contracted} canEdit={canEdit} step={0.1}
                    onCommit={(contractedHoursPerWeek) => updateMember({ id: p._id, contractedHoursPerWeek })} />
                </td>
                <td>{chargeableWeek.toFixed(1)}</td>
                <td>{num(chargeableYear)}</td>
                <td>
                  <EditableNumber value={rate} canEdit={canEdit} step={0.5} prefix="£"
                    onCommit={(ratePerHour) => updateMember({ id: p._id, ratePerHour })} />
                </td>
                <td className="green">{fmt(targetRevenue)}</td>
              </tr>
            ))}
            <tr className="bold" style={{ background: "var(--color-background-secondary)" }}>
              <td colSpan={7}>Total target fee revenue</td>
              <td className="green">{fmt(totalRevenue)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UtilisationTab() {
  return (
    <div className="page active">
      <div className="sec">Interactive utilisation calculator</div>
      <div className="note-box">
        Adjust the utilisation sliders to model revenue impact. Available hours per person = 1,798/year.
        This is the tool you need to run in your weekly management review once tracking is introduced.
      </div>
      <Calculator />
      <Tracker />
    </div>
  );
}
