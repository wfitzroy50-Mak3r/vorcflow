import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { MetricsRow } from './components/MetricsRow'
import { TaskCard } from './components/TaskCard/TaskCard'
import { PatientCensus } from './components/PatientCensus'
import { TimelineCard } from './components/TimelineCard'
import { DetailPanel } from './components/DetailPanel'
import { NewTaskModal } from './components/modals/NewTaskModal'
import { HandoffModal } from './components/modals/HandoffModal'
import { ToastViewport } from './components/ToastViewport'
import { VorcflowProvider } from './state/VorcflowContext'
import { useState } from 'react'

function App() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <VorcflowProvider>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          {showAlert ? (
            <div className="alert-bar" id="alert-bar">
              <svg viewBox="0 0 16 16">
                <path d="M8 1L1 14h14L8 1zm0 5v4m0 2h.01" />
              </svg>
              <span>
                <strong>2 overdue tasks</strong> require immediate attention — Room
                312 medication administration and Room 408 discharge planning.
              </span>
              <button className="btn-close" type="button" onClick={() => setShowAlert(false)}>
                &times;
              </button>
            </div>
          ) : null}

          <MetricsRow />

          <div className="main-grid" style={{ minHeight: 0, flex: 1 }}>
            <TaskCard />
            <div className="right-col">
              <PatientCensus />
              <TimelineCard />
            </div>
          </div>
        </div>
      </div>

      <DetailPanel />
      <NewTaskModal />
      <HandoffModal />
      <ToastViewport />

      <div className="copyright-bar">
        <span>
          © 2026 Fitzroywalters · VorcFlow Clinical Workflow Platform · All
          rights reserved.
        </span>
        <span>
          Proprietary &amp; Confidential · Unauthorised use strictly prohibited.
        </span>
      </div>
    </VorcflowProvider>
  )
}

export default App
