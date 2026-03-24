import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null
let model = null

export function initGemini(apiKey) {
  if (!apiKey) {
    console.warn('⚠️  No Gemini API key provided. AI features will use fallback responses.')
    return false
  }
  try {
    genAI = new GoogleGenerativeAI(apiKey)
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    console.log('✅ Gemini AI initialized successfully')
    return true
  } catch (err) {
    console.error('❌ Failed to initialize Gemini:', err.message)
    return false
  }
}

export async function generateInsights(prompt, fallback = '') {
  if (!model) {
    return fallback || 'AI insights are unavailable. Please configure your Gemini API key in the .env file.'
  }
  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (err) {
    console.error('Gemini API error:', err.message)
    return fallback || 'Unable to generate AI insights at this time.'
  }
}
