import { useVorcflow } from '../state/VorcflowContext'

export function Topbar() {
  const { state, dispatch } = useVorcflow()

  return (
    <div className="topbar">
      <div className="page-title" id="page-title">
        {state.navTitle}
      </div>
      <div className="ward-tag">{state.wardLabel}</div>
      <div className="topbar-right">
        <div className="search-wrap">
          <svg viewBox="0 0 14 14">
            <circle cx="6" cy="6" r="4" />
            <path d="M9.5 9.5L13 13" />
          </svg>
          <input
            className="search-input"
            type="text"
            id="search-input"
            placeholder="Search patients, tasks..."
            value={state.search}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', query: e.target.value })}
          />
        </div>

        <div
          className="btn-icon"
          title="Shift Handoff"
          role="button"
          tabIndex={0}
          onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'handoff' })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') dispatch({ type: 'OPEN_MODAL', modal: 'handoff' })
          }}
        >
          <svg viewBox="0 0 16 16">
            <path d="M2 8h12M10 4l4 4-4 4" />
          </svg>
        </div>

        <div
          className="btn-icon"
          title="Notifications"
          role="button"
          tabIndex={0}
          onClick={() => dispatch({ type: 'PUSH_TOAST', message: 'No new notifications', toastType: 'success' })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              dispatch({ type: 'PUSH_TOAST', message: 'No new notifications', toastType: 'success' })
            }
          }}
        >
          <svg viewBox="0 0 16 16">
            <path d="M8 1a5 5 0 0 1 5 5c0 5 2 6 2 6H1s2-1 2-6a5 5 0 0 1 5-5zm-1 13h2" />
          </svg>
          <div className="notif-dot" />
        </div>

        <button
          className="btn primary"
          type="button"
          onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'task' })}
        >
          <svg viewBox="0 0 16 16" style={{ width: 13, height: 13 }}>
            <path d="M8 2v12M2 8h12" />
          </svg>
          New Task
        </button>
      </div>
    </div>
  )
}

