export type TaskPriority = 'urgent' | 'high' | 'normal'

export type Task = {
  id: number
  title: string
  patient: string
  room: string
  due: string
  priority: TaskPriority
  done: boolean
  assignee: string
  notes?: string
}

export type PatientStatus = 'stable' | 'watch' | 'critical'

export type Patient = {
  name: string
  room: string
  age: number
  dx: string
  status: PatientStatus
  initials: string
  avatarClass: 'amber' | 'green' | 'red' | 'teal'
  tasks: number
}

export type PatientDetails = {
  dob: string
  mrn: string
  physician: string
  admit: string
  allergies: string
  code: string
  vitals: { bp: string; hr: string; spo2: string; temp: string; rr: string }
  vitalStatus: { bp: string; hr: string; spo2: string; temp: string; rr: string }
  dx: string
  meds: string[]
}

export type TimelineItem = {
  dot: 'blue' | 'green' | 'amber' | 'red'
  action: string
  who: string
  time: string
}

export type TabKey = 'all' | 'urgent' | 'mine' | 'done'

export type ModalKey = 'task' | 'handoff' | null

export type ToastType = '' | 'success' | 'error'

export type Toast = {
  id: number
  message: string
  type: ToastType
}

