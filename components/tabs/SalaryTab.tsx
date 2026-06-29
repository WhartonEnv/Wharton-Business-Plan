"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { EditableNumber } from "../EditableNumber";

const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

function Roster() {
  const members = useQuery(api.teamMembers.list);
  const me = useQuery(api.teamMembers.myRole);
  const updateMember = useMutation(api.teamMembers.update);
  const createMember = useMutation(api.teamMembers.create);
  const removeMember = useMutation(api.teamMembers.remove);
  const canEdit = me?.role === "admin";

  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", grade: "", salary: "", feeEarner: true });
  const [busy, setBusy] = useState(false);

  if (members === undefined) {
    return <div className="panel"><div className="note-box">Loading team data…</div></div>;
  }

  const submitNew = async () => {
    if (!draft.name.trim() || !draft.grade.trim()) return;
    setBusy(true);
    try {
      await createMember({
        name: draft.name.trim(),
        grade: draft.grade.trim(),
        salary: Number(draft.salary) || 0,
        feeEarner: draft.feeEarner,
      });
      setDraft({ name: "", grade: "", salary: "", feeEarner: true });
      setAdding(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <h3>Team roster &amp; salaries</h3>
      <div className="sub">
        The live source of truth behind the Bonus and Utilisation tabs.
        {canEdit ? " Edit salaries inline; add or remove people below." : " Sign in as an admin (director) to edit."}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="t">
          <thead>
            <tr><th>Name</th><th>Grade</th><th>Fee earner</th><th>Annual salary</th>{canEdit && <th></th>}</tr>
          </thead>
          <tbody>
            {members.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.grade}</td>
                <td>{p.feeEarner ? "Yes" : "No"}</td>
                <td>
                  <EditableNumber value={p.salary} canEdit={canEdit} prefix="£"
                    format={(n) => Math.round(n).toLocaleString("en-GB")}
                    onCommit={(salary) => updateMember({ id: p._id, salary })} />
                </td>
                {canEdit && (
                  <td>
                    <button className="btn" onClick={() => removeMember({ id: p._id })}>Remove</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canEdit && (
        <div style={{ marginTop: 12 }}>
          {!adding ? (
            <button className="btn primary" onClick={() => setAdding(true)}>+ Add team member</button>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <input className="cell-input" style={{ width: 150 }} placeholder="Name"
                value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              <input className="cell-input" style={{ width: 180 }} placeholder="Grade"
                value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: e.target.value })} />
              <input className="cell-input" type="number" placeholder="Salary"
                value={draft.salary} onChange={(e) => setDraft({ ...draft, salary: e.target.value })} />
              <label style={{ fontSize: 11, display: "flex", gap: 4, alignItems: "center" }}>
                <input type="checkbox" checked={draft.feeEarner}
                  onChange={(e) => setDraft({ ...draft, feeEarner: e.target.checked })} />
                Fee earner
              </label>
              <button className="btn primary" disabled={busy} onClick={submitNew}>Save</button>
              <button className="btn" disabled={busy} onClick={() => setAdding(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <div className="note-box" style={{ marginTop: 10 }}>
        Total payroll: <strong>{fmt(members.reduce((a, p) => a + p.salary, 0))}</strong> across {members.length} people.
      </div>
    </div>
  );
}

export function SalaryTab() {
  return (
    <div className="page active">
      <div className="sec">Salary progression mechanics — how movement through bands works</div>
      <div className="panel">
        <h3>Progression rules — non-negotiable principles</h3>
        <div className="sub">
          These rules govern how and when salary moves within and between bands. They must be communicated clearly to the
          team at the start of the financial year.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr><th>Trigger</th><th>What happens</th><th>Timing</th><th>Who approves</th></tr>
            </thead>
            <tbody>
              <tr><td>Level 1 → Level 2 within grade</td><td>Salary moves to midpoint ±5% based on appraisal score</td><td>6-month appraisal</td><td>Line manager + Director</td></tr>
              <tr><td>Level 2 → Level 3 within grade</td><td>Salary moves toward band maximum. Requires 3 consecutive appraisal periods at Level 2+</td><td>Annual appraisal</td><td>Laura Carter + Director</td></tr>
              <tr><td>Grade promotion (e.g. Consultant → Senior)</td><td>New band minimum or negotiated entry point. Formal promotion assessment required.</td><td>Annual appraisal only</td><td>Director sign-off</td></tr>
              <tr><td>At band maximum</td><td>No further base increase until promotion. Bonus and one-off recognition available.</td><td>Annual review</td><td>Director</td></tr>
              <tr><td>Below band minimum (existing staff)</td><td>Immediate correction to band minimum — no appraisal gate required.</td><td>April 2026</td><td>Director — urgent</td></tr>
              <tr><td>New hire into grade</td><td>Band minimum for unproven candidates; up to midpoint for evidenced experience</td><td>On appointment</td><td>Director</td></tr>
              <tr><td>Annual cost-of-living uplift</td><td>Bands reviewed annually in February for April implementation. Movement within band is separate from band uplift.</td><td>February each year</td><td>Director + accountant</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="two">
        <div className="ib b"><h4>What progression is NOT</h4><p>Progression is not automatic with tenure. Time in role is not a KPI gate. A team member who has been at Consultant grade for 3 years but consistently performs at Level 1 does not progress to Level 2. Conversely, a high performer can move from Level 1 to Level 3 within 18 months if KPIs are consistently exceeded.</p></div>
        <div className="ib g"><h4>How to communicate this to the team</h4><p>&quot;Your salary progression is in your hands. We have published the KPIs for every level. We review performance every 6 months. If you hit the gates, you move. If you exceed them, we have a promotion conversation. There are no surprises and no favourites.&quot;</p></div>
      </div>

      <div className="sec">Live team data</div>
      <Roster />
    </div>
  );
}
