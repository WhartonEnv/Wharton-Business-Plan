export function RevenueTab() {
  return (
    <div className="page active">
      <div className="sec">Available hours calculation — the foundation of everything</div>
      <div className="note-box">
        Full year = 52 weeks × 39.5hrs = 2,054 hrs. Less 24 days leave (192 hrs) and 8 bank holidays (64 hrs) ={" "}
        <strong>1,798 chargeable hours available per person per year</strong>. All revenue calculations below use this figure.
      </div>

      <div className="panel">
        <h3>Revenue model by grade — at target utilisation</h3>
        <div className="sub">
          Based on 1,798 available hours per person. Numbers of fee earners drawn from current team structure.
          Revenue shown at current rates and at recommended +8% rate increase.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr>
                <th>Grade</th><th>Rate/hr</th><th>+8% rate</th><th>Utilisation</th>
                <th>Chargeable hrs/person</th><th>People</th><th>Revenue (current)</th><th>Revenue (+8%)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Assistant Ecologist</td><td>£60</td><td>£65</td><td>65%</td><td>1,169</td><td>2</td><td className="green">£140,280</td><td className="green">£151,970</td></tr>
              <tr><td>Ecological Consultant</td><td>£70</td><td>£76</td><td>80%</td><td>1,438</td><td>5</td><td className="green">£503,300</td><td className="green">£545,440</td></tr>
              <tr><td>Senior Ecological Consultant</td><td>£77.50 avg</td><td>£84</td><td>80%</td><td>1,438</td><td>2</td><td className="green">£222,890</td><td className="green">£241,584</td></tr>
              <tr><td>Senior Arb Consultant</td><td>£77.50 avg</td><td>£84</td><td>80%</td><td>1,438</td><td>1</td><td className="green">£111,445</td><td className="green">£120,792</td></tr>
              <tr><td>Arboricultural Consultant</td><td>£70</td><td>£76</td><td>80%</td><td>1,438</td><td>1</td><td className="green">£100,660</td><td className="green">£109,288</td></tr>
              <tr><td>Director (Peter)</td><td>£105</td><td>£105</td><td>50%</td><td>899</td><td>1</td><td className="green">£94,395</td><td className="green">£94,395</td></tr>
              <tr style={{ background: "var(--color-background-secondary)", fontWeight: 600 }}><td>Total fee-earning</td><td>—</td><td>—</td><td>—</td><td>—</td><td>12</td><td className="green">£1,172,970</td><td className="green">£1,263,469</td></tr>
              <tr><td>Mileage &amp; expenses recharge</td><td colSpan={5} style={{ color: "var(--color-text-secondary)", fontSize: 11 }}>Based on 2025/26 actuals trend</td><td>£41,000</td><td>£41,000</td></tr>
              <tr><td>Other / Roots income</td><td colSpan={5} style={{ color: "var(--color-text-secondary)", fontSize: 11 }}>Roots target £28k + other</td><td>£42,000</td><td>£42,000</td></tr>
              <tr className="bold" style={{ background: "var(--color-background-secondary)" }}><td>TOTAL PROJECTED TURNOVER</td><td colSpan={5}></td><td className="amber">£1,255,970</td><td className="green">£1,346,469</td></tr>
            </tbody>
          </table>
        </div>
        <div className="note-box" style={{ marginTop: 10 }}>
          At current charge-out rates with target utilisation, projected turnover is <strong>£1.26m — £44k short of target</strong>.
          An 8% rate increase delivers <strong>£1.35m — exceeding the £1.3m target</strong>.
          The fee rate increase is not optional — it is the critical enabler of the plan.
        </div>
      </div>

      <div className="sec">Revenue gap analysis</div>
      <div className="two">
        <div className="ib g">
          <h4>What closes the £44k gap without a rate increase</h4>
          <p>Option A: Fill the vacant Arboricultural Consultant post — adds ~£100k at current rates. Option B: Increase Ecological Consultant utilisation from 80% to 85% across 5 people — adds ~£31k. Option C: Both together — exceeds £1.3m comfortably. The rate increase makes all scenarios more resilient.</p>
        </div>
        <div className="ib a">
          <h4>Risk if utilisation is 10% below target</h4>
          <p>If actual utilisation runs 10% below target (a realistic risk given no current tracking), projected revenue falls to approximately £1.07m — below the 2025/26 actual. This is why utilisation tracking is non-negotiable from April 2026. See the Utilisation Calculator tab.</p>
        </div>
      </div>

      <div className="sec">Quarterly revenue targets</div>
      <div className="quarter-grid">
        <div className="qcard"><div className="ql">Q1 Apr–Jun</div><div className="qv green">£310,000</div><div className="qs">Survey season ramp-up</div></div>
        <div className="qcard"><div className="ql">Q2 Jul–Sep</div><div className="qv green">£350,000</div><div className="qs">Peak survey season</div></div>
        <div className="qcard"><div className="ql">Q3 Oct–Dec</div><div className="qv amber">£320,000</div><div className="qs">Post-season, reports heavy</div></div>
        <div className="qcard"><div className="ql">Q4 Jan–Mar</div><div className="qv green">£320,000</div><div className="qs">Planning pipeline delivery</div></div>
      </div>
    </div>
  );
}
