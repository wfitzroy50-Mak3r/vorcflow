import { useVorcflow } from '../state/VorcflowContext'

export function ToastViewport() {
  const { state } = useVorcflow()

  return (
    <div className="toast-container" id="toasts">
      {state.toasts.map((t) => (
        <div key={t.id} className={`toast${t.type ? ` ${t.type}` : ''}`}>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}

