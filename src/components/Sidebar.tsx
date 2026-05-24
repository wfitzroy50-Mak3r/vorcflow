import { useVorcflow } from '../state/VorcflowContext'

export function Sidebar() {
  const { state, dispatch } = useVorcflow()
  const isActive = (title: string) => (state.navTitle === title ? 'active' : '')

  return (
    <nav className="sidebar">
      <div className="logo-area">
        <div className="logo-mark">
          <div className="logo-icon">
            <svg viewBox="0 0 16 16">
              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 2v4l3 2" />
            </svg>
          </div>
          <span className="logo-name">VorcFlow</span>
        </div>
        <div className="logo-tagline">Clinical Workflow Platform</div>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Overview</div>
        <button
          className={`nav-item ${isActive('Dashboard')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Dashboard' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="1" y="1" width="6" height="6" rx="1.5" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" />
            </svg>
          </span>
          Dashboard
        </button>
        <button
          className={`nav-item ${isActive('My Tasks')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'My Tasks' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="1" y="2" width="14" height="12" rx="2" />
              <path d="M5 8l2 2 4-4" />
            </svg>
          </span>
          My Tasks <span className="ni-badge">5</span>
        </button>
        <button
          className={`nav-item ${isActive('Patients')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Patients' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="8" cy="5" r="3" />
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            </svg>
          </span>
          Patients
        </button>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Clinical</div>
        <button
          className={`nav-item ${isActive('Rounds')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Rounds' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M8 1v14M1 8h14" />
              <circle cx="8" cy="8" r="5" />
            </svg>
          </span>
          Rounds <span className="ni-badge amber">3</span>
        </button>
        <button
          className={`nav-item ${isActive('Orders')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Orders' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 4h6m-6 3h4" />
            </svg>
          </span>
          Orders
        </button>
        <button
          className="nav-item"
          type="button"
          onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'handoff' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 8h12M10 4l4 4-4 4" />
            </svg>
          </span>
          Handoffs
        </button>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Team</div>
        <button
          className={`nav-item ${isActive('Care Teams')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Care Teams' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="5.5" cy="5" r="2.5" />
              <circle cx="10.5" cy="5" r="2.5" />
              <path d="M1 13c0-2.5 2-4.5 4.5-4.5" />
              <path d="M15 13c0-2.5-2-4.5-4.5-4.5" />
              <path d="M8 8c2 0 4 1.5 4 4H4c0-2.5 2-4 4-4z" />
            </svg>
          </span>
          Care Teams
        </button>
        <button
          className={`nav-item ${isActive('Messages')}`}
          type="button"
          onClick={() => dispatch({ type: 'SET_NAV', title: 'Messages' })}
        >
          <span className="ni-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-4 3V3a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          Messages <span className="ni-badge blue">12</span>
        </button>
      </div>

      <div className="sidebar-footer">
        <div
          className="user-row"
          role="button"
          tabIndex={0}
          onClick={() =>
            dispatch({ type: 'PUSH_TOAST', message: 'Profile settings coming soon', toastType: 'success' })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              dispatch({ type: 'PUSH_TOAST', message: 'Profile settings coming soon', toastType: 'success' })
            }
          }}
        >
          <div className="avatar">DR</div>
          <div>
            <div className="user-name">Dr. Rivera</div>
            <div className="user-role">Attending Physician · Card.</div>
          </div>
          <div className="status-indicator" />
        </div>
      </div>
    </nav>
  )
}

