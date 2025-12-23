// ============================================================================
// Mock Data Store
// ============================================================================
// In-memory data store for POC. Simulates a database with kaupapa, events, and uri.
// Events from other kaupapa are included to demonstrate clash detection.

export interface Kaupapa {
  id: string
  name: string
  color: string // For visual distinction in calendar
}

export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string       // ISO date string (YYYY-MM-DD)
  startTime?: string // Optional, format: HH:mm
  endTime?: string   // Optional, format: HH:mm
  kaupapa: string    // Kaupapa ID
  createdAt: string
  updatedAt: string
}

export interface Uri {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: 'uri' | 'contributor'
  status: 'active' | 'inactive'
  kaupapa: string[]  // Can be linked to multiple kaupapa
  joinedAt: string
  notes?: string
}

// ----------------------------------------------------------------------------
// Kaupapa (entities/groups)
// ----------------------------------------------------------------------------

export const kaupapa: Kaupapa[] = [
  { id: 'kp-1', name: 'Te Whānau Aroha', color: '#E07B54' },      // Primary orange
  { id: 'kp-2', name: 'Ngā Tamariki Trust', color: '#04B09E' },   // Teal
  { id: 'kp-3', name: 'Mātauranga Collective', color: '#7C3AED' }, // Purple
  { id: 'kp-4', name: 'Hauora Network', color: '#2563EB' },       // Blue
]

// The current contributor's kaupapa (for POC, Aroha manages kp-1)
export const CURRENT_KAUPAPA_ID = 'kp-1'

// The current uri (for POC, used by /app pages)
// Keep this simple for now (no auth): pages read from this constant.
export const CURRENT_URI_ID = 'uri-4'

// ----------------------------------------------------------------------------
// Uri (Users linked to kaupapa)
// ----------------------------------------------------------------------------

let uri: Uri[] = [
  {
    id: 'uri-1',
    firstName: 'Hine',
    lastName: 'Moana',
    email: 'hine.moana@email.com',
    phone: '021 123 4567',
    role: 'contributor',
    status: 'active',
    kaupapa: ['kp-1'],
    joinedAt: '2024-03-15',
    notes: 'Lead contributor for community events',
  },
  {
    id: 'uri-2',
    firstName: 'Tama',
    lastName: 'Raukawa',
    email: 'tama.r@email.com',
    phone: '022 234 5678',
    role: 'uri',
    status: 'active',
    kaupapa: ['kp-1'],
    joinedAt: '2024-06-01',
  },
  {
    id: 'uri-3',
    firstName: 'Mere',
    lastName: 'Tūhoe',
    email: 'mere.tuhoe@email.com',
    role: 'uri',
    status: 'active',
    kaupapa: ['kp-1'],
    joinedAt: '2024-08-20',
  },
  {
    id: 'uri-4',
    firstName: 'Wiremu',
    lastName: 'Ngata',
    email: 'wiremu.n@email.com',
    phone: '027 345 6789',
    role: 'uri',
    status: 'active',
    kaupapa: ['kp-1', 'kp-2'], // Linked to multiple kaupapa
    joinedAt: '2024-04-10',
    notes: 'Also involved with Ngā Tamariki Trust',
  },
  {
    id: 'uri-5',
    firstName: 'Anahera',
    lastName: 'Pōtiki',
    email: 'anahera.p@email.com',
    role: 'uri',
    status: 'inactive',
    kaupapa: ['kp-1'],
    joinedAt: '2023-11-05',
    notes: 'On leave until February',
  },
  {
    id: 'uri-6',
    firstName: 'Rongo',
    lastName: 'Māhaki',
    email: 'rongo.m@email.com',
    phone: '021 456 7890',
    role: 'contributor',
    status: 'active',
    kaupapa: ['kp-1'],
    joinedAt: '2024-01-20',
  },
]

// ----------------------------------------------------------------------------
// Events (seeded with sample data including other kaupapa for clash testing)
// ----------------------------------------------------------------------------

// Helper to generate dates relative to today
const today = new Date()
const formatDate = (date: Date) => date.toISOString().split('T')[0]
const addDays = (days: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + days)
  return formatDate(d)
}

let events: Event[] = [
  // ============================================================================
  // MONTH 1: This month (days -5 to +8)
  // ============================================================================
  
  // Te Whānau Aroha events (kp-1 - our kaupapa)
  {
    id: '1',
    title: 'Whānau Hui',
    description: 'Monthly gathering to discuss upcoming initiatives and share kai.',
    location: 'Community Hall, 123 Main St',
    date: addDays(3),
    startTime: '10:00',
    endTime: '12:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Christmas Day Celebration',
    description: 'Community Christmas lunch and gift exchange for whānau.',
    location: 'Community Hall, 123 Main St',
    date: addDays(2), // Dec 25
    startTime: '11:00',
    endTime: '15:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session for all ages.',
    location: 'School Gymnasium',
    date: addDays(7),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'End of Year Reflection',
    description: 'Looking back at our achievements this year.',
    location: 'Online - Zoom',
    date: addDays(-2),
    startTime: '19:00',
    endTime: '20:30',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Other kaupapa events this month
  {
    id: '5',
    title: 'Tamariki Christmas Party',
    description: 'Fun Christmas activities for the kids.',
    location: 'Local Park',
    date: addDays(2), // Same day as Christmas - potential clash
    startTime: '09:00',
    endTime: '13:00',
    kaupapa: 'kp-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Summer Reading Programme',
    description: 'Holiday reading activities for rangatahi.',
    location: 'Public Library',
    date: addDays(5),
    startTime: '10:00',
    endTime: '12:00',
    kaupapa: 'kp-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // ============================================================================
  // MONTH 2: Next month (days +10 to +40)
  // ============================================================================
  
  // Te Whānau Aroha events (kp-1)
  {
    id: '7',
    title: 'New Year Planning Session',
    description: 'Strategic planning for 2026 initiatives.',
    location: 'Online - Zoom',
    date: addDays(12),
    startTime: '14:00',
    endTime: '16:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session - preparing for Waitangi Day.',
    location: 'School Gymnasium',
    date: addDays(14),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Whānau BBQ',
    description: 'Summer BBQ gathering for all whānau members.',
    location: 'Beachside Reserve',
    date: addDays(20),
    startTime: '12:00',
    endTime: '16:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Volunteer Training',
    description: 'Training session for new event volunteers.',
    location: 'Community Hall, 123 Main St',
    date: addDays(25),
    startTime: '09:00',
    endTime: '12:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session.',
    location: 'School Gymnasium',
    date: addDays(21),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Auckland Anniversary Event',
    description: 'Special community event for Auckland Anniversary.',
    location: 'Auckland Domain',
    date: addDays(34), // Jan 26
    startTime: '10:00',
    endTime: '14:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
    title: 'Kapa Haka Practice',
    description: 'Final practice before Waitangi Day performance.',
    location: 'School Gymnasium',
    date: addDays(28),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Other kaupapa events next month
  {
    id: '14',
    title: 'Tamariki Summer Camp',
    description: 'Week-long summer camp for children.',
    location: 'Camp Grounds',
    date: addDays(15),
    startTime: '09:00',
    endTime: '17:00',
    kaupapa: 'kp-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '15',
    title: 'Wānanga',
    description: 'Educational workshop on te reo Māori.',
    location: 'University Campus',
    date: addDays(20), // Same day as BBQ - potential clash
    startTime: '09:00',
    endTime: '15:00',
    kaupapa: 'kp-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '16',
    title: 'Health & Wellbeing Day',
    description: 'Free community health checks and wellness activities.',
    location: 'Medical Centre',
    date: addDays(22),
    startTime: '08:00',
    endTime: '16:00',
    kaupapa: 'kp-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '17',
    title: 'Youth Sports Day',
    description: 'Sports activities for rangatahi.',
    location: 'Sports Complex',
    date: addDays(34), // Same day as Auckland Anniversary - potential clash
    startTime: '09:00',
    endTime: '15:00',
    kaupapa: 'kp-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // ============================================================================
  // MONTH 3: Month after next (days +42 to +70)
  // ============================================================================
  
  // Te Whānau Aroha events (kp-1)
  {
    id: '18',
    title: 'Waitangi Day Celebration',
    description: 'Community celebration of Waitangi Day with performances and kai.',
    location: 'Waitangi Park',
    date: addDays(45),
    startTime: '09:00',
    endTime: '17:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '19',
    title: 'Monthly Whānau Hui',
    description: 'Regular monthly gathering.',
    location: 'Community Hall, 123 Main St',
    date: addDays(50),
    startTime: '10:00',
    endTime: '12:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '20',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session.',
    location: 'School Gymnasium',
    date: addDays(42),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '21',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session.',
    location: 'School Gymnasium',
    date: addDays(49),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '22',
    title: 'Community Garden Day',
    description: 'Working bee to prepare the community garden.',
    location: 'Community Garden',
    date: addDays(55),
    startTime: '08:00',
    endTime: '12:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '23',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session.',
    location: 'School Gymnasium',
    date: addDays(56),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '24',
    title: 'Strategic Planning Day',
    description: 'Full day workshop for 2026 planning.',
    location: 'Conference Centre',
    date: addDays(62),
    startTime: '09:00',
    endTime: '16:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '25',
    title: 'Kapa Haka Practice',
    description: 'Weekly practice session.',
    location: 'School Gymnasium',
    date: addDays(63),
    startTime: '18:00',
    endTime: '20:00',
    kaupapa: 'kp-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Other kaupapa events month 3
  {
    id: '26',
    title: 'Waitangi Day Festival',
    description: 'Regional Waitangi Day celebrations.',
    location: 'Waitangi Park',
    date: addDays(45), // Same day - potential clash
    startTime: '10:00',
    endTime: '18:00',
    kaupapa: 'kp-3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '27',
    title: 'Hauora Hui',
    description: 'Monthly wellbeing gathering.',
    location: 'Community Centre',
    date: addDays(50), // Same day as Whānau Hui - potential clash
    startTime: '14:00',
    endTime: '16:00',
    kaupapa: 'kp-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '28',
    title: 'Back to School Prep',
    description: 'Helping families prepare for the school year.',
    location: 'Community Hall',
    date: addDays(58),
    startTime: '10:00',
    endTime: '14:00',
    kaupapa: 'kp-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '29',
    title: 'Mental Health Workshop',
    description: 'Workshop on supporting mental wellbeing.',
    location: 'Health Centre',
    date: addDays(65),
    startTime: '13:00',
    endTime: '16:00',
    kaupapa: 'kp-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// ----------------------------------------------------------------------------
// Data Access Functions
// ----------------------------------------------------------------------------

export function getAllKaupapa(): Kaupapa[] {
  return kaupapa
}

export function getKaupapa(id: string): Kaupapa | undefined {
  return kaupapa.find(k => k.id === id)
}

export function getCurrentKaupapa(): Kaupapa {
  return kaupapa.find(k => k.id === CURRENT_KAUPAPA_ID)!
}

export function getOtherKaupapa(): Kaupapa[] {
  return kaupapa.filter(k => k.id !== CURRENT_KAUPAPA_ID)
}

// Events for the current contributor's kaupapa
export function getMyEvents(): Event[] {
  return events
    .filter(e => e.kaupapa === CURRENT_KAUPAPA_ID)
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Events from other kaupapa (for clash visibility)
export function getOtherEvents(filterKaupapa?: string[]): Event[] {
  return events
    .filter(e => e.kaupapa !== CURRENT_KAUPAPA_ID)
    .filter(e => !filterKaupapa || filterKaupapa.length === 0 || filterKaupapa.includes(e.kaupapa))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// All events (for calendar view)
export function getAllEvents(filterKaupapa?: string[]): Event[] {
  return events
    .filter(e => !filterKaupapa || filterKaupapa.length === 0 || filterKaupapa.includes(e.kaupapa) || e.kaupapa === CURRENT_KAUPAPA_ID)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getEvent(id: string): Event | undefined {
  return events.find(e => e.id === id)
}

// Check if an event belongs to the current kaupapa
export function isMyEvent(event: Event): boolean {
  return event.kaupapa === CURRENT_KAUPAPA_ID
}

// Get events on a specific date
export function getEventsOnDate(date: string, filterKaupapa?: string[]): Event[] {
  return getAllEvents(filterKaupapa).filter(e => e.date === date)
}

// Check for clashes (other events on the same date/time)
export function getClashesForEvent(date: string, startTime?: string, endTime?: string, excludeEventId?: string): Event[] {
  return events
    .filter(e => e.kaupapa !== CURRENT_KAUPAPA_ID) // Only other kaupapa
    .filter(e => e.id !== excludeEventId)
    .filter(e => e.date === date)
    .filter(e => {
      // If no times specified, any event on the same day is a potential clash
      if (!startTime || !e.startTime) return true
      
      // Check time overlap
      const eventStart = e.startTime || '00:00'
      const eventEnd = e.endTime || '23:59'
      const newStart = startTime || '00:00'
      const newEnd = endTime || '23:59'
      
      return newStart < eventEnd && newEnd > eventStart
    })
}

// ----------------------------------------------------------------------------
// CRUD Operations
// ----------------------------------------------------------------------------

export function createEvent(data: Omit<Event, 'id' | 'kaupapa' | 'createdAt' | 'updatedAt'>): Event {
  const newEvent: Event = {
    ...data,
    id: String(Date.now()),
    kaupapa: CURRENT_KAUPAPA_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  events.push(newEvent)
  return newEvent
}

export function updateEvent(id: string, data: Partial<Omit<Event, 'id' | 'kaupapa' | 'createdAt'>>): Event | undefined {
  const index = events.findIndex(e => e.id === id)
  if (index === -1) return undefined
  
  // Only allow updating own events
  if (events[index].kaupapa !== CURRENT_KAUPAPA_ID) return undefined
  
  events[index] = {
    ...events[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  return events[index]
}

export function deleteEvent(id: string): boolean {
  const index = events.findIndex(e => e.id === id)
  if (index === -1) return false
  
  // Only allow deleting own events
  if (events[index].kaupapa !== CURRENT_KAUPAPA_ID) return false
  
  events.splice(index, 1)
  return true
}

// ----------------------------------------------------------------------------
// Uri Data Access Functions
// ----------------------------------------------------------------------------

// Get all uri for the current kaupapa
export function getMyUri(): Uri[] {
  return uri
    .filter(u => u.kaupapa.includes(CURRENT_KAUPAPA_ID))
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
}

export function getUri(id: string): Uri | undefined {
  return uri.find(u => u.id === id)
}

export function getCurrentUri(): Uri {
  return getUri(CURRENT_URI_ID)!
}

export function getKaupapaIdsForUri(uriId: string): string[] {
  return getUri(uriId)?.kaupapa ?? []
}

export function getKaupapaForCurrentUri(): Kaupapa[] {
  const ids = getKaupapaIdsForUri(CURRENT_URI_ID)
  return kaupapa.filter(k => ids.includes(k.id))
}

function isEventInPast(event: Event, todayStr: string): boolean {
  if (event.date < todayStr) return true
  if (event.date > todayStr) return false

  // Same day: if we have an end time, treat ended events as past.
  if (!event.endTime) return false
  const nowTime = new Date().toTimeString().slice(0, 5) // HH:mm
  return nowTime >= event.endTime
}

export function isEventVisibleToUri(event: Event, uriId: string): boolean {
  const visibleKaupapaIds = getKaupapaIdsForUri(uriId)
  return visibleKaupapaIds.includes(event.kaupapa)
}

export function getEventsForUri(uriId: string): Event[] {
  const visibleKaupapaIds = getKaupapaIdsForUri(uriId)
  return events
    .filter(e => visibleKaupapaIds.includes(e.kaupapa))
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function getUpcomingEventsForUri(uriId: string): Event[] {
  const todayStr = formatDate(new Date())
  return getEventsForUri(uriId)
    .filter(e => !isEventInPast(e, todayStr))
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date)
      if (dateCompare !== 0) return dateCompare
      return (a.startTime ?? '00:00').localeCompare(b.startTime ?? '00:00')
    })
}

export function getUpcomingEventsForCurrentUri(): Event[] {
  return getUpcomingEventsForUri(CURRENT_URI_ID)
}

export function getEventForUri(eventId: string, uriId: string): Event | undefined {
  const event = getEvent(eventId)
  if (!event) return undefined
  return isEventVisibleToUri(event, uriId) ? event : undefined
}

// Get uri stats for dashboard
export function getUriStats() {
  const myUri = getMyUri()
  return {
    total: myUri.length,
    active: myUri.filter(u => u.status === 'active').length,
    contributors: myUri.filter(u => u.role === 'contributor').length,
    uriCount: myUri.filter(u => u.role === 'uri').length,
  }
}

// ----------------------------------------------------------------------------
// Uri CRUD Operations
// ----------------------------------------------------------------------------

export function createUri(data: Omit<Uri, 'id' | 'joinedAt'>): Uri {
  const newUri: Uri = {
    ...data,
    id: `uri-${Date.now()}`,
    kaupapa: data.kaupapa.length > 0 ? data.kaupapa : [CURRENT_KAUPAPA_ID],
    joinedAt: new Date().toISOString().split('T')[0],
  }
  uri.push(newUri)
  return newUri
}

export function updateUri(id: string, data: Partial<Omit<Uri, 'id' | 'joinedAt'>>): Uri | undefined {
  const index = uri.findIndex(u => u.id === id)
  if (index === -1) return undefined
  
  // Only allow updating uri linked to our kaupapa
  if (!uri[index].kaupapa.includes(CURRENT_KAUPAPA_ID)) return undefined
  
  uri[index] = {
    ...uri[index],
    ...data,
  }
  return uri[index]
}

export function deleteUri(id: string): boolean {
  const index = uri.findIndex(u => u.id === id)
  if (index === -1) return false
  
  // Only allow deleting uri linked to our kaupapa
  if (!uri[index].kaupapa.includes(CURRENT_KAUPAPA_ID)) return false
  
  // If linked to multiple kaupapa, just remove from ours
  if (uri[index].kaupapa.length > 1) {
    uri[index].kaupapa = uri[index].kaupapa.filter(k => k !== CURRENT_KAUPAPA_ID)
    return true
  }
  
  // Otherwise delete entirely
  uri.splice(index, 1)
  return true
}

// ----------------------------------------------------------------------------
// Statistics (for dashboard)
// ----------------------------------------------------------------------------

export function getEventStats() {
  const myEvents = getMyEvents()
  const now = new Date()
  const todayStr = formatDate(now)
  
  // Calculate end of this week (Sunday)
  const endOfWeek = new Date(now)
  endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
  const endOfWeekStr = formatDate(endOfWeek)
  
  const upcoming = myEvents.filter(e => e.date >= todayStr)
  const thisWeek = myEvents.filter(e => e.date >= todayStr && e.date <= endOfWeekStr)
  const past = myEvents.filter(e => e.date < todayStr)
  
  return {
    upcoming: upcoming.length,
    thisWeek: thisWeek.length,
    past: past.length,
  }
}
