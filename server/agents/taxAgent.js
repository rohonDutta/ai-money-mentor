import { generateInsights } from '../utils/gemini.js'

export async function analyzeTax(salary, deductions, results) {
  const { oldRegime, newRegime, recommended, savings, missed, grossIncome } = results

  const prompt = `You are an expert Indian tax advisor. A salaried individual has the following tax situation for FY 2025-26:

Gross Annual Income: ₹${grossIncome?.toLocaleString('en-IN')}
Deductions claimed: ${JSON.stringify(deductions)}

Tax under Old Regime: ₹${Math.round(oldRegime.total).toLocaleString('en-IN')} (taxable: ₹${Math.round(oldRegime.taxableIncome).toLocaleString('en-IN')})
Tax under New Regime: ₹${Math.round(newRegime.total).toLocaleString('en-IN')} (taxable: ₹${Math.round(newRegime.taxableIncome).toLocaleString('en-IN')})
Recommended: ${recommended}
Potential Savings: ₹${Math.round(savings).toLocaleString('en-IN')}

Missed deduction opportunities: ${missed.map(m => m.section).join(', ') || 'None'}

Provide 3-4 sentences of actionable tax-saving advice specific to their situation. Mention specific sections (80C, 80D, 80CCD, 24b, etc.) and instruments (ELSS, NPS, PPF, health insurance). Be specific about amounts.`

  const fallback = `Based on your income of ₹${grossIncome?.toLocaleString('en-IN')}, the ${recommended} saves you ₹${Math.round(savings).toLocaleString('en-IN')} in taxes. ${missed.length > 0 ? `You're missing deductions under ${missed.map(m => m.section).join(', ')}. Claiming these could save you even more.` : 'You\'re utilizing most available deductions effectively.'}`

  const insights = await generateInsights(prompt, fallback)

  return {
    insights,
    timestamp: new Date().toISOString(),
    agent: 'TaxAnalysisAgent',
  }
}
