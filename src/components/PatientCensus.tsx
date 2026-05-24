import { useVorcflow } from '../state/VorcflowContext'

export function PatientCensus() {
  const { state, dispatch } = useVorcflow()

  return (
    <div className="card" style={{ flex: '0 0 auto' }}>
      <div className="card-header">
        <div className="card-title">Patient Census</div>
        <div className="card-count">24 patients</div>
        <button className="card-action" type="button">
          View all →
        </button>
      </div>
      <div className="card-body" id="patient-list">
        {state.patients.map((p) => (
          <button
            key={p.name}
            className="patient-item"
            type="button"
            onClick={() => dispatch({ type: 'OPEN_PATIENT', name: p.name })}
          >
            <div className={`avatar sm ${p.avatarClass}`}>{p.initials}</div>
            <div className="patient-info">
              <div className="patient-name">
                {p.name}{' '}
                <span style={{ color: 'var(--text3)', fontWeight: 400 }}>
                  Rm {p.room}
                </span>
              </div>
              <div className="patient-detail">
                {p.age}y · {p.dx} · {p.tasks} tasks
              </div>
            </div>
            <span className={`status-pill ${p.status}`}>
              {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

