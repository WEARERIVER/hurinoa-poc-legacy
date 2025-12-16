'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  Space,
  Typography,
  Tabs,
  Alert,
  Row,
  Col,
  Divider,
  Table,
  Button,
  Tag,
  Badge,
  Avatar,
  Tooltip,
  Progress,
  Input,
  Select,
  Checkbox,
  Switch,
  Form,
  Radio,
  DatePicker,
  Slider,
  Rate,
  Modal,
  Descriptions,
  Grid,
  Timeline,
  Steps,
  Statistic,
  Skeleton,
  Empty,
  Result,
  Spin,
  Popconfirm,
  Dropdown,
  InputNumber,
  TimePicker,
  Upload,
  Segmented,
  List,
  Cascader,
  App,
} from 'antd'
import {
  CheckCircleOutlined,
  BulbOutlined,
  CodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  AppstoreOutlined,
  FormOutlined,
  DatabaseOutlined,
  UserOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  CalendarOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  StarOutlined,
  DownOutlined,
  UploadOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  SmileOutlined,
  HeartOutlined,
  SettingOutlined,
  BellOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@/components'
import { getNavItem } from '@/lib/navigation'
import { primary, secondary, neutral, semantic, fontFamily, fontSize, headings, layout, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { useBreakpoint } = Grid

const navItem = getNavItem('design')!

// ============================================================================
// MODERN DESIGN STYLES
// ============================================================================

const gradients = {
  hero: `linear-gradient(135deg, ${primary[500]} 0%, ${primary[400]} 50%, ${secondary[400]} 100%)`,
  heroSubtle: `linear-gradient(135deg, ${primary[50]} 0%, #ffffff 50%, ${secondary[50]} 100%)`,
  blueCard: `linear-gradient(145deg, ${primary[50]} 0%, #ffffff 100%)`,
  greenCard: `linear-gradient(145deg, ${secondary[50]} 0%, #ffffff 100%)`,
  purpleCard: `linear-gradient(145deg, #f5f0ff 0%, #ffffff 100%)`,
  warmCard: `linear-gradient(145deg, #fff7e6 0%, #ffffff 100%)`,
  mintCard: `linear-gradient(145deg, #e6fffb 0%, #ffffff 100%)`,
  neutralCard: `linear-gradient(145deg, ${neutral[50]} 0%, #ffffff 100%)`,
}

const modernCardStyle = {
  borderRadius: borderRadius.xl,
  border: `1px solid ${neutral[100]}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function Section({ title, children, icon, gradient }: { 
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  gradient?: string 
}) {
  return (
    <Card style={{ 
      marginBottom: layout.cardGap,
      ...modernCardStyle,
      background: gradient || '#fff',
    }}>
      <Title level={4} style={{ marginBottom: layout.cardGap, display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon}
        {title}
      </Title>
      {children}
    </Card>
  )
}

function GradientHero({ 
  title, 
  subtitle, 
  gradient = gradients.hero,
  compact = false,
}: { 
  title: React.ReactNode
  subtitle: string
  gradient?: string
  compact?: boolean
}) {
  const isDark = gradient === gradients.hero
  return (
    <Card style={{ 
      background: gradient, 
      border: 'none',
      borderRadius: borderRadius.xl,
      boxShadow: isDark ? '0 4px 20px rgba(64, 126, 254, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ textAlign: 'center', padding: compact ? '16px 8px' : '32px 16px' }}>
        <div style={{ marginBottom: 8 }}>{title}</div>
        <Paragraph style={{ 
          color: isDark ? 'rgba(255,255,255,0.9)' : neutral[600], 
          fontSize: fontSize.base, 
          margin: 0,
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {subtitle}
        </Paragraph>
      </div>
    </Card>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient = gradients.blueCard 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
}) {
  return (
    <Card style={{ 
      ...modernCardStyle,
      background: gradient,
      height: '100%',
    }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <Text strong style={{ display: 'block', marginBottom: 4 }}>{title}</Text>
      <Text type="secondary" style={{ fontSize: fontSize.sm }}>{description}</Text>
    </Card>
  )
}

function ColourSwatch({
  colour,
  label,
  showHex = true,
}: {
  colour: string
  label: string
  showHex?: boolean
}) {
  return (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <div
        style={{
          width: 48,
          height: 48,
          backgroundColor: colour,
          borderRadius: borderRadius.md,
          marginBottom: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: colour === '#ffffff' || colour === neutral[50] ? `1px solid ${neutral[200]}` : 'none',
        }}
      />
      <Text strong style={{ fontSize: fontSize.xs, display: 'block' }}>{label}</Text>
      {showHex && <Text type="secondary" style={{ fontSize: 10 }}>{colour}</Text>}
    </div>
  )
}

function ColourPalette({
  name,
  palette,
  usage,
}: {
  name: string
  palette: Record<string, string>
  usage: string
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <Text strong style={{ fontSize: 16 }}>{name}</Text>
        <br />
        <Text type="secondary">{usage}</Text>
      </div>
      <Space wrap size={12}>
        {Object.entries(palette).map(([key, value]) => (
          <ColourSwatch key={key} colour={value} label={key} />
        ))}
      </Space>
    </div>
  )
}

// ============================================================================
// TAB CONTENT: OVERVIEW
// ============================================================================

function OverviewTab() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero Section */}
      <GradientHero
        gradient={gradients.hero}
        title={
          <Title level={3} style={{ margin: 0, color: '#fff' }}>
            <BgColorsOutlined style={{ marginRight: 8 }} />
            Design System
          </Title>
        }
        subtitle="A comprehensive guide to colors, typography, components, and patterns used throughout this application."
      />

      {/* Design Principles */}
      <Section title="Design Principles" icon={<StarOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <FeatureCard
              icon={<CheckCircleOutlined style={{ fontSize: 24, color: primary[500] }} />}
              title="Enterprise-first"
              description="Professional and trustworthy. Calm, readable interfaces without flashy effects."
              gradient={gradients.blueCard}
            />
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard
              icon={<ThunderboltOutlined style={{ fontSize: 24, color: secondary[500] }} />}
              title="Token-driven"
              description="Colors, typography, spacing defined centrally—consistent across the app."
              gradient={gradients.greenCard}
            />
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard
              icon={<RocketOutlined style={{ fontSize: 24, color: '#8b5cf6' }} />}
              title="AI-safe"
              description="Changes made centrally propagate consistently. No scattered magic values."
              gradient={gradients.purpleCard}
            />
          </Col>
        </Row>
      </Section>

      {/* Ant Design + Theming */}
      <Section title="Ant Design + Theming" icon={<CodeOutlined style={{ color: primary[500] }} />}>
        <Paragraph>
          This project uses <Text strong>Ant Design</Text> as the component foundation. The look & feel
          is controlled through a centralised theme configuration.
        </Paragraph>
        <Alert
          type="info"
          showIcon
          icon={<BulbOutlined />}
          style={{ marginBottom: 16, borderRadius: borderRadius.md }}
          message="How theming works"
          description={
            <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
              <li>Core values are represented as <strong>tokens</strong> (primary colour, font, border radius, spacing)</li>
              <li>Tokens are defined once and applied globally via Ant Design's ConfigProvider</li>
              <li>Changing a token updates the entire application consistently</li>
            </ul>
          }
        />
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: gradients.blueCard, borderRadius: borderRadius.lg }}>
              <Title level={5} style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CodeOutlined style={{ color: primary[500] }} />
                Source of Truth
              </Title>
              <Space direction="vertical" size={4}>
                <div>
                  <Text type="secondary">Token definitions:</Text>
                  <br />
                  <Text code>theme/tokens.ts</Text>
                </div>
                <div>
                  <Text type="secondary">Ant Design config:</Text>
                  <br />
                  <Text code>theme/themeConfig.ts</Text>
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: gradients.warmCard, borderRadius: borderRadius.lg }}>
              <Title level={5} style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <BulbOutlined style={{ color: '#f59e0b' }} />
                How to Change via AI
              </Title>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                <li style={{ marginBottom: 4 }}>Update token values in <Text code>theme/tokens.ts</Text></li>
                <li style={{ marginBottom: 4 }}>Refresh and review the Colours / Typography tabs</li>
                <li style={{ marginBottom: 4 }}>Check one UI screen (Dashboard) for regressions</li>
                <li>Iterate until satisfied</li>
              </ol>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Quick Reference */}
      <Section title="Quick Reference" icon={<AppstoreOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: primary[500], 
                  borderRadius: borderRadius.md,
                  boxShadow: '0 2px 8px rgba(64, 126, 254, 0.3)',
                }} />
                <div>
                  <Text strong>Primary</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{primary[500]}</Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: secondary[500], 
                  borderRadius: borderRadius.md,
                  boxShadow: '0 2px 8px rgba(4, 176, 158, 0.3)',
                }} />
                <div>
                  <Text strong>Secondary</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{secondary[500]}</Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  backgroundColor: neutral[500], 
                  borderRadius: borderRadius.md,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }} />
                <div>
                  <Text strong>Neutral</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{neutral[500]}</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: COLOURS
// ============================================================================

function ColoursTab() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <BgColorsOutlined style={{ marginRight: 8, color: primary[500] }} />
            Colour System
          </Title>
        }
        subtitle="All colours are defined as tokens and accessed from theme/tokens.ts"
        compact
      />

      <Section title="Core Colour Palettes" icon={<BgColorsOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Each colour has a full scale from light (50) to dark (900). The 500 value is the base.
        </Paragraph>
        <ColourPalette
          name="Primary"
          palette={primary}
          usage="Actions, links, focus states, interactive elements"
        />
        <ColourPalette
          name="Secondary"
          palette={secondary}
          usage="Success states, positive actions, confirmations"
        />
        <ColourPalette
          name="Neutral"
          palette={neutral}
          usage="Text, borders, backgrounds, disabled states"
        />
      </Section>

      <Section title="Semantic Colours" icon={<CheckCircleOutlined style={{ color: semantic.success.base }} />}>
        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Feedback colours for system states. Used in alerts, badges, and validation.
        </Paragraph>
        <Row gutter={[24, 24]}>
          {Object.entries(semantic).map(([name, values]) => (
            <Col xs={12} sm={6} key={name}>
              <Card size="small" style={{ 
                ...modernCardStyle, 
                background: name === 'success' ? gradients.greenCard : 
                           name === 'error' ? gradients.warmCard :
                           name === 'warning' ? `linear-gradient(145deg, #fffbe6 0%, #ffffff 100%)` :
                           gradients.blueCard,
              }}>
                <Text strong style={{ textTransform: 'capitalize', display: 'block', marginBottom: 12 }}>{name}</Text>
                <Space size={8}>
                  <ColourSwatch colour={values.light} label="Light" />
                  <ColourSwatch colour={values.base} label="Base" />
                  <ColourSwatch colour={values.dark} label="Dark" />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Section>

      <Section title="Colour Usage Guide" icon={<BulbOutlined style={{ color: '#f59e0b' }} />}>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 450 }}
          style={{ borderRadius: borderRadius.md, overflow: 'hidden' }}
          dataSource={[
            { key: '1', token: 'Primary', use: 'Buttons, links, active navigation, focus rings', avoid: 'Large background areas' },
            { key: '2', token: 'Secondary', use: 'Success messages, positive actions, confirmations', avoid: 'Primary actions' },
            { key: '3', token: 'Neutral 50-200', use: 'Backgrounds, cards, subtle dividers', avoid: 'Text (low contrast)' },
            { key: '4', token: 'Neutral 500-900', use: 'Body text, headings, icons', avoid: 'Backgrounds (too dark)' },
            { key: '5', token: 'Semantic', use: 'Alerts, validation, status badges', avoid: 'Decorative elements' },
          ]}
          columns={[
            { title: 'Token', dataIndex: 'token', key: 'token', width: 120 },
            { title: 'Use for', dataIndex: 'use', key: 'use' },
            { title: 'Avoid', dataIndex: 'avoid', key: 'avoid' },
          ]}
        />
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: TYPOGRAPHY
// ============================================================================

function TypographyTab() {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <FontSizeOutlined style={{ marginRight: 8, color: primary[500] }} />
            Typography
          </Title>
        }
        subtitle="Consistent type scale for readability and visual hierarchy"
        compact
      />

      <Section title="Font Family" icon={<FontSizeOutlined style={{ color: primary[500] }} />}>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: gradients.blueCard, borderRadius: borderRadius.lg }}>
              <Text strong style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>Inter</Text>
              <Text type="secondary">
                A clean, modern sans-serif designed for screen readability.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ backgroundColor: neutral[800], borderRadius: borderRadius.lg }}>
              <Text code style={{ fontSize: 12, color: neutral[100], background: 'transparent' }}>{fontFamily.base}</Text>
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Heading Scale" icon={<AppstoreOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Headings use Ant Design's Title component with consistent sizing and weight.
        </Paragraph>
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          {[1, 2, 3, 4, 5].map((level) => {
            const heading = headings[`h${level}` as keyof typeof headings]
            return (
              <Card key={level} size="small" style={{ 
                ...modernCardStyle, 
                background: level === 1 ? gradients.blueCard : 
                           level === 2 ? gradients.greenCard :
                           level === 3 ? gradients.purpleCard :
                           level === 4 ? gradients.warmCard :
                           gradients.neutralCard,
              }}>
                <Row align="middle" gutter={24}>
                  <Col xs={24} md={16}>
                    <Title level={level as 1 | 2 | 3 | 4 | 5} style={{ margin: 0 }}>
                      The quick brown fox
                    </Title>
                  </Col>
                  <Col xs={24} md={8}>
                    <Tag color="blue">H{level}</Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {heading.fontSize}px · {heading.fontWeight} weight
                    </Text>
                  </Col>
                </Row>
              </Card>
            )
          })}
        </Space>
      </Section>

      <Section title="Body Text Styles" icon={<CodeOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard, height: '100%' }}>
              <Tag color="blue" style={{ marginBottom: 8 }}>Body</Tag>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                {fontSize.base}px
              </Text>
              <Paragraph style={{ margin: 0 }}>
                The quick brown fox jumps over the lazy dog. This is regular body text.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard, height: '100%' }}>
              <Tag style={{ marginBottom: 8 }}>Secondary</Tag>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                Muted text
              </Text>
              <Paragraph type="secondary" style={{ margin: 0 }}>
                Secondary text for supporting information, hints, and captions.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.warmCard, height: '100%' }}>
              <Tag color="orange" style={{ marginBottom: 8 }}>Small</Tag>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                {fontSize.xs}px
              </Text>
              <Text style={{ fontSize: fontSize.xs }}>
                Small text for captions, timestamps, or metadata.
              </Text>
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Font Size Scale" icon={<BulbOutlined style={{ color: '#f59e0b' }} />}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {Object.entries(fontSize).map(([key, size]) => (
            <Card key={key} size="small" style={{ ...modernCardStyle }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Tag color="blue" style={{ minWidth: 50, textAlign: 'center' }}>{key}</Tag>
                <Text type="secondary" style={{ width: 50 }}>{size}px</Text>
                <Text style={{ fontSize: size }}>The quick brown fox</Text>
              </div>
            </Card>
          ))}
        </Space>
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: COMPONENTS
// ============================================================================

function ComponentsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const dropdownItems = [
    { key: '1', label: 'Edit', icon: <EditOutlined /> },
    { key: '2', label: 'Duplicate', icon: <CopyOutlined /> },
    { key: '3', label: 'Share', icon: <ShareAltOutlined /> },
    { type: 'divider' as const },
    { key: '4', label: 'Delete', icon: <DeleteOutlined />, danger: true },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <AppstoreOutlined style={{ marginRight: 8, color: primary[500] }} />
            Components
          </Title>
        }
        subtitle="UI building blocks from Ant Design, styled with our theme"
        compact
      />

      {/* Buttons Section - Expanded */}
      <Section title="Buttons" icon={<AppstoreOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Variants</Text>
              <Space wrap>
                <Button type="primary">Primary</Button>
                <Button style={{ backgroundColor: secondary[500], borderColor: secondary[500], color: '#fff' }}>
                  Secondary
                </Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button type="link">Link</Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Sizes</Text>
              <Space wrap>
                <Button type="primary" size="large">Large</Button>
                <Button type="primary">Default</Button>
                <Button type="primary" size="small">Small</Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>With Icons</Text>
              <Space wrap>
                <Button type="primary" icon={<PlusOutlined />}>Add New</Button>
                <Button icon={<DownloadOutlined />}>Download</Button>
                <Button type="primary" icon={<SearchOutlined />} />
                <Button icon={<SettingOutlined />} />
                <Button type="text" icon={<MoreOutlined />} />
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.warmCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>States & Danger</Text>
              <Space wrap>
                <Button type="primary" loading>Loading</Button>
                <Button type="primary" disabled>Disabled</Button>
                <Button danger>Danger</Button>
                <Button type="primary" danger>Delete</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Button Groups & Actions */}
      <Section title="Button Patterns" icon={<ThunderboltOutlined style={{ color: secondary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Button Group</Text>
              <Button.Group>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
              </Button.Group>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Dropdown Button</Text>
              <Space>
                <Dropdown menu={{ items: dropdownItems }}>
                  <Button>
                    Actions <DownOutlined />
                  </Button>
                </Dropdown>
                <Dropdown.Button menu={{ items: dropdownItems }}>
                  Submit
                </Dropdown.Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Confirm Action</Text>
              <Popconfirm
                title="Delete item?"
                description="This action cannot be undone."
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<DeleteOutlined />}>Delete</Button>
              </Popconfirm>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Cards Section - Expanded */}
      <Section title="Cards" icon={<DatabaseOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card title="Basic Card" size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text>Card content goes here. Use cards to group related information.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              title="With Actions" 
              size="small" 
              extra={<Button type="link" size="small">More</Button>}
              style={{ ...modernCardStyle, height: '100%' }}
            >
              <Text>Cards can have header actions for quick navigation.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              size="small" 
              hoverable 
              style={{ ...modernCardStyle, background: gradients.mintCard, height: '100%' }}
              cover={<div style={{ height: 60, background: gradients.hero }} />}
            >
              <Text strong>Card with Cover</Text>
              <br />
              <Text type="secondary">Image or colored header.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              size="small"
              style={{ ...modernCardStyle }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: primary[500] }} />}
                title="Card with Actions"
                description="Footer actions for quick operations"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card size="small" style={{ ...modernCardStyle }}>
              <Skeleton avatar active paragraph={{ rows: 2 }} />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Data Display */}
      <Section title="Data Display" icon={<DatabaseOutlined style={{ color: '#8b5cf6' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Statistics</Text>
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic title="Users" value={1128} />
                </Col>
                <Col span={8}>
                  <Statistic title="Revenue" value={9280} prefix="$" />
                </Col>
                <Col span={8}>
                  <Statistic title="Growth" value={12.5} suffix="%" valueStyle={{ color: semantic.success.base }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Descriptions</Text>
              <Descriptions size="small" column={2}>
                <Descriptions.Item label="Name">John Doe</Descriptions.Item>
                <Descriptions.Item label="Role">Admin</Descriptions.Item>
                <Descriptions.Item label="Email">john@example.com</Descriptions.Item>
                <Descriptions.Item label="Status"><Badge status="success" text="Active" /></Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Timeline & Steps */}
      <Section title="Timeline & Steps" icon={<ClockCircleOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Timeline</Text>
              <Timeline
                items={[
                  { color: 'green', children: 'Create project 2024-01-01' },
                  { color: 'blue', children: 'Technical review 2024-01-15' },
                  { color: 'blue', children: 'Development started 2024-02-01' },
                  { color: 'gray', children: 'Launch (pending)' },
                ]}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Steps</Text>
              <Steps
                size="small"
                current={1}
                items={[
                  { title: 'Setup' },
                  { title: 'Configure' },
                  { title: 'Deploy' },
                ]}
              />
              <Divider style={{ margin: '16px 0' }} />
              <Steps
                size="small"
                current={2}
                status="error"
                items={[
                  { title: 'Order' },
                  { title: 'Pay' },
                  { title: 'Ship', status: 'error' },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Alerts & Feedback - Expanded */}
      <Section title="Alerts & Feedback" icon={<BulbOutlined style={{ color: '#f59e0b' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Alert message="Info" description="Informational note with details." type="info" showIcon style={{ borderRadius: borderRadius.md }} />
              <Alert message="Success" description="Operation completed successfully." type="success" showIcon style={{ borderRadius: borderRadius.md }} />
              <Alert message="Warning" description="Please review before continuing." type="warning" showIcon style={{ borderRadius: borderRadius.md }} />
              <Alert message="Error" description="Something went wrong." type="error" showIcon style={{ borderRadius: borderRadius.md }} />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Alert message="Closable alert" type="info" closable style={{ borderRadius: borderRadius.md }} />
              <Alert 
                message="With action" 
                type="warning" 
                action={<Button size="small" type="text">Fix Now</Button>}
                style={{ borderRadius: borderRadius.md }} 
              />
              <Card size="small" style={{ ...modernCardStyle }}>
                <Text strong style={{ display: 'block', marginBottom: 12 }}>Loading States</Text>
                <Space size={24}>
                  <Spin size="small" />
                  <Spin />
                  <Spin size="large" />
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Section>

      {/* Empty & Result States */}
      <Section title="Empty & Result States" icon={<ExclamationCircleOutlined style={{ color: neutral[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Empty description="No data available" />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Result
                status="success"
                title="Done!"
                subTitle="Operation completed"
                style={{ padding: 12 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Result
                status="error"
                title="Failed"
                subTitle="Please try again"
                style={{ padding: 12 }}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Tags & Badges - Expanded */}
      <Section title="Tags & Badges" icon={<CheckCircleOutlined style={{ color: secondary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Status Tags</Text>
              <Space wrap>
                <Tag>Default</Tag>
                <Tag color="blue">Info</Tag>
                <Tag color="green">Success</Tag>
                <Tag color="orange">Warning</Tag>
                <Tag color="red">Error</Tag>
                <Tag color="purple">Special</Tag>
              </Space>
              <Divider style={{ margin: '12px 0' }} />
              <Text strong style={{ display: 'block', marginBottom: 12 }}>With Icons</Text>
              <Space wrap>
                <Tag icon={<CheckCircleOutlined />} color="success">Verified</Tag>
                <Tag icon={<ClockCircleOutlined />} color="processing">Pending</Tag>
                <Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>
                <Tag icon={<ExclamationCircleOutlined />} color="warning">Review</Tag>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Badges</Text>
              <Space size={24} wrap>
                <Badge count={5}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
                <Badge count={99}>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
                <Badge count={100} overflowCount={99}>
                  <Avatar shape="square" icon={<MailOutlined />} />
                </Badge>
                <Badge dot>
                  <Avatar shape="square" icon={<BellOutlined />} />
                </Badge>
              </Space>
              <Divider style={{ margin: '12px 0' }} />
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Status Badges</Text>
              <Space direction="vertical">
                <Badge status="success" text="Online" />
                <Badge status="processing" text="Running" />
                <Badge status="warning" text="Warning" />
                <Badge status="error" text="Offline" />
                <Badge status="default" text="Default" />
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Avatars & Progress */}
      <Section title="Avatars & Progress" icon={<UserOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Avatar Variants</Text>
              <Space size={16} wrap>
                <Avatar size={64} icon={<UserOutlined />} />
                <Avatar size="large" style={{ backgroundColor: primary[500] }}>JD</Avatar>
                <Avatar style={{ backgroundColor: secondary[500] }}>A</Avatar>
                <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
              </Space>
              <Divider style={{ margin: '12px 0' }} />
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Avatar Group</Text>
              <Avatar.Group maxCount={4} size="large">
                <Avatar style={{ backgroundColor: primary[500] }}>A</Avatar>
                <Avatar style={{ backgroundColor: secondary[500] }}>B</Avatar>
                <Avatar style={{ backgroundColor: '#f56a00' }}>C</Avatar>
                <Avatar style={{ backgroundColor: '#7265e6' }}>D</Avatar>
                <Avatar style={{ backgroundColor: '#ffbf00' }}>E</Avatar>
              </Avatar.Group>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Progress Indicators</Text>
              <Space size={16} wrap>
                <Progress type="circle" percent={75} size={60} />
                <Progress type="circle" percent={100} size={60} />
                <Progress type="circle" percent={30} size={60} status="exception" />
                <Progress type="dashboard" percent={66} size={60} />
              </Space>
              <Divider style={{ margin: '12px 0' }} />
              <Progress percent={30} />
              <Progress percent={70} status="active" />
              <Progress percent={100} />
              <Progress percent={50} status="exception" />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Modal Demo */}
      <Section title="Modals & Overlays" icon={<AppstoreOutlined style={{ color: '#8b5cf6' }} />}>
        <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard }}>
          <Space wrap>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Button onClick={() => Modal.info({ title: 'Info', content: 'This is an info modal.' })}>
              Info Modal
            </Button>
            <Button onClick={() => Modal.success({ title: 'Success', content: 'Operation completed!' })}>
              Success Modal
            </Button>
            <Button danger onClick={() => Modal.confirm({ 
              title: 'Confirm Delete', 
              content: 'Are you sure you want to delete this?',
              okText: 'Delete',
              okButtonProps: { danger: true },
            })}>
              Confirm Modal
            </Button>
          </Space>
        </Card>
        <Modal
          title="Example Modal"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        >
          <p>This is a basic modal with default footer buttons.</p>
          <p>Modals are great for forms, confirmations, and focused tasks.</p>
        </Modal>
      </Section>

      {/* Tooltips */}
      <Section title="Tooltips" icon={<BulbOutlined style={{ color: primary[500] }} />}>
        <Card size="small" style={{ ...modernCardStyle, background: gradients.warmCard }}>
          <Space wrap size={16}>
            <Tooltip title="Helpful information">
              <Button>Hover me</Button>
            </Tooltip>
            <Tooltip title="Top" placement="top">
              <Button>Top</Button>
            </Tooltip>
            <Tooltip title="Right" placement="right">
              <Button>Right</Button>
            </Tooltip>
            <Tooltip title="Bottom" placement="bottom">
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip title="Left" placement="left">
              <Button>Left</Button>
            </Tooltip>
          </Space>
        </Card>
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: FORMS
// ============================================================================

function FormsTab() {
  const [form] = Form.useForm()
  const [searchForm] = Form.useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { message } = App.useApp()

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        message.success('Form submitted successfully!')
        console.log('Form values:', values)
      })
      .catch(() => {
        message.error('Please fix the form errors')
      })
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <FormOutlined style={{ marginRight: 8, color: primary[500] }} />
            Forms
          </Title>
        }
        subtitle="Form controls, validation states, and common input patterns"
        compact
      />

      {/* Complete Form Example */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Section title="Complete Form" icon={<FormOutlined style={{ color: primary[500] }} />} gradient={gradients.blueCard}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true, notifications: true }}
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="you@example.com" />
              </Form.Item>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please select a department' }]}
              >
                <Select placeholder="Select department">
                  <Select.Option value="engineering">Engineering</Select.Option>
                  <Select.Option value="design">Design</Select.Option>
                  <Select.Option value="product">Product</Select.Option>
                  <Select.Option value="marketing">Marketing</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <TextArea rows={3} placeholder="Tell us about yourself..." showCount maxLength={200} />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember my preferences</Checkbox>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handleSubmit}>Submit</Button>
                  <Button onClick={() => form.resetFields()}>Reset</Button>
                </Space>
              </Form.Item>
            </Form>
          </Section>
        </Col>

        <Col xs={24} lg={12}>
          <Section title="Input Variants" icon={<CodeOutlined style={{ color: primary[500] }} />}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              {/* Search Input */}
              <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Search Input</Text>
                <Input.Search 
                  placeholder="Search..." 
                  allowClear 
                  enterButton
                  style={{ marginBottom: 8 }}
                />
                <Input.Search 
                  placeholder="Compact search" 
                  allowClear 
                  size="small"
                />
              </Card>

              {/* Password Input */}
              <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Password Input</Text>
                <Input.Password 
                  placeholder="Enter password" 
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  style={{ marginBottom: 8 }}
                />
                <Input.Password 
                  placeholder="With prefix" 
                  prefix={<LockOutlined />} 
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                />
              </Card>

              {/* Input with addons */}
              <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Input Groups</Text>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space.Compact style={{ width: '100%' }}>
                    <Input style={{ width: 80 }} defaultValue="https://" disabled />
                    <Input style={{ flex: 1 }} placeholder="mysite" />
                    <Input style={{ width: 60 }} defaultValue=".com" disabled />
                  </Space.Compact>
                  <Space.Compact style={{ width: '100%' }}>
                    <Button icon={<SettingOutlined />} />
                    <Input style={{ flex: 1 }} placeholder="With icon prefix" />
                  </Space.Compact>
                  <Space.Compact style={{ width: '100%' }}>
                    <Select defaultValue="Home" style={{ width: 100 }}>
                      <Select.Option value="Home">Home</Select.Option>
                      <Select.Option value="Work">Work</Select.Option>
                    </Select>
                    <Input style={{ flex: 1 }} placeholder="Phone number" />
                  </Space.Compact>
                </Space>
              </Card>
            </Space>
          </Section>
        </Col>
      </Row>

      {/* Number & Date Inputs */}
      <Section title="Numbers & Dates" icon={<CalendarOutlined style={{ color: '#8b5cf6' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Number Inputs</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Basic</Text>
                  <InputNumber style={{ width: '100%' }} placeholder="Enter number" />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>With Range</Text>
                  <InputNumber min={0} max={100} style={{ width: '100%' }} defaultValue={50} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Currency</Text>
                  <InputNumber<number>
                    style={{ width: '100%' }} 
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, '') || 0)}
                    defaultValue={1000}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Percentage</Text>
                  <InputNumber<number>
                    style={{ width: '100%' }} 
                    min={0} 
                    max={100} 
                    formatter={(value) => `${value}%`}
                    parser={(value) => Number(value?.replace('%', '') || 0)}
                    defaultValue={25}
                  />
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Date & Time</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Date Picker</Text>
                  <DatePicker style={{ width: '100%' }} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Date Range</Text>
                  <DatePicker.RangePicker style={{ width: '100%' }} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Time Picker</Text>
                  <TimePicker style={{ width: '100%' }} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Date + Time</Text>
                  <DatePicker showTime style={{ width: '100%' }} />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Selection Controls */}
      <Section title="Selection Controls" icon={<CheckCircleOutlined style={{ color: secondary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Checkboxes</Text>
              <Space direction="vertical">
                <Checkbox.Group
                  options={['Option A', 'Option B', 'Option C']}
                  defaultValue={['Option A']}
                />
                <Divider style={{ margin: '8px 0' }} />
                <Checkbox indeterminate>Indeterminate</Checkbox>
                <Checkbox disabled>Disabled</Checkbox>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Radio Groups</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio.Group defaultValue="a">
                  <Radio value="a">Option A</Radio>
                  <Radio value="b">Option B</Radio>
                </Radio.Group>
                <Divider style={{ margin: '8px 0' }} />
                <Text type="secondary" style={{ fontSize: 12 }}>Button Style</Text>
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">A</Radio.Button>
                  <Radio.Button value="b">B</Radio.Button>
                  <Radio.Button value="c">C</Radio.Button>
                </Radio.Group>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.purpleCard, height: '100%' }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Switches & Segments</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>
                  <Switch defaultChecked />
                  <Text>Enabled</Text>
                </Space>
                <Space>
                  <Switch />
                  <Text>Disabled</Text>
                </Space>
                <Divider style={{ margin: '8px 0' }} />
                <Text type="secondary" style={{ fontSize: 12 }}>Segmented</Text>
                <Segmented options={['Daily', 'Weekly', 'Monthly']} />
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Selects & Dropdowns */}
      <Section title="Selects & Multi-select" icon={<DownOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Select Variants</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Basic Select</Text>
                  <Select style={{ width: '100%' }} placeholder="Select option">
                    <Select.Option value="1">Option 1</Select.Option>
                    <Select.Option value="2">Option 2</Select.Option>
                    <Select.Option value="3">Option 3</Select.Option>
                  </Select>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>With Search</Text>
                  <Select 
                    style={{ width: '100%' }} 
                    showSearch 
                    placeholder="Search to select"
                    optionFilterProp="label"
                    options={[
                      { value: 'apple', label: 'Apple' },
                      { value: 'banana', label: 'Banana' },
                      { value: 'cherry', label: 'Cherry' },
                      { value: 'date', label: 'Date' },
                    ]}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>With Groups</Text>
                  <Select style={{ width: '100%' }} placeholder="Select category">
                    <Select.OptGroup label="Fruits">
                      <Select.Option value="apple">Apple</Select.Option>
                      <Select.Option value="banana">Banana</Select.Option>
                    </Select.OptGroup>
                    <Select.OptGroup label="Vegetables">
                      <Select.Option value="carrot">Carrot</Select.Option>
                      <Select.Option value="broccoli">Broccoli</Select.Option>
                    </Select.OptGroup>
                  </Select>
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Multi-select & Tags</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Multiple Select</Text>
                  <Select 
                    mode="multiple" 
                    style={{ width: '100%' }} 
                    placeholder="Select multiple"
                    defaultValue={['a', 'b']}
                    options={[
                      { value: 'a', label: 'Option A' },
                      { value: 'b', label: 'Option B' },
                      { value: 'c', label: 'Option C' },
                      { value: 'd', label: 'Option D' },
                    ]}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Tags Mode</Text>
                  <Select 
                    mode="tags" 
                    style={{ width: '100%' }} 
                    placeholder="Add tags"
                    defaultValue={['tag1']}
                  />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Cascader</Text>
                  <Cascader
                    style={{ width: '100%' }}
                    placeholder="Select location"
                    options={[
                      {
                        value: 'us',
                        label: 'United States',
                        children: [
                          { value: 'ny', label: 'New York' },
                          { value: 'ca', label: 'California' },
                        ],
                      },
                      {
                        value: 'uk',
                        label: 'United Kingdom',
                        children: [
                          { value: 'london', label: 'London' },
                          { value: 'manchester', label: 'Manchester' },
                        ],
                      },
                    ]}
                  />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Sliders & Ratings */}
      <Section title="Range & Rating" icon={<SmileOutlined style={{ color: '#f59e0b' }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.warmCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Sliders</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Basic</Text>
                  <Slider defaultValue={30} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Range</Text>
                  <Slider range defaultValue={[20, 50]} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>With Marks</Text>
                  <Slider 
                    marks={{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }} 
                    defaultValue={37} 
                  />
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.mintCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Rating & Feedback</Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Basic</Text>
                  <br />
                  <Rate defaultValue={3} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Half Stars</Text>
                  <br />
                  <Rate allowHalf defaultValue={3.5} />
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Custom Icons</Text>
                  <br />
                  <Rate character={<HeartOutlined />} defaultValue={3} style={{ color: '#eb2f96' }} />
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* File Upload */}
      <Section title="File Upload" icon={<UploadOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Upload Button</Text>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.blueCard }}>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>Drag & Drop</Text>
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: 32, color: primary[500] }} />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">Support for single or bulk upload</p>
              </Upload.Dragger>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Input States */}
      <Section title="Input States" icon={<InfoCircleOutlined style={{ color: neutral[500] }} />}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Default</Text>
              <Input placeholder="Default input" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ ...modernCardStyle, background: gradients.warmCard, height: '100%' }}>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Warning</Text>
              <Input status="warning" placeholder="Needs attention" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ ...modernCardStyle, background: `linear-gradient(145deg, #fff1f0 0%, #ffffff 100%)`, height: '100%' }}>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Error</Text>
              <Input status="error" placeholder="Invalid input" />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" style={{ ...modernCardStyle, height: '100%' }}>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>Disabled</Text>
              <Input disabled placeholder="Cannot edit" />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Inline Search Form Pattern */}
      <Section title="Inline Form Pattern" icon={<SearchOutlined style={{ color: secondary[500] }} />}>
        <Card size="small" style={{ ...modernCardStyle, background: gradients.greenCard }}>
          <Text strong style={{ display: 'block', marginBottom: 12 }}>Filter Bar</Text>
          <Form form={searchForm} layout="inline" style={{ flexWrap: 'wrap', gap: 8 }}>
            <Form.Item name="search" style={{ marginBottom: 8 }}>
              <Input.Search placeholder="Search..." allowClear style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="category" style={{ marginBottom: 8 }}>
              <Select placeholder="Category" style={{ width: 150 }} allowClear>
                <Select.Option value="all">All Categories</Select.Option>
                <Select.Option value="tech">Technology</Select.Option>
                <Select.Option value="design">Design</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" style={{ marginBottom: 8 }}>
              <Select placeholder="Status" style={{ width: 120 }} allowClear>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="archived">Archived</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="dateRange" style={{ marginBottom: 8 }}>
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item style={{ marginBottom: 8 }}>
              <Space>
                <Button type="primary" icon={<SearchOutlined />}>Search</Button>
                <Button onClick={() => searchForm.resetFields()}>Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: CRUD
// ============================================================================

// Sample data for CRUD demo
interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive'
  createdAt: string
}

const initialUsers: User[] = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, name: 'James Wilson', email: 'james.wilson@example.com', role: 'Editor', status: 'Active', createdAt: '2024-02-20' },
  { id: 3, name: 'Maria Garcia', email: 'maria.garcia@example.com', role: 'Viewer', status: 'Inactive', createdAt: '2024-03-10' },
  { id: 4, name: 'David Kim', email: 'david.kim@example.com', role: 'Editor', status: 'Active', createdAt: '2024-04-05' },
  { id: 5, name: 'Emma Thompson', email: 'emma.thompson@example.com', role: 'Viewer', status: 'Active', createdAt: '2024-05-12' },
]

function CrudTab() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  // Filtered users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = searchText === '' || 
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // View user details (inline)
  const handleView = (user: User) => {
    setSelectedUser(user)
    setViewMode('detail')
  }

  // Back to list
  const handleBackToList = () => {
    setViewMode('list')
    setSelectedUser(null)
  }

  // Open edit modal
  const handleEdit = (user: User) => {
    setSelectedUser(user)
    form.setFieldsValue(user)
    setEditModalOpen(true)
  }

  // Open create modal
  const handleCreate = () => {
    setSelectedUser(null)
    form.resetFields()
    setCreateModalOpen(true)
  }

  // Save edited user
  const handleSaveEdit = () => {
    form.validateFields().then((values) => {
      setUsers(users.map(u => u.id === selectedUser?.id ? { ...u, ...values } : u))
      setEditModalOpen(false)
      message.success('User updated successfully')
    })
  }

  // Create new user
  const handleSaveCreate = () => {
    form.validateFields().then((values) => {
      const newUser: User = {
        ...values,
        id: Math.max(...users.map(u => u.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setUsers([...users, newUser])
      setCreateModalOpen(false)
      message.success('User created successfully')
    })
  }

  // Delete user with confirmation
  const handleDelete = (user: User) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setUsers(users.filter(u => u.id !== user.id))
        message.success('User deleted successfully')
      },
    })
  }

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Editor', value: 'Editor' },
        { text: 'Viewer', value: 'Viewer' },
      ],
      onFilter: (value: any, record: User) => record.role === value,
      render: (role: string) => (
        <Tag color={role === 'Admin' ? 'blue' : role === 'Editor' ? 'green' : 'default'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'Active' ? 'success' : 'default'} text={status} />
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: User, b: User) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: User) => (
        <Space size="small">
          <Tooltip title="View">
            <Button type="text" size="small" icon={<UserOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  // Form fields (reused for create and edit)
  const FormFields = () => (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter an email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please select a role' }]}
      >
        <Select placeholder="Select role">
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Editor">Editor</Select.Option>
          <Select.Option value="Viewer">Viewer</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status' }]}
      >
        <Select placeholder="Select status">
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>
    </>
  )

  return (
    <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
      {/* Hero */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <DatabaseOutlined style={{ marginRight: 8, color: primary[500] }} />
            CRUD Operations
          </Title>
        }
        subtitle="Create, Read, Update, Delete patterns with data tables and modals"
        compact
      />

      {/* Introduction */}
      <Alert
        type="info"
        showIcon
        message="Interactive CRUD Demo"
        description="This demo shows common patterns for Create, Read, Update, and Delete operations. All data is stored in local state — no backend required."
        style={{ borderRadius: borderRadius.md }}
      />

      {/* Conditional rendering: List View or Detail View */}
      {viewMode === 'list' ? (
        <>
          {/* List View */}
          <Section title="Users List" icon={<UnorderedListOutlined style={{ color: primary[500] }} />}>
            {/* Toolbar */}
            <Card size="small" style={{ ...modernCardStyle, background: gradients.neutralCard, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <Space wrap size={8}>
                  <Input
                    placeholder="Search users..."
                    prefix={<SearchOutlined style={{ color: neutral[400] }} />}
                    style={{ width: 200, minWidth: 150 }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                  />
                  <Select 
                    placeholder="Filter by role" 
                    allowClear 
                    style={{ width: 140, minWidth: 120 }}
                    value={roleFilter}
                    onChange={(value) => setRoleFilter(value || null)}
                  >
                    <Select.Option value="Admin">Admin</Select.Option>
                    <Select.Option value="Editor">Editor</Select.Option>
                    <Select.Option value="Viewer">Viewer</Select.Option>
                  </Select>
                </Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
                  Add User
                </Button>
              </div>
            </Card>

            {/* Data Table */}
            <Table
              dataSource={filteredUsers}
              columns={columns}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showTotal: (total) => `${total} users`,
                size: 'small',
              }}
              size="middle"
              scroll={{ x: 700 }}
              style={{ borderRadius: borderRadius.md, overflow: 'hidden' }}
            />
          </Section>

          {/* Pattern Documentation */}
          <Section title="CRUD Patterns Used" icon={<BulbOutlined style={{ color: '#f59e0b' }} />}>
            <Row gutter={[layout.cardGap, layout.cardGap]}>
              <Col xs={24} md={12}>
                <Card size="small" title="List View" style={{ ...modernCardStyle, background: gradients.blueCard, height: '100%' }}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><Text type="secondary">Data table with sorting and filtering</Text></li>
                    <li><Text type="secondary">Toolbar with search and filters</Text></li>
                    <li><Text type="secondary">Pagination with page size options</Text></li>
                    <li><Text type="secondary">Action buttons per row</Text></li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="View Details" style={{ ...modernCardStyle, background: gradients.greenCard, height: '100%' }}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><Text type="secondary">Inline detail view (stays in tab)</Text></li>
                    <li><Text type="secondary">Read-only display of all fields</Text></li>
                    <li><Text type="secondary">Quick action to switch to edit mode</Text></li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="Create / Edit" style={{ ...modernCardStyle, background: gradients.purpleCard, height: '100%' }}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><Text type="secondary">Modal with Form component</Text></li>
                    <li><Text type="secondary">Validation rules with error messages</Text></li>
                    <li><Text type="secondary">Pre-populated fields for edit mode</Text></li>
                    <li><Text type="secondary">Success message on save</Text></li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="Delete" style={{ ...modernCardStyle, background: gradients.warmCard, height: '100%' }}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    <li><Text type="secondary">Modal.confirm for destructive action</Text></li>
                    <li><Text type="secondary">Clear warning message</Text></li>
                    <li><Text type="secondary">Danger button styling</Text></li>
                    <li><Text type="secondary">Success message on completion</Text></li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Section>
        </>
      ) : (
        /* Detail View */
        selectedUser && (
          <Card style={{ ...modernCardStyle }}>
            {/* Back button and actions */}
            <div style={{ marginBottom: layout.cardGap, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button icon={<ArrowLeftOutlined />} onClick={handleBackToList}>
                Back to List
              </Button>
              <Space>
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(selectedUser)}>
                  Edit User
                </Button>
                <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(selectedUser)}>
                  Delete
                </Button>
              </Space>
            </div>

            <Divider style={{ margin: `${layout.cardGap}px 0` }} />

            {/* User header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: layout.cardGap, marginBottom: layout.sectionGap }}>
              <Avatar size={64} style={{ backgroundColor: primary[500] }}>
                {selectedUser.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <div>
                <Title level={4} style={{ margin: 0 }}>{selectedUser.name}</Title>
                <Space size={layout.cardGap} style={{ marginTop: 4 }}>
                  <Tag color={selectedUser.role === 'Admin' ? 'blue' : selectedUser.role === 'Editor' ? 'green' : 'default'}>
                    {selectedUser.role}
                  </Tag>
                  <Badge status={selectedUser.status === 'Active' ? 'success' : 'default'} text={selectedUser.status} />
                </Space>
              </div>
            </div>

            {/* User details */}
            <Row gutter={[layout.sectionGap, layout.cardGap]}>
              <Col xs={24} md={12}>
                <Card size="small" title="Contact Information" style={{ ...modernCardStyle, background: gradients.blueCard, height: '100%' }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <MailOutlined style={{ color: primary[500] }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: fontSize.sm, display: 'block' }}>Email</Text>
                        <Text>{selectedUser.email}</Text>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <UserOutlined style={{ color: primary[500] }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: fontSize.sm, display: 'block' }}>User ID</Text>
                        <Text>{selectedUser.id}</Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="Account Details" style={{ ...modernCardStyle, background: gradients.greenCard, height: '100%' }}>
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <CalendarOutlined style={{ color: secondary[500] }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: fontSize.sm, display: 'block' }}>Created</Text>
                        <Text>{selectedUser.createdAt}</Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </Card>
        )
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleSaveEdit}
        okText="Save Changes"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <FormFields />
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Add New User"
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onOk={handleSaveCreate}
        okText="Create User"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <FormFields />
        </Form>
      </Modal>
    </Space>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

const DEFAULT_TAB = 'design'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const screens = useBreakpoint()
  const isMobile = !screens.md

  // Read hash on mount and listen for changes
  useEffect(() => {
    const getHashTab = () => window.location.hash.slice(1) || DEFAULT_TAB
    setActiveTab(getHashTab())

    const handleHashChange = () => setActiveTab(getHashTab())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleTabChange = (key: string) => {
    window.location.hash = key
    setActiveTab(key)
  }

  const tabItems = [
    {
      key: 'design',
      label: 'Design',
      children: <OverviewTab />,
    },
    {
      key: 'colours',
      label: 'Colours',
      children: <ColoursTab />,
    },
    {
      key: 'typography',
      label: isMobile ? 'Type' : 'Typography',
      children: <TypographyTab />,
    },
    {
      key: 'components',
      label: isMobile ? 'UI' : 'Components',
      children: <ComponentsTab />,
    },
    {
      key: 'forms',
      label: 'Forms',
      children: <FormsTab />,
    },
    {
      key: 'crud',
      label: 'CRUD',
      children: <CrudTab />,
    },
  ]

  return (
    <>
      <PageHeader 
        title="Design System" 
        description={navItem.description}
        breadcrumbs={[{ label: 'Design' }]}
      />
      <Tabs 
        activeKey={activeTab} 
        onChange={handleTabChange} 
        items={tabItems}
        size={isMobile ? 'small' : 'middle'}
        tabBarStyle={{ marginBottom: isMobile ? 12 : 24 }}
      />
    </>
  )
}
