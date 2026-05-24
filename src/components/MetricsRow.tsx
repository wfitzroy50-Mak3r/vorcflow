import { useVorcflow } from '../state/VorcflowContext'

export function MetricsRow() {
  const { derived } = useVorcflow()

  return (
    <div className="metrics-row">
      <div className="metric-card">
        <div className="metric-label">Active Patients</div>
        <div className="metric-value">24</div>
        <div className="metric-sub">Cardiology Ward 4</div>
        <div className="metric-progress">
          <div
            className="metric-progress-fill"
            style={{ width: '80%', background: 'var(--blue)' }}
          />
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-label">Tasks Completed</div>
        <div className="metric-value" id="tasks-done-count">
          {derived.doneCount}
        </div>
        <div className="metric-sub up" id="tasks-pct">
          ↑ {derived.pct}% of today's tasks
        </div>
        <div className="metric-progress">
          <div
            className="metric-progress-fill"
            id="tasks-bar"
            style={{ width: `${derived.pct}%`, background: 'var(--green)' }}
          />
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-label">Pending Orders</div>
        <div className="metric-value">7</div>
        <div className="metric-sub down">↑ 2 overdue</div>
        <div className="metric-progress">
          <div
            className="metric-progress-fill"
            style={{ width: '30%', background: 'var(--amber)' }}
          />
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-label">Avg. Task Time</div>
        <div className="metric-value">14m</div>
        <div className="metric-sub up">↓ 3 min vs yesterday</div>
        <div className="metric-progress">
          <div
            className="metric-progress-fill"
            style={{ width: '60%', background: 'var(--teal)' }}
          />
        </div>
      </div>
    </div>
  )
}

