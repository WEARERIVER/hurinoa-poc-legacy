'use client'

import { Typography, Card, Row, Col, Avatar, Descriptions, Tag, Divider, Space, Button } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  LockOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { PageHeader, PocContextCard } from '@/components'
import {
  getCurrentUri,
  getKaupapa,
  getKaupapaForCurrentUri,
} from '@/lib/mockData'
import { primary, tertiary, neutral, layout, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography

export default function UriProfilePage() {
  const uri = getCurrentUri()
  const linkedKaupapa = getKaupapaForCurrentUri()

  const primaryKaupapa = uri.kaupapa.length > 0 ? getKaupapa(uri.kaupapa[0]) : undefined

  return (
    <>
      <PageHeader
        title="My Profile"
        description="View your account details"
        breadcrumbs={[{ label: 'Dashboard', href: '/app' }, { label: 'My Profile' }]}
      />

      <PocContextCard title="MVP Context: Uri Profile">
        <strong>Why this page exists:</strong> Uri should be able to confirm who they are in the system and which communities they're linked to.
        <br />
        <strong>Scope note:</strong> Profile editing and password changes are not included in this phase.
      </PocContextCard>

      <Row gutter={[layout.cardGap, layout.cardGap]}>
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <Avatar
                size={80}
                style={{
                  background: `linear-gradient(135deg, ${tertiary[400]} 0%, ${tertiary[600]} 100%)`,
                  fontSize: 28,
                  fontWeight: 600,
                }}
                icon={!uri.firstName ? <UserOutlined /> : undefined}
              >
                {uri.firstName?.[0]}{uri.lastName?.[0]}
              </Avatar>

              <div>
                <Title level={3} style={{ marginBottom: 4 }}>
                  {uri.firstName} {uri.lastName}
                </Title>
                <Space size={8} wrap>
                  <Tag style={{ fontWeight: 500 }}>Uri</Tag>
                  {primaryKaupapa && (
                    <Text type="secondary">Linked to {primaryKaupapa.name}</Text>
                  )}
                </Space>
              </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <Title level={5} style={{ marginBottom: 16, color: neutral[600] }}>
              Contact Information
            </Title>

            <Descriptions
              column={{ xs: 1, sm: 2 }}
              size="small"
              labelStyle={{ color: neutral[500], fontWeight: 500 }}
              contentStyle={{ color: neutral[700] }}
            >
              <Descriptions.Item label={<><MailOutlined style={{ marginRight: 8 }} />Email</>}>
                {uri.email}
              </Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined style={{ marginRight: 8 }} />Phone</>}>
                {uri.phone || <Text type="secondary">—</Text>}
              </Descriptions.Item>
            </Descriptions>

            <Divider style={{ margin: '24px 0 16px' }} />

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
              Updates are managed by your administrator in this version.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ marginBottom: layout.cardGap }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: `linear-gradient(135deg, ${primary[100]} 0%, ${tertiary[100]} 100%)`,
                  borderRadius: borderRadius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TeamOutlined style={{ fontSize: 20, color: tertiary[500] }} />
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>Linked Kaupapa</Text>
                <Text strong style={{ fontSize: 16 }}>{linkedKaupapa.length}</Text>
              </div>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              {linkedKaupapa.map((k) => (
                <Card key={k.id} size="small" bordered style={{ background: '#fff' }}>
                  <Text strong>{k.name}</Text>
                </Card>
              ))}
              {linkedKaupapa.length === 0 && (
                <Text type="secondary">No kaupapa linked yet.</Text>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  )
}
