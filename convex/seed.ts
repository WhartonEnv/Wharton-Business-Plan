import { mutation } from "./_generated/server";

// One-off seeding of the current team data taken from the original business plan.
// Idempotent: does nothing if teamMembers already has rows.
// Run with:  npx convex run seed:run
export const run = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("teamMembers").first();
    if (existing) {
      return { seeded: false, reason: "teamMembers already populated" };
    }

    const members = [
      // Fee earners
      { name: "Peter Wharton", grade: "Director", salary: 104750, feeEarner: true, ratePerHour: 105, targetUtilPct: 50, contractedHoursPerWeek: 39.5 },
      { name: "Katrina Wells", grade: "Senior Eco Consultant", salary: 42000, feeEarner: true, ratePerHour: 77.5, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Natalie Sabin", grade: "Senior Eco Consultant (20hrs)", salary: 20000, feeEarner: true, ratePerHour: 77.5, targetUtilPct: 80, contractedHoursPerWeek: 20 },
      { name: "Michael Nicklin", grade: "Senior Arb Consultant", salary: 32000, feeEarner: true, ratePerHour: 77.5, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Rebekah Bristow", grade: "Arb Consultant", salary: 28000, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Rowan Finch", grade: "Eco Consultant", salary: 28500, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Luke Waddison", grade: "Eco Consultant", salary: 28000, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Francessca Aldridge", grade: "Eco Consultant (4 days)", salary: 22680, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 31.6 },
      { name: "Sebastian Channell", grade: "Eco Consultant", salary: 30000, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Dominic Martens", grade: "Eco Consultant", salary: 34500, feeEarner: true, ratePerHour: 70, targetUtilPct: 80, contractedHoursPerWeek: 39.5 },
      { name: "Emma Hughes", grade: "Asst Eco Consultant", salary: 27500, feeEarner: true, ratePerHour: 60, targetUtilPct: 65, contractedHoursPerWeek: 39.5 },
      { name: "Felicity Humphries", grade: "Asst Eco Consultant", salary: 26500, feeEarner: true, ratePerHour: 60, targetUtilPct: 65, contractedHoursPerWeek: 39.5 },
      // Support / management (not fee earning, included for bonus modelling)
      { name: "Laura Carter", grade: "Operations / Management", salary: 46000, feeEarner: false },
      { name: "Sarah Kirk-Griffith", grade: "Project / Ecology Coordinator", salary: 29150, feeEarner: false },
      { name: "Maddie Bray", grade: "Coordinator / Admin", salary: 25000, feeEarner: false },
      { name: "Imigin Toney", grade: "Finance / Admin", salary: 15873, feeEarner: false },
    ];

    let order = 0;
    for (const m of members) {
      await ctx.db.insert("teamMembers", { ...m, order: order++ });
    }
    await ctx.db.insert("settings", {
      key: "global",
      fullTimeWeekHours: 39.5,
      availableHoursPerYear: 1798,
      mileageAndExpenses: 41000,
      otherIncome: 42000,
      employerNiRate: 0.138,
    });

    return { seeded: true, count: members.length };
  },
});
