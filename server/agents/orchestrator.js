import { generateFirePlan } from './fireAgent.js'
import { analyzeHealthScore } from './healthScoreAgent.js'
import { analyzeTax } from './taxAgent.js'

// Audit trail for all agent decisions
const auditLog = []

function logDecision(agent, action, input, output) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    agent,
    action,
    input: typeof input === 'object' ? JSON.stringify(input).substring(0, 500) : String(input),
    outputSummary: typeof output === 'object' ? JSON.stringify(output).substring(0, 300) : String(output).substring(0, 300),
  }
  auditLog.push(entry)
  console.log(`[AUDIT] ${entry.agent} → ${entry.action}`)
  return entry.id
}

export async function orchestrate(type, payload) {
  const startTime = Date.now()
  logDecision('Orchestrator', `Received ${type} request`, payload, 'Routing to specialized agent')

  let result
  try {
    switch (type) {
      case 'health-score':
        logDecision('Orchestrator', 'Routing to HealthScoreAgent', { type }, 'Delegating analysis')
        result = await analyzeHealthScore(payload.answers, payload.scores)
        logDecision('HealthScoreAgent', 'Analysis complete', { overallScore: result.overallScore }, result.insights?.substring(0, 200))
        break

      case 'tax-wizard':
        logDecision('Orchestrator', 'Routing to TaxAnalysisAgent', { type }, 'Delegating tax analysis')
        result = await analyzeTax(payload.salary, payload.deductions, payload.results)
        logDecision('TaxAnalysisAgent', 'Analysis complete', {}, result.insights?.substring(0, 200))
        break

      case 'fire-planner':
        logDecision('Orchestrator', 'Routing to FirePlanningAgent', { type }, 'Delegating FIRE planning')
        const { plan, ...data } = payload
        result = await generateFirePlan(data, plan)
        logDecision('FirePlanningAgent', 'Plan generated', { fireNumber: plan?.fireNumber }, result.insights?.substring(0, 200))
        break

      default:
        throw new Error(`Unknown request type: ${type}`)
    }

    const duration = Date.now() - startTime
    logDecision('Orchestrator', 'Request completed', { type, duration: `${duration}ms` }, 'Success')
    return { ...result, processingTime: duration }

  } catch (error) {
    logDecision('Orchestrator', 'Error occurred', { type, error: error.message }, 'Failed')
    throw error
  }
}

export function getAuditLog() {
  return auditLog
}
