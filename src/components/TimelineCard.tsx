import { useVorcflow } from '../state/VorcflowContext'

export function TimelineCard() {
  const { state } = useVorcflow()

  return (
    <div className="card" style={{ flex: 1, minHeight: 0 }}>
      <div className="card-header">
        <div className="card-title">Activity Timeline</div>
      </div>
      <div className="card-body" id="timeline">
        {state.timeline.map((item, i) => (
          <div className="tl-item" key={`${item.time}-${i}`}>
            <div className="tl-left">
              <div className={`tl-dot ${item.dot}`} />
              {i < state.timeline.length - 1 ? <div className="tl-line" /> : null}
            </div>
            <div className="tl-body">
              <div className="tl-action">{item.action}</div>
              <div className="tl-who">{item.who}</div>
              <div className="tl-time">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

