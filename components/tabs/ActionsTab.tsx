function CI({ tag, tagCls, children }: { tag: string; tagCls: string; children: React.ReactNode }) {
  return (
    <div className="ci">
      <span className={`ctag ${tagCls}`}>{tag}</span>
      <p>{children}</p>
    </div>
  );
}

export function ActionsTab() {
  return (
    <div className="page active">
      <div className="coach-box">
        <h3>Priority actions — Q1 2026/27 (April–June). Non-negotiable.</h3>
        <CI tag="Week 1" tagCls="must"><strong>Implement fee rate increase of 8% across all charge-out rates from 1 April.</strong> New rates: Assistant £65/hr, Consultant £76/hr, Senior £84/hr, Principal £97/hr, Director £105/hr. Issue updated fee schedule to all clients. This single action adds approximately £90k to annual revenue.</CI>
        <CI tag="Week 1" tagCls="must"><strong>Correct Michael Nicklin&apos;s salary to Senior Arboricultural Consultant band minimum of £36,000.</strong> He is currently £4,000 below minimum for his grade. This is an active retention risk. Cost: £4,000 + £552 employer NI = £4,552/year. Do not wait for the October review.</CI>
        <CI tag="Week 2" tagCls="must"><strong>Introduce weekly utilisation tracking.</strong> Without this, the business plan cannot be managed. Minimum requirement: every fee-earner logs chargeable hours weekly in LEAF or equivalent. A simple dashboard showing actual vs target utilisation per person must be visible to Laura Carter and Peter Wharton by week 3 of April.</CI>
        <CI tag="April" tagCls="must"><strong>Issue all team members their individual KPI document.</strong> Each person receives: their current level (1, 2 or 3), the gates required to move to the next level, their current salary position within the band, and their personal revenue target for the year. This is the single most important culture action of the year.</CI>
        <CI tag="April" tagCls="must"><strong>Advertise and recruit the vacant Arboricultural Consultant post.</strong> This post, filled by Q2, adds approximately £100k in annual revenue at current rates. At the salary band minimum of £29,000 plus NI and pension (~£34k total cost), the return on investment is approximately 3:1 in year one. Every month this post is vacant costs the business ~£8,300 in lost revenue.</CI>
        <CI tag="Q1" tagCls="watch"><strong>Communicate the salary band framework to the whole team.</strong> Every person should know: their band, their level, what they need to do to progress. This removes the single biggest source of salary dissatisfaction — uncertainty. Do this in a team meeting, supported by individual 1:1 conversations with Laura Carter.</CI>
        <CI tag="Q1" tagCls="watch"><strong>Phase salary increases — April tranche.</strong> Move all staff below band minimum to minimum immediately (Michael Nicklin, review Rowan Finch, Luke Waddison). Move staff significantly below midpoint to within 5% of midpoint. Total April cost estimated £18,000–£22,000 additional annual salary. October tranche conditional on H1 revenue ≥ £650k.</CI>
        <CI tag="Q2" tagCls="plan"><strong>BNG as a separately priced service line.</strong> By July 2026, BNG metric assessments, biodiversity plans and credit advice should be on a named fee schedule, priced at £1,800–£4,500 per instruction depending on complexity. This makes BNG revenue visible, trackable and growing. Target: £120k BNG revenue in 2026/27 as a named line.</CI>
        <CI tag="Q2" tagCls="plan"><strong>First quarterly management review against this plan.</strong> By end of June: actual revenue vs £310k Q1 target reviewed. Utilisation actuals vs targets reviewed per person. KPI progress reviewed for each team member. Salary increase October decision confirmed or deferred based on H1 trajectory.</CI>
        <CI tag="Q3–Q4" tagCls="plan"><strong>Associate Director pathway opened.</strong> By October 2026, identify the strongest Senior or Principal-grade individual in the ecology team as the first Associate Director candidate. Set out the formal pathway with a 12-month timeline. This creates internal progression visible to the whole team and removes dependency on Peter for all senior decisions.</CI>
      </div>

      <div className="sec">At-a-glance — what success looks like by quarter</div>
      <div style={{ overflowX: "auto" }}>
        <table className="t">
          <thead>
            <tr><th>Quarter</th><th>Revenue target</th><th>Key milestone</th><th>People action</th><th>Commercial action</th></tr>
          </thead>
          <tbody>
            <tr><td className="bold">Q1 Apr–Jun</td><td className="green">£310,000</td><td>Fee rates increased. Utilisation tracking live. KPIs issued.</td><td>Michael Nicklin salary corrected. Arb vacancy advertised.</td><td>New fee schedule to all clients. BNG pricing developed.</td></tr>
            <tr><td className="bold">Q2 Jul–Sep</td><td className="green">£350,000</td><td>H1 total ≥ £650k. 6-month bonus trigger assessed.</td><td>New Arb Consultant in post. October salary review confirmed.</td><td>BNG as named service line. Strategic client review.</td></tr>
            <tr><td className="bold">Q3 Oct–Dec</td><td className="amber">£320,000</td><td>October salary increases applied. Associate Director pathway opened.</td><td>6-month appraisals completed. Level assessments issued.</td><td>2027/28 pipeline building. Fee rates reviewed for next year.</td></tr>
            <tr><td className="bold">Q4 Jan–Mar</td><td className="green">£320,000</td><td>Full year £1.3m target achieved. Year-end bonus confirmed.</td><td>Annual appraisals. Promotion decisions. Band review for 2027/28.</td><td>Next year plan presented to team. Salary bands published for 2027/28.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
