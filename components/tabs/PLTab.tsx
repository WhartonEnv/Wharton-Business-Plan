export function PLTab() {
  return (
    <div className="page active">
      <div className="sec">Projected P&amp;L — 2026/27 vs confirmed 2025/26 actuals</div>
      <div className="panel">
        <h3>Full P&amp;L forecast — three scenarios</h3>
        <div className="sub">
          Conservative = current rates, current utilisation. Base = 8% rate increase, target utilisation.
          Stretch = 8% rate increase + vacant post filled + utilisation at 85%.
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="t">
            <thead>
              <tr><th>Line item</th><th>2025/26 actual</th><th>Conservative</th><th>Base plan</th><th>Stretch</th></tr>
            </thead>
            <tbody>
              <tr className="bold"><td>Turnover</td><td>£1,038,318</td><td>£1,090,000</td><td className="green">£1,346,000</td><td className="green">£1,480,000</td></tr>
              <tr><td>Cost of sales (wages, travel, direct)</td><td>£607,369</td><td>£625,000</td><td>£680,000</td><td>£730,000</td></tr>
              <tr className="bold"><td>Gross profit</td><td>£430,949</td><td>£465,000</td><td className="green">£666,000</td><td className="green">£750,000</td></tr>
              <tr><td style={{ paddingLeft: 14, fontSize: 11 }}>GP margin %</td><td>41.5%</td><td>42.7%</td><td className="green">49.5%</td><td className="green">50.7%</td></tr>
              <tr><td>Salaries (admin + management)</td><td>inc. above</td><td>£90,000</td><td>£95,000</td><td>£98,000</td></tr>
              <tr><td>Salary increases to band midpoints</td><td>—</td><td>£20,000</td><td>£35,000</td><td>£35,000</td></tr>
              <tr><td>Bonus payments (est.)</td><td>inc. in admin</td><td>£35,000</td><td>£52,000</td><td>£57,000</td></tr>
              <tr><td>Admin overheads (held flat)</td><td>£221,784</td><td>£225,000</td><td>£228,000</td><td>£230,000</td></tr>
              <tr className="bold"><td>Operating profit</td><td>£209,165</td><td>£95,000</td><td className="green">£256,000</td><td className="green">£330,000</td></tr>
              <tr><td>Corporation tax (est. 25.1%)</td><td>£52,470</td><td>£23,845</td><td>£64,256</td><td>£82,830</td></tr>
              <tr className="bold"><td>Profit after tax</td><td>£156,695</td><td className="amber">£71,155</td><td className="green">£191,744</td><td className="green">£247,170</td></tr>
              <tr><td style={{ paddingLeft: 14, fontSize: 11 }}>Net margin %</td><td>15.1%</td><td className="amber">6.5%</td><td className="green">14.2%</td><td className="green">16.7%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="note-box" style={{ marginTop: 10 }}>
          The conservative scenario (no rate increase, below-target utilisation) is a significant step backward from 2025/26.
          The base plan requires the 8% rate increase AND hitting utilisation targets. The stretch scenario requires additionally
          filling the vacant arb post. <strong>The £300–350k net profit target requires the stretch scenario.</strong>
        </div>
      </div>

      <div className="sec">What needs to be true for each scenario</div>
      <div className="three">
        <div className="ib r"><h4>Conservative — risk scenario</h4><p>No rate increase. Utilisation 10% below target. Revenue £1.09m. Profit after tax drops to £71k — below 2025/26. Do not allow this scenario to happen by default.</p></div>
        <div className="ib a"><h4>Base plan — the minimum acceptable</h4><p>8% rate increase implemented April. Utilisation tracked and hitting targets. Vacant arb post unfilled. Revenue £1.35m, PAT £192k. Viable but below profit target.</p></div>
        <div className="ib g"><h4>Stretch — the stated ambition</h4><p>Rate increase + utilisation + vacant arb post filled by Q1. Revenue £1.48m, PAT £247k. Closest to £300–350k target. Director remuneration top-up via dividends brings total reward to target level.</p></div>
      </div>
    </div>
  );
}
