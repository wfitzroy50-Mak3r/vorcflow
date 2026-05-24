import { Tabs } from './Tabs'
import { TaskList } from './TaskList'
import { useVorcflow } from '../../state/VorcflowContext'

export function TaskCard() {
  const { derived, dispatch } = useVorcflow()

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Clinical Tasks</div>
        <div className="card-count" id="task-count-badge">
          {derived.counts.all} total
        </div>
        <button
          className="card-action"
          type="button"
          onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'task' })}
        >
          <svg
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
          Add
        </button>
      </div>
      <Tabs />
      <div className="card-body">
        <div id="task-list">
          <TaskList />
        </div>
      </div>
    </div>
  )
}

