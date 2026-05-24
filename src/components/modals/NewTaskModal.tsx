import { useEffect, useState } from 'react'
import { useVorcflow } from '../../state/VorcflowContext'
import type { TaskPriority } from '../../types'

export function NewTaskModal() {
  const { state, dispatch } = useVorcflow()
  const open = state.openModal === 'task'

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('normal')
  const [due, setDue] = useState('14:00')
  const [patientValue, setPatientValue] = useState('Margaret T.|312')
  const [assignee, setAssignee] = useState('Dr. Rivera (me)')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => {
      const el = document.getElementById('new-task-title') as HTMLInputElement | null
      el?.focus()
    }, 50)
    return () => window.clearTimeout(t)
  }, [open])

  function createTask() {
    const trimmed = title.trim()
    if (!trimmed) {
      dispatch({ type: 'PUSH_TOAST', message: 'Please enter a task description', toastType: 'error' })
      return
    }
    const [patientName, room] = patientValue.split('|')
    dispatch({
      type: 'ADD_TASK',
      payload: {
        title: trimmed,
        patient: patientName,
        room: room || '000',
        due: due || '12:00',
        priority,
        assignee,
        notes: notes.trim(),
      },
    })
    setTitle('')
    setNotes('')
  }

  return (
    <div
      className={`modal-overlay ${open ? 'open' : ''}`}
      id="task-modal"
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
            <rect x="2" y="2" width="14" height="14" rx="3" />
            <path d="M6 9l2 2 4-4" />
          </svg>
          <div className="modal-title">New Clinical Task</div>
          <button className="modal-close" type="button" onClick={() => dispatch({ type: 'CLOSE_MODALS' })}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <label className="form-label">Task description *</label>
            <input
              className="form-input"
              type="text"
              id="new-task-title"
              placeholder="e.g. Administer 10mg metoprolol PO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-row-2">
            <div>
              <label className="form-label">Priority *</label>
              <select
                className="form-select"
                id="new-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="urgent">🔴 Urgent</option>
                <option value="high">🟡 High</option>
                <option value="normal">🔵 Normal</option>
              </select>
            </div>
            <div>
              <label className="form-label">Due time *</label>
              <input
                className="form-input"
                type="time"
                id="new-due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Patient</label>
            <select
              className="form-select"
              id="new-patient"
              value={patientValue}
              onChange={(e) => setPatientValue(e.target.value)}
            >
              <option value="Margaret T.|312">Margaret T. — Room 312</option>
              <option value="James K.|408">James K. — Room 408</option>
              <option value="Priya L.|215">Priya L. — Room 215</option>
              <option value="Robert H.|401">Robert H. — Room 401</option>
              <option value="Elena M.|305">Elena M. — Room 305</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Assign to</label>
            <select
              className="form-select"
              id="new-assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <option>Dr. Rivera (me)</option>
              <option>Nurse Chen</option>
              <option>Nurse Okonkwo</option>
              <option>Dr. Patel</option>
              <option>Dr. Nguyen</option>
              <option>Pharmacy</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Clinical notes</label>
            <textarea
              className="form-textarea"
              id="new-notes"
              placeholder="Additional clinical context, precautions, or instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div>
            <div className="section-label">Notify care team members</div>
            <div className="notify-chips">
              <div className="notify-chip selected">
                <div className="chip-dot" style={{ background: 'var(--blue-mid)' }} />
                Dr. Patel
              </div>
              <div className="notify-chip selected">
                <div className="chip-dot" style={{ background: 'var(--green)' }} />
                Nurse Chen
              </div>
              <div className="notify-chip">
                <div className="chip-dot" style={{ background: 'var(--amber)' }} />
                Pharmacy
              </div>
              <div className="notify-chip">
                <div className="chip-dot" style={{ background: 'var(--teal)' }} />
                Charge Nurse
              </div>
              <div className="notify-chip">
                <div className="chip-dot" style={{ background: 'var(--red)' }} />
                Rapid Response
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn" type="button" onClick={() => dispatch({ type: 'CLOSE_MODALS' })}>
            Cancel
          </button>
          <button className="btn primary" type="button" onClick={createTask}>
            Create Task
          </button>
        </div>
      </div>
    </div>
  )
}

