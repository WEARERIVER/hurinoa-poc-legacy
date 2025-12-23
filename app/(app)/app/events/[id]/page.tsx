'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Typography, Card, Alert, Descriptions, Divider, Button, Space, Tag } from 'antd'
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import { PageHeader, PocContextCard } from '@/components'
import {
  CURRENT_URI_ID,
  getEventForUri,
  getKaupapa,
  Event,
} from '@/lib/mockData'
import { neutral } from '@/theme'

const { Title, Paragraph, Text } = Typography

function formatTime(event: Event): string {
  if (!event.startTime) return 'All day'
  if (!event.endTime) return event.startTime
  return `${event.startTime} – ${event.endTime}`
}

export default function UriEventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)

  useEffect(() => {
    const eventId = params.id as string
    const loaded = getEventForUri(eventId, CURRENT_URI_ID)
    setEvent(loaded ?? null)
  }, [params.id])

  if (!event) {
    return (
      <>
        <PageHeader
          title="Event Not Found"
          breadcrumbs={[
            { label: 'Dashboard', href: '/app' },
            { label: 'Events', href: '/app/events' },
            { label: 'Not Found' },
          ]}
        />
        <Card variant="borderless">
          <Alert
            type="error"
            message="Event not found"
            description="This event doesn't exist or you don't have permission to view it."
            showIcon
          />
          <div style={{ marginTop: 16 }}>
            <Link href="/app/events">
              <Button icon={<ArrowLeftOutlined />}>Back to Events</Button>
            </Link>
          </div>
        </Card>
      </>
    )
  }

  const kaupapa = getKaupapa(event.kaupapa)

  return (
    <>
      <PageHeader
        title={event.title}
        description="Read-only event details"
        breadcrumbs={[
          { label: 'Dashboard', href: '/app' },
          { label: 'Events', href: '/app/events' },
          { label: event.title },
        ]}
        actions={
          <Link href="/app/events">
            <Button icon={<EyeOutlined />}>View all events</Button>
          </Link>
        }
      />

      <PocContextCard title="About This Page">
        This page shows the full details of a single event. Uri can view the date, time, location, and description — giving them all the information they need to attend.
        <br /><br />
        <strong>Coming later:</strong> RSVP functionality and calendar export will be added in future releases.
      </PocContextCard>

      <Card variant="borderless">
        <Space wrap size={8} style={{ marginBottom: 16 }}>
          {kaupapa && <Tag>{kaupapa.name}</Tag>}
          <Text type="secondary">{dayjs(event.date).format('dddd, D MMMM YYYY')}</Text>
        </Space>

        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 500, width: 140 }}
          contentStyle={{ color: neutral[700] }}
        >
          <Descriptions.Item label={<><CalendarOutlined style={{ marginRight: 8 }} />Date</>}>
            {dayjs(event.date).format('dddd, D MMMM YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label={<><ClockCircleOutlined style={{ marginRight: 8 }} />Time</>}>
            {formatTime(event)}
          </Descriptions.Item>
          <Descriptions.Item label={<><EnvironmentOutlined style={{ marginRight: 8 }} />Location</>}>
            {event.location || <Text type="secondary">No location provided</Text>}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5} style={{ marginBottom: 8 }}>Description</Title>
        {event.description ? (
          <Paragraph style={{ color: neutral[600] }}>{event.description}</Paragraph>
        ) : (
          <Text type="secondary">No description provided.</Text>
        )}
      </Card>

      <div style={{ marginTop: 16 }}>
        <Link href="/app/events">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Events
          </Button>
        </Link>
      </div>
    </>
  )
}
