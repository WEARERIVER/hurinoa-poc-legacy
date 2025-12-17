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
        description="View upcoming events from your kaupapa"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <PocContextCard title="POC Context: Uri Dashboard">
        <strong>Why this page exists:</strong> Uri are primarily recipients — they need clear, low-effort visibility of what’s coming up across their linked kaupapa.
        <br />
        <strong>What we’re demonstrating:</strong> A simple overview (next event + short list) that links into the full Events page.
        <br />
        <strong>Scope note:</strong> No RSVPs, notifications, or calendar sync in this phase.
      </PocContextCard>

      {/* What's in this POC panel */}
      <Card 
        bordered={false}
        style={{ marginBottom: layout.sectionGap }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>What you can do here</Title>
        <Paragraph style={{ color: neutral[600], marginBottom: 16 }}>
          As a uri, you can view upcoming events from the kaupapa you're connected to:
        </Paragraph>
        <Space direction="vertical" size="small">
          <Text><CheckCircleOutlined style={{ color: secondary[500], marginRight: 8 }} />See all upcoming events from your linked kaupapa</Text>
          <Text><CheckCircleOutlined style={{ color: secondary[500], marginRight: 8 }} />View event details (date, time, location, description)</Text>
          <Text style={{ color: neutral[400] }}><ClockCircleOutlined style={{ marginRight: 8 }} />RSVP to events (coming later)</Text>
          <Text style={{ color: neutral[400] }}><ClockCircleOutlined style={{ marginRight: 8 }} />Calendar sync (coming later)</Text>
        </Space>
      </Card>

      {/* Quick Actions */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24}>
          <Link href="/app/events" style={{ display: 'block' }}>
            <Card 
              hoverable 
              bordered={false}
            >
              <Space>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: tertiary[50], 
                  borderRadius: borderRadius.lg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <EyeOutlined style={{ fontSize: 24, color: tertiary[500] }} />
                </div>
                <div>
                  <Title level={5} style={{ marginBottom: 4 }}>View Events</Title>
                  <Text style={{ color: neutral[500] }}>See what's happening across your kaupapa</Text>
                </div>
              </Space>
            </Card>
          </Link>
        </Col>
      </Row>

      {/* Next Up */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24} lg={12}>
          <Card bordered={false}>
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
          <Card bordered={false}>
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
                          Open
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
    </>
  )
}
