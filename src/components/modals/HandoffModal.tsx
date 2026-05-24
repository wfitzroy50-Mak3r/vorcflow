import { useVorcflow } from '../../state/VorcflowContext'

export function HandoffModal() {
  const { state, dispatch } = useVorcflow()
  const open = state.openModal === 'handoff'

  return (
    <div
      className={`modal-overlay ${open ? 'open' : ''}`}
      id="handoff-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch({ type: 'CLOSE_MODALS' })
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 9h14M10 4l5 5-5 5" />
          </svg>
          <div className="modal-title">Shift Handoff — Dr. Rivera</div>
          <button className="modal-close" type="button" onClick={() => dispatch({ type: 'CLOSE_MODALS' })}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-row-2">
            <div>
              <label className="form-label">Handing off to</label>
              <select className="form-select" defaultValue="Dr. Nguyen (Night shift)">
                <option>Dr. Nguyen (Night shift)</option>
                <option>Dr. Osei</option>
                <option>Dr. Kim</option>
              </select>
            </div>
            <div>
              <label className="form-label">Handoff time</label>
              <input className="form-input" type="time" defaultValue="19:00" />
            </div>
          </div>
          <div className="form-row">
            <div className="section-label" style={{ marginBottom: 10 }}>
              Pending items by patient
            </div>
            <div className="handoff-items">
              <div className="handoff-item">
                <span className="handoff-room">Rm 312</span>
                <span>
                  <strong>Margaret T.</strong> — Awaiting AM labs. Monitor K+
                  levels closely. Echo pending.
                </span>
              </div>
              <div className="handoff-item">
                <span className="handoff-room">Rm 408</span>
                <span>
                  <strong>James K.</strong> — Discharge pending insurance
                  authorization. Family meeting at 20:00.
                </span>
              </div>
              <div className="handoff-item">
                <span className="handoff-room">Rm 215</span>
                <span>
                  <strong>Priya L.</strong> — Echo scheduled 06:00. Heparin drip
                  at 1200 units/hr. CRITICAL — monitor closely.
                </span>
              </div>
              <div className="handoff-item">
                <span className="handoff-room">Rm 401</span>
                <span>
                  <strong>Robert H.</strong> — Stable. Continue current regimen.
                  Cardiology f/u tomorrow AM.
                </span>
              </div>
            </div>
          </div>
          <div className="form-row" style={{ marginTop: 16 }}>
            <label className="form-label">Additional handoff notes</label>
            <textarea
              className="form-textarea"
              placeholder="Any clinical concerns, pending results, or follow-up actions for the incoming team..."
            />
          </div>
          <div>
            <div className="section-label">Escalation contacts on call tonight</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div className="team-chip">
                <div className="avatar sm green">JP</div>Dr. Patel — Cardiology
              </div>
              <div className="team-chip">
                <div className="avatar sm amber">NC</div>Nurse Chen — Charge
              </div>
              <div className="team-chip">
                <div className="avatar sm teal">PH</div>Pharmacy on-call
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" type="button" onClick={() => dispatch({ type: 'CLOSE_MODALS' })}>
            Cancel
          </button>
          <button className="btn primary" type="button" onClick={() => dispatch({ type: 'SEND_HANDOFF' })}>
            Send Handoff
          </button>
        </div>
      </div>
    </div>
  )
}

