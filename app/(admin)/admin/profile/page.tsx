'use client'

import { Typography, Card, Row, Col, Avatar, Descriptions, Tag, Divider, Space, Button } from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  TeamOutlined,
  CalendarOutlined,
  EditOutlined,
  LockOutlined
} from '@ant-design/icons'
import { PageHeader, PocContextCard } from '@/components'
import { useUser } from '@/lib/userContext'
import { getKaupapa, CURRENT_KAUPAPA_ID, getEventStats } from '@/lib/mockData'
import { primary, secondary, neutral, layout, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography

/**
 * Profile Page
 * ============
 * Displays the current contributor's profile information.
 * Minimal for POC — shows identity and linked kaupapa.
 */
export default function ProfilePage() {
  const { user } = useUser()
  const kaupapa = getKaupapa(CURRENT_KAUPAPA_ID)
  const stats = getEventStats()

  // Mock profile data (would come from backend in production)
  const profileData = {
    firstName: 'Aroha',
    lastName: 'Tūhoe',
    email: 'aroha.tuhoe@email.com',
    phone: '021 987 6543',
    role: 'contributor',
    joinedAt: 'March 2024',
  }

  return (
    <>
      <PageHeader
        title="My Profile"
        description="View your account details"
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'My Profile' }]}
      />

      <PocContextCard title="About This Page">
        This is where Contributors can view their profile and see which community they manage. This helps them confirm their identity in the system and understand their role.
        <br /><br />
        <strong>Coming later:</strong> Profile editing and password management will be available in future releases. For now, updates are managed by the system administrator.
      </PocContextCard>

      <Row gutter={[layout.cardGap, layout.cardGap]}>
        {/* Profile Card */}
        <Col xs={24} lg={16}>
          <Card variant="borderless">
            {/* Profile Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <Avatar 
                size={80} 
                style={{ 
                  background: `linear-gradient(135deg, ${primary[400]} 0%, ${primary[600]} 100%)`,
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {profileData.firstName[0]}{profileData.lastName[0]}
              </Avatar>
              <div>
                <Title level={3} style={{ marginBottom: 4 }}>
                  {profileData.firstName} {profileData.lastName}
                </Title>
                <Space size={8}>
                  <Tag 
                    color="blue" 
                    style={{ 
                      textTransform: 'capitalize',
                      fontWeight: 500,
                    }}
                  >
                    Contributor
                  </Tag>
                  <Text type="secondary">Member since {profileData.joinedAt}</Text>
                </Space>
              </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            {/* Contact Information */}
            <Title level={5} style={{ marginBottom: 16, color: neutral[600] }}>
              Contact Information
            </Title>
            <Descriptions 
              column={1}
              size="small"
              styles={{
                label: { color: neutral[500], fontWeight: 500 },
                content: { color: neutral[700] }
              }}
            >
              <Descriptions.Item label={<><MailOutlined style={{ marginRight: 8 }} />Email</>}>
                {profileData.email}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined style={{ marginRight: 8 }} />Phone</>}>
                {profileData.phone}
              </Descriptions.Item>
            </Descriptions>

            <Divider style={{ margin: '24px 0 16px' }} />

            {/* Account Actions (disabled for POC) */}
            <Title level={5} style={{ marginBottom: 16, color: neutral[600] }}>
              Account Settings
            </Title>
            <Space>
              <Button icon={<EditOutlined />} disabled>
                Edit Profile
              </Button>
              <Button icon={<LockOutlined />} disabled>
                Change Password
              </Button>
            </Space>
            <Paragraph type="secondary" style={{ marginTop: 12, fontSize: 13 }}>
              Profile editing is managed by the system administrator in this version.
            </Paragraph>
          </Card>
        </Col>

        {/* Kaupapa Card */}
        <Col xs={24} lg={8}>
          <Card variant="borderless" style={{ marginBottom: layout.cardGap }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div 
                style={{ 
                  width: 40, 
                  height: 40, 
                  background: `linear-gradient(135deg, ${primary[100]} 0%, ${secondary[100]} 100%)`,
                  borderRadius: borderRadius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TeamOutlined style={{ fontSize: 20, color: primary[500] }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 13, display: 'block' }}>Your Community</Text>
                <Text strong style={{ fontSize: 16 }}>{kaupapa?.name}</Text>
              </div>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <Text type="secondary" style={{ fontSize: 13 }}>
              You are a contributor for this community. You can create and manage events, 
              and view uri linked to your group.
            </Text>
          </Card>

          {/* Quick Stats */}
          <Card variant="borderless">
            <Title level={5} style={{ marginBottom: 16, color: neutral[600] }}>
              Your Activity
            </Title>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <CalendarOutlined style={{ color: primary[500] }} />
                  <Text>Events Created</Text>
                </Space>
                <Text strong style={{ color: primary[500], fontSize: 18 }}>{stats.upcoming + stats.past}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <CalendarOutlined style={{ color: secondary[500] }} />
                  <Text>Upcoming Events</Text>
                </Space>
                <Text strong style={{ color: secondary[500], fontSize: 18 }}>{stats.upcoming}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  )
}
