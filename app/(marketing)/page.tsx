'use client'

import { Typography, Button, Space, Row, Col, Card, Divider, Steps } from 'antd'
import Link from 'next/link'
import { 
  ArrowRightOutlined, 
  BulbOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  WarningFilled
} from '@ant-design/icons'
import { primary, secondary, tertiary, neutral, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography

const styles = `
  .hover-card {
    transition: all 0.3s ease;
  }
  .hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
  }
`

export default function ProjectStoryPage() {
  return (
    <div style={{ background: '#fff' }}>
      <style>{styles}</style>
      
      {/* ================================================================== */}
      {/* HERO SECTION                                                       */}
      {/* ================================================================== */}
      <div style={{ 
        background: neutral[900], 
        color: '#fff', 
        padding: 'clamp(88px, 10vw, 120px) 24px clamp(120px, 14vw, 160px)', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          background: primary[500],
          opacity: 0.15,
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '8px 16px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: borderRadius.full, 
            marginBottom: 24,
            backdropFilter: 'blur(10px)'
          }}>
            <Text style={{ color: primary[300], fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
              Huri Noa POC
            </Text>
          </div>
          <Title style={{ color: '#fff', fontSize: 'clamp(40px, 8vw, 72px)', marginBottom: 24, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Project Vision
          </Title>
          <Paragraph style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: neutral[300], maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            An interactive prototype demonstrating the core scheduling and coordination workflows for Huri Noa.
          </Paragraph>
        </div>
      </div>

      {/* ================================================================== */}
      {/* CONTEXT CARD (The "Why")                                           */}
      {/* ================================================================== */}
      <div style={{ marginTop: -80, padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          maxWidth: 900, 
          margin: '0 auto', 
          background: '#fff', 
          borderRadius: 24,
          padding: '64px 48px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          border: `1px solid ${neutral[200]}`
        }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={10}>
              <Title level={3} style={{ fontSize: 32, marginBottom: 16 }}>About this POC</Title>
              <div style={{ width: 60, height: 4, background: primary[500], borderRadius: 2 }} />
            </Col>
            <Col xs={24} md={14}>
              <Paragraph style={{ fontSize: 18, color: neutral[600], lineHeight: 1.8, marginBottom: 24 }}>
                This early release is designed to solve one specific problem: <strong>helping contributors avoid scheduling clashes.</strong>
              </Paragraph>
              <Paragraph style={{ fontSize: 18, color: neutral[600], lineHeight: 1.8, marginBottom: 0 }}>
                We deliberately chose not to build a complex calendar sync for uri yet. Instead, we focused on giving contributors the visibility they need to plan with confidence.
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* THE SPARK (Insight)                                                */}
      {/* ================================================================== */}
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <BulbOutlined style={{ fontSize: 48, color: primary[500], marginBottom: 32 }} />
          <Title level={2} style={{ fontSize: 40, fontWeight: 400, fontStyle: 'italic', marginBottom: 32, lineHeight: 1.4 }}>
            “The biggest problem is when two kaupapa pick the same date. We just need to see what’s already happening.”
          </Title>
          <Text style={{ fontSize: 16, fontWeight: 600, color: neutral[500], textTransform: 'uppercase', letterSpacing: 1 }}>
            — Mina Mathieson. Scoping Workshop, 1 Dec 2025
          </Text>
        </div>
      </div>

      {/* ================================================================== */}
      {/* CORE JOURNEYS                                                      */}
      {/* ================================================================== */}
      <div style={{ background: neutral[50], padding: '100px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Title level={2}>Core User Journeys</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500] }}>How different roles experience the platform</Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card 
                bordered={false} 
                style={{ height: '100%', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                bodyStyle={{ padding: 40 }}
              >
                <Space align="center" style={{ marginBottom: 32 }}>
                  <div style={{ padding: 12, background: primary[50], borderRadius: 12, color: primary[600] }}>
                    <SafetyCertificateOutlined style={{ fontSize: 24 }} />
                  </div>
                  <Title level={4} style={{ margin: 0 }}>Contributor Journey</Title>
                </Space>
                <Steps
                  direction="vertical"
                  size="small"
                  current={1}
                  items={[
                    { title: 'Login', description: 'Access the contributor dashboard' },
                    { title: 'Create Event', description: 'Enter details for upcoming kaupapa' },
                    { title: 'Clash Detection', description: 'Warned of conflicts instantly' },
                    { title: 'Submit', description: 'Event is live for uri to see' },
                  ]}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card 
                bordered={false} 
                style={{ height: '100%', borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
                bodyStyle={{ padding: 40 }}
              >
                <Space align="center" style={{ marginBottom: 32 }}>
                  <div style={{ padding: 12, background: tertiary[50], borderRadius: 12, color: tertiary[600] }}>
                    <TeamOutlined style={{ fontSize: 24 }} />
                  </div>
                  <Title level={4} style={{ margin: 0 }}>Uri Journey</Title>
                </Space>
                <Steps
                  direction="vertical"
                  size="small"
                  current={2}
                  items={[
                    { title: 'Login', description: 'Simple access via magic link' },
                    { title: 'View Events', description: 'See everything linked to their kaupapa' },
                    { title: 'Done', description: 'Clear visibility, no noise' },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FEATURES (Simple Cards)                                            */}
      {/* ================================================================== */}
      <div style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Title level={2}>Built for Focus</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500] }}>
              We stripped away the complexity to deliver value immediately.
            </Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            {/* Feature 1 */}
            <Col xs={24} md={8}>
              <div style={{ padding: 32, border: `1px solid ${neutral[200]}`, borderRadius: 16, height: '100%' }}>
                <CalendarOutlined style={{ fontSize: 32, color: primary[500], marginBottom: 24 }} />
                <Title level={4} style={{ marginBottom: 12 }}>Event Creation</Title>
                <Paragraph style={{ color: neutral[600], lineHeight: 1.6 }}>
                  Create events in under 2 minutes. Title, date, location, description — everything you need, nothing you don't.
                </Paragraph>
              </div>
            </Col>

            {/* Feature 2 */}
            <Col xs={24} md={8}>
              <div style={{ padding: 32, border: `1px solid ${neutral[200]}`, borderRadius: 16, height: '100%', background: primary[50] }}>
                <CheckCircleOutlined style={{ fontSize: 32, color: primary[600], marginBottom: 24 }} />
                <Title level={4} style={{ marginBottom: 12 }}>Clash Detection</Title>
                <Paragraph style={{ color: neutral[600], lineHeight: 1.6 }}>
                  See potential overlaps before you save. A gentle heads-up, not a hard stop — you keep the mana to decide.
                </Paragraph>
              </div>
            </Col>

            {/* Feature 3 */}
            <Col xs={24} md={8}>
              <div style={{ padding: 32, border: `1px solid ${neutral[200]}`, borderRadius: 16, height: '100%' }}>
                <TeamOutlined style={{ fontSize: 32, color: tertiary[500], marginBottom: 24 }} />
                <Title level={4} style={{ marginBottom: 12 }}>Uri Dashboard</Title>
                <Paragraph style={{ color: neutral[600], lineHeight: 1.6 }}>
                  Uri see upcoming events from all their linked kaupapa in one simple view. No calendar sync needed yet.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ARCHITECTURE                                                       */}
      {/* ================================================================== */}
      <div style={{ background: neutral[900], color: '#fff', padding: '100px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 64 }}>Technical Architecture</Title>
          
          <Row gutter={[24, 24]} align="middle">
            {/* Left: Inputs */}
            <Col xs={24} md={8}>
              <Card style={{ background: neutral[800], border: 'none', height: '100%' }} bodyStyle={{ padding: 32 }}>
                <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>Manual Import</Title>
                <Paragraph style={{ color: neutral[400], marginBottom: 0 }}>
                  Users (Contributors + Uri) are imported and linked to specific Kaupapa.
                </Paragraph>
              </Card>
            </Col>
            
            {/* Center: Arrow */}
            <Col xs={24} md={2} style={{ textAlign: 'center' }}>
              <ArrowRightOutlined style={{ fontSize: 24, color: neutral[500], transform: 'rotate(90deg)' }} />
            </Col>

            {/* Right: System */}
            <Col xs={24} md={14}>
              <Card style={{ background: neutral[800], border: 'none', height: '100%' }} bodyStyle={{ padding: 32 }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <SafetyCertificateOutlined style={{ fontSize: 24, color: primary[500], marginTop: 4 }} />
                    <div>
                      <Text style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>Contributor Action</Text>
                      <Paragraph style={{ color: neutral[400], margin: 0, marginTop: 4 }}>Creates events. Conflict detection runs immediately.</Paragraph>
                    </div>
                  </div>
                  <Divider style={{ borderColor: neutral[700], margin: '12px 0' }} />
                  <div style={{ display: 'flex', gap: 24 }}>
                    <TeamOutlined style={{ fontSize: 24, color: tertiary[500], marginTop: 4 }} />
                    <div>
                      <Text style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>Uri View</Text>
                      <Paragraph style={{ color: neutral[400], margin: 0, marginTop: 4 }}>See all events across their linked kaupapa.</Paragraph>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Text style={{ color: neutral[500] }}>
              * No calendar sync or RSVP in this phase (by design)
            </Text>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MVP SCOPE                                                          */}
      {/* ================================================================== */}
      <div style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Title level={2}>MVP Scope & Focus</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500], maxWidth: 800, margin: '0 auto' }}>
              This Proof of Concept (POC) is intentionally focused: helping Contributors create events with visibility of clashes across kaupapa.
            </Paragraph>
            <Paragraph style={{ fontSize: 18, color: neutral[500], maxWidth: 800, margin: '16px auto 0' }}>
              We’ve deliberately deferred personalised calendar views for Uri in this phase so we can validate the core coordination workflow first.
            </Paragraph>
          </div>

          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <Card 
                title={<Space><CheckCircleFilled style={{ color: tertiary[500] }} /> In Scope (The Focus)</Space>} 
                bordered
                style={{ height: '100%', borderRadius: 16, border: `1px solid ${neutral[200]}`, boxShadow: 'none' }}
                bodyStyle={{ padding: 32 }}
              >
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  What we're delivering in the POC:
                </Paragraph>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: tertiary[500], fontSize: 20 }} />
                    <Text style={{ fontSize: 16 }}>Contributor Event Creation</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: tertiary[500], fontSize: 20 }} />
                    <Text style={{ fontSize: 16 }}>Soft Clash Detection</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: tertiary[500], fontSize: 20 }} />
                    <Text style={{ fontSize: 16 }}>Basic Uri Visibility (name only)</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <CheckCircleOutlined style={{ color: tertiary[500], fontSize: 20 }} />
                    <Text style={{ fontSize: 16 }}>Manual User Import</Text>
                  </div>
                </Space>
                <Divider style={{ margin: '24px 0' }} />
                <div style={{ background: tertiary[50], padding: 16, borderRadius: 8, color: tertiary[800] }}>
                  <Paragraph style={{ margin: '8px 0 0', fontSize: 14, color: tertiary[800] }}>
                    These deliverables reflect the critical coordination needs of Contributors, enabling them to plan events across entities with clarity and minimal friction.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card 
                title={<Space><CloseCircleFilled style={{ color: secondary[500] }} /> Out of Scope (Deferred)</Space>} 
                bordered
                style={{ height: '100%', borderRadius: 16, border: `1px solid ${neutral[200]}`, boxShadow: 'none' }}
                bodyStyle={{ padding: 32 }}
              >
                <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                  What we are not including — yet:
                </Paragraph>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <ClockCircleOutlined style={{ color: neutral[400], fontSize: 20 }} />
                    <Text style={{ fontSize: 16, color: neutral[500] }}>Calendar Sync (.ics feeds)</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <ClockCircleOutlined style={{ color: neutral[400], fontSize: 20 }} />
                    <Text style={{ fontSize: 16, color: neutral[500] }}>RSVPs & Notifications</Text>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <ClockCircleOutlined style={{ color: neutral[400], fontSize: 20 }} />
                    <Text style={{ fontSize: 16, color: neutral[500] }}>Self-Registration (Uri sign-up)</Text>
                  </div>
                </Space>
                <Divider style={{ margin: '24px 0' }} />
                <div style={{ background: neutral[100], padding: 16, borderRadius: 8, fontStyle: 'italic', color: neutral[600] }}>
                  “It’s really important that events across different rōpū aren’t public to everyone... Uri only need to see what’s relevant to them.”
                  <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, fontStyle: 'normal' }}>— Mina Mathieson</div>
                </div>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <Title level={3} style={{ marginBottom: 8 }}>Key Risks & Mitigations</Title>
              <Paragraph style={{ color: neutral[500], fontSize: 16 }}>
                We are proactively managing these risks to ensure the POC remains focused and deliverable.
              </Paragraph>
            </div>
            <Row gutter={[24, 24]}>
              {[
                { title: "Scope Creep", desc: "We’ve deliberately constrained the MVP to focus on coordination, not full user autonomy or comms." },
                { title: "Security Exposure", desc: "Uri calendar feeds have been deprioritised until robust permissioning is in place." },
                { title: "Mismatch of Expectations", desc: "This POC is explicitly designed to test Contributor coordination first. Clear comms will ensure alignment." },
                { title: "Underwhelming for Uri", desc: "The value for Uri will grow in future phases. For now, they benefit passively through better organised events." }
              ].map((risk, i) => (
                <Col xs={24} md={12} key={i}>
                  <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: `1px solid ${neutral[200]}`, height: '100%' }}>
                    <Space align="start" style={{ marginBottom: 8 }}>
                      <WarningFilled style={{ color: secondary[500], fontSize: 20, marginTop: 4 }} />
                      <Text strong style={{ color: neutral[800], fontSize: 16 }}>{risk.title}</Text>
                    </Space>
                    <Paragraph style={{ color: neutral[600], margin: 0, paddingLeft: 28 }}>{risk.desc}</Paragraph>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* COMING SOON - GRID                                                 */}
      {/* ================================================================== */}
      <div style={{ padding: '120px 24px', background: neutral[50] }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <Space align="center" style={{ marginBottom: 16 }}>
              <ClockCircleOutlined style={{ fontSize: 24, color: primary[400] }} />
              <Text style={{ fontSize: 16, fontWeight: 600, color: primary[500], textTransform: 'uppercase', letterSpacing: 1 }}>Roadmap</Text>
            </Space>
            <Title level={2} style={{ fontSize: 42, marginTop: 16 }}>We're just getting started</Title>
            <Paragraph style={{ fontSize: 18, color: neutral[500], maxWidth: 600, margin: '0 auto' }}>
              Here is what we are working on next to make coordination even easier.
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {[
              { title: "RSVP & Reminders", icon: <ClockCircleOutlined />, desc: "Know who's coming and keep everyone in the loop." },
              { title: "Calendar Sync", icon: <CalendarOutlined />, desc: "Sync events directly to your personal calendar (.ics)." },
              { title: "Self Registration", icon: <TeamOutlined />, desc: "Easier onboarding for new whānau members." },
              { title: "Smart Notifications", icon: <ThunderboltOutlined />, desc: "Get alerted via email or mobile when things change." },
            ].map((item, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card 
                  className="hover-card"
                  bordered={false}
                  style={{ height: '100%', borderRadius: 16 }}
                  bodyStyle={{ padding: 32 }}
                >
                  <div style={{ fontSize: 32, color: primary[500], marginBottom: 24 }}>{item.icon}</div>
                  <Title level={4} style={{ marginBottom: 12 }}>{item.title}</Title>
                  <Paragraph style={{ color: neutral[500], fontSize: 16, marginBottom: 0 }}>
                    {item.desc}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}
      <div style={{ 
        padding: '80px 24px', 
        background: neutral[900], 
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: 12 }}>
            Explore the POC
          </Title>
          <Paragraph style={{ color: neutral[400], fontSize: 18, marginBottom: 40 }}>
            Jump into the story, or open the Contributor and Uri experiences.
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                className="hover-card"
                bordered={false}
                style={{ height: '100%', borderRadius: 16, background: neutral[800], textAlign: 'left' }}
                bodyStyle={{ padding: 28 }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Space align="center" size={12}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: borderRadius.full,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: neutral[700],
                      color: primary[300],
                      fontSize: 18,
                      flex: '0 0 auto'
                    }}>
                      <BulbOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>About</Text>
                  </Space>
                  <Text style={{ color: neutral[400] }}>
                    Read the vision, scope, and what we’re building next.
                  </Text>
                  <Link href="/about" style={{ alignSelf: 'flex-start' }}>
                    <Button type="default">
                      View About <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                className="hover-card"
                bordered={false}
                style={{ height: '100%', borderRadius: 16, background: neutral[800], textAlign: 'left' }}
                bodyStyle={{ padding: 28 }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Space align="center" size={12}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: borderRadius.full,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: neutral[700],
                      color: tertiary[300],
                      fontSize: 18,
                      flex: '0 0 auto'
                    }}>
                      <SafetyCertificateOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Contributor</Text>
                  </Space>
                  <Text style={{ color: neutral[400] }}>
                    Create and manage events, with soft clash visibility.
                  </Text>
                  <Link href="/admin" style={{ alignSelf: 'flex-start' }}>
                    <Button type="primary">
                      Open Contributor <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card
                className="hover-card"
                bordered={false}
                style={{ height: '100%', borderRadius: 16, background: neutral[800], textAlign: 'left' }}
                bodyStyle={{ padding: 28 }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Space align="center" size={12}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: borderRadius.full,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: neutral[700],
                      color: secondary[300],
                      fontSize: 18,
                      flex: '0 0 auto'
                    }}>
                      <TeamOutlined />
                    </div>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Uri</Text>
                  </Space>
                  <Text style={{ color: neutral[400] }}>
                    View the events and kaupapa relevant to you.
                  </Text>
                  <Link href="/app" style={{ alignSelf: 'flex-start' }}>
                    <Button type="primary">
                      Open Uri <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

    </div>
  )
}