import type { Task } from '../../types'

export function TaskItem(props: {
  task: Task
  onToggle: () => void
  onOpenPatient: () => void
}) {
  const isOverdue = !props.task.done && props.task.due < '09:00'

  return (
    <div className="task-item" onClick={props.onOpenPatient} role="button" tabIndex={0}>
      <div
        className={`task-check ${props.task.done ? 'done' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          props.onToggle()
        }}
        role="button"
        tabIndex={0}
        title={props.task.done ? 'Mark incomplete' : 'Mark complete'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            props.onToggle()
          }
        }}
      />
      <div className="task-body">
        <div className={`task-title ${props.task.done ? 'done' : ''}`}>
          {props.task.title}
        </div>
        <div className="task-meta">
          <span>{props.task.patient}</span>
          <span className="task-meta-sep">·</span>
          <span>Rm {props.task.room}</span>
          <span className="task-meta-sep">·</span>
          <span>{props.task.assignee}</span>
          {props.task.notes ? (
            <>
              <span className="task-meta-sep">·</span>
              <span title={props.task.notes}>📎 Note</span>
            </>
          ) : null}
        </div>
      </div>
      <div className="task-right">
        <span className={`task-time ${isOverdue ? 'overdue' : ''}`}>
          {isOverdue ? '⚠ ' : ''} {props.task.due}
        </span>
        <span
          className={`priority-badge ${props.task.done ? 'done' : props.task.priority}`}
        >
          {props.task.done
            ? 'Done'
            : props.task.priority.charAt(0).toUpperCase() +
              props.task.priority.slice(1)}
        </span>
      </div>
    </div>
  )
}

