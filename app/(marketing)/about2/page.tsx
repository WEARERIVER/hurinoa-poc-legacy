'use client'

import { Typography, Button, Row, Col, Card, Space, Divider } from 'antd'
import { 
  CalendarOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { primary, secondary, neutral, layout, borderRadius, fontSize, spacing } from '@/theme'
import Link from 'next/link'

const { Title, Paragraph, Text } = Typography

export default function AboutPage2() {
  return (
    <div style={{ background: '#fff' }}>
      
      {/* ================================================================== */}
      {/* HERO SECTION                                                       */}
      {/* ================================================================== */}
      <div style={{ 
        background: neutral[50], 
        padding: '80px 24px 100px', 
        textAlign: 'center',
        borderBottom: `1px solid ${neutral[200]}`
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Text style={{ 
            color: primary[600], 
            fontWeight: 600, 
            letterSpacing: '1px', 
            textTransform: 'uppercase',
            marginBottom: 16,
            display: 'block'
          }}>
            Welcome to Huri Noa
          </Text>
          
          <Title level={1} style={{ 
            color: neutral[900], 
            fontSize: 48, 
            marginBottom: 24,
            lineHeight: 1.2
          }}>
            Bring clarity to your <br/>
            <span style={{ color: primary[500] }}>community schedule.</span>
          </Title>
          
          <Paragraph style={{ 
            color: neutral[600], 
            fontSize: 20, 
            lineHeight: 1.6,
            marginBottom: 40,
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Huri Noa helps whānau contributors create events, avoid clashes, and give uri a clear view of what's happening — all in one place.
          </Paragraph>
          
          <Space size="middle">
            <Link href="/dashboard">
              <Button type="primary" size="large" style={{ height: 48, padding: '0 32px', fontSize: 16 }}>
                Login to Start
              </Button>
            </Link>
            <Button size="large" style={{ height: 48, padding: '0 32px', fontSize: 16 }}>
              Learn More
            </Button>
          </Space>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FEATURES SECTION                                                   */}
      {/* ================================================================== */}
      <div style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Title level={2} style={{ marginBottom: 16 }}>What you can do now</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500] }}>
              Simple tools to help you coordinate better.
            </Paragraph>
          </div>

          <Row gutter={[48, 48]}>
            {/* Feature 1 */}
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                bodyStyle={{ padding: 0 }}
              >
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  background: primary[50], 
                  borderRadius: borderRadius.full,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: primary[500],
                  fontSize: 28
                }}>
                  <CalendarOutlined />
                </div>
                <Title level={4} style={{ marginBottom: 12 }}>Create events with ease</Title>
                <Paragraph style={{ color: neutral[600], fontSize: 16 }}>
                  Contributors can quickly create and update events for their community.
                </Paragraph>
              </Card>
            </Col>

            {/* Feature 2 */}
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                bodyStyle={{ padding: 0 }}
              >
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  background: secondary[50], 
                  borderRadius: borderRadius.full,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: secondary[500],
                  fontSize: 28
                }}>
                  <SafetyCertificateOutlined />
                </div>
                <Title level={4} style={{ marginBottom: 12 }}>Avoid event clashes</Title>
                <Paragraph style={{ color: neutral[600], fontSize: 16 }}>
                  Get a heads-up if your event overlaps with another community.
                </Paragraph>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col xs={24} md={8}>
              <Card 
                bordered={false} 
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                bodyStyle={{ padding: 0 }}
              >
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  background: neutral[100], 
                  borderRadius: borderRadius.full,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: neutral[600],
                  fontSize: 28
                }}>
                  <TeamOutlined />
                </div>
                <Title level={4} style={{ marginBottom: 12 }}>View your upcoming events</Title>
                <Paragraph style={{ color: neutral[600], fontSize: 16 }}>
                  Uri can see a personalised list of events from their linked communities.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* BENEFITS SECTION                                                   */}
      {/* ================================================================== */}
      <div style={{ padding: '80px 24px', background: neutral[50] }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 48 }}>Why use Huri Noa?</Title>
          
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {[
              "Fewer scheduling headaches",
              "More visibility for uri and contributors",
              "Simple, secure, and focused"
            ].map((benefit, index) => (
              <div key={index} style={{ 
                background: '#fff', 
                padding: '24px 32px', 
                borderRadius: borderRadius.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <CheckCircleOutlined style={{ fontSize: 24, color: secondary[500], marginRight: 16 }} />
                <Text style={{ fontSize: 18, fontWeight: 500, color: neutral[800] }}>{benefit}</Text>
              </div>
            ))}
          </Space>
        </div>
      </div>

      {/* ================================================================== */}
      {/* COMING SOON SECTION                                                */}
      {/* ================================================================== */}
      <div style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Space align="center" style={{ marginBottom: 16 }}>
              <ClockCircleOutlined style={{ fontSize: 24, color: primary[400] }} />
              <Text style={{ fontSize: 16, fontWeight: 600, color: primary[500], textTransform: 'uppercase', letterSpacing: 1 }}>Coming Soon</Text>
            </Space>
            <Title level={3}>We're just getting started</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500] }}>
              Here is what we are working on next to make coordination even easier.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {[
              "RSVP and event reminders",
              "Calendar sync (.ics) — deferred for privacy",
              "Self-registration (with governance support)",
              "Email or mobile notifications",
              "Deeper reporting and whānau visibility"
            ].map((item, index) => (
              <Col xs={24} sm={12} key={index}>
                <div style={{ 
                  padding: '16px 24px', 
                  background: neutral[50], 
                  borderRadius: borderRadius.md,
                  color: neutral[600],
                  fontSize: 16,
                  border: `1px solid ${neutral[100]}`
                }}>
                  {item}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOOTER CTA                                                         */}
      {/* ================================================================== */}
      <div style={{ 
        padding: '80px 24px', 
        background: neutral[900], 
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: 16 }}>
            Have a community to manage?
          </Title>
          <Paragraph style={{ color: neutral[400], fontSize: 18, marginBottom: 32 }}>
            Login to get started or contact us to get your group set up.
          </Paragraph>
          <Link href="/dashboard">
            <Button type="primary" size="large" style={{ height: 56, padding: '0 40px', fontSize: 18 }}>
              Get Started <ArrowRightOutlined />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}