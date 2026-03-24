import { generateInsights } from '../utils/gemini.js'

export async function analyzeHealthScore(answers, scores) {
  const overallAvg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)

  const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1])[0]
  const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]

  const prompt = `You are an expert Indian personal finance advisor. A user just completed a financial health assessment. Here are their scores (out of 100) across 6 dimensions:

${Object.entries(scores).map(([k, v]) => `- ${k}: ${v}/100`).join('\n')}

Overall score: ${overallAvg}/100
Weakest area: ${weakest[0]} (${weakest[1]}/100)
Strongest area: ${strongest[0]} (${strongest[1]}/100)

User's key data points:
- Monthly expenses: ₹${answers.monthly_expenses || 'Not provided'}
- Emergency fund: ₹${answers.emergency_fund || 'Not provided'}
- Investment percentage: ${answers.investment_percentage || 'Not provided'}
- Debt-to-income ratio: ${answers.debt_to_income || 'Not provided'}

Provide a concise 3-4 sentence personalized analysis. Focus on the most impactful action they should take first. Be specific with Indian financial instruments (PPF, ELSS, NPS, SGB, etc.). Keep it encouraging but honest.`

  const fallback = `Your overall financial health score is ${overallAvg}/100. Your strongest area is ${strongest[0]} (${strongest[1]}/100), while ${weakest[0]} (${weakest[1]}/100) needs the most attention. Focus on improving your ${weakest[0].toLowerCase()} first for maximum impact on your financial wellness.`

  const insights = await generateInsights(prompt, fallback)

  return {
    scores,
    overallScore: overallAvg,
    insights,
    timestamp: new Date().toISOString(),
    agent: 'HealthScoreAgent',
  }
}
