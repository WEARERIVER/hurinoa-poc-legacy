'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Table, 
  Tag, 
  Tooltip, 
  Segmented,
  Select,
  Row,
  Col,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Alert,
  Empty,
  App
} from 'antd'
import { 
  PlusOutlined, 
  CalendarOutlined, 
  UnorderedListOutlined,
  WarningOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
  TeamOutlined,
  EyeOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import { PageHeader, EventCalendar, CalendarEvent, PocContextCard } from '@/components'
import { 
  getMyEvents, 
  getAllEvents, 
  getOtherKaupapa, 
  getKaupapa, 
  getClashesForEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  isMyEvent,
  CURRENT_KAUPAPA_ID,
  Event
} from '@/lib/mockData'
import { primary, neutral, layout, semantic } from '@/theme'

const { Text } = Typography
const { TextArea } = Input

type ViewMode = 'calendar' | 'list'

/**
 * Events Page
 * ===========
 * Main event management page for contributors.
 * - Calendar view: FullCalendar with day/week/month views
 * - List view: Sortable table with quick actions
 * - Entity filter: Show/hide other kaupapa events
 * - Create modal: Quick event creation (opens from calendar click)
 */
export default function EventsPage() {
  const { message, modal } = App.useApp()
  
  // View state - initialize from hash if present
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [selectedKaupapa, setSelectedKaupapa] = useState<string[]>([])
  
  // Sync view mode with URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'list' || hash === 'calendar') {
      setViewMode(hash)
    }
  }, [])
  
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    window.history.pushState(null, '', `/admin/events#${mode}`)
  }
  
  // Create/Edit modal state
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [form] = Form.useForm()
  
  // Event preview modal state
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  
  // Data - re-fetch on changes
  const [refreshKey, setRefreshKey] = useState(0)
  const myEvents = getMyEvents()
  const allEvents = getAllEvents(selectedKaupapa.length > 0 ? [...selectedKaupapa, CURRENT_KAUPAPA_ID] : undefined)
  const otherKaupapa = getOtherKaupapa()

  // Refresh data after mutations
  const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

  // Convert events to FullCalendar format
  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return allEvents.map(event => {
      const isOwn = isMyEvent(event)
      const clashes = isOwn ? getClashesForEvent(event.date, event.startTime, event.endTime, event.id) : []
      const kaupapa = getKaupapa(event.kaupapa)
      
      let start: Date
      let end: Date | undefined
      let allDay = false

      if (event.startTime) {
        start = dayjs(`${event.date} ${event.startTime}`).toDate()
        end = event.endTime 
          ? dayjs(`${event.date} ${event.endTime}`).toDate()
          : dayjs(`${event.date} ${event.startTime}`).add(1, 'hour').toDate()
      } else {
        start = dayjs(event.date).toDate()
        allDay = true
      }

      return {
        id: event.id,
        title: isOwn ? event.title : kaupapa?.name || 'Event',
        start,
        end,
        allDay,
        isOwn,
        hasClash: clashes.length > 0,
        kaupapa: kaupapa?.name,
        color: isOwn ? primary[500] : neutral[400],
      }
    })
  }, [allEvents, refreshKey])

  // Handle calendar date/time click - open create modal
  const handleDateClick = (date: Date, allDay: boolean) => {
    const d = dayjs(date)
    setEditingEvent(null)
    form.resetFields()
    
    if (allDay) {
      form.setFieldsValue({
        date: d,
        startTime: dayjs().hour(9).minute(0),
        endTime: dayjs().hour(10).minute(0),
      })
    } else {
      const startTime = d
      const endTime = d.add(1, 'hour')
      form.setFieldsValue({
        date: d,
        startTime: startTime,
        endTime: endTime,
      })
    }
    
    setEventModalOpen(true)
  }

  // Open edit modal with event pre-filled
  const openEditModal = (event: Event) => {
    setEditingEvent(event)
    form.setFieldsValue({
      title: event.title,
      date: dayjs(event.date),
      startTime: event.startTime ? dayjs(event.startTime, 'HH:mm') : null,
      endTime: event.endTime ? dayjs(event.endTime, 'HH:mm') : null,
      location: event.location,
      description: event.description,
    })
    setEventModalOpen(true)
  }

  // Open create modal with defaults
  const openCreateModal = () => {
    setEditingEvent(null)
    form.resetFields()
    form.setFieldsValue({
      date: dayjs(),
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(10).minute(0),
    })
    setEventModalOpen(true)
  }

  // Handle event click - show preview modal
  const handleEventClick = (eventId: string) => {
    const event = allEvents.find(e => e.id === eventId)
    if (event) {
      setPreviewEvent(event)
      setPreviewModalOpen(true)
    }
  }

  // Get kaupapa for preview event
  const previewKaupapa = previewEvent ? getKaupapa(previewEvent.kaupapa) : null
  const isPreviewOwn = previewEvent ? isMyEvent(previewEvent) : false
  const previewClashes = previewEvent && isPreviewOwn
    ? getClashesForEvent(previewEvent.date, previewEvent.startTime, previewEvent.endTime, previewEvent.id)
    : []

  // Handle create event
  const handleSaveEvent = async () => {
    try {
      const values = await form.validateFields()
      
      const eventData = {
        title: values.title,
        description: values.description || '',
        location: values.location || '',
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime?.format('HH:mm'),
        endTime: values.endTime?.format('HH:mm'),
      }

      if (editingEvent) {
        updateEvent(editingEvent.id, eventData)
        message.success('Event updated successfully')
      } else {
        createEvent(eventData)
        message.success('Event created successfully')
      }
      
      setEventModalOpen(false)
      setEditingEvent(null)
      form.resetFields()
      refresh()
    } catch (error) {
      // Validation error - form will show messages
    }
  }

  // Handle delete event
  const handleDeleteEvent = (event: Event) => {
    modal.confirm({
      title: 'Delete Event',
      content: `Are you sure you want to delete "${event.title}"? This cannot be undone.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        deleteEvent(event.id)
        message.success('Event deleted')
        refresh()
      },
    })
  }

  // Get clashes for the form date/time (live validation)
  const formDate = Form.useWatch('date', form)
  const formStartTime = Form.useWatch('startTime', form)
  const formEndTime = Form.useWatch('endTime', form)
  const formClashes = formDate 
    ? getClashesForEvent(
        formDate.format('YYYY-MM-DD'),
        formStartTime?.format('HH:mm'),
        formEndTime?.format('HH:mm'),
        editingEvent?.id // Exclude current event when editing
      )
    : []

  // Table columns for list view
  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Event) => (
        <Link href={`/admin/events/${record.id}`} style={{ fontWeight: 500, color: primary[500] }}>
          {title}
        </Link>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: Event, b: Event) => a.date.localeCompare(b.date),
      render: (date: string) => dayjs(date).format('ddd, D MMM YYYY'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (_: unknown, record: Event) => 
        record.startTime 
          ? `${record.startTime}${record.endTime ? ` - ${record.endTime}` : ''}`
          : <Text type="secondary">All day</Text>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => location || <Text type="secondary">—</Text>,
    },
    {
      title: 'Clashes',
      key: 'clashes',
      render: (_: unknown, record: Event) => {
        const clashes = getClashesForEvent(record.date, record.startTime, record.endTime, record.id)
        if (clashes.length === 0) return <Tag color="green">Clear</Tag>
        return (
          <Tooltip
            title={
              <div>
                {clashes.map(c => {
                  const kp = getKaupapa(c.kaupapa)
                  return <div key={c.id}>• {kp?.name}</div>
                })}
              </div>
            }
          >
            <Tag color="orange" icon={<WarningOutlined />}>
              {clashes.length} clash{clashes.length > 1 ? 'es' : ''}
            </Tag>
          </Tooltip>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_: unknown, record: Event) => (
        <Space>
          <Tooltip title="View">
            <Link href={`/admin/events/${record.id}`}>
              <Button 
                type="text" 
                size="small" 
                icon={<EyeOutlined />}
              />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              size="small" 
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEvent(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Events"
        description="Create and manage events for your kaupapa"
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Events' }]}
        actions={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Create Event
          </Button>
        }
      />

      <PocContextCard title="MVP Context: Event Management">
        <strong>Why this page exists:</strong> This is the <em>core of the MVP</em>. The second stakeholder hui 
        revealed that contributors' main pain point is <strong>avoiding scheduling clashes</strong> when creating events. 
        This page directly addresses that insight with soft clash detection.
        <br />
        <strong>What we're demonstrating:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>Create events with title, date/time, location, description (modal)</li>
          <li>Clash warnings shown during creation (yellow alert with community names)</li>
          <li>View events chronologically (list view with sorting)</li>
          <li>Community filter: Toggle visibility of other communities to see potential overlaps</li>
        </ul>
        <strong>Design decisions:</strong> We offer both calendar and list views to suit different workflows. 
        The calendar lets contributors click a date to create, while the list is better for bulk review. 
        Clash detection is "soft" — it warns but doesn't block, respecting contributor autonomy. 
        The preview modal for other community events only shows date/time (not location) to protect privacy.
        <br />
        <strong>What's NOT here:</strong> RSVP, recurring events, .ics export (deferred for privacy), notifications — all explicitly out of scope per brief.
      </PocContextCard>

      {/* View Controls */}
      <Card bordered={false} style={{ marginBottom: layout.cardGap }}>
        <Row gutter={16} align="middle" justify="space-between">
          <Col>
            <Segmented
              value={viewMode}
              onChange={(value) => handleViewModeChange(value as ViewMode)}
              options={[
                { label: 'Calendar', value: 'calendar', icon: <CalendarOutlined /> },
                { label: 'List', value: 'list', icon: <UnorderedListOutlined /> },
              ]}
            />
          </Col>
          <Col>
            <Space>
              <FilterOutlined style={{ color: neutral[500] }} />
              <Select
                mode="multiple"
                placeholder="Show all communities"
                style={{ minWidth: 250 }}
                value={selectedKaupapa}
                onChange={setSelectedKaupapa}
                allowClear
                maxTagCount={2}
                options={otherKaupapa.map(k => ({
                  label: k.name,
                  value: k.id,
                }))}
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card bordered={false}>
          <EventCalendar
            events={calendarEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            height={650}
          />
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card bordered={false}>
          {myEvents.length === 0 ? (
            <Empty 
              description="No events yet"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={openCreateModal}>
                Create your first event
              </Button>
            </Empty>
          ) : (
            <Table
              dataSource={myEvents}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          )}
        </Card>
      )}

      {/* Create/Edit Event Modal */}
      <Modal
        title={editingEvent ? 'Edit Event' : 'Create Event'}
        open={eventModalOpen}
        onOk={handleSaveEvent}
        onCancel={() => {
          setEventModalOpen(false)
          setEditingEvent(null)
          form.resetFields()
        }}
        okText={editingEvent ? 'Save Changes' : 'Create Event'}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please enter an event title' }]}
          >
            <Input placeholder="e.g., Whānau Hui" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="startTime"
                label="Start Time"
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={15} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="endTime"
                label="End Time"
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" minuteStep={15} />
              </Form.Item>
            </Col>
          </Row>

          {/* Clash Warning */}
          {formClashes.length > 0 && (
            <Alert
              type="warning"
              icon={<WarningOutlined />}
              message="Potential scheduling clash"
              description={
                <div>
                  <Text>The following kaupapa have events at this time:</Text>
                  <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                    {formClashes.map(clash => {
                      const kp = getKaupapa(clash.kaupapa)
                      return (
                        <li key={clash.id}>
                          <strong>{kp?.name}</strong>
                          {clash.startTime && ` (${clash.startTime}${clash.endTime ? ` - ${clash.endTime}` : ''})`}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              }
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form.Item
            name="location"
            label="Location"
          >
            <Input placeholder="e.g., Community Hall, 123 Main St" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea 
              rows={3} 
              placeholder="What is this event about?"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Event Preview Modal */}
      <Modal
        title={
          <Space>
            {isPreviewOwn ? (
              <CalendarOutlined style={{ color: primary[500] }} />
            ) : (
              <TeamOutlined style={{ color: neutral[500] }} />
            )}
            <span>{isPreviewOwn ? previewEvent?.title : previewKaupapa?.name}</span>
          </Space>
        }
        open={previewModalOpen}
        onCancel={() => {
          setPreviewModalOpen(false)
          setPreviewEvent(null)
        }}
        footer={
          isPreviewOwn ? (
            <Space>
              <Button onClick={() => setPreviewModalOpen(false)}>
                Close
              </Button>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setPreviewModalOpen(false)
                  if (previewEvent) {
                    openEditModal(previewEvent)
                  }
                }}
              >
                Edit
              </Button>
              <Link href={`/admin/events/${previewEvent?.id}`}>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                >
                  View Event
                </Button>
              </Link>
            </Space>
          ) : (
            <Space>
              <Button onClick={() => setPreviewModalOpen(false)}>
                Close
              </Button>
              <Tooltip title="Coming soon: Coordinate with other kaupapa">
                <Button
                  icon={<MailOutlined />}
                  disabled
                >
                  Send Email
                </Button>
              </Tooltip>
            </Space>
          )
        }
        width={480}
      >
        {previewEvent && (
          <div style={{ padding: '8px 0' }}>
            {/* Date & Time */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <CalendarOutlined style={{ color: neutral[500], marginTop: 3 }} />
              <div>
                <Text strong>{dayjs(previewEvent.date).format('dddd, D MMMM YYYY')}</Text>
                {previewEvent.startTime && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <ClockCircleOutlined style={{ color: neutral[400], fontSize: 12 }} />
                    <Text type="secondary">
                      {previewEvent.startTime}
                      {previewEvent.endTime && ` – ${previewEvent.endTime}`}
                    </Text>
                  </div>
                )}
              </div>
            </div>

            {/* Location (only for own events - privacy) */}
            {isPreviewOwn && previewEvent.location && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <EnvironmentOutlined style={{ color: neutral[500], marginTop: 3 }} />
                <Text>{previewEvent.location}</Text>
              </div>
            )}

            {/* For own events: show description and clash warning */}
            {isPreviewOwn && (
              <>
                {previewEvent.description && (
                  <div style={{ 
                    background: neutral[50], 
                    padding: 12, 
                    borderRadius: 6,
                    marginBottom: 16 
                  }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {previewEvent.description}
                    </Text>
                  </div>
                )}

                {previewClashes.length > 0 && (
                  <Alert
                    type="warning"
                    icon={<WarningOutlined />}
                    message={`${previewClashes.length} scheduling clash${previewClashes.length > 1 ? 'es' : ''}`}
                    description={
                      <div style={{ fontSize: 13 }}>
                        {previewClashes.map(clash => {
                          const kp = getKaupapa(clash.kaupapa)
                          return (
                            <div key={clash.id}>
                              • {kp?.name}
                              {clash.startTime && ` (${clash.startTime}${clash.endTime ? ` – ${clash.endTime}` : ''})`}
                            </div>
                          )
                        })}
                      </div>
                    }
                    showIcon
                  />
                )}
              </>
            )}

            {/* For other kaupapa events: show kaupapa info */}
            {!isPreviewOwn && (
              <div style={{ 
                background: neutral[50], 
                padding: 16, 
                borderRadius: 6,
                border: `1px solid ${neutral[200]}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <TeamOutlined style={{ color: neutral[500] }} />
                  <Text strong>{previewKaupapa?.name}</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  This event is from another kaupapa. Contact them to coordinate scheduling.
                </Text>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}
