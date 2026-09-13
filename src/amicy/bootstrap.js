import { AMICY_COMMAND_LAYER, AMICY_DEPARTMENTS } from './operations.js'

const STATUS_LABELS = {
  building: 'working',
  'need you': 'needs approval',
  blocked: 'blocked',
  shipped: 'complete',
  crew: 'agents',
}

function ensureCommandLayer() {
  if (!document.querySelector('#amicy-command-style')) {
    const style = document.createElement('style')
    style.id = 'amicy-command-style'
    style.textContent = `
      .amicy-command-layer {
        position: fixed;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 30;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 10px;
        background: rgba(8,10,16,.78);
        backdrop-filter: blur(12px);
        color: #fff;
        font: 600 11px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        letter-spacing: .06em;
        text-transform: uppercase;
        box-shadow: 0 10px 30px rgba(0,0,0,.22);
        pointer-events: none;
      }
      .amicy-command-layer .pulse {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #55d17a;
        box-shadow: 0 0 12px rgba(85,209,122,.9);
      }
      .amicy-command-layer small {
        opacity: .58;
        font-weight: 500;
        letter-spacing: .03em;
      }
    `
    document.head.appendChild(style)
  }

  if (!document.querySelector('.amicy-command-layer')) {
    const badge = document.createElement('div')
    badge.className = 'amicy-command-layer'
    badge.innerHTML = `<i class="pulse"></i><span>${AMICY_COMMAND_LAYER.name} Command Layer</span><small>online · ${AMICY_DEPARTMENTS.length} departments</small>`
    document.body.appendChild(badge)
  }
}

function replaceExact(selector, from, to) {
  document.querySelectorAll(selector).forEach((el) => {
    if (el.textContent.trim().toLowerCase() === from) el.textContent = to
  })
}

function applyAmicyUi() {
  const brand = document.querySelector('.brand')
  if (brand) {
    const textNode = [...brand.childNodes].find((node) => node.nodeType === Node.TEXT_NODE)
    if (textNode && textNode.textContent.trim() !== 'AMICY Bot World') textNode.textContent = 'AMICY Bot World'
  }

  document.querySelectorAll('.stat .lbl').forEach((el) => {
    const key = el.textContent.trim().toLowerCase()
    if (STATUS_LABELS[key]) el.textContent = STATUS_LABELS[key]
  })

  replaceExact('.sec-head span', 'repos', 'Workspaces')
  replaceExact('#btn-close-project', 'all repos', 'All workspaces')

  const newTask = document.querySelector('#btn-new-session')
  if (newTask && !newTask.textContent.toLowerCase().includes('new task')) {
    const icon = newTask.querySelector('svg')?.outerHTML || ''
    newTask.innerHTML = `${icon} New task`
    newTask.title = 'Start a new agent task in this workspace (C)'
  }

  const hide = document.querySelector('#btn-hide-project')
  if (hide) hide.title = 'Hide this workspace from AMICY Bot World without changing its tasks'

  const home = document.querySelector('#btn-home')
  if (home) home.title = 'Reset AMICY Bot World view (0)'
  const next = document.querySelector('#btn-next')
  if (next) next.title = 'Next agent needing attention (N)'
  const orbit = document.querySelector('#btn-orbit')
  if (orbit) orbit.title = 'Orbit mode — sweep around AMICY Bot World (O)'

  ensureCommandLayer()
}

const observer = new MutationObserver(applyAmicyUi)
observer.observe(document.documentElement, { childList: true, subtree: true })
applyAmicyUi()
