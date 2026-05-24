import { useVorcflow } from '../../state/VorcflowContext'
import { TaskItem } from './TaskItem'

export function TaskList() {
  const { derived, dispatch } = useVorcflow()

  if (!derived.filteredTasks.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <div>No tasks in this view</div>
        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text3)' }}>
          Try a different filter or add a new task
        </div>
      </div>
    )
  }

  return (
    <>
      {derived.filteredTasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={() => dispatch({ type: 'TOGGLE_TASK', id: t.id })}
          onOpenPatient={() => dispatch({ type: 'OPEN_PATIENT', name: t.patient })}
        />
      ))}
    </>
  )
}

