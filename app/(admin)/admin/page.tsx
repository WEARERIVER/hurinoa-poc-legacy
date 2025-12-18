'use client'

import { Typography, Card, Row, Col, Space, Button, Statistic } from 'antd'
import { 
  CalendarOutlined, 
  PlusOutlined, 
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons'
import Link from 'next/link'
import { PageHeader, PocContextCard } from '@/components'
import { getNavItem } from '@/lib/navigation'
import { getEventStats, getUriStats } from '@/lib/mockData'
import { primary, secondary, tertiary, neutral, layout, borderRadius } from '@/theme'

const { Title, Paragraph, Text } = Typography

const navItem = getNavItem('admin-dashboard')!

/**
 * Contributor Dashboard
 * =====================
 * Landing page for contributors. Shows quick actions and overview stats.
 */
export default function AdminDashboardPage() {
  const stats = getEventStats()
  const uriStats = getUriStats()

  return (
    <>
      <PageHeader
        title="Contributor Dashboard"
        description="View and manage your community events"
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <Link href="/admin/events">
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              className="hero-button"
            >
              Create Event
            </Button>
          </Link>
        }
      />

      <PocContextCard title="MVP Context: Contributor Dashboard">
        <strong>Why this page exists:</strong> The MVP brief identified that <em>contributors bear the operational burden</em> of 
        event coordination. This dashboard is their home base — a clear entry point to the scheduling tools they need most.
        <br />
        <strong>What we're demonstrating:</strong> Quick access to event creation, at-a-glance stats on upcoming events, 
        and clear navigation to manage events or users. The stats shown (Upcoming, This Week, Past) help contributors 
        gauge their workload without drilling into lists.
        <br />
        <strong>Design decisions:</strong> We kept this screen deliberately minimal — no analytics, no complex widgets. 
        The brief explicitly deferred reporting and dashboarding. The "What's in this MVP" panel helps the client 
        see what's included vs. what's coming later, managing expectations upfront.
      </PocContextCard>

      {/* Quick Stats */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Upcoming Events"
              value={stats.upcoming}
              prefix={<CalendarOutlined style={{ color: primary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="This Week"
              value={stats.thisWeek}
              prefix={<ClockCircleOutlined style={{ color: secondary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Past Events"
              value={stats.past}
              prefix={<CheckCircleOutlined style={{ color: tertiary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Uri Connected"
              value={uriStats.total}
              prefix={<TeamOutlined style={{ color: neutral[500] }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* What's in this POC panel */}
      <Card 
        bordered={false}
        style={{ marginBottom: layout.sectionGap }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>What's in this MVP</Title>
        <Paragraph style={{ color: neutral[600], marginBottom: 16 }}>
          This release demonstrates the core scheduling workflow for contributors:
        </Paragraph>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="small">
              <Text><CheckCircleOutlined style={{ color: secondary[500], marginRight: 8 }} />Create and manage events for your community</Text>
              <Text><CheckCircleOutlined style={{ color: secondary[500], marginRight: 8 }} />See clash warnings when events overlap</Text>
              <Text><CheckCircleOutlined style={{ color: secondary[500], marginRight: 8 }} />View and edit upcoming events</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="small">
              <Text style={{ color: neutral[400] }}><ClockCircleOutlined style={{ marginRight: 8 }} />RSVP and attendee management (coming later)</Text>
              <Text style={{ color: neutral[400] }}><ClockCircleOutlined style={{ marginRight: 8 }} />Calendar sync (.ics) — deferred for privacy</Text>
              <Text style={{ color: neutral[400] }}><ClockCircleOutlined style={{ marginRight: 8 }} />Notifications and reminders (coming later)</Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Quick Actions */}
      <Row gutter={[layout.cardGap, layout.cardGap]}>
        <Col xs={24} md={12}>
          <Link href="/admin/events" style={{ display: 'block' }}>
            <Card 
              hoverable 
              bordered={false}
              style={{ height: '100%' }}
            >
              <Space>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  background: primary[50], 
                  borderRadius: borderRadius.lg, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <CalendarOutlined style={{ fontSize: 24, color: primary[500] }} />
                </div>
                <div>
                  <Title level={5} style={{ marginBottom: 4 }}>Manage Events</Title>
                  <Text style={{ color: neutral[500] }}>View, edit, and delete your community events</Text>
                </div>
              </Space>
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={12}>
          <Link href="/admin/users" style={{ display: 'block' }}>
            <Card 
              hoverable 
              bordered={false}
              style={{ height: '100%' }}
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
                  <TeamOutlined style={{ fontSize: 24, color: tertiary[500] }} />
                </div>
                <div>
                  <Title level={5} style={{ marginBottom: 4 }}>Manage Users</Title>
                  <Text style={{ color: neutral[500] }}>Import and assign uri to your community</Text>
                </div>
              </Space>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  )
}
