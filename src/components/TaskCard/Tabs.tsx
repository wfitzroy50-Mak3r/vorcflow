import { useVorcflow } from '../../state/VorcflowContext'

export function Tabs() {
  const { state, derived, dispatch } = useVorcflow()

  return (
    <div className="tab-bar">
      <button
        className={`tab ${state.currentTab === 'all' ? 'active' : ''}`}
        type="button"
        onClick={() => dispatch({ type: 'SET_TAB', tab: 'all' })}
      >
        All <span className="tab-count" id="tc-all">{derived.counts.all}</span>
      </button>
      <button
        className={`tab ${state.currentTab === 'urgent' ? 'active' : ''}`}
        type="button"
        onClick={() => dispatch({ type: 'SET_TAB', tab: 'urgent' })}
      >
        Urgent <span className="tab-count" id="tc-urgent">{derived.counts.urgent}</span>
      </button>
      <button
        className={`tab ${state.currentTab === 'mine' ? 'active' : ''}`}
        type="button"
        onClick={() => dispatch({ type: 'SET_TAB', tab: 'mine' })}
      >
        Mine <span className="tab-count" id="tc-mine">{derived.counts.mine}</span>
      </button>
      <button
        className={`tab ${state.currentTab === 'done' ? 'active' : ''}`}
        type="button"
        onClick={() => dispatch({ type: 'SET_TAB', tab: 'done' })}
      >
        Done <span className="tab-count" id="tc-done">{derived.counts.done}</span>
      </button>
    </div>
  )
}

