import { generateInsights } from '../utils/gemini.js'

export async function generateFirePlan(data, plan) {
  const { age, retireAge, monthlyIncome, monthlyExpenses, currentSavings, riskProfile } = data
  const { fireNumber, requiredSIP, yearsToRetire, gap } = plan

  const fmtCr = (n) => {
    if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr'
    if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L'
    return '₹' + Math.round(n).toLocaleString('en-IN')
  }

  const prompt = `You are an expert Indian financial planner specializing in FIRE (Financial Independence, Retire Early). Here's a user's profile:

Age: ${age}, Target retirement: ${retireAge} (${yearsToRetire} years)
Monthly income: ₹${monthlyIncome.toLocaleString('en-IN')}
Monthly expenses: ₹${monthlyExpenses.toLocaleString('en-IN')}
Current savings: ${fmtCr(currentSavings)}
Risk profile: ${riskProfile}
FIRE number: ${fmtCr(fireNumber)}
Required monthly SIP: ₹${requiredSIP.toLocaleString('en-IN')}
Monthly gap: ${gap > 0 ? '₹' + gap.toLocaleString('en-IN') + ' short' : 'On track'}

Provide 3-4 sentences of specific, actionable advice for their FIRE journey. Include:
- Whether their target is realistic
- Specific Indian instruments to invest in (index funds, ELSS, NPS, PPF, SGBs)
- Suggestions to increase savings rate if there's a gap
- One tax-efficient investing tip
Keep it motivating and practical.`

  const fallback = `Your FIRE target of ${fmtCr(fireNumber)} by age ${retireAge} requires a monthly SIP of ₹${requiredSIP.toLocaleString('en-IN')}. ${gap > 0 ? `There's a gap of ₹${gap.toLocaleString('en-IN')} per month — consider reducing expenses or increasing income.` : 'You\'re on track with your current savings rate!'} For a ${riskProfile.toLowerCase()} profile, consider a mix of Nifty 50 index funds, PPF, and NPS for tax-efficient wealth building.`

  const insights = await generateInsights(prompt, fallback)

  return {
    insights,
    timestamp: new Date().toISOString(),
    agent: 'FirePlanningAgent',
  }
}
