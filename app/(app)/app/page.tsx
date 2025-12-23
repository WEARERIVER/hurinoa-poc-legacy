'use client'

import { Typography, Card, Row, Col, Space, Empty, Button, Tag, List } from 'antd'
import { 
  CalendarOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import { PageHeader, PocContextCard } from '@/components'
import { getNavItem } from '@/lib/navigation'
import { getCurrentUri, getUpcomingEventsForCurrentUri, getKaupapa, Event } from '@/lib/mockData'
import { primary, secondary, tertiary, neutral, layout, borderRadius } from '@/theme'

const { Title, Paragraph, Text } = Typography

const navItem = getNavItem('app-dashboard')!

/**
 * Uri Dashboard
 * =============
 * Landing page for uri. Shows overview of their linked kaupapa events.
 * This is a placeholder that will be enhanced when event data is available.
 */
export default function AppDashboardPage() {
  const uri = getCurrentUri()
  const upcoming = getUpcomingEventsForCurrentUri()
  const nextEvent = upcoming[0]
  const preview = upcoming.slice(0, 3)

  const formatTime = (event: Event): string => {
    if (!event.startTime) return 'All day'
    if (!event.endTime) return event.startTime
    return `${event.startTime} – ${event.endTime}`
  }

  return (
    <>
      <PageHeader
        title={`Kia ora, ${uri.firstName}`}
        description="View upcoming events from your communities"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <PocContextCard title="About This Page">
        This is the home screen for Uri when they log in. From here they can see upcoming events from the communities they're connected to, and quickly access the full event list.
        <br /><br />
        <strong>What's included:</strong> Overview of the next event, a quick list of what's coming up, and easy navigation to browse all events.
      </PocContextCard>

      {/* Hero Action Button */}
      <Card 
        variant="borderless"
        style={{ 
          marginBottom: layout.sectionGap, 
          background: `linear-gradient(135deg, ${tertiary[50]} 0%, ${secondary[50]} 100%)`,
          borderRadius: 16
        }}
      >
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Space size={16} align="center">
              <div style={{ 
                width: 56, 
                height: 56, 
                background: '#fff', 
                borderRadius: 12, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                <CalendarOutlined style={{ fontSize: 28, color: tertiary[500] }} />
              </div>
              <div>
                <Title level={4} style={{ marginBottom: 4 }}>Your Events</Title>
                <Text style={{ color: neutral[600], fontSize: 15 }}>See what's happening across your communities</Text>
              </div>
            </Space>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Link href="/app/events">
              <Button type="primary" size="large" icon={<EyeOutlined />}>
                View All Events
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      {/* Next Up */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24} lg={12}>
          <Card variant="borderless" style={{ height: '100%' }}>
            <Title level={4} style={{ marginBottom: 16 }}>Next Up</Title>
            {!nextEvent ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No upcoming events" />
            ) : (
              <Space direction="vertical" size={10} style={{ width: '100%' }}>
                <Space wrap size={8}>
                  <Text strong style={{ fontSize: 16 }}>{nextEvent.title}</Text>
                  {(() => {
                    const kp = getKaupapa(nextEvent.kaupapa)
                    return kp ? <Tag>{kp.name}</Tag> : null
                  })()}
                </Space>
                <Space direction="vertical" size={6}>
                  <Space size={8}>
                    <CalendarOutlined style={{ color: primary[500] }} />
                    <Text>{dayjs(nextEvent.date).format('ddd, D MMM YYYY')}</Text>
                  </Space>
                  <Space size={8}>
                    <ClockCircleOutlined style={{ color: neutral[500] }} />
                    <Text type="secondary">{formatTime(nextEvent)}</Text>
                  </Space>
                  <Space size={8}>
                    <EnvironmentOutlined style={{ color: neutral[500] }} />
                    <Text type="secondary">{nextEvent.location || 'No location provided'}</Text>
                  </Space>
                </Space>
                <Link href={`/app/events/${nextEvent.id}`}>
                  <Button type="primary">Open event</Button>
                </Link>
              </Space>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card variant="borderless" style={{ height: '100%' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title level={4} style={{ marginBottom: 0 }}>Coming Soon</Title>
              <Link href="/app/events">
                <Button type="link">View all</Button>
              </Link>
            </Space>

            {preview.length === 0 ? (
              <div style={{ marginTop: 16 }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No upcoming events" />
              </div>
            ) : (
              <List
                style={{ marginTop: 12 }}
                dataSource={preview}
                renderItem={(event) => {
                  const kp = getKaupapa(event.kaupapa)
                  return (
                    <List.Item
                      actions={[
                        <Link key="open" href={`/app/events/${event.id}`}>
                          <Button type="link" size="small">View</Button>
                        </Link>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space wrap size={8}>
                            <Text strong>{event.title}</Text>
                            {kp && <Tag>{kp.name}</Tag>}
                          </Space>
                        }
                        description={
                          <Text type="secondary">
                            {dayjs(event.date).format('ddd, D MMM')} · {formatTime(event)}
                          </Text>
                        }
                      />
                    </List.Item>
                  )
                }}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Huri Noa v1 Features */}
      <Card 
        variant="borderless"
        style={{ 
          marginTop: layout.sectionGap,
          background: `linear-gradient(135deg, ${primary[50]} 0%, ${secondary[50]} 100%)`,
          borderRadius: 16,
          border: `1px solid ${neutral[200]}`
        }}
      >
        <Title level={4} style={{ marginBottom: 8 }}>Huri Noa v1 — What's Included</Title>
        <Paragraph style={{ color: neutral[600], marginBottom: 24, fontSize: 15 }}>
          This is an early release focused on event visibility for Uri.
        </Paragraph>
        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <Text strong style={{ fontSize: 14, color: secondary[600], display: 'block', marginBottom: 12 }}>What you can do now</Text>
            <Space direction="vertical" size={10}>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />Browse upcoming events from your communities</Text>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />View event details (date, time, location)</Text>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />List and calendar views</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Text strong style={{ fontSize: 14, color: neutral[500], display: 'block', marginBottom: 12 }}>What's coming later</Text>
            <Space direction="vertical" size={10}>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />RSVP to events</Text>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />Notifications and reminders</Text>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />Calendar sync</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  )
}
