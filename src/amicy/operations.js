export const AMICY_STATUSES = {
  WORKING: 'working',
  NEEDS_APPROVAL: 'needs-approval',
  BLOCKED: 'blocked',
  COMPLETE: 'complete',
  ESCALATED: 'escalated',
}

export const AMICY_DEPARTMENTS = [
  { id: 'executive', name: 'Executive', lead: 'Gabe', purpose: 'Command layer, prioritization, approvals, and escalation.' },
  { id: 'creative', name: 'Creative Studio', purpose: 'Thumbnails, graphics, visual concepts, and brand assets.' },
  { id: 'editing', name: 'Editing Suite', purpose: 'Video editing, clipping, captions, localization, and delivery.' },
  { id: 'content', name: 'Content Room', purpose: 'Research, recommendations, outlines, and content planning.' },
  { id: 'publishing', name: 'Publishing', purpose: 'YouTube, Patreon, TikTok, Instagram, scheduling, and metadata.' },
  { id: 'analytics', name: 'Analytics', purpose: 'Performance monitoring, revenue signals, experiments, and reporting.' },
  { id: 'engineering', name: 'Engineering', purpose: 'AMICY HQ, integrations, automation, Codex, Claude, and infrastructure.' },
  { id: 'community', name: 'Community', purpose: 'Discord, comments, requests, moderators, and audience signals.' },
  { id: 'partnerships', name: 'Partnerships', purpose: 'Sponsors, collaborations, affiliate opportunities, and follow-up.' },
]

export const AMICY_COMMAND_LAYER = {
  id: 'gabe',
  name: 'Gabe',
  title: 'AMICY Command Layer',
  routesTo: ['Alex', 'Allen'],
  receivesFrom: 'all-agents',
  responsibilities: [
    'collect important agent updates',
    'filter noise and duplicates',
    'prioritize work and opportunities',
    'escalate approvals, blockers, and decisions',
    'prepare the start-of-day briefing',
  ],
}

export function departmentById(id) {
  return AMICY_DEPARTMENTS.find((department) => department.id === id) || null
}
