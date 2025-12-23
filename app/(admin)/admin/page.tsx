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
          <Link href="/admin/events?create=true">
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

      <PocContextCard title="About This Page">
        This is the home screen for Contributors when they log in. From here they can see an overview of their events and quickly access the tools they need to manage their community's schedule.
        <br /><br />
        <strong>What's included:</strong> Quick stats, event creation, and navigation to manage events or users.
      </PocContextCard>

      {/* Quick Stats */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Upcoming Events"
              value={stats.upcoming}
              prefix={<CalendarOutlined style={{ color: primary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="This Week"
              value={stats.thisWeek}
              prefix={<ClockCircleOutlined style={{ color: secondary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Past Events"
              value={stats.past}
              prefix={<CheckCircleOutlined style={{ color: tertiary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Uri Connected"
              value={uriStats.total}
              prefix={<TeamOutlined style={{ color: neutral[500] }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.sectionGap }}>
        <Col xs={24} md={12}>
          <Card 
            variant="borderless"
            style={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${primary[50]} 0%, ${neutral[50]} 100%)`,
              borderRadius: 16
            }}
          >
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
              <Col xs={24} lg={14}>
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
                    <CalendarOutlined style={{ fontSize: 28, color: primary[500] }} />
                  </div>
                  <div>
                    <Title level={4} style={{ marginBottom: 4 }}>Manage Events</Title>
                    <Text style={{ color: neutral[600], fontSize: 15 }}>View, edit, and create community events</Text>
                  </div>
                </Space>
              </Col>
              <Col xs={24} lg={10} style={{ textAlign: 'right' }}>
                <Link href="/admin/events">
                  <Button type="primary" size="large" icon={<CalendarOutlined />}>
                    Open Events
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card 
            variant="borderless"
            style={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${tertiary[50]} 0%, ${neutral[50]} 100%)`,
              borderRadius: 16
            }}
          >
            <Row align="middle" justify="space-between" gutter={[16, 16]}>
              <Col xs={24} lg={14}>
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
                    <TeamOutlined style={{ fontSize: 28, color: tertiary[500] }} />
                  </div>
                  <div>
                    <Title level={4} style={{ marginBottom: 4 }}>Manage Users</Title>
                    <Text style={{ color: neutral[600], fontSize: 15 }}>Import and assign uri to your community</Text>
                  </div>
                </Space>
              </Col>
              <Col xs={24} lg={10} style={{ textAlign: 'right' }}>
                <Link href="/admin/users">
                  <Button type="primary" size="large" icon={<TeamOutlined />}>
                    Open Users
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Huri Noa v1 Features */}
      <Card 
        variant="borderless"
        style={{ 
          background: `linear-gradient(135deg, ${primary[50]} 0%, ${secondary[50]} 100%)`,
          borderRadius: 16,
          border: `1px solid ${neutral[200]}`
        }}
      >
        <Title level={4} style={{ marginBottom: 8 }}>Huri Noa v1 — What's Included</Title>
        <Paragraph style={{ color: neutral[600], marginBottom: 24, fontSize: 15 }}>
          This is an early release focused on event coordination for Contributors.
        </Paragraph>
        <Row gutter={[32, 24]}>
          <Col xs={24} md={12}>
            <Text strong style={{ fontSize: 14, color: secondary[600], display: 'block', marginBottom: 12 }}>What you can do now</Text>
            <Space direction="vertical" size={10}>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />Create and manage events for your community</Text>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />See clash warnings when events overlap</Text>
              <Text style={{ fontSize: 15 }}><CheckCircleOutlined style={{ color: secondary[500], marginRight: 10 }} />View and edit upcoming events</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Text strong style={{ fontSize: 14, color: neutral[500], display: 'block', marginBottom: 12 }}>What's coming later</Text>
            <Space direction="vertical" size={10}>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />RSVP and attendee management</Text>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />Calendar sync</Text>
              <Text style={{ fontSize: 15, color: neutral[500] }}><ClockCircleOutlined style={{ marginRight: 10 }} />Notifications and reminders</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  )
}
