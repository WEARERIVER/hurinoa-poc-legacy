'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Form, 
  Input, 
  DatePicker, 
  TimePicker,
  Row,
  Col,
  Alert,
  Descriptions,
  Divider,
  App,
  Spin
} from 'antd'
import { 
  SaveOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  WarningOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  EditOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import { PageHeader, PocContextCard } from '@/components'
import { 
  getEvent, 
  updateEvent, 
  deleteEvent, 
  getClashesForEvent,
  getKaupapa,
  isMyEvent,
  Event 
} from '@/lib/mockData'
import { primary, secondary, neutral, semantic, layout, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

/**
 * Event Detail/Edit Page
 * ======================
 * View and edit a single event.
 * Shows clash warnings when editing.
 */
export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load event data
  useEffect(() => {
    const eventId = params.id as string
    const loadedEvent = getEvent(eventId)
    
    if (loadedEvent && isMyEvent(loadedEvent)) {
      setEvent(loadedEvent)
      // Pre-populate form
      form.setFieldsValue({
        title: loadedEvent.title,
        date: dayjs(loadedEvent.date),
        startTime: loadedEvent.startTime ? dayjs(loadedEvent.startTime, 'HH:mm') : null,
        endTime: loadedEvent.endTime ? dayjs(loadedEvent.endTime, 'HH:mm') : null,
        location: loadedEvent.location,
        description: loadedEvent.description,
      })
    }
    setLoading(false)
  }, [params.id, form])

  // Handle save
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      setSaving(true)
      
      const updated = updateEvent(event!.id, {
        title: values.title,
        description: values.description || '',
        location: values.location || '',
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime?.format('HH:mm'),
        endTime: values.endTime?.format('HH:mm'),
      })
      
      if (updated) {
        setEvent(updated)
        message.success('Event updated successfully')
        setEditing(false)
      }
    } catch (error) {
      // Validation error
    } finally {
      setSaving(false)
    }
  }

  // Handle delete
  const handleDelete = () => {
    modal.confirm({
      title: 'Delete Event',
      content: `Are you sure you want to delete "${event?.title}"? This cannot be undone.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => {
        deleteEvent(event!.id)
        message.success('Event deleted')
        router.push('/admin/events')
      },
    })
  }

  // Cancel editing
  const handleCancel = () => {
    // Reset form to original values
    form.setFieldsValue({
      title: event!.title,
      date: dayjs(event!.date),
      startTime: event!.startTime ? dayjs(event!.startTime, 'HH:mm') : null,
      endTime: event!.endTime ? dayjs(event!.endTime, 'HH:mm') : null,
      location: event!.location,
      description: event!.description,
    })
    setEditing(false)
  }

  // Get clashes for the form date/time
  const formDate = Form.useWatch('date', form)
  const formStartTime = Form.useWatch('startTime', form)
  const formEndTime = Form.useWatch('endTime', form)
  const clashes = formDate 
    ? getClashesForEvent(
        formDate.format('YYYY-MM-DD'),
        formStartTime?.format('HH:mm'),
        formEndTime?.format('HH:mm'),
        event?.id
      )
    : []

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!event) {
    return (
      <>
        <PageHeader
          title="Event Not Found"
          breadcrumbs={[
            { label: 'Dashboard', href: '/admin' },
            { label: 'Events', href: '/admin/events' },
            { label: 'Not Found' },
          ]}
        />
        <Card bordered={false}>
          <Alert
            type="error"
            message="Event not found"
            description="This event doesn't exist or you don't have permission to view it."
            showIcon
          />
          <div style={{ marginTop: 16 }}>
            <Link href="/admin/events">
              <Button icon={<ArrowLeftOutlined />}>Back to Events</Button>
            </Link>
          </div>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={editing ? 'Edit Event' : event.title}
        description={editing ? 'Update event details' : undefined}
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Events', href: '/admin/events' },
          { label: event.title },
        ]}
        actions={
          editing ? (
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleSave}
                loading={saving}
              >
                Save Changes
              </Button>
            </Space>
          ) : (
            <Space>
              <Button 
                icon={<EditOutlined />}
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
              <Button 
                danger 
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Space>
          )
        }
      />

      <PocContextCard title="POC Context: Event Detail & Editing">
        <strong>Why this page exists:</strong> The brief requires contributors to be able to edit or delete 
        their events. This dedicated detail page provides a focused editing experience with full context.
        <br />
        <strong>What we're demonstrating:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>View full event details in a clean, readable format</li>
          <li>Edit mode with inline form (toggle between view/edit)</li>
          <li>Live clash re-checking when dates/times are changed</li>
          <li>Delete with confirmation modal</li>
        </ul>
        <strong>Design decisions:</strong> We chose a view/edit toggle rather than always-editable fields. This provides 
        a clear reading mode and prevents accidental changes. The clash warning re-checks on every date/time change, 
        ensuring contributors are always aware of potential overlaps — even when editing existing events.
        <br />
        <strong>Scope note:</strong> Per the brief, there's no version history or recovery — deletes are permanent. 
        This matches the MVP's "no extra UX" principle.
      </PocContextCard>

      <Card bordered={false}>
        {editing ? (
          // Edit Mode
          <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
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
            {clashes.length > 0 && (
              <Alert
                type="warning"
                icon={<WarningOutlined />}
                message="Potential scheduling clash"
                description={
                  <div>
                    <Text>The following kaupapa have events at this time:</Text>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      {clashes.map(clash => {
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
                rows={4} 
                placeholder="What is this event about?"
              />
            </Form.Item>
          </Form>
        ) : (
          // View Mode
          <>
            {/* Clash Warning in view mode */}
            {clashes.length > 0 && (
              <Alert
                type="warning"
                icon={<WarningOutlined />}
                message="This event has scheduling conflicts"
                description={
                  <div>
                    <Text>The following kaupapa have events at the same time:</Text>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      {clashes.map(clash => {
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
                style={{ marginBottom: 24 }}
              />
            )}

            <Descriptions 
              column={1} 
              labelStyle={{ fontWeight: 500, width: 120 }}
              contentStyle={{ color: neutral[700] }}
            >
              <Descriptions.Item 
                label={<><CalendarOutlined style={{ marginRight: 8 }} />Date</>}
              >
                {dayjs(event.date).format('dddd, D MMMM YYYY')}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<><ClockCircleOutlined style={{ marginRight: 8 }} />Time</>}
              >
                {event.startTime 
                  ? `${event.startTime}${event.endTime ? ` – ${event.endTime}` : ''}`
                  : 'All day'
                }
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<><EnvironmentOutlined style={{ marginRight: 8 }} />Location</>}
              >
                {event.location || <Text type="secondary">No location specified</Text>}
              </Descriptions.Item>
            </Descriptions>

            {event.description && (
              <>
                <Divider />
                <Title level={5}>Description</Title>
                <Paragraph style={{ color: neutral[600] }}>
                  {event.description}
                </Paragraph>
              </>
            )}

            <Divider />
            
            <Text type="secondary" style={{ fontSize: 12 }}>
              Created {dayjs(event.createdAt).format('D MMM YYYY [at] HH:mm')}
              {event.updatedAt !== event.createdAt && (
                <> · Updated {dayjs(event.updatedAt).format('D MMM YYYY [at] HH:mm')}</>
              )}
            </Text>
          </>
        )}
      </Card>

      {/* Back link */}
      <div style={{ marginTop: 16 }}>
        <Link href="/admin/events">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Events
          </Button>
        </Link>
      </div>
    </>
  )
}
