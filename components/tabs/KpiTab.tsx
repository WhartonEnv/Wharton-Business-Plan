function KpiCard({
  title,
  tag,
  levels,
}: {
  title: string;
  tag: string;
  levels: { cls: string; heading: string; items: string[]; salary: React.ReactNode }[];
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h4>{title}</h4>
        <span className="role-tag rt-all">{tag}</span>
      </div>
      <div className="kpi-body">
        <div className="level-grid">
          {levels.map((lv, i) => (
            <div key={i} className={`level-box ${lv.cls}`}>
              <h5>{lv.heading}</h5>
              <ul>
                {lv.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
              <div className="salary">{lv.salary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KpiTab() {
  return (
    <div className="page active">
      <div className="sec">KPI framework — three levels per role</div>
      <div className="note-box">
        Level 1 = entry into grade / probationary completion. Level 2 = fully competent, performing at midpoint standard.
        Level 3 = exceeding expectations, approaching next grade. Progression between levels triggers salary movement within the band.
        Movement to the next grade requires a formal promotion assessment.
      </div>

      <KpiCard
        title="Assistant Ecological / Arboricultural Consultant"
        tag="All disciplines"
        levels={[
          { cls: "lv1", heading: "Level 1 — Foundation", items: ["Completes supervised surveys accurately", "Report sections completed on time", "Utilisation: 60% chargeable", "Zero client complaints", "Studying toward TechArborA / ACIEEM", "Attends all training sessions"], salary: <>Eco: £25,000 (L1)<br />Arb: £26,000 (L1)</> },
          { cls: "lv2", heading: "Level 2 — Developing", items: ["Independent survey capability confirmed", "Reports require minimal QA revision", "Utilisation: 65% chargeable", "Positive client feedback on record", "Professional qualification achieved or imminent", "Supports senior staff on site"], salary: <>Eco: £27,000 (L2)<br />Arb: £28,500 (L2)</> },
          { cls: "lv3", heading: "Level 3 — Ready to progress", items: ["Leads small projects with oversight", "Utilisation: 68%+ chargeable", "Qualification achieved", "Demonstrates commercial awareness", "Mentors newer assistants", "Ready for Consultant grade assessment"], salary: <>Eco: £29,000 (L3)<br />Arb: £31,000 (L3)</> },
        ]}
      />

      <KpiCard
        title="Ecological / Arboricultural Consultant"
        tag="All disciplines"
        levels={[
          { cls: "lv1", heading: "Level 1 — Established", items: ["Manages own project workload", "Utilisation: 75% chargeable", "Reports pass QA first time >80%", "ACIEEM / TechArborA held", "Client communication competent", "Understands own fee targets"], salary: <>Eco: £29,000 (L1)<br />Arb: £30,000 (L1)</> },
          { cls: "lv2", heading: "Level 2 — Competent", items: ["Hits 80% utilisation consistently", "Reports pass QA first time >90%", "Manages client relationships independently", "BNG metric competent (eco)", "Contributes to proposals/quotes", "No scope creep / fee overruns"], salary: <>Eco: £33,000 (L2)<br />Arb: £33,000 (L2)</> },
          { cls: "lv3", heading: "Level 3 — High performer", items: ["Exceeds 80% utilisation", "Generates repeat client enquiries", "Mentors assistants effectively", "Identifies additional scope opportunities", "Working toward MCIEEM / MArborA", "Ready for Senior grade assessment"], salary: <>Eco: £37,500 (L3)<br />Arb: £36,000 (L3)</> },
        ]}
      />

      <KpiCard
        title="Senior Ecological / Arboricultural Consultant"
        tag="All disciplines"
        levels={[
          { cls: "lv1", heading: "Level 1 — Senior foundation", items: ["Technical lead on assigned projects", "QA reviews for consultants", "Utilisation: 75% chargeable", "MCIEEM / MArborA held or imminent", "Manages 1–2 direct reports", "Project delivery on fee and programme"], salary: <>Eco: £38,000 (L1)<br />Arb: £41,000 (L1)</> },
          { cls: "lv2", heading: "Level 2 — Senior competent", items: ["Hits 80% utilisation consistently", "QA pass rate >95% on own reports", "Line manages 2–3 staff effectively", "Wins repeat instructions from clients", "BNG specialist / expert in discipline area", "Licence holder (eco) / complex AIA (arb)"], salary: <>Eco: £40,000 (L2)<br />Arb: £43,000 (L2)</> },
          { cls: "lv3", heading: "Level 3 — Principal ready", items: ["Contributes to business development", "Manages complex multi-discipline projects", "Mentors whole team in specialism", "Expert witness capability emerging", "Multiple licences (eco) / FArborA path", "Ready for Principal assessment"], salary: <>Eco: £43,000 (L3)<br />Arb: £46,000 (L3)</> },
        ]}
      />

      <KpiCard
        title="Principal Ecological / Arboricultural Consultant"
        tag="Technical lead + QA + line management"
        levels={[
          { cls: "lv1", heading: "Level 1 — Principal established", items: ["Technical authority for discipline", "QA sign-off for all senior reports", "Utilisation: 65% (management load)", "Line manages Senior + team", "P&L awareness for discipline", "MCIEEM / FArborA held"], salary: <>Eco: £46,000–£49,000<br />Arb: £44,000–£47,000</> },
          { cls: "lv2", heading: "Level 2 — Principal competent", items: ["Discipline revenue target achieved", "Team utilisation on target", "Leads proposals and fee negotiation", "External profile / publications / CPD", "Retains key strategic clients", "Zero regulatory compliance issues"], salary: <>Eco: £49,000–£54,000<br />Arb: £47,000–£51,000</> },
          { cls: "lv3", heading: "Level 3 — Associate Director ready", items: ["Discipline exceeds revenue target by 10%+", "Team development measurably improving", "Strategic client relationships owned", "Expert witness / public inquiry experience", "Business plan contribution at board level", "Ready for Associate Director assessment"], salary: <>Eco: £54,000–£58,000<br />Arb: £51,000–£54,000</> },
        ]}
      />

      <KpiCard
        title="Support roles — Project & Ecology Coordinators, Finance & Admin"
        tag="Support"
        levels={[
          { cls: "lv1", heading: "Level 1", items: ["All tasks completed on time", "Systems used accurately (LEAF etc.)", "Zero client-facing errors", "Proactive communication to team"], salary: "Band min to min+15%" },
          { cls: "lv2", heading: "Level 2", items: ["Proactively improves processes", "Supports multiple senior staff efficiently", "Financial reporting accurate and timely", "Positive team feedback consistently"], salary: "Band midpoint ±5%" },
          { cls: "lv3", heading: "Level 3", items: ["Drives efficiency measurably", "Takes ownership without instruction", "Trains others in systems/processes", "Strategic contribution to operations"], salary: "Band mid to max" },
        ]}
      />
    </div>
  );
}
