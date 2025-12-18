'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Alert,
  Descriptions,
  Divider,
  App,
  Spin,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Row,
  Col
} from 'antd'
import { 
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
import { neutral } from '@/theme'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

/**
 * Event Detail Page
 * =================
 * View a single event with option to edit via modal.
 * Shows clash warnings if conflicts exist.
 */
export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Load event data
  useEffect(() => {
    const eventId = params.id as string
    const loadedEvent = getEvent(eventId)
    
    if (loadedEvent && isMyEvent(loadedEvent)) {
      setEvent(loadedEvent)
    }
    setLoading(false)
  }, [params.id])

  // Open edit modal with event data
  const openEditModal = () => {
    if (event) {
      form.setFieldsValue({
        title: event.title,
        date: dayjs(event.date),
        startTime: event.startTime ? dayjs(event.startTime, 'HH:mm') : null,
        endTime: event.endTime ? dayjs(event.endTime, 'HH:mm') : null,
        location: event.location,
        description: event.description,
      })
      setEditModalOpen(true)
    }
  }

  // Handle save
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      
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
        setEditModalOpen(false)
      }
    } catch (error) {
      // Validation error
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

  // Get clashes for the form date/time (live validation in modal)
  const formDate = Form.useWatch('date', form)
  const formStartTime = Form.useWatch('startTime', form)
  const formEndTime = Form.useWatch('endTime', form)
  const formClashes = formDate 
    ? getClashesForEvent(
        formDate.format('YYYY-MM-DD'),
        formStartTime?.format('HH:mm'),
        formEndTime?.format('HH:mm'),
        event?.id
      )
    : []

  // Get clashes for current event (view mode)
  const viewClashes = event 
    ? getClashesForEvent(event.date, event.startTime, event.endTime, event.id)
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
        title={event.title}
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Events', href: '/admin/events' },
          { label: event.title },
        ]}
        actions={
          <Space>
            <Button 
              type="primary"
              icon={<EditOutlined />}
              onClick={openEditModal}
              className="hero-button"
            >
              Edit
            </Button>
            <Button 
              danger
              ghost
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Space>
        }
      />

      <PocContextCard title="MVP Context: Event Detail">
        <strong>Why this page exists:</strong> Contributors need to view full event details and make changes. 
        This dedicated view page provides a clean reading experience with quick access to editing.
        <br />
        <strong>What we're demonstrating:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>View full event details in a clean, readable format</li>
          <li>Quick edit via modal (same form as create)</li>
          <li>Clash warnings shown if conflicts exist</li>
          <li>Delete with confirmation modal</li>
        </ul>
        <strong>Design decisions:</strong> We use a modal for editing (same as create) to keep the experience 
        consistent and reduce code duplication. The view page focuses on readability.
      </PocContextCard>

      <Card bordered={false}>
        {/* Clash Warning */}
        {viewClashes.length > 0 && (
          <Alert
            type="warning"
            icon={<WarningOutlined />}
            message="This event has scheduling conflicts"
            description={
              <div>
                <Text>The following communities have events at the same time:</Text>
                <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                  {viewClashes.map(clash => {
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
      </Card>

      {/* Back link */}
      <div style={{ marginTop: 16 }}>
        <Link href="/admin/events">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Events
          </Button>
        </Link>
      </div>

      {/* Edit Event Modal */}
      <Modal
        title="Edit Event"
        open={editModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setEditModalOpen(false)
          form.resetFields()
        }}
        okText="Save Changes"
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
    </>
  )
}
