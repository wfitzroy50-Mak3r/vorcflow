import { useEffect, useMemo, useReducer } from 'react'
import type { ModalKey, TabKey, Task, TaskPriority, TimelineItem, Toast } from '../types'
import { seedPatientDetails, seedPatients, seedTasks, seedTimeline } from '../data/seed'

type State = {
  navTitle: string
  wardLabel: string
  search: string
  currentTab: TabKey
  tasks: Task[]
  patients: typeof seedPatients
  patientDetails: typeof seedPatientDetails
  timeline: TimelineItem[]
  activePatientName: string | null
  openModal: ModalKey
  toasts: Toast[]
}

type Action =
  | { type: 'SET_NAV'; title: string }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'SET_TAB'; tab: TabKey }
  | { type: 'TOGGLE_TASK'; id: number }
  | { type: 'OPEN_PATIENT'; name: string }
  | { type: 'CLOSE_PATIENT' }
  | { type: 'OPEN_MODAL'; modal: Exclude<ModalKey, null> }
  | { type: 'CLOSE_MODALS' }
  | {
      type: 'ADD_TASK'
      payload: {
        title: string
        patient: string
        room: string
        due: string
        priority: TaskPriority
        assignee: string
        notes?: string
      }
    }
  | { type: 'SEND_HANDOFF' }
  | { type: 'PUSH_TOAST'; message: string; toastType: Toast['type'] }
  | { type: 'DISMISS_TOAST'; id: number }

const initialState: State = {
  navTitle: 'Dashboard',
  wardLabel: 'Cardiology Ward 4',
  search: '',
  currentTab: 'all',
  tasks: seedTasks,
  patients: seedPatients,
  patientDetails: seedPatientDetails,
  timeline: seedTimeline,
  activePatientName: null,
  openModal: null,
  toasts: [],
}

function nowHHMM() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_NAV':
      return { ...state, navTitle: action.title }
    case 'SET_SEARCH':
      return { ...state, search: action.query }
    case 'SET_TAB':
      return { ...state, currentTab: action.tab }
    case 'OPEN_PATIENT':
      return { ...state, activePatientName: action.name }
    case 'CLOSE_PATIENT':
      return { ...state, activePatientName: null }
    case 'OPEN_MODAL':
      return { ...state, openModal: action.modal }
    case 'CLOSE_MODALS':
      return { ...state, openModal: null }
    case 'TOGGLE_TASK': {
      const nextTasks = state.tasks.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t,
      )
      const toggled = nextTasks.find((t) => t.id === action.id)
      if (!toggled) return state
      const done = toggled.done
      const title = toggled.title
      const nextTimeline: TimelineItem[] = [
        {
          dot: done ? 'green' : 'amber',
          action: done ? 'Task completed' : 'Task reopened',
          who: `Dr. Rivera · ${title.substring(0, 35)}${title.length > 35 ? '...' : ''}`,
          time: nowHHMM(),
        },
        ...state.timeline,
      ]
      const toast: Toast = {
        id: Date.now(),
        message: done ? 'Task marked complete' : 'Task reopened',
        type: done ? 'success' : '',
      }
      return { ...state, tasks: nextTasks, timeline: nextTimeline, toasts: [...state.toasts, toast] }
    }
    case 'ADD_TASK': {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload.title,
        patient: action.payload.patient,
        room: action.payload.room,
        due: action.payload.due,
        priority: action.payload.priority,
        done: false,
        assignee: action.payload.assignee,
        notes: action.payload.notes,
      }
      const toast: Toast = { id: Date.now() + 1, message: 'Task created successfully', type: 'success' }
      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        openModal: null,
        toasts: [...state.toasts, toast],
      }
    }
    case 'SEND_HANDOFF': {
      const nextTimeline: TimelineItem[] = [
        {
          dot: 'blue',
          action: 'Handoff sent',
          who: 'Dr. Rivera → Dr. Nguyen (Night shift)',
          time: nowHHMM(),
        },
        ...state.timeline,
      ]
      const toast: Toast = { id: Date.now(), message: 'Handoff sent to Dr. Nguyen', type: 'success' }
      return { ...state, openModal: null, timeline: nextTimeline, toasts: [...state.toasts, toast] }
    }
    case 'PUSH_TOAST': {
      const toast: Toast = { id: Date.now(), message: action.message, type: action.toastType }
      return { ...state, toasts: [...state.toasts, toast] }
    }
    case 'DISMISS_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) }
    default:
      return state
  }
}

export function useVorcflowState() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const derived = useMemo(() => {
    const doneCount = state.tasks.filter((t) => t.done).length
    const pct = Math.round((doneCount / state.tasks.length) * 100)
    const counts = {
      all: state.tasks.length,
      urgent: state.tasks.filter((t) => t.priority === 'urgent' && !t.done).length,
      mine: state.tasks.filter((t) => t.assignee === 'Dr. Rivera').length,
      done: doneCount,
    }

    const q = state.search.trim().toLowerCase()
    const searchFiltered = q
      ? state.tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(q) || t.patient.toLowerCase().includes(q),
        )
      : state.tasks

    const filteredTasks = searchFiltered.filter((t) => {
      if (state.currentTab === 'urgent') return t.priority === 'urgent' && !t.done
      if (state.currentTab === 'mine') return t.assignee === 'Dr. Rivera'
      if (state.currentTab === 'done') return t.done
      return true
    })

    return { doneCount, pct: Number.isFinite(pct) ? pct : 0, counts, filteredTasks }
  }, [state.currentTab, state.search, state.tasks])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch({ type: 'CLOSE_MODALS' })
        dispatch({ type: 'CLOSE_PATIENT' })
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!state.toasts.length) return
    const latest = state.toasts[state.toasts.length - 1]
    const t = window.setTimeout(() => dispatch({ type: 'DISMISS_TOAST', id: latest.id }), 3200)
    return () => window.clearTimeout(t)
  }, [state.toasts])

  return { state, derived, dispatch }
}

