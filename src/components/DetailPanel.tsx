import { useVorcflow } from '../state/VorcflowContext'

export function DetailPanel() {
  const { state, dispatch } = useVorcflow()
  const name = state.activePatientName
  const p = name ? state.patients.find((x) => x.name === name) : undefined
  const d = name ? state.patientDetails[name] : undefined

  return (
    <div className={`detail-panel ${name ? 'open' : ''}`} id="detail-panel">
      {p && d ? (
        <>
          <div className="dp-header" id="dp-header">
            <div
              className={`dp-avatar ${p.avatarClass}`}
              style={{
                background: `var(--${p.avatarClass}-light)`,
                color: `var(--${p.avatarClass})`,
              }}
            >
              {p.initials}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                {p.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
                {p.age}y · {p.dx}
              </div>
              <span
                className={`status-pill ${p.status}`}
                style={{ marginTop: 4, display: 'inline-block' }}
              >
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </span>
            </div>
            <button
              className="dp-close"
              type="button"
              onClick={() => dispatch({ type: 'CLOSE_PATIENT' })}
            >
              &times;
            </button>
          </div>

          <div id="dp-body">
            <div className="dp-section">
              <div className="section-label" style={{ marginBottom: 10 }}>
                Demographics & Admission
              </div>
              <div className="dp-grid">
                <div>
                  <div className="dp-field-label">MRN</div>
                  <div
                    className="dp-field-value"
                    style={{ fontFamily: 'DM Mono, monospace', fontSize: 12 }}
                  >
                    {d.mrn}
                  </div>
                </div>
                <div>
                  <div className="dp-field-label">Admitted</div>
                  <div className="dp-field-value">{d.admit}</div>
                </div>
                <div>
                  <div className="dp-field-label">Physician</div>
                  <div className="dp-field-value">{d.physician}</div>
                </div>
                <div>
                  <div className="dp-field-label">Code Status</div>
                  <div className="dp-field-value">{d.code}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div className="dp-field-label">Allergies</div>
                  <div className="dp-field-value" style={{ color: 'var(--red)' }}>
                    {d.allergies}
                  </div>
                </div>
              </div>
            </div>

            <div className="dp-section">
              <div className="section-label" style={{ marginBottom: 10 }}>
                Current Vitals
              </div>
              <div className="vitals-row">
                <div className="vital-card">
                  <div className="vital-value">{d.vitals.bp}</div>
                  <div className="vital-label">Blood Pressure</div>
                  <div className={`vital-status ${d.vitalStatus.bp}`}>{d.vitalStatus.bp}</div>
                </div>
                <div className="vital-card">
                  <div className="vital-value">{d.vitals.hr}</div>
                  <div className="vital-label">Heart Rate</div>
                  <div className={`vital-status ${d.vitalStatus.hr}`}>{d.vitalStatus.hr}</div>
                </div>
                <div className="vital-card">
                  <div className="vital-value">{d.vitals.spo2}</div>
                  <div className="vital-label">SpO₂</div>
                  <div className={`vital-status ${d.vitalStatus.spo2}`}>
                    {d.vitalStatus.spo2 === 'normal' ? 'normal' : 'LOW'}
                  </div>
                </div>
                <div className="vital-card">
                  <div className="vital-value">{d.vitals.temp}</div>
                  <div className="vital-label">Temperature</div>
                  <div className={`vital-status ${d.vitalStatus.temp}`}>{d.vitalStatus.temp}</div>
                </div>
                <div className="vital-card">
                  <div className="vital-value">{d.vitals.rr}</div>
                  <div className="vital-label">Resp. Rate</div>
                  <div className={`vital-status ${d.vitalStatus.rr}`}>{d.vitalStatus.rr}</div>
                </div>
              </div>
            </div>

            <div className="dp-section">
              <div className="section-label" style={{ marginBottom: 6 }}>
                Clinical Summary
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6 }}>
                {d.dx}
              </div>
            </div>

            <div className="dp-section">
              <div className="section-label" style={{ marginBottom: 8 }}>
                Active Medications
              </div>
              {d.meds.map((m) => (
                <div
                  key={m}
                  style={{
                    fontSize: 12,
                    color: 'var(--text)',
                    padding: '4px 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--blue-mid)',
                      flexShrink: 0,
                      display: 'inline-block',
                    }}
                  />
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '16px 20px' }}>
            <button
              className="btn primary"
              style={{ width: '100%' }}
              type="button"
              onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'task' })}
            >
              + Add Task for Patient
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="dp-header" id="dp-header">
            <div style={{ fontSize: 14, color: 'var(--text2)' }}>Select a patient</div>
            <button className="dp-close" type="button" onClick={() => dispatch({ type: 'CLOSE_PATIENT' })}>
              &times;
            </button>
          </div>
        </>
      )}
    </div>
  )
}

