'use client'

import { Typography, Button, Row, Col, Card, Space, Divider, Steps } from 'antd'
import { 
  CalendarOutlined, 
  SafetyCertificateOutlined, 
  TeamOutlined, 
  CheckCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  ArrowRightOutlined,
  BulbOutlined,
  RocketOutlined,
  HeartOutlined,
  ThunderboltOutlined,
  WarningFilled
} from '@ant-design/icons'
import { primary, secondary, tertiary, neutral, layout, borderRadius, fontSize, spacing, shadow } from '@/theme'
import { FullWidthDisclosure } from '@/components'
import Link from 'next/link'
import { CSSProperties } from 'react'

const { Title, Paragraph, Text } = Typography

// Smooth scroll helper (works around Ant Design Layout scroll context issues)
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 500
  let startTime: number | null = null
  
  const easeOutQuad = (t: number) => t * (2 - t)
  
  const animate = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = easeOutQuad(progress)
    
    const scrollTo = startPosition + distance * easeProgress
    document.documentElement.scrollTop = scrollTo
    document.body.scrollTop = scrollTo
    
    if (elapsed < duration) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

export default function AboutPage() {
  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      
      {/* ================================================================== */}
      {/* HERO & FEATURES WRAPPER                                            */}
      {/* ================================================================== */}
      <div className="animate-gradient" style={{ 
        backgroundColor: neutral[50],
        backgroundImage: `linear-gradient(-45deg, ${neutral[50]}, ${primary[50]}, ${secondary[50]}, ${neutral[50]})`,
        position: 'relative',
        overflow: 'hidden'
      }}>

      {/* HERO SECTION - MAGAZINE STYLE */}
      <div style={{ 
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        position: 'relative'
      }}>
        {/* Decorative background elements */}
        <div className="animate-float" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 300,
          height: 300,
          background: secondary[100],
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          zIndex: 0
        }} />
        
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="animate-fade-up">
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
          </div>
          
          <Title className="animate-fade-up delay-100" style={{ 
            fontSize: 'clamp(48px, 8vw, 84px)', // Responsive massive font
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em',
            color: neutral[900]
          }}>
            Bring clarity to your <br/>
            <span className="text-gradient">community schedule.</span>
          </Title>
          
          <Paragraph className="animate-fade-up delay-200" style={{ 
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: 1.6,
            color: neutral[600],
            maxWidth: 700,
            margin: '0 auto 48px',
            fontWeight: 400
          }}>
            Built for Contributors coordinating events across communities, so Uri get clearer event visibility.
          </Paragraph>

          <div className="animate-fade-up delay-300" style={{ maxWidth: 760, margin: '-28px auto 40px' }}>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Text style={{ color: neutral[600] }}>
                <Text strong>Current phase:</Text> MVP (admin-first coordination).
              </Text>
              <Text style={{ color: neutral[600] }}>
                <Text strong>Contributor</Text> creates and manages events for a community. <Text strong>Uri</Text> views events relevant to them.
              </Text>
              <Text style={{ color: neutral[600] }}>
                This early release focuses on helping Contributors coordinate events. Features for Uri engagement will follow once this foundation is proven.
              </Text>
            </Space>
          </div>
          
          <Space size="large" wrap className="animate-fade-up delay-400" style={{ justifyContent: 'center' }}>
            <Button 
              type="primary" 
              size="large" 
              className="hover-scale"
              onClick={() => smoothScrollTo('features')}
              style={{ 
                height: 64, 
                padding: '0 48px', 
                fontSize: 18, 
                borderRadius: borderRadius.full,
                boxShadow: '0 10px 20px rgba(224, 123, 84, 0.3)'
              }}
            >
              Learn More
            </Button>
            <Button
              size="large"
              type="text"
              className="hover-scale"
              onClick={() => smoothScrollTo('our-vision')}
              style={{
                height: 64,
                padding: '0 32px',
                fontSize: 18,
                color: neutral[600],
                background: neutral[100],
                borderRadius: borderRadius.full,
              }}
            >
              Our Vision
            </Button>
          </Space>
        </div>
      </div>

      {/* ================================================================== */}
      {/* EDITORIAL FEATURES - ZIG ZAG                                       */}
      {/* ================================================================== */}
      <div id="features" style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Feature 1 */}
        <Row gutter={[64, 64]} align="middle" style={{ marginBottom: 120 }}>
          <Col xs={24} md={12} className="animate-fade-up">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -20,
                left: -20,
                width: 100,
                height: 100,
                background: primary[100],
                borderRadius: '50%',
                zIndex: 0
              }} />
              <Title level={2} style={{ fontSize: 'clamp(30px, 6vw, 48px)', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                Create with <br/>
                <span style={{ color: primary[500] }}>Confidence.</span>
              </Title>
              <Paragraph style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: neutral[600], lineHeight: 1.8 }}>
                No more spreadsheets or group chat chaos. Contributors can quickly create and update events for their community in a dedicated, purpose-built space.
              </Paragraph>
              <Space direction="vertical" size="middle" style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: primary[500], marginRight: 16 }} />
                  <Text style={{ fontSize: 18 }}>Simple event creation tools</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: primary[500], marginRight: 16 }} />
                  <Text style={{ fontSize: 18 }}>Instant updates for everyone</Text>
                </div>
              </Space>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="hover-lift" style={{ 
              background: '#fff',
              padding: 48,
              borderRadius: 32,
              boxShadow: shadow.lg,
              border: `1px solid ${neutral[100]}`,
              textAlign: 'center'
            }}>
              <div className="animate-float" style={{ 
                width: 120, 
                height: 120, 
                background: primary[50], 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 32px',
                color: primary[500],
                fontSize: 48
              }}>
                <RocketOutlined />
              </div>
              <Title level={4}>Streamlined Workflow</Title>
              <Text type="secondary">Designed for speed and simplicity.</Text>
            </div>
          </Col>
        </Row>

        {/* Feature 2 */}
        <Row gutter={[64, 64]} align="middle" style={{ flexDirection: 'row-reverse' }}>
          <Col xs={24} md={12} className="animate-fade-up">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: secondary[100],
                borderRadius: '50%',
                zIndex: 0
              }} />
              <Title level={2} style={{ fontSize: 'clamp(30px, 6vw, 48px)', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                Harmony in <br/>
                <span style={{ color: secondary[500] }}>Scheduling.</span>
              </Title>
              <Paragraph style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: neutral[600], lineHeight: 1.8 }}>
                Avoid the frustration of double-bookings. Huri Noa gives you a heads-up if your event overlaps with another community, helping us all work better together.
              </Paragraph>
              <Space direction="vertical" size="middle" style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyCertificateOutlined style={{ fontSize: 24, color: secondary[500], marginRight: 16 }} />
                  <Text style={{ fontSize: 18 }}>Smart clash detection</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyCertificateOutlined style={{ fontSize: 24, color: secondary[500], marginRight: 16 }} />
                  <Text style={{ fontSize: 18 }}>Respectful coordination</Text>
                </div>
              </Space>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="hover-lift" style={{ 
              background: '#fff',
              padding: 48,
              borderRadius: 32,
              boxShadow: shadow.lg,
              border: `1px solid ${neutral[100]}`,
              textAlign: 'center'
            }}>
              <div className="animate-float" style={{ 
                width: 120, 
                height: 120, 
                background: secondary[50], 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 32px',
                color: secondary[500],
                fontSize: 48,
                animationDelay: '1s'
              }}>
                <HeartOutlined />
              </div>
              <Title level={4}>Community First</Title>
              <Text type="secondary">Built to support our shared mana.</Text>
            </div>
          </Col>
        </Row>

      </div>
      </div> {/* End Wrapper */}

      {/* ================================================================== */}
      {/* WHAT YOU CAN DO NOW (FROM ABOUT2)                                  */}
      {/* ================================================================== */}
      <div style={{ padding: '100px 24px', background: '#fff', borderTop: `1px solid ${neutral[200]}`, borderBottom: `1px solid ${neutral[200]}` }}>
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
                className="hover-lift"
                variant="borderless"
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                styles={{ body: { padding: 0 } }}
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
                className="hover-lift"
                variant="borderless"
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                styles={{ body: { padding: 0 } }}
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
                className="hover-lift"
                variant="borderless"
                style={{ height: '100%', textAlign: 'center', boxShadow: 'none' }}
                styles={{ body: { padding: 0 } }}
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
      {/* COMING SOON - GRID                                                 */}
      {/* ================================================================== */}
      <div style={{ padding: '120px 24px', background: neutral[50] }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <Space align="center" style={{ marginBottom: 16 }}>
              <ClockCircleOutlined style={{ fontSize: 24, color: primary[400] }} />
              <Text style={{ fontSize: 16, fontWeight: 600, color: primary[500], textTransform: 'uppercase', letterSpacing: 1 }}>Roadmap</Text>
            </Space>
            <Title level={2} style={{ fontSize: 'clamp(28px, 6vw, 42px)', marginTop: 16 }}>We're just getting started</Title>
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
                  className="hover-lift"
                  variant="borderless"
                  style={{ height: '100%', borderRadius: 16 }}
                  styles={{ body: { padding: 32 } }}
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
      {/* OUR VISION (OPTIONAL FUNDERS)                                      */}
      {/* ================================================================== */}
      <FullWidthDisclosure
        id="our-vision"
        eyebrow="HURI NOA MVP"
        title="Our Vision"
        subtitle="For Funders - App Scope & Vision"
        description="Expand this section for a clear view of MVP scope, why certain features are deferred, the key risks to resolve, and what further funding unlocks."
        openLabel="View our Vision"
        closeLabel="Hide our Vision"
        floatingCard={
          <div
            style={{
              maxWidth: 900,
              margin: '0 auto',
              background: '#fff',
              borderRadius: 24,
              padding: '64px 48px',
              boxShadow: shadow.lg,
              border: `1px solid ${neutral[200]}`,
            }}
          >
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} md={10}>
                <Title level={3} style={{ fontSize: 32, marginBottom: 16 }}>About this MVP</Title>
                <div style={{ width: 60, height: 4, background: primary[500], borderRadius: 2 }} />
              </Col>
              <Col xs={24} md={14}>
                <Paragraph style={{ fontSize: 18, color: neutral[600], lineHeight: 1.8, marginBottom: 24 }}>
                  This early release is designed to solve one specific problem: <b>help contributors avoid schedule clashes</b>.
                </Paragraph>
                <Paragraph style={{ fontSize: 18, color: neutral[600], lineHeight: 1.8, marginBottom: 0 }}>
                  Advanced calendar sync is deferred, because .ics feeds are inherently shareable and pose privacy risks. This requires more careful consideration.
                </Paragraph>
              </Col>
            </Row>
          </div>
        }
      >
        {/* Quote */}
        <div style={{ padding: '64px 24px 120px', textAlign: 'center', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <BulbOutlined style={{ fontSize: 48, color: primary[500], marginBottom: 32 }} />
            <Title level={2} style={{ fontSize: 32, fontWeight: 400, fontStyle: 'italic', marginBottom: 32, lineHeight: 1.4 }}>
              "The biggest problem is when communities pick the same date. We need to see what's already happening."
            </Title>
            <Text style={{ fontSize: 16, fontWeight: 600, color: neutral[500], textTransform: 'uppercase', letterSpacing: 1 }}>
              — Mina Mathieson, Kia Rewa Foundation
            </Text>
          </div>
        </div>

        {/* MVP Journeys */}
        <div style={{ background: neutral[50], padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Title level={2} style={{ marginBottom: 8 }}>MVP User Journeys (Current Phase)</Title>
              <Paragraph style={{ fontSize: 18, color: neutral[500], marginBottom: 0 }}>
                These are the journeys included in the MVP. These will expand in the next phase post-funding.
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Card variant="borderless" style={{ height: '100%', borderRadius: 24, border: `1px solid ${neutral[200]}` }} styles={{ body: { padding: 40 } }}>
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
                      { title: 'Login', description: 'Access the contributor workspace' },
                      { title: 'Create Event', description: 'Enter details for upcoming community event' },
                      { title: 'Clash Detection', description: 'See overlaps as a visibility warning' },
                      { title: 'Publish', description: 'Event becomes visible to relevant uri' },
                    ]}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card variant="borderless" style={{ height: '100%', borderRadius: 24, border: `1px solid ${neutral[200]}` }} styles={{ body: { padding: 40 } }}>
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
                      { title: 'Login', description: 'Permissioned access via pilot onboarding' },
                      { title: 'View Events', description: 'See events relevant to their linked communities' },
                      { title: 'Done', description: 'Clear visibility, no additional workflow burden' },
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* MVP Technical Architecture */}
        <div style={{ background: neutral[900], color: '#fff', padding: '100px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: 64 }}>MVP Technical Architecture (Current Phase)</Title>

            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={8}>
                <Card style={{ background: neutral[800], border: 'none', height: '100%' }} styles={{ body: { padding: 32 } }}>
                  <Title level={4} style={{ color: '#fff', marginBottom: 16 }}>Manual Import</Title>
                  <Paragraph style={{ color: neutral[400], marginBottom: 0 }}>
                    Users (Contributors + Uri) are imported and linked to specific communities.
                  </Paragraph>
                </Card>
              </Col>

              <Col xs={24} md={2} style={{ textAlign: 'center' }}>
                <ArrowRightOutlined style={{ fontSize: 24, color: neutral[500], transform: 'rotate(90deg)' }} />
              </Col>

              <Col xs={24} md={14}>
                <Card style={{ background: neutral[800], border: 'none', height: '100%' }} styles={{ body: { padding: 32 } }}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', gap: 20 }}>
                      <SafetyCertificateOutlined style={{ fontSize: 22, color: primary[500], marginTop: 4 }} />
                      <div>
                        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>Contributor Action</Text>
                        <Paragraph style={{ color: neutral[400], margin: 0, marginTop: 4 }}>
                          Creates events. Conflict detection runs immediately.
                        </Paragraph>
                      </div>
                    </div>
                    <Divider style={{ borderColor: neutral[700], margin: '12px 0' }} />
                    <div style={{ display: 'flex', gap: 20 }}>
                      <TeamOutlined style={{ fontSize: 22, color: tertiary[500], marginTop: 4 }} />
                      <div>
                        <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>Uri View</Text>
                        <Paragraph style={{ color: neutral[400], margin: 0, marginTop: 4 }}>
                          Sees events across their linked communities.
                        </Paragraph>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* MVP Scope */}
        <div style={{ padding: '100px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Title level={2} style={{ marginBottom: 8 }}>For Funders: MVP Focus & Scope</Title>
              <Paragraph style={{ fontSize: 18, color: neutral[500], maxWidth: 860, margin: '0 auto' }}>
                The MVP proves admin-first coordination value before expanding into deeper engagement tooling.
              </Paragraph>
            </div>

            <Row gutter={[48, 48]}>
              <Col xs={24} md={12}>
                <Card
                  title={<Space><CheckCircleFilled style={{ color: tertiary[500] }} /> In Scope (The Focus)</Space>}
                  variant="outlined"
                  style={{ height: '100%', borderRadius: 16, border: `1px solid ${neutral[200]}`, boxShadow: 'none' }}
                  styles={{ body: { padding: 32 } }}
                >
                  <Paragraph type="secondary" style={{ marginBottom: 24 }}>
                    What we're delivering in the MVP:
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
                  title={<Space><CloseCircleFilled style={{ color: secondary[500] }} /> Out of Scope (Post Funding)</Space>}
                  variant="outlined"
                  style={{ height: '100%', borderRadius: 16, border: `1px solid ${neutral[200]}`, boxShadow: 'none' }}
                  styles={{ body: { padding: 32 } }}
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
                    "It's important that events across different communities aren't public. Uri need to see what's relevant to them..."
                    <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, fontStyle: 'normal' }}>— Mina Mathieson, Kia Rewa Foundation</div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* Risks */}
        <div style={{ padding: '100px 24px', background: neutral[50] }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Title level={2} style={{ marginBottom: 8 }}>Key Risks & Mitigations</Title>
              <Paragraph style={{ color: neutral[500], fontSize: 18, marginBottom: 0 }}>
                Key delivery and adoption risks, with practical mitigations.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
              {[
                { title: 'Scope creep', desc: 'Strict MVP boundaries now; roadmap for later phases.' },
                { title: 'Permissions complexity', desc: 'Prove coordination first; design a permissions model next (community + role + approval pathways).' },
                { title: 'Privacy/security (shareable calendars)', desc: 'No universal .ics in MVP; access remains permissioned via login.' },
                { title: 'Adoption risk', desc: 'Start with contributors; minimise workflow friction; validate with pilot communities.' },
              ].map((risk, i) => (
                <Col xs={24} md={12} key={i}>
                  <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: `1px solid ${neutral[200]}`, height: '100%' }}>
                    <Space align="start" style={{ marginBottom: 8 }}>
                      <WarningFilled style={{ color: secondary[500], fontSize: 18, marginTop: 4 }} />
                      <Text strong style={{ color: neutral[800], fontSize: 16 }}>{risk.title}</Text>
                    </Space>
                    <Paragraph style={{ color: neutral[600], margin: 0, paddingLeft: 26 }}>{risk.desc}</Paragraph>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Funding unlocks + key questions */}
        <div style={{ padding: '100px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <Title level={2} style={{ marginBottom: 8 }}>What Further Funding Unlocks (Next Phase)</Title>
              <Paragraph style={{ color: neutral[600], fontSize: 18, maxWidth: 860, margin: '0 auto' }}>
                Funding enables the next phase: strengthening permissions and onboarding, and exploring privacy-safe ways to deliver calendar access.
              </Paragraph>
            </div>

            <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
              {[
                { title: 'Permissions by community + role', desc: 'Approval pathways and visibility boundaries.' },
                { title: 'Secure onboarding', desc: 'Self-registration where appropriate, backed by governance.' },
                { title: 'Controlled calendar delivery', desc: 'A privacy-safe model (if/when .ics is appropriate).' },
                { title: 'RSVP / reminders', desc: 'Only if validated by pilot communities.' },
              ].map((item, i) => (
                <Col xs={24} sm={12} key={i}>
                  <Card
                    variant="outlined"
                    style={{ height: '100%', borderRadius: 16, border: `1px solid ${neutral[200]}`, boxShadow: 'none' }}
                    styles={{ body: { padding: 24 } }}
                  >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <CheckCircleOutlined style={{ color: tertiary[500], fontSize: 20, marginTop: 2 }} />
                      <div>
                        <Text strong style={{ color: neutral[800], fontSize: 16, display: 'block', marginBottom: 8 }}>{item.title}</Text>
                        <Text style={{ color: neutral[600] }}>{item.desc}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card
              variant="outlined"
              style={{ borderRadius: 16, border: `1px solid ${neutral[200]}`, background: neutral[50], boxShadow: 'none' }}
              styles={{ body: { padding: 28 } }}
            >
              <Space align="center" style={{ marginBottom: 12 }}>
                <BulbOutlined style={{ color: secondary[500], fontSize: 24 }} />
                <Title level={3} style={{ margin: 0 }}>Key Considerations</Title>
              </Space>
              <Paragraph style={{ color: neutral[600], marginBottom: 20 }}>
                The next phase clarifies key decisions required to deliver safely and at scale:
              </Paragraph>
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <Text style={{ color: neutral[700] }}>• Advanced permissions (who can see what, and when)</Text>
                <Text style={{ color: neutral[700] }}>• Approval workflows (community boundaries, governance, whakapapa-linked processes where appropriate)</Text>
                <Text style={{ color: neutral[700] }}>• Privacy-safe calendar delivery model (including conditions for .ics)</Text>
                <Text style={{ color: neutral[700] }}>• Uri onboarding pathways (who invites, who approves)</Text>
                <Text style={{ color: neutral[700] }}>• Change management and adoption support for contributors</Text>
              </Space>
            </Card>
          </div>
        </div>
      </FullWidthDisclosure>

      {/* ================================================================== */}
      {/* EXPLORE THE MVP                                                    */}
      {/* ================================================================== */}
      <div style={{ 
        padding: '80px 24px', 
        background: neutral[900], 
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', marginBottom: 12 }}>
            Explore the MVP
          </Title>
          <Paragraph style={{ color: neutral[400], fontSize: 18, marginBottom: 40 }}>
            Jump into the story, or open the Contributor and Uri experiences.
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                className="hover-lift"
                variant="borderless"
                style={{ height: '100%', borderRadius: 16, background: neutral[800], textAlign: 'left' }}
                styles={{ body: { padding: 28 } }}
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
                    View the events from your linked communities.
                  </Text>
                  <Link href="/app" style={{ alignSelf: 'flex-start' }}>
                    <Button type="primary">
                      Open Uri <ArrowRightOutlined />
                    </Button>
                  </Link>
                </Space>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                className="hover-lift"
                variant="borderless"
                style={{ height: '100%', borderRadius: 16, background: neutral[800], textAlign: 'left' }}
                styles={{ body: { padding: 28 } }}
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
          </Row>
        </div>
      </div>

    </div>
  )
}
