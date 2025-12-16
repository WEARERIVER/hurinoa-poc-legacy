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
  Tag,
  Timeline,
  Descriptions,
  List,
  message,
  Collapse,
  Steps,
  Checkbox,
  Grid,
  Button,
} from 'antd'
import {
  CheckCircleOutlined,
  FolderOutlined,
  FileOutlined,
  RocketOutlined,
  CodeOutlined,
  BulbOutlined,
  TeamOutlined,
  ToolOutlined,
  ApiOutlined,
  ExperimentOutlined,
  LinkOutlined,
  CopyOutlined,
  CloudUploadOutlined,
  GithubOutlined,
  WarningOutlined,
  BranchesOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  QuestionCircleOutlined,
  BugOutlined,
  BgColorsOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@/components'
import { getNavItem } from '@/lib/navigation'
import { primary, secondary, neutral, semantic, layout, fontSize, borderRadius } from '@/theme'

const { Title, Text, Paragraph } = Typography
const { useBreakpoint } = Grid

const navItem = getNavItem('docs')!

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

const heroCardStyle = {
  ...modernCardStyle,
  border: 'none',
  boxShadow: '0 4px 20px rgba(64, 126, 254, 0.15)',
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
  tags 
}: { 
  title: React.ReactNode
  subtitle: string
  gradient?: string
  tags?: { label: string; color: string }[]
}) {
  return (
    <Card style={{ 
      background: gradient, 
      border: 'none',
      borderRadius: borderRadius.xl,
      boxShadow: '0 4px 20px rgba(64, 126, 254, 0.15)',
    }}>
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div style={{ marginBottom: 8 }}>{title}</div>
        <Paragraph style={{ 
          color: gradient === gradients.hero ? 'rgba(255,255,255,0.9)' : neutral[600], 
          fontSize: fontSize.lg, 
          margin: 0,
          maxWidth: 500,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {subtitle}
        </Paragraph>
        {tags && (
          <Space style={{ marginTop: 16 }} wrap>
            {tags.map((tag, i) => (
              <Tag key={i} style={{ 
                borderRadius: 20, 
                padding: '4px 12px',
                border: gradient === gradients.hero ? '1px solid rgba(255,255,255,0.3)' : undefined,
                background: gradient === gradients.hero ? 'rgba(255,255,255,0.15)' : undefined,
                color: gradient === gradients.hero ? '#fff' : undefined,
              }}>
                {tag.label}
              </Tag>
            ))}
          </Space>
        )}
      </div>
    </Card>
  )
}

function StepNumber({ number, size = 40 }: { number: number; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: gradients.hero,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.45,
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(64, 126, 254, 0.3)',
      flexShrink: 0,
    }}>
      {number}
    </div>
  )
}

function QuickStartStep({ 
  number, 
  title, 
  code, 
  gradient 
}: { 
  number: number
  title: string
  code?: string
  gradient: string 
}) {
  return (
    <Card style={{ 
      height: '100%',
      background: gradient,
      borderRadius: borderRadius.lg,
      border: `1px solid ${neutral[100]}`,
      textAlign: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    hoverable
    >
      <StepNumber number={number} />
      <Text strong style={{ display: 'block', marginTop: 12, marginBottom: 4 }}>{title}</Text>
      {code && <Text code style={{ fontSize: fontSize.xs }}>{code}</Text>}
    </Card>
  )
}

function FeatureCard({ 
  icon, 
  label, 
  color 
}: { 
  icon: React.ReactNode
  label: string
  color: string 
}) {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: 20, 
      background: `linear-gradient(145deg, ${color}08 0%, #ffffff 100%)`,
      borderRadius: borderRadius.lg,
      border: `1px solid ${neutral[100]}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      <div style={{ 
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        background: `${color}12`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 12px',
        fontSize: 22,
        color: color,
      }}>
        {icon}
      </div>
      <Text strong style={{ fontSize: fontSize.sm }}>{label}</Text>
    </div>
  )
}

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: layout.itemGap }}>
      <Text strong>
        <CheckCircleOutlined style={{ color: primary[500], marginRight: 8 }} />
        {title}
      </Text>
      <br />
      <Text type="secondary" style={{ fontSize: fontSize.sm, marginLeft: 24 }}>
        {description}
      </Text>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  const copyCode = () => {
    navigator.clipboard.writeText(children)
      .then(() => message.success('Copied to clipboard'))
      .catch(() => message.error('Failed to copy'))
  }
  
  return (
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <pre
        style={{
          background: neutral[800],
          color: neutral[100],
          padding: 16,
          borderRadius: borderRadius.lg,
          fontSize: fontSize.sm,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          margin: 0,
          fontFamily: 'monospace',
          lineHeight: 1.6,
          border: 'none',
        }}
      >
        {children}
      </pre>
      <Button 
        type="text"
        size="small"
        icon={<CopyOutlined />} 
        style={{ 
          position: 'absolute', 
          top: 8, 
          right: 8,
          color: neutral[400],
        }}
        onClick={copyCode}
      />
    </div>
  )
}

function PromptCard({ title, prompt, gradient = gradients.mintCard }: { 
  title: string
  prompt: string
  gradient?: string 
}) {
  const copyCode = () => {
    navigator.clipboard.writeText(prompt)
      .then(() => message.success('Copied to clipboard'))
      .catch(() => message.error('Failed to copy'))
  }

  return (
    <Card 
      size="small" 
      style={{ 
        background: gradient,
        borderRadius: borderRadius.lg,
        border: `1px solid ${neutral[100]}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <Text strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <BulbOutlined style={{ color: secondary[500] }} />
          {title}
        </Text>
        <Button type="text" size="small" icon={<CopyOutlined />} onClick={copyCode} />
      </div>
      <Text style={{ fontSize: fontSize.sm, color: neutral[700] }}>"{prompt}"</Text>
    </Card>
  )
}

// ============================================================================
// TAB CONTENT: OVERVIEW
// ============================================================================

function OverviewTab() {
  return (
    <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
      {/* Hero / Value Prop */}
      <GradientHero
        title={
          <>
            <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 600 }}>
              <span style={{ fontWeight: 700 }}>Huri Noa POC 1</span> AI Starter Kit
            </Title>
          </>
        }
        subtitle="Build admin dashboards and internal tools with AI assistance"
        tags={[
          { label: 'Next.js 16', color: 'blue' },
          { label: 'React 19', color: 'green' },
          { label: 'Ant Design 5', color: 'purple' },
          { label: 'TypeScript', color: 'orange' },
        ]}
      />

      {/* Quick Start - THE CLEAR PATH */}
      <Section 
        title="Quick Start" 
        icon={<RocketOutlined style={{ color: secondary[500] }} />}
        gradient={gradients.neutralCard}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <QuickStartStep 
              number={1} 
              title="Install" 
              code="npm install" 
              gradient={gradients.blueCard}
            />
          </Col>
          <Col xs={24} md={8}>
            <QuickStartStep 
              number={2} 
              title="Run Dev" 
              code="npm run dev" 
              gradient={gradients.mintCard}
            />
          </Col>
          <Col xs={24} md={8}>
            <QuickStartStep 
              number={3} 
              title="Build with AI" 
              code="Read AGENTS.md" 
              gradient={gradients.warmCard}
            />
          </Col>
        </Row>
      </Section>

      {/* Your First Prompt */}
      <Card style={{
        background: gradients.mintCard,
        ...modernCardStyle,
      }}>
        <Title level={5} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BulbOutlined style={{ color: secondary[500] }} />
          Your First Prompt
        </Title>
        <Text style={{ 
          fontSize: fontSize.base, 
          color: neutral[700],
          display: 'block',
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: borderRadius.md,
          borderLeft: `3px solid ${secondary[500]}`,
        }}>
          "Read AGENTS.md, then create a new page called 'Customers' with a data table showing name, email, and status fields."
        </Text>
      </Card>

      {/* What You Can Build */}
      <Section title="What You Can Build" icon={<ThunderboltOutlined style={{ color: primary[500] }} />}>
        <Row gutter={[16, 16]}>
          {[
            { icon: <AppstoreOutlined />, label: 'Admin Dashboards', color: primary[500] },
            { icon: <ToolOutlined />, label: 'Internal Tools', color: secondary[500] },
            { icon: <DatabaseOutlined />, label: 'Data Management', color: '#1890ff' },
            { icon: <ExperimentOutlined />, label: 'Rapid Prototypes', color: '#fa541c' },
          ].map((item, idx) => (
            <Col xs={12} md={6} key={idx}>
              <FeatureCard icon={item.icon} label={item.label} color={item.color} />
            </Col>
          ))}
        </Row>
      </Section>

      {/* Tech Stack - Simplified */}
      <Card style={{ ...modernCardStyle }}>
        <Title level={5} style={{ marginBottom: 16 }}>Tech Stack</Title>
        <Row gutter={[16, 16]}>
          {[
            { name: 'Next.js 14', desc: 'React framework', color: '#000' },
            { name: 'Ant Design 5', desc: 'UI components', color: '#1677ff' },
            { name: 'TypeScript', desc: 'Type safety', color: '#3178c6' },
            { name: 'Design Tokens', desc: 'Consistent styling', color: secondary[500] },
          ].map((tech, idx) => (
            <Col xs={12} md={6} key={idx}>
              <div style={{ 
                padding: '12px 16px', 
                background: neutral[50], 
                borderRadius: borderRadius.md,
                borderLeft: `3px solid ${tech.color}`,
              }}>
                <Text strong style={{ display: 'block' }}>{tech.name}</Text>
                <Text type="secondary" style={{ fontSize: fontSize.xs }}>{tech.desc}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Next Steps */}
      <Section title="Next Steps" icon={<LinkOutlined style={{ color: primary[500] }} />}>
        <List
          size="small"
          dataSource={[
            { label: 'Setup', description: 'Prerequisites, installation, and adding your first page' },
            { label: 'AI Workflow', description: 'How to work with AI assistants and ready-to-use prompts' },
            { label: 'Architecture', description: 'Understand the folder structure and key files' },
          ]}
          renderItem={(item) => (
            <List.Item style={{ padding: '12px 0', borderBottom: `1px solid ${neutral[100]}` }}>
              <div>
                <Text strong>{item.label}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>{item.description}</Text>
              </div>
            </List.Item>
          )}
        />
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: ARCHITECTURE
// ============================================================================

function ArchitectureTab() {
  const folderStructure = [
    { path: 'app/', description: 'Next.js App Router pages and layouts', type: 'folder' },
    { path: '  layout.tsx', description: 'Root layout with providers and global config', type: 'file' },
    { path: '  loading.tsx', description: 'Global loading state (Suspense fallback)', type: 'file' },
    { path: '  page.tsx', description: 'Home page (redirects to /dashboard)', type: 'file' },
    { path: '  dashboard/', description: 'Dashboard page', type: 'folder' },
    { path: '  docs/', description: 'Documentation pages (this section)', type: 'folder' },
    { path: '  demo/', description: 'Design system and component showcase', type: 'folder' },
    { path: 'components/', description: 'Reusable UI components', type: 'folder' },
    { path: '  AppShell.tsx', description: 'Main layout with sidebar, header, content', type: 'file' },
    { path: '  PageHeader.tsx', description: 'Page header with breadcrumbs, title, actions', type: 'file' },
    { path: '  index.ts', description: 'Barrel export for all components', type: 'file' },
    { path: 'lib/', description: 'Utilities, helpers, and configuration', type: 'folder' },
    { path: '  navigation.ts', description: 'Navigation configuration and types', type: 'file' },
    { path: 'theme/', description: 'Design tokens and Ant Design theme', type: 'folder' },
    { path: '  tokens.ts', description: 'Colours, typography, spacing definitions', type: 'file' },
    { path: '  themeConfig.ts', description: 'Ant Design theme configuration', type: 'file' },
    { path: '  index.ts', description: 'Barrel export for theme values', type: 'file' },
  ]

  return (
    <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
      {/* Hero Intro */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <FolderOutlined style={{ marginRight: 8, color: primary[500] }} />
            Project Architecture
          </Title>
        }
        subtitle="This section provides technical depth on how Huri Noa POC 1 is structured. Useful for understanding extension points and making architectural decisions."
      />

      {/* Rendering Model */}
      <Section title="Next.js Rendering Model" icon={<GlobalOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Huri Noa POC 1 uses Next.js 14 App Router with a hybrid rendering approach:
        </Paragraph>
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.blueCard }}>
              <Space direction="vertical" size={8}>
                <Text strong style={{ color: primary[600] }}>Server Components (Default)</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  Layouts and static content render on the server. No JavaScript sent to client.
                </Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.xs }}>
                  <Text code>layout.tsx</Text>, metadata, static pages
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.mintCard }}>
              <Space direction="vertical" size={8}>
                <Text strong style={{ color: secondary[600] }}>Client Components</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  Interactive pages use <Text code>'use client'</Text> directive for state and events.
                </Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.xs }}>
                  Pages with forms, tabs, modals, user interaction
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.purpleCard }}>
              <Space direction="vertical" size={8}>
                <Text strong style={{ color: '#722ed1' }}>Streaming + Suspense</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  <Text code>loading.tsx</Text> provides instant feedback during navigation.
                </Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.xs }}>
                  Progressive loading, better perceived performance
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
        
        <Alert
          type="warning"
          showIcon
          icon={<BulbOutlined />}
          style={{ marginTop: layout.cardGap, borderRadius: borderRadius.md }}
          message="When to use 'use client'"
          description={
            <Text style={{ fontSize: fontSize.sm }}>
              Add <Text code>'use client'</Text> at the top of a file when it uses: <Text code>useState</Text>, <Text code>useEffect</Text>, 
              event handlers (<Text code>onClick</Text>, etc.), browser APIs, or Ant Design interactive components.
            </Text>
          }
        />
      </Section>

      {/* Component Hierarchy */}
      <Section title="Component Hierarchy">
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Understanding the component tree helps with debugging and extension:
        </Paragraph>
        <Card size="small" style={{ backgroundColor: neutral[50], marginBottom: layout.cardGap }}>
          <pre style={{ margin: 0, fontSize: fontSize.sm, lineHeight: 1.8 }}>
{`<html>
  <body>
    <AntdRegistry>              {/* SSR CSS extraction for Ant Design */}
      <ConfigProvider>          {/* Theme configuration */}
        <AppShell>              {/* Sidebar + Header + Content area */}
          <loading.tsx />       {/* Suspense fallback (auto-wrapped) */}
          <page.tsx>            {/* Your page content */}
            <PageHeader />      {/* Breadcrumbs, title, actions */}
            {/* Page-specific content */}
          </page.tsx>
        </AppShell>
      </ConfigProvider>
    </AntdRegistry>
  </body>
</html>`}
          </pre>
        </Card>
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" title="AntdRegistry">
              <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                From <Text code>@ant-design/nextjs-registry</Text>. Extracts Ant Design CSS during SSR 
                to prevent flash of unstyled content. Must wrap the entire app.
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title="ConfigProvider">
              <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                Applies the theme from <Text code>theme/themeConfig.ts</Text> to all Ant Design components. 
                Single place to control colours, fonts, and component defaults.
              </Text>
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Folder Structure">
        <div style={{ fontFamily: 'monospace', fontSize: 13 }}>
          {folderStructure.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                padding: '6px 0',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ color: item.type === 'folder' ? primary[500] : neutral[400], width: 16 }}>
                {item.type === 'folder' ? <FolderOutlined /> : <FileOutlined />}
              </span>
              <Text code style={{ minWidth: 180 }}>{item.path}</Text>
              <Text type="secondary">{item.description}</Text>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Key Files">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" title={<><CodeOutlined /> theme/tokens.ts</>} style={{ height: '100%' }}>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginBottom: 8 }}>
                <Text strong>Single source of truth</Text> for all design values.
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'Colour palettes (primary, secondary, neutral, semantic)',
                  'Typography (font family, sizes, weights)',
                  'Spacing scale (xs, sm, md, lg, xl)',
                  'Layout tokens (page, section, card gaps)',
                  'Border radius and shadows',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.xs }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={<><CodeOutlined /> lib/navigation.ts</>} style={{ height: '100%' }}>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginBottom: 8 }}>
                <Text strong>Navigation configuration</Text> for the sidebar menu.
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'NavItem interface with key, path, label, description',
                  'Centralised array of all navigation items',
                  'Helper function to retrieve items by key',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: 12 }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={<><CodeOutlined /> components/AppShell.tsx</>} style={{ height: '100%' }}>
              <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 8 }}>
                <Text strong>Main layout component</Text> wrapping all pages.
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'Ant Design Layout with Sider, Header, Content',
                  'Collapsible sidebar with navigation menu',
                  'Responsive design with mobile support',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: 12 }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={<><CodeOutlined /> theme/themeConfig.ts</>} style={{ height: '100%' }}>
              <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 8 }}>
                <Text strong>Ant Design theme</Text> using token values.
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'Imports values from tokens.ts',
                  'Configures Ant Design ConfigProvider',
                  'Applies custom colours, fonts, border radius',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: 12 }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Data Flow Patterns">
        <Alert
          type="warning"
          showIcon
          icon={<BulbOutlined />}
          message="Design Token Flow"
          description={
            <div style={{ marginTop: 8 }}>
              <Text code>theme/tokens.ts</Text>
              <Text type="secondary"> → </Text>
              <Text code>theme/themeConfig.ts</Text>
              <Text type="secondary"> → </Text>
              <Text code>app/layout.tsx (ConfigProvider)</Text>
              <Text type="secondary"> → </Text>
              <Text>All Ant Design components</Text>
            </div>
          }
        />
        <div style={{ marginTop: 16 }}>
          <Paragraph type="secondary">
            Always modify <Text code>theme/tokens.ts</Text> when changing design values. 
            The changes will automatically propagate to all components through the theme configuration.
          </Paragraph>
        </div>

        <Divider />

        <Title level={5} style={{ marginBottom: 12 }}>State Management</Title>
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%' }}>
              <Text strong style={{ color: primary[500] }}>Local State</Text>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginTop: 8, marginBottom: 0 }}>
                Use <Text code>useState</Text> for component-specific state (form inputs, modals, UI toggles).
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%' }}>
              <Text strong style={{ color: secondary[500] }}>URL State</Text>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginTop: 8, marginBottom: 0 }}>
                Use hash fragments (<Text code>#tab</Text>) for shareable UI state like active tabs.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%' }}>
              <Text strong style={{ color: '#722ed1' }}>Server State</Text>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginTop: 8, marginBottom: 0 }}>
                For data fetching, consider React Query or SWR. Not included by default — add when needed.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Extension Points */}
      <Section title="Extension Points">
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Where to make changes when extending Huri Noa POC 1:
        </Paragraph>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          dataSource={[
            { key: 1, task: 'Add a new page', location: 'app/[page-name]/page.tsx + lib/navigation.ts', notes: 'Create folder, add to nav array' },
            { key: 2, task: 'Change brand colours', location: 'theme/tokens.ts → primary/secondary', notes: 'Update colour scales, theme auto-updates' },
            { key: 3, task: 'Modify sidebar/header', location: 'components/AppShell.tsx', notes: 'Layout structure, menu items, user dropdown' },
            { key: 4, task: 'Add a reusable component', location: 'components/[Name].tsx + index.ts', notes: 'Create file, add to barrel export' },
            { key: 5, task: 'Add API routes', location: 'app/api/[route]/route.ts', notes: 'Next.js Route Handlers for backend logic' },
            { key: 6, task: 'Add authentication', location: 'Consider Supabase Auth or NextAuth', notes: 'See Infrastructure tab for options' },
            { key: 7, task: 'Add database', location: 'Consider Supabase or external API', notes: 'See Infrastructure tab for patterns' },
            { key: 8, task: 'Change loading state', location: 'app/loading.tsx', notes: 'Global fallback, or per-route loading.tsx' },
          ]}
          columns={[
            { title: 'Task', dataIndex: 'task', key: 'task', width: 140 },
            { title: 'Location', dataIndex: 'location', key: 'location', render: (t: string) => <Text code style={{ fontSize: fontSize.xs }}>{t}</Text> },
            { title: 'Notes', dataIndex: 'notes', key: 'notes', render: (t: string) => <Text type="secondary" style={{ fontSize: fontSize.sm }}>{t}</Text> },
          ]}
        />
      </Section>

      {/* Performance Considerations */}
      <Section title="Performance Considerations">
        <Collapse
          size="small"
          items={[
            {
              key: 'bundling',
              label: <Text strong>Bundle Size & Code Splitting</Text>,
              children: (
                <Space direction="vertical" size={8}>
                  <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                    Next.js automatically code-splits by route. Each page only loads the JavaScript it needs.
                  </Text>
                  <List
                    size="small"
                    dataSource={[
                      'Ant Design supports tree-shaking — only imported components are bundled',
                      'Use dynamic imports for heavy components: dynamic(() => import(...))',
                      'Check bundle size with: npm run build (shows page sizes)',
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '2px 0', border: 'none' }}>
                        <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                      </List.Item>
                    )}
                  />
                </Space>
              ),
            },
            {
              key: 'hydration',
              label: <Text strong>Hydration & CSS-in-JS</Text>,
              children: (
                <Space direction="vertical" size={8}>
                  <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                    Ant Design uses CSS-in-JS (Emotion). The <Text code>AntdRegistry</Text> extracts styles during SSR.
                  </Text>
                  <List
                    size="small"
                    dataSource={[
                      'AntdRegistry in layout.tsx prevents style flash on load',
                      'Minor FOUC is normal with CSS-in-JS — focus on perceived performance',
                      'loading.tsx provides instant visual feedback during navigation',
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '2px 0', border: 'none' }}>
                        <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                      </List.Item>
                    )}
                  />
                </Space>
              ),
            },
            {
              key: 'fonts',
              label: <Text strong>Font Loading</Text>,
              children: (
                <Space direction="vertical" size={8}>
                  <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                    Inter font is loaded via Google Fonts with <Text code>display=swap</Text> for fast text rendering.
                  </Text>
                  <List
                    size="small"
                    dataSource={[
                      'Font loaded in layout.tsx <head> for early loading',
                      'display=swap shows fallback font immediately, swaps when loaded',
                      'Consider self-hosting fonts for better performance in production',
                    ]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: '2px 0', border: 'none' }}>
                        <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                      </List.Item>
                    )}
                  />
                </Space>
              ),
            },
          ]}
        />
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: SETUP
// ============================================================================

// Helper components for GettingStartedTab (defined outside to avoid SWC parser issues)
const CopyableCode = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      gap: 8, 
      background: neutral[800], 
      padding: '10px 14px', 
      borderRadius: borderRadius.md,
      marginTop: 8
    }}>
      <Text code style={{ flex: 1, background: 'transparent', color: neutral[100], border: 'none' }}>{children}</Text>
      <Tag 
        icon={copied ? <CheckCircleOutlined /> : <CopyOutlined />} 
        style={{ 
          cursor: 'pointer', 
          marginRight: 0, 
          background: copied ? semantic.success.base : 'transparent', 
          borderColor: copied ? semantic.success.base : neutral[500],
          color: copied ? '#fff' : neutral[300],
        }}
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Tag>
    </div>
  )
}

const SetupStepCard = ({ 
  step, 
  icon, 
  title, 
  children,
  gradient = gradients.blueCard,
}: { 
  step: number
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  gradient?: string
}) => {
  return (
    <Card style={{ 
      marginBottom: layout.cardGap,
      ...modernCardStyle,
      background: gradient,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <StepNumber number={step} size={44} />
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon} {title}
          </Title>
          {children}
        </div>
      </div>
    </Card>
  )
}

function GettingStartedTab() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero Intro */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <RocketOutlined style={{ marginRight: 8, color: primary[500] }} />
            Welcome to Huri Noa POC 1
          </Title>
        }
        subtitle="This guide will walk you through setting up your development environment and customizing this project. Whether you're new to coding or an experienced developer, follow these steps to get started."
        tags={[
          { label: '20-30 min setup', color: 'blue' },
          { label: 'Beginner friendly', color: 'green' },
          { label: 'AI-assisted', color: 'purple' },
        ]}
      />

      {/* Before You Begin */}
      <Card style={{ ...modernCardStyle }}>
        <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircleOutlined style={{ color: primary[500] }} />
          Before You Begin
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Make sure you have or can get the following:
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ 
              background: gradients.greenCard, 
              borderRadius: borderRadius.lg,
              border: `1px solid ${neutral[100]}`,
            }}>
              <Text strong style={{ color: semantic.success.dark, display: 'block', marginBottom: 8 }}>Required</Text>
              <List
                size="small"
                dataSource={[
                  'A GitHub account (free)',
                  'Access to this repository',
                  'A computer (Windows, Mac, or Linux)',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '6px 0', border: 'none' }}>
                    <Text><CheckCircleOutlined style={{ color: semantic.success.base, marginRight: 8 }} />{item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ 
              background: gradients.blueCard,
              borderRadius: borderRadius.lg,
              border: `1px solid ${neutral[100]}`,
            }}>
              <Text strong style={{ color: primary[600], display: 'block', marginBottom: 8 }}>Will be installed</Text>
              <List
                size="small"
                dataSource={[
                  'Node.js (runs JavaScript)',
                  'VS Code (code editor)',
                  'Git (version control)',
                  'GitHub Copilot (AI assistant)',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '6px 0', border: 'none' }}>
                    <Text><ToolOutlined style={{ color: primary[500], marginRight: 8 }} />{item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Step 1: Create Your Project */}
      <SetupStepCard step={1} icon={<FolderOutlined style={{ color: primary[500] }} />} title="Get Repository Access" gradient={gradients.blueCard}>
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16, borderRadius: borderRadius.md }}
          message="This is a template repository. You'll create your own copy — a fresh project that belongs to you."
        />
        
        <Collapse
          style={{ marginBottom: 16, background: 'transparent' }}
          bordered={false}
          items={[
            {
              key: '1',
              label: <Text strong>1. Create a GitHub account (if needed)</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to github.com', description: 'Click "Sign up" in the top right' },
                      { title: 'Enter your email', description: 'Use an email you check regularly' },
                      { title: 'Create a password', description: 'Make it strong and memorable' },
                      { title: 'Choose a username', description: 'This will be visible to others' },
                      { title: 'Verify your account', description: 'Check your email for the verification link' },
                    ]}
                  />
                </Space>
              ),
            },
            {
              key: '2',
              label: <Text strong>2. Create your project from the template</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to the Huri Noa POC 1 template repository', description: 'Open the GitHub repo for this starter kit' },
                      { title: 'Click the green "Use this template" button', description: 'Located near the top-right of the repo page' },
                      { title: 'Select "Create a new repository"' },
                      { title: 'Name your repository', description: 'e.g., "my-admin-app" or "client-dashboard"' },
                      { title: 'Choose Public or Private' },
                      { title: 'Click "Create repository"', description: 'GitHub will create your copy' },
                    ]}
                  />
                </Space>
              ),
            },
          ]}
        />
      </SetupStepCard>

      {/* Step 2: Install Required Software */}
      <SetupStepCard step={2} icon={<ToolOutlined style={{ color: primary[500] }} />} title="Install Required Software" gradient={gradients.neutralCard}>
        <Collapse
          style={{ marginBottom: 16, background: 'transparent' }}
          bordered={false}
          items={[
            {
              key: 'node',
              label: (
                <Space>
                  <ApiOutlined style={{ color: '#68a063' }} />
                  <Text strong>Node.js</Text>
                  <Text type="secondary">— Runs JavaScript on your computer</Text>
                </Space>
              ),
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to nodejs.org' },
                      { title: 'Download the LTS version', description: 'LTS = Long Term Support (most stable)' },
                      { title: 'Run the installer', description: 'Accept all default settings' },
                      { title: 'Restart your computer', description: 'Ensures Node.js is available everywhere' },
                    ]}
                  />
                  <Alert type="info" showIcon message="To verify: Open a terminal and run: node --version" />
                </Space>
              ),
            },
            {
              key: 'vscode',
              label: (
                <Space>
                  <CodeOutlined style={{ color: '#007acc' }} />
                  <Text strong>Visual Studio Code</Text>
                  <Text type="secondary">— Code editor with AI integration</Text>
                </Space>
              ),
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to code.visualstudio.com' },
                      { title: 'Click the download button for your OS' },
                      { title: 'Run the installer', description: 'Accept default settings' },
                      { title: 'Launch VS Code' },
                    ]}
                  />
                </Space>
              ),
            },
            {
              key: 'git',
              label: (
                <Space>
                  <BranchesOutlined style={{ color: '#f05032' }} />
                  <Text strong>Git</Text>
                  <Text type="secondary">— Version control for code</Text>
                </Space>
              ),
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to git-scm.com' },
                      { title: 'Download for your operating system' },
                      { title: 'Run the installer', description: 'Use default settings (click Next through all steps)' },
                      { title: 'Restart VS Code if it was open' },
                    ]}
                  />
                  <Alert type="info" showIcon message="To verify: Open a terminal and run: git --version" />
                </Space>
              ),
            },
          ]}
        />
      </SetupStepCard>

      {/* Step 3: Set Up GitHub Copilot */}
      <SetupStepCard step={3} icon={<ExperimentOutlined style={{ color: primary[500] }} />} title="Set Up GitHub Copilot" gradient={gradients.purpleCard}>
        <Alert
          type="info"
          showIcon
          icon={<BulbOutlined />}
          style={{ marginBottom: 16, borderRadius: borderRadius.md }}
          message="AI-Powered Development"
          description="GitHub Copilot is your AI coding assistant. It understands the project context and helps you write code."
        />
        
        <Collapse
          style={{ marginBottom: 16, background: 'transparent' }}
          bordered={false}
          items={[
            {
              key: '1',
              label: <Text strong>1. Subscribe to GitHub Copilot ($10/month)</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Go to github.com/features/copilot' },
                      { title: 'Click "Start my free trial" or "Get GitHub Copilot"' },
                      { title: 'Sign in with your GitHub account' },
                      { title: 'Choose Individual plan ($10/month)', description: 'Free trial available for new users' },
                      { title: 'Complete the payment setup' },
                    ]}
                  />
                  <Alert type="success" showIcon message="Students & teachers: GitHub Copilot is FREE with GitHub Education!" />
                </Space>
              ),
            },
            {
              key: '2',
              label: <Text strong>2. Install Copilot in VS Code</Text>,
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Steps
                    direction="vertical"
                    size="small"
                    current={-1}
                    items={[
                      { title: 'Open VS Code' },
                      { title: 'Click the Extensions icon in the sidebar', description: 'Or press Ctrl+Shift+X (Cmd+Shift+X on Mac)' },
                      { title: 'Search for "GitHub Copilot"' },
                      { title: 'Install "GitHub Copilot" (the main extension)' },
                      { title: 'Also install "GitHub Copilot Chat"', description: 'For the chat interface' },
                      { title: 'Sign in when prompted', description: 'Use your GitHub account' },
                    ]}
                  />
                </Space>
              ),
            },
          ]}
        />
      </SetupStepCard>

      {/* Step 4: Download & Run the Project */}
      <SetupStepCard step={4} icon={<RocketOutlined style={{ color: primary[500] }} />} title="Download & Run the Project" gradient={gradients.mintCard}>
        <Title level={5} style={{ marginBottom: 12 }}>Clone YOUR new repository</Title>
        <Steps
          direction="vertical"
          size="small"
          current={-1}
          style={{ marginBottom: 24 }}
          items={[
            { title: 'Go to your new repository on GitHub', description: 'The one you created in Step 1' },
            { title: 'Click the green "Code" button' },
            { title: 'Copy the HTTPS URL', description: 'Click the clipboard icon to copy' },
            { title: 'Open VS Code' },
            { title: 'Open Command Palette', description: 'Press Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)' },
            { title: 'Type "Git: Clone" and press Enter' },
            { title: 'Paste YOUR repository URL' },
            { title: 'Choose a folder to save the project' },
            { title: 'Click "Open" when prompted' },
          ]}
        />

        <Divider />

        <Title level={5} style={{ marginBottom: 12 }}>Install dependencies & start</Title>
        <Steps
          direction="vertical"
          size="small"
          current={-1}
          style={{ marginBottom: 16 }}
          items={[
            { title: 'Open Terminal', description: 'Go to Terminal → New Terminal in VS Code' },
            { 
              title: 'Install dependencies', 
              description: <CopyableCode>npm install</CopyableCode>
            },
            { 
              title: 'Start the dev server', 
              description: <CopyableCode>npm run dev</CopyableCode>
            },
            { title: 'View in browser', description: 'Ctrl+Click the URL (usually http://localhost:3000)' },
          ]}
        />

        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          message="Keep the terminal running!"
          description="The dev server needs to stay active while you work. Press Ctrl+C to stop it later."
        />
      </SetupStepCard>

      {/* Step 5: Customize Your Project */}
      <SetupStepCard step={5} icon={<BgColorsOutlined style={{ color: primary[500] }} />} title="Customize Your Project" gradient={gradients.warmCard}>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Now that everything is running, use AI to make this project yours. Open Copilot 
          Chat (click the chat icon in the sidebar) and use these prompts:
        </Paragraph>

        <Card size="small" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text strong>Rename & Customize Project</Text>
            {(() => {
              const promptText = `Read AGENTS.md, then rename this project from "Huri Noa POC 1" to "[YOUR PROJECT NAME]".

Update:
1. The logo text in AppShell.tsx (change "Huri Noa POC 1" to my new name)
2. The page title in app/layout.tsx
3. The package name in package.json
4. The heading in AGENTS.md
5. Any other references to "Huri Noa POC 1" in the codebase

My new project name is: [YOUR PROJECT NAME]`
              return (
                <Tag 
                  icon={copiedText === promptText ? <CheckCircleOutlined /> : <CopyOutlined />} 
                  color={copiedText === promptText ? 'success' : 'processing'}
                  style={{ cursor: 'pointer', marginRight: 0 }}
                  onClick={() => copyToClipboard(promptText)}
                >
                  {copiedText === promptText ? 'Copied!' : 'Copy'}
                </Tag>
              )
            })()}
          </div>
          <pre style={{ 
            background: neutral[50], 
            padding: 12, 
            borderRadius: borderRadius.md, 
            margin: 0,
            fontSize: fontSize.sm,
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
          }}>
{`Read AGENTS.md, then rename this project from "Huri Noa POC 1" to "[YOUR PROJECT NAME]".

Update:
1. The logo text in AppShell.tsx
2. The page title in app/layout.tsx
3. The package name in package.json
4. The heading in AGENTS.md
5. Any other references to "Huri Noa POC 1"`}
          </pre>
        </Card>

        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Card size="small">
              <Text strong>Change Colors</Text>
              <CopyableCode>Read AGENTS.md, then change the primary color from blue to [purple/green/orange].</CopyableCode>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small">
              <Text strong>Add a Page</Text>
              <CopyableCode>Read AGENTS.md, then create a new page called "Customers" with a data table.</CopyableCode>
            </Card>
          </Col>
        </Row>
      </SetupStepCard>

      {/* Quick Reference */}
      <Card style={{ ...modernCardStyle }}>
        <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ThunderboltOutlined style={{ color: secondary[500] }} />
          Quick Reference
        </Title>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Keyboard Shortcuts</Text>
            <Table
              size="small"
              pagination={false}
              showHeader={false}
              dataSource={[
                { key: '1', action: 'Open Copilot Chat', shortcut: 'Ctrl+Shift+I' },
                { key: '2', action: 'Command Palette', shortcut: 'Ctrl+Shift+P' },
                { key: '3', action: 'Open Terminal', shortcut: 'Ctrl+`' },
                { key: '4', action: 'Save File', shortcut: 'Ctrl+S' },
              ]}
              columns={[
                { dataIndex: 'action', key: 'action' },
                { dataIndex: 'shortcut', key: 'shortcut', render: (t: string) => <Text code>{t}</Text> },
              ]}
            />
          </Col>
          <Col xs={24} md={12}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Terminal Commands</Text>
            <Table
              size="small"
              pagination={false}
              showHeader={false}
              dataSource={[
                { key: '1', command: 'npm run dev', description: 'Start server' },
                { key: '2', command: 'npm install', description: 'Install deps' },
                { key: '3', command: 'Ctrl+C', description: 'Stop server' },
              ]}
              columns={[
                { dataIndex: 'command', key: 'command', render: (t: string) => <Text code>{t}</Text> },
                { dataIndex: 'description', key: 'description' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* Troubleshooting */}
      <Card style={{ ...modernCardStyle }}>
        <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BugOutlined style={{ color: semantic.warning.base }} />
          Troubleshooting
        </Title>
        <Collapse
          bordered={false}
          style={{ background: 'transparent' }}
          items={[
            {
              key: '1',
              label: <Text strong>Server won't start?</Text>,
              children: (
                <List
                  size="small"
                  dataSource={[
                    'Make sure Node.js is installed (run node --version in terminal)',
                    'Delete node_modules folder and run npm install again',
                    'Check if another app is using port 3000',
                    'Restart VS Code',
                  ]}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Text>• {item}</Text>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '2',
              label: <Text strong>AI not responding?</Text>,
              children: (
                <List
                  size="small"
                  dataSource={[
                    'Check your Copilot subscription is active',
                    'Make sure you\'re signed in to GitHub in VS Code',
                    'Try reloading VS Code (Ctrl+Shift+P → "Reload Window")',
                    'Check your internet connection',
                  ]}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Text>• {item}</Text>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              key: '3',
              label: <Text strong>Changes not showing in browser?</Text>,
              children: (
                <List
                  size="small"
                  dataSource={[
                    'Save your file (Ctrl+S)',
                    'Hard refresh the browser (Ctrl+Shift+R)',
                    'Check the terminal for error messages',
                    'Make sure the dev server is still running',
                  ]}
                  renderItem={(item) => (
                    <List.Item style={{ padding: '4px 0', border: 'none' }}>
                      <Text>• {item}</Text>
                    </List.Item>
                  )}
                />
              ),
            },
          ]}
        />
      </Card>

      {/* Next Steps - Success Card */}
      <Card style={{
        ...modernCardStyle,
        background: gradients.greenCard,
        borderLeft: `4px solid ${semantic.success.base}`,
      }}>
        <Title level={4} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircleOutlined style={{ color: semantic.success.base }} />
          You're all set!
        </Title>
        <Row gutter={[16, 12]}>
          <Col xs={24} md={8}>
            <Text><strong>Explore Components</strong></Text>
            <br />
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>Visit the Design page to see all available UI patterns</Text>
          </Col>
          <Col xs={24} md={8}>
            <Text><strong>Learn AI Workflow</strong></Text>
            <br />
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>Check the AI Workflow tab for more prompts</Text>
          </Col>
          <Col xs={24} md={8}>
            <Text><strong>Read Conventions</strong></Text>
            <br />
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>See Conventions tab for coding standards</Text>
          </Col>
        </Row>
      </Card>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: CONVENTIONS
// ============================================================================

function ConventionsTab() {
  const namingConventions = [
    { type: 'Components', convention: 'PascalCase', example: 'PageHeader.tsx, AppShell.tsx' },
    { type: 'Pages', convention: 'lowercase folder + page.tsx', example: 'app/dashboard/page.tsx' },
    { type: 'Utilities', convention: 'camelCase', example: 'getNavItem(), formatDate()' },
    { type: 'Types/Interfaces', convention: 'PascalCase', example: 'NavItem, UserProfile' },
    { type: 'Constants', convention: 'camelCase or UPPER_SNAKE', example: 'primary, MAX_ITEMS' },
    { type: 'CSS/Tokens', convention: 'camelCase', example: 'primary[500], fontSize.base' },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Hero Intro */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <SafetyOutlined style={{ marginRight: 8, color: primary[500] }} />
            Coding Conventions
          </Title>
        }
        subtitle="Consistent conventions help both humans and AI produce predictable, maintainable code."
      />

      <Section title="Naming Conventions" icon={<CodeOutlined style={{ color: primary[500] }} />}>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 450 }}
          style={{ borderRadius: borderRadius.md, overflow: 'hidden' }}
          dataSource={namingConventions.map((n, i) => ({ ...n, key: i }))}
          columns={[
            { title: 'Type', dataIndex: 'type', key: 'type', width: 100 },
            { title: 'Convention', dataIndex: 'convention', key: 'convention', width: 150 },
            { 
              title: 'Example', 
              dataIndex: 'example', 
              key: 'example',
              render: (text: string) => <Text code>{text}</Text>,
            },
          ]}
        />
      </Section>

      <Section title="File Organisation">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" title="✅ Do" style={{ ...modernCardStyle, background: gradients.greenCard, borderLeft: `3px solid ${semantic.success.base}` }}>
              <List
                size="small"
                dataSource={[
                  'One component per file',
                  'Group related files in folders',
                  'Use barrel exports (index.ts)',
                  'Keep pages thin, logic in components',
                  'Colocate tests with source files',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: 12, color: semantic.success.dark }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title="❌ Don't" style={{ ...modernCardStyle, background: `linear-gradient(145deg, ${semantic.error.light} 0%, #ffffff 100%)`, borderLeft: `3px solid ${semantic.error.base}` }}>
              <List
                size="small"
                dataSource={[
                  'Multiple exports from one file',
                  'Deep nesting (max 3 levels)',
                  'Duplicate component definitions',
                  'Inline styles for repeated patterns',
                  'Hard-coded colours or spacing',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: 12, color: semantic.error.dark }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      <Section title="Component Patterns" icon={<AppstoreOutlined style={{ color: secondary[500] }} />}>
        <Divider orientation="left" plain>Page Structure</Divider>
        <Paragraph>
          <Text type="secondary">Every page should follow this structure:</Text>
        </Paragraph>
        <Card size="small" style={{ backgroundColor: neutral[800], marginBottom: 16, borderRadius: borderRadius.lg }}>
          <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: neutral[100] }}>
{`'use client'

import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { PageHeader } from '@/components'
import { getNavItem } from '@/lib/navigation'

const navItem = getNavItem('page-key')!

export default function MyPage() {
  return (
    <>
      <PageHeader 
        title={navItem.label} 
        description={navItem.description}
        breadcrumbs={[{ label: 'My Page' }]}
        actions={<Button type="primary" icon={<PlusOutlined />}>Create</Button>}
      />
      {/* Page content */}
    </>
  )
}`}
          </pre>
        </Card>

        <Divider orientation="left" plain>Using Design Tokens</Divider>
        <Paragraph>
          <Text type="secondary">Import tokens from the theme barrel export:</Text>
        </Paragraph>
        <Card size="small" style={{ backgroundColor: neutral[800], borderRadius: borderRadius.lg }}>
          <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: neutral[100] }}>
{`import { primary, secondary, neutral, semantic } from '@/theme'

// Use in styles
<div style={{ 
  color: primary[500],
  backgroundColor: neutral[50],
  borderColor: semantic.success.base 
}}>
  ...
</div>`}
          </pre>
        </Card>
      </Section>

      <Section title="Import Order" icon={<FileOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: 12 }}>
          Organise imports in this order for consistency:
        </Paragraph>
        <Card size="small" style={{ backgroundColor: neutral[800], borderRadius: borderRadius.lg }}>
          <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: neutral[100] }}>
{`// 1. React/Next.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 2. Third-party libraries
import { Card, Button, Table, Form } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

// 3. Internal components
import { PageHeader } from '@/components'

// 4. Internal utilities
import { getNavItem } from '@/lib/navigation'

// 5. Theme/tokens
import { primary, layout, fontSize } from '@/theme'

// 6. Types (if separate)
import type { NavItem } from '@/lib/navigation'`}
          </pre>
        </Card>
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: AI WORKFLOW
// ============================================================================

function AIWorkflowTab() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(text)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const promptSections = [
    {
      title: '🚀 Getting Started',
      prompts: [
        {
          name: 'First Time Setup',
          prompt: 'Read AGENTS.md to understand this project, then give me a brief summary of the tech stack and folder structure.',
        },
        {
          name: 'Explore Codebase',
          prompt: 'Read AGENTS.md, then explore the demo page at app/demo/page.tsx to understand the component patterns used in this project.',
        },
      ],
    },
    {
      title: '📄 Adding New Pages',
      prompts: [
        {
          name: 'Simple Page',
          prompt: `Read AGENTS.md, then create a new page called "[PAGE NAME]" with:\n- A PageHeader with appropriate title and description\n- A brief placeholder content section\n- Add it to the navigation in lib/navigation.ts`,
        },
        {
          name: 'Page with Data Table',
          prompt: `Read AGENTS.md, then create a new page called "[PAGE NAME]" that displays a table of [ITEMS].\n\nEach [ITEM] should have these fields:\n- [Field 1]: [type]\n- [Field 2]: [type]\n- [Field 3]: [type]\n\nInclude:\n- Mock data (5-10 items)\n- Table with sortable columns\n- Status column with coloured tags\n- Actions column with Edit and Delete buttons\n- Add to navigation`,
        },
      ],
    },
    {
      title: '📝 CRUD Operations',
      prompts: [
        {
          name: 'Full CRUD Module',
          prompt: `Read AGENTS.md and look at the CRUD tab in app/demo/page.tsx for patterns.\n\nCreate a complete CRUD module for managing [ENTITY NAME] with these fields:\n- [Field 1]: [type, required/optional]\n- [Field 2]: [type, required/optional]\n- [Field 3]: [type, required/optional]\n\nInclude:\n1. Data table with search and filters\n2. Inline detail view (click row to expand)\n3. Create modal with form validation\n4. Edit modal (pre-populated)\n5. Delete confirmation\n6. Mock data (5-10 records)\n\nPut this in a new page at app/[entity-name]/page.tsx and add to navigation.`,
        },
        {
          name: 'Add Search and Filters',
          prompt: `Read AGENTS.md, then add search and filter functionality to the [PAGE NAME] table:\n- Text search across [field1, field2]\n- Dropdown filter for [field] with options: [option1, option2, option3]\n- "Clear filters" button\n- Show result count`,
        },
      ],
    },
    {
      title: '🎨 UI Components',
      prompts: [
        {
          name: 'Card Grid Layout',
          prompt: `Read AGENTS.md, then create a card grid layout on [PAGE NAME] showing [ITEMS]:\n- 3 cards per row on desktop, 2 on tablet, 1 on mobile\n- Each card shows: [field1, field2, field3]\n- Use consistent spacing with layout tokens\n- Include a header with title and "Add New" button`,
        },
        {
          name: 'Tabbed Interface',
          prompt: `Read AGENTS.md, then add a tabbed interface to [PAGE NAME] with these tabs:\n- [Tab 1]: [description of content]\n- [Tab 2]: [description of content]\n- [Tab 3]: [description of content]\n\nUse Ant Design Tabs component with icons.`,
        },
      ],
    },
    {
      title: '🔧 Modifications',
      prompts: [
        {
          name: 'Change Colour Scheme',
          prompt: `Read AGENTS.md, then update the primary colour scheme in theme/tokens.ts:\n- New primary colour: [hex code]\n- Generate a proper colour scale (50-900)\n- Update the Ant Design theme config to use the new primary`,
        },
        {
          name: 'Add Form Validation',
          prompt: `Read AGENTS.md, then add proper validation to the form on [PAGE NAME]:\n- Required field validation with error messages\n- Email format validation for email fields\n- Minimum/maximum length for text fields\n- Show inline error messages`,
        },
      ],
    },
  ]

  const techStack = [
    { 
      key: 1, 
      tool: 'Next.js 14', 
      purpose: 'React framework with App Router', 
      docs: 'nextjs.org/docs',
      aiContext: 'Context7 MCP for docs integration',
    },
    { 
      key: 2, 
      tool: 'Ant Design 5', 
      purpose: 'Enterprise UI component library', 
      docs: 'ant.design/components',
      aiContext: 'Component examples in Demo page',
    },
    { 
      key: 3, 
      tool: 'TypeScript', 
      purpose: 'Type-safe JavaScript', 
      docs: 'typescriptlang.org',
      aiContext: 'Language Server MCP for IDE integration',
    },
    { 
      key: 4, 
      tool: 'Figma', 
      purpose: 'Design tool for mockups', 
      docs: 'figma.com',
      aiContext: 'Figma-Context-MCP for design-to-code',
    },
    { 
      key: 5, 
      tool: 'Git / GitHub', 
      purpose: 'Version control', 
      docs: 'github.com',
      aiContext: 'GitKraken MCP, GitHub MCP servers',
    },
    { 
      key: 6, 
      tool: 'Playwright', 
      purpose: 'E2E testing', 
      docs: 'playwright.dev',
      aiContext: 'Playwright MCP for test automation',
    },
  ]

  const mcpServers = [
    { 
      name: 'Figma-Context-MCP', 
      repo: 'GLips/Figma-Context-MCP',
      desc: 'Direct access to Figma files for design-to-code workflows',
    },
    { 
      name: 'GitKraken MCP', 
      repo: 'gitkraken/gitkraken-mcp',
      desc: 'Git operations, PRs, issues — already in this workspace',
    },
    { 
      name: 'Playwright MCP', 
      repo: 'microsoft/playwright-mcp',
      desc: 'Browser automation for testing and scraping',
    },
    { 
      name: 'Context7', 
      repo: 'upstash/context7',
      desc: 'Documentation integration for up-to-date framework docs',
    },
    { 
      name: 'Filesystem MCP', 
      repo: 'modelcontextprotocol/servers',
      desc: 'Secure file operations (reference server)',
    },
    { 
      name: 'Memory MCP', 
      repo: 'modelcontextprotocol/servers',
      desc: 'Knowledge graph for persistent memory across sessions',
    },
  ]

  return (
    <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
      {/* Hero Intro */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <ThunderboltOutlined style={{ marginRight: 8, color: primary[500] }} />
            AI-Assisted Development Workflow
          </Title>
        }
        subtitle="This section documents the recommended workflow for building projects with AI assistance, covering both planning with external AI and implementation with inline coding agents."
      />

      {/* Two Approaches */}
      <Section title="Two Approaches to AI-Assisted Development" icon={<ThunderboltOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Depending on the task, you may use different AI tools at different stages:
        </Paragraph>
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card 
              size="small" 
              title={<><TeamOutlined style={{ marginRight: 8, color: primary[500] }} />External AI Dev Planner</>}
              style={{ height: '100%', ...modernCardStyle, background: gradients.blueCard }}
            >
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm }}>
                Use ChatGPT, Claude web, or similar for high-level planning:
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'Clarify project brief and objectives',
                  'Define architecture and database schema',
                  'Create PRD (Product Requirements Document)',
                  'Break features into user stories',
                  'Generate pointed prompts for coding agent',
                  'Review architecture decisions',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                  </List.Item>
                )}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Text type="secondary" style={{ fontSize: fontSize.xs }}>
                <Text strong>Best for:</Text> Strategy, requirements, complex decisions, not code edits
              </Text>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card 
              size="small" 
              title={<><CodeOutlined style={{ marginRight: 8, color: secondary[500] }} />Inline Coding Agent</>}
              style={{ height: '100%', ...modernCardStyle, background: gradients.mintCard }}
            >
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm }}>
                Use Copilot, Claude Code, Cursor, or similar for implementation:
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  'Direct codebase access via workspace',
                  'Read/write files with full context',
                  'Run terminal commands and see output',
                  'Access MCP servers for external tools',
                  'Iterate quickly with instant feedback',
                  'Debug with error context',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                  </List.Item>
                )}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Text type="secondary" style={{ fontSize: fontSize.xs }}>
                <Text strong>Best for:</Text> Writing code, refactoring, debugging, file operations
              </Text>
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Key Files for AI */}
      <Card style={{ ...modernCardStyle }}>
        <Title level={4} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileOutlined style={{ color: primary[500] }} />
          Key Files for AI
        </Title>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Card size="small" style={{ background: neutral[50], borderRadius: borderRadius.md }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Text code strong>AGENTS.md</Text>
              <Tag color="blue">Primary</Tag>
            </div>
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>
              Complete project context for AI assistants. Includes tech stack, folder structure, coding conventions, and component patterns.
            </Text>
          </Card>
          <Card size="small" style={{ background: neutral[50], borderRadius: borderRadius.md }}>
            <div style={{ marginBottom: 4 }}>
              <Text code strong>PROMPTS.md</Text>
            </div>
            <Text type="secondary" style={{ fontSize: fontSize.sm }}>
              Ready-to-use prompts for common tasks like creating pages, adding components, and building features.
            </Text>
          </Card>
        </Space>
      </Card>

      {/* Recommended Workflow */}
      <Card style={{ 
        ...modernCardStyle, 
        background: gradients.heroSubtle,
      }}>
        <Title level={4} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RocketOutlined style={{ color: secondary[500] }} />
          Recommended Workflow for New Features
        </Title>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {[
            { step: 1, title: 'Clarify Brief', tag: 'External AI', tagColor: 'blue', desc: 'Discuss objectives, audience, constraints. Output: Clear brief or PRD.' },
            { step: 2, title: 'Quick Design / Theme Update', tag: 'Either', tagColor: 'cyan', desc: 'Adjust tokens in theme/tokens.ts. Use Figma MCP if design files available.' },
            { step: 3, title: 'Implementation', tag: 'Inline Agent', tagColor: 'green', desc: 'Work through features with coding agent. Reference Demo page for patterns.' },
            { step: 4, title: 'Human Review', tag: 'Manual', tagColor: 'default', desc: 'Test, review code quality, check for missed requirements.' },
            { step: 5, title: 'Iterate', tag: 'Repeat', tagColor: 'default', desc: 'Repeat steps 3-4 until feature complete. Commit incrementally.' },
          ].map((item) => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <StepNumber number={item.step} size={32} />
              <div>
                <Text strong>{item.title}</Text>
                <Tag color={item.tagColor} style={{ marginLeft: 8 }}>{item.tag}</Tag>
                <br />
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>{item.desc}</Text>
              </div>
            </div>
          ))}
        </Space>
      </Card>

      {/* Tech Stack with AI Context */}
      <Section title="Tech Stack with AI Integration Details" icon={<ApiOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Each tool in our stack has relevant AI integrations or MCP servers:
        </Paragraph>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 500 }}
          dataSource={techStack}
          columns={[
            { 
              title: 'Tool', 
              dataIndex: 'tool', 
              key: 'tool', 
              width: 100,
              render: (text: string) => <Text strong>{text}</Text>,
            },
            { 
              title: 'Purpose', 
              dataIndex: 'purpose', 
              key: 'purpose',
              width: 150,
            },
            { 
              title: 'AI Integration', 
              dataIndex: 'aiContext', 
              key: 'aiContext',
              render: (text: string) => (
                <Tag color="blue" style={{ fontSize: fontSize.xs }}>{text}</Tag>
              ),
            },
          ]}
        />
      </Section>

      {/* MCP Servers */}
      <Section title="Recommended MCP Servers">
        <Alert
          type="info"
          showIcon
          icon={<ApiOutlined />}
          message="What is MCP?"
          description="Model Context Protocol (MCP) allows AI agents to securely access external tools and data. MCP servers extend what your coding agent can do."
          style={{ marginBottom: layout.cardGap }}
        />
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          {mcpServers.map((server) => (
            <Col xs={24} md={12} key={server.name}>
              <Card size="small" style={{ height: '100%' }}>
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Text strong>
                    <ToolOutlined style={{ marginRight: 8, color: primary[500] }} />
                    {server.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: fontSize.sm }}>{server.desc}</Text>
                  <Text code style={{ fontSize: fontSize.xs }}>{server.repo}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        <Divider />
        <Paragraph type="secondary" style={{ fontSize: fontSize.sm }}>
          <LinkOutlined style={{ marginRight: 8 }} />
          Browse more servers at{' '}
          <Text code>github.com/modelcontextprotocol/servers</Text>
          {' '}or use <Text code>smithery.ai</Text> to discover and install MCP servers.
        </Paragraph>
      </Section>

      {/* Tips for Effective AI Collaboration */}
      <Section title="Tips for Effective AI Collaboration">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" title={<><ExperimentOutlined /> For Planning (External AI)</>} style={{ height: '100%' }}>
              <List
                size="small"
                dataSource={[
                  'Provide full context: audience, constraints, tech stack',
                  'Ask for structured output (PRD, user stories, acceptance criteria)',
                  'Request specific prompts you can paste into coding agent',
                  'Use iterative refinement: start broad, narrow down',
                  'Save good outputs for reuse across similar projects',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={<><CodeOutlined /> For Coding (Inline Agent)</>} style={{ height: '100%' }}>
              <List
                size="small"
                dataSource={[
                  'Reference existing patterns: "follow Demo page structure"',
                  'Be specific: file paths, component names, token values',
                  'Request incremental changes, not full rewrites',
                  'Ask agent to read files before editing for context',
                  'Use todo lists for multi-step tasks',
                  'Validate after each change (check errors, run dev server)',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Sample External AI Prompt */}
      <Section title="Sample Planning Prompt (for External AI)">
        <Card size="small" style={{ backgroundColor: neutral[50] }}>
          <pre style={{ margin: 0, fontSize: fontSize.xs, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
{`I'm planning a new feature for a Huri Noa POC 1 project.

Context:
- Next.js 14 + Ant Design 5 + TypeScript
- Enterprise internal tool for [describe audience]
- Existing patterns: CRUD demo with Table/Modal/Form, PageHeader with breadcrumbs

Feature: [describe the feature]

Please help me:
1. Break this into user stories with acceptance criteria
2. Identify which existing patterns I can reuse
3. Suggest a technical approach
4. Generate 3-5 specific prompts I can give to my coding agent

Format the prompts so they reference specific files and patterns in the codebase.`}
          </pre>
        </Card>
      </Section>

      {/* Prompt Template */}
      <Section title="Prompt Template (for Inline Agent)">
        <Paragraph type="secondary" style={{ marginBottom: layout.itemGap }}>
          When asking your coding agent to generate code for this project, include context like:
        </Paragraph>
        <Card size="small" style={{ backgroundColor: neutral[50] }}>
          <pre style={{ margin: 0, fontSize: fontSize.xs, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
{`I'm working on a Huri Noa POC 1 project — an AI Starter Kit for rapid development.

Technology stack:
- Next.js 14 (App Router)
- Ant Design 5
- TypeScript throughout
- Centralised theming via Ant Design ConfigProvider

Design intent:
- Calm, readable, enterprise-first UI
- Structure first, then polish
- Consistency through design tokens (no magic values)
- Accessible by default

The project uses:
- Design tokens in @/theme (colours, typography, spacing, layout)
- PageHeader component with breadcrumbs, title, description, actions
- AppShell with sidebar navigation and header

Please follow the existing patterns:
- Add 'use client' directive for interactive components
- Use Ant Design components (Card, Table, Form, etc.)
- Import tokens from @/theme for colours, spacing, and layout values
- Use layout tokens instead of magic numbers (e.g., layout.cardGap not 16)

[Your specific request here]`}
          </pre>
        </Card>
      </Section>

      {/* Ready-to-Use Prompts */}
      <Section title="Ready-to-Use Prompts">
        <Alert
          type="success"
          showIcon
          icon={<BulbOutlined />}
          message="Pro Tip"
          description='Always start prompts with "Read AGENTS.md" — this gives the AI full context about the project structure and conventions.'
          style={{ marginBottom: layout.cardGap }}
        />

        {promptSections.map((section, sectionIdx) => (
          <div key={sectionIdx} style={{ marginBottom: layout.cardGap }}>
            <Title level={5} style={{ marginBottom: 12 }}>{section.title}</Title>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              {section.prompts.map((item, promptIdx) => (
                <Card
                  key={promptIdx}
                  size="small"
                  title={<Text strong>{item.name}</Text>}
                  extra={
                    <Tag 
                      icon={copiedPrompt === item.prompt ? <CheckCircleOutlined /> : <CopyOutlined />} 
                      color={copiedPrompt === item.prompt ? 'success' : 'blue'}
                      style={{ cursor: 'pointer' }}
                      onClick={() => copyToClipboard(item.prompt)}
                    >
                      {copiedPrompt === item.prompt ? 'Copied!' : 'Copy'}
                    </Tag>
                  }
                >
                  <pre
                    style={{
                      background: neutral[50],
                      padding: 12,
                      borderRadius: 6,
                      fontSize: fontSize.sm,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      margin: 0,
                      fontFamily: 'monospace',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.prompt}
                  </pre>
                </Card>
              ))}
            </Space>
          </div>
        ))}

        <Alert
          type="info"
          showIcon
          message="More Prompts"
          description={<>See <Text code>PROMPTS.md</Text> in the project root for the complete collection of starter prompts, including a full example workflow.</>}
        />
      </Section>
    </Space>
  )
}

// ============================================================================
// TAB CONTENT: INFRASTRUCTURE (includes Deployments + Troubleshooting)
// ============================================================================

function InfrastructureTab() {
  const infrastructureOptions = [
    {
      key: 1,
      pattern: 'Vercel + Supabase',
      useWhen: 'Fast POCs, lightweight apps, auth + DB needs',
      strengths: 'Quick setup, generous free tier, real-time features',
      considerations: 'Limited backend logic, no NZ data residency',
    },
    {
      key: 2,
      pattern: 'Vercel + Laravel API',
      useWhen: 'Enterprise logic with fast UI iteration',
      strengths: 'Best of both: Next.js speed + Laravel power',
      considerations: 'Two deployments to manage, API latency',
    },
    {
      key: 3,
      pattern: 'Full Laravel (SiteHost)',
      useWhen: 'Heavy enterprise systems, NZ data residency required',
      strengths: 'Full control, compliance, complex integrations',
      considerations: 'Slower UI iteration, more DevOps overhead',
    },
  ]

  const decisionTriggers = [
    { trigger: 'Need real-time subscriptions', recommendation: 'Supabase' },
    { trigger: '5+ complex business rules', recommendation: 'Laravel API' },
    { trigger: '3+ external integrations', recommendation: 'Laravel API' },
    { trigger: 'Background jobs / queues', recommendation: 'Laravel' },
    { trigger: 'Audit trail / compliance', recommendation: 'Laravel' },
    { trigger: 'NZ data residency required', recommendation: 'SiteHost' },
    { trigger: 'Just need auth + simple CRUD', recommendation: 'Supabase' },
  ]

  const commonIssues = [
    {
      key: 'vercel-no-deploy',
      title: 'Vercel not deploying on push',
      symptoms: 'You push to GitHub but no deployment appears in Vercel',
      causes: [
        'Pushing to wrong branch (not the production branch)',
        'Git integration permissions revoked or expired',
        'Wrong repository connected in Vercel',
        'Vercel project paused or deleted',
      ],
      fixes: [
        'Check Vercel → Settings → Git → verify repo and production branch',
        'Check GitHub → Settings → Applications → verify Vercel has access',
        'Try disconnecting and reconnecting the Git integration',
        'Check Vercel → Deployments for any queued or failed builds',
      ],
    },
    {
      key: 'git-author-error',
      title: '"Git author does not have access" error',
      symptoms: 'Vercel shows "Deployment request did not have a git author that has access to the project"',
      causes: [
        'Your local git email doesn\'t match your GitHub account',
        'The GitHub account isn\'t added to the Vercel project team',
        'Commits were made with a different identity',
      ],
      fixes: [
        'Check your git config: git config user.email',
        'Update to match GitHub: git config user.email "your@github.email"',
        'Amend the commit: git commit --amend --reset-author',
        'Push with lease: git push --force-with-lease',
        'Add the GitHub user to Vercel project team if needed',
      ],
    },
    {
      key: 'build-failures',
      title: 'Build failures on Vercel',
      symptoms: 'Deployment fails during the "Building" phase',
      causes: [
        'Node version mismatch (local vs Vercel)',
        'Missing environment variables',
        'TypeScript errors that were ignored locally',
        'Missing dependencies (not in package.json)',
      ],
      fixes: [
        'Check Vercel build logs for specific error messages',
        'Set Node version in Vercel → Settings → General → Node.js Version',
        'Or add "engines" to package.json: "node": "18.x"',
        'Run npm run build locally to catch errors before pushing',
        'Ensure all env vars are set in Vercel dashboard',
      ],
    },
    {
      key: 'fouc',
      title: 'Flash of unstyled content (FOUC)',
      symptoms: 'Brief moment of unstyled or incorrectly styled content on page load/refresh',
      causes: [
        'CSS-in-JS hydration mismatch (Ant Design + SSR)',
        'Web fonts loading after initial render',
        'Next.js streaming causing progressive hydration',
        'Missing or slow CSS extraction',
      ],
      fixes: [
        'Ensure @ant-design/nextjs-registry is correctly configured in layout.tsx',
        'Use font-display: swap for web fonts (already configured)',
        'Verify ConfigProvider wraps the entire app',
        'loading.tsx provides instant feedback during navigation',
        'Some minimal FOUC is normal with CSS-in-JS — focus on perceived performance',
      ],
    },
    {
      key: 'preview-missing',
      title: 'Preview deployments not appearing',
      symptoms: 'You create a PR but no preview URL is generated',
      causes: [
        'No Pull Request created (just a branch push)',
        'Branch protection rules blocking deployments',
        'GitHub permissions not allowing Vercel to comment on PRs',
        'Preview deployments disabled in Vercel settings',
      ],
      fixes: [
        'Create a Pull Request — Vercel only comments on PRs, not branches',
        'Check Vercel → Settings → Git → Preview deployment settings',
        'Verify GitHub App permissions for the repository',
        'Look in Vercel Deployments — preview might exist but without PR comment',
      ],
    },
    {
      key: 'env-vars-missing',
      title: 'Environment variables not working',
      symptoms: 'App works locally but fails on Vercel with undefined values',
      causes: [
        'Env vars not added to Vercel dashboard',
        'Wrong environment scope (Preview vs Production)',
        'Using NEXT_PUBLIC_ prefix incorrectly',
        'Env var added after deployment (needs redeploy)',
      ],
      fixes: [
        'Add env vars in Vercel → Settings → Environment Variables',
        'Select correct environments: Production, Preview, Development',
        'Client-side vars MUST start with NEXT_PUBLIC_',
        'Redeploy after adding new env vars',
        'Use .env.example to document required variables',
      ],
    },
  ]

  return (
    <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
      {/* Hero Intro */}
      <GradientHero
        gradient={gradients.heroSubtle}
        title={
          <Title level={3} style={{ margin: 0, color: neutral[800] }}>
            <CloudUploadOutlined style={{ marginRight: 8, color: primary[500] }} />
            Infrastructure & Deployment
          </Title>
        }
        subtitle="This section documents the recommended deployment workflow for Huri Noa POC 1 projects: GitHub (private repo) → Vercel (auto-deploy) → Production."
      />

      {/* Infrastructure Decision Guide */}
      <Section title="Infrastructure Layers (Decision Guide)" icon={<GlobalOutlined style={{ color: primary[500] }} />}>
        <Paragraph type="secondary" style={{ marginBottom: layout.cardGap }}>
          Choose your infrastructure based on <Text strong>where truth lives</Text> — UI, data/auth, or business logic:
        </Paragraph>
        
        <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginBottom: layout.cardGap }}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.blueCard }}>
              <Space direction="vertical" size={8}>
                <Text strong><GlobalOutlined style={{ marginRight: 8, color: primary[500] }} />UI Layer</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>Next.js on Vercel</Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.sm }}>Fast iteration, instant previews, CDN-backed</Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.mintCard }}>
              <Space direction="vertical" size={8}>
                <Text strong><DatabaseOutlined style={{ marginRight: 8, color: secondary[500] }} />Data/Auth Layer</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>Supabase or Laravel</Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.sm }}>Auth, database, real-time, storage</Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ height: '100%', ...modernCardStyle, background: gradients.purpleCard }}>
              <Space direction="vertical" size={8}>
                <Text strong><ApiOutlined style={{ marginRight: 8, color: '#722ed1' }} />System-of-Record</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>Laravel (SiteHost/NZ)</Text>
                <Divider style={{ margin: '8px 0' }} />
                <Text style={{ fontSize: fontSize.sm }}>Complex logic, integrations, compliance</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Title level={5} style={{ marginBottom: 12 }}>Recommended Patterns</Title>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 600 }}
          dataSource={infrastructureOptions}
          style={{ borderRadius: borderRadius.md, overflow: 'hidden', marginBottom: layout.cardGap }}
          columns={[
            { title: 'Pattern', dataIndex: 'pattern', key: 'pattern', width: 120, render: (t: string) => <Text strong>{t}</Text> },
            { title: 'Use When', dataIndex: 'useWhen', key: 'useWhen' },
            { title: 'Strengths', dataIndex: 'strengths', key: 'strengths' },
            { title: 'Consider', dataIndex: 'considerations', key: 'considerations' },
          ]}
        />

        <Title level={5} style={{ marginBottom: 12 }}>Quick Decision Triggers</Title>
        <Row gutter={[8, 8]}>
          {decisionTriggers.map((item, idx) => (
            <Col xs={24} sm={12} key={idx}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <ThunderboltOutlined style={{ color: secondary[500] }} />
                <Text style={{ fontSize: fontSize.sm }}>{item.trigger}</Text>
                <Tag color="blue" style={{ marginLeft: 'auto' }}>{item.recommendation}</Tag>
              </div>
            </Col>
          ))}
        </Row>
      </Section>

      {/* Git/GitHub Setup */}
      <Section title="Git/GitHub Setup (Huri Noa POC 1 Standard)">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" title={<><GithubOutlined style={{ marginRight: 8 }} />Repository Standards</>}>
              <List
                size="small"
                dataSource={[
                  { label: 'Naming', value: 'Stable name, no version suffix (use tags/releases)' },
                  { label: 'Visibility', value: 'Private by default for client work' },
                  { label: 'Production branch', value: 'main (not master) — Vercel uses GitHub default' },
                  { label: 'Feature branches', value: 'feature/descriptive-name or fix/issue-name' },
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '6px 0', border: 'none' }}>
                    <Text strong style={{ minWidth: 120, display: 'inline-block' }}>{item.label}</Text>
                    <Text type="secondary" style={{ fontSize: fontSize.sm }}>{item.value}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title={<><BranchesOutlined style={{ marginRight: 8 }} />Branching Workflows</>}>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginBottom: 8 }}>
                <Text strong>Standard (recommended):</Text>
              </Paragraph>
              <div style={{ background: neutral[50], padding: 8, borderRadius: 6, marginBottom: 12, fontSize: fontSize.sm }}>
                <Text code>feature branch</Text> → <Text code>PR</Text> → <Text code>Preview URL</Text> → <Text code>merge</Text> → <Text code>production</Text>
              </div>
              <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginBottom: 8 }}>
                <Text strong>Simple (tiny internal POCs):</Text>
              </Paragraph>
              <div style={{ background: neutral[50], padding: 8, borderRadius: 6, fontSize: fontSize.sm }}>
                <Text code>push to main</Text> → <Text code>auto-deploy to production</Text>
              </div>
            </Card>
          </Col>
        </Row>

        <Alert
          type="warning"
          showIcon
          icon={<SafetyOutlined />}
          message="Git Author Identity"
          description={
            <Space direction="vertical" size={8} style={{ width: '100%', marginTop: 8 }}>
              <Text style={{ fontSize: fontSize.sm }}>
                Your git author email <Text strong>must match</Text> the GitHub account that has access to the Vercel project.
                Otherwise you'll see: <Text code>"Deployment request did not have a git author..."</Text>
              </Text>
              <Text style={{ fontSize: fontSize.sm }}>Fix with:</Text>
              <CodeBlock>{`git config user.email "your-github-email@example.com"
git commit --amend --reset-author
git push --force-with-lease`}</CodeBlock>
            </Space>
          }
          style={{ marginTop: layout.cardGap }}
        />
      </Section>

      {/* Vercel Deployment Process */}
      <Section title="Vercel Deployment (Step-by-Step)">
        <Title level={5} style={{ marginBottom: 12 }}>First Deployment</Title>
        <Steps
          direction="vertical"
          size="small"
          current={-1}
          items={[
            {
              title: 'Connect GitHub Repository',
              description: <Text type="secondary" style={{ fontSize: fontSize.sm }}>Go to vercel.com → Add New Project → Import from GitHub (private repos supported)</Text>,
            },
            {
              title: 'Confirm Framework Detection',
              description: <Text type="secondary" style={{ fontSize: fontSize.sm }}>Vercel auto-detects Next.js — verify settings are correct</Text>,
            },
            {
              title: 'Configure Environment Variables',
              description: <Text type="secondary" style={{ fontSize: fontSize.sm }}>Add required env vars before first deploy (see Environment Variables below)</Text>,
            },
            {
              title: 'Deploy',
              description: <Text type="secondary" style={{ fontSize: fontSize.sm }}>Click Deploy — Vercel builds and assigns a .vercel.app URL</Text>,
            },
            {
              title: 'Verify Production Branch',
              description: <Text type="secondary" style={{ fontSize: fontSize.sm }}>Settings → Git → Production Branch should match your GitHub default (usually main)</Text>,
            },
          ]}
        />

        <Divider />

        <Title level={5} style={{ marginBottom: 12 }}>Auto-Deploy Behaviour</Title>
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: semantic.success.light, borderColor: semantic.success.base }}>
              <Text strong style={{ color: semantic.success.dark }}>
                <CheckCircleOutlined style={{ marginRight: 8 }} />Production Deploys
              </Text>
              <Paragraph style={{ fontSize: fontSize.sm, marginTop: 8, marginBottom: 0 }}>
                Triggered by: Push or merge to <Text code>main</Text> branch
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ background: primary[50], borderColor: primary[200] }}>
              <Text strong style={{ color: primary[600] }}>
                <BranchesOutlined style={{ marginRight: 8 }} />Preview Deploys
              </Text>
              <Paragraph style={{ fontSize: fontSize.sm, marginTop: 8, marginBottom: 0 }}>
                Triggered by: Any PR or push to non-production branches
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Title level={5} style={{ marginBottom: 12 }}>Environment Variables</Title>
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 450 }}
          dataSource={[
            { key: 1, scope: 'Development', where: 'Local .env.local file', notes: 'Never committed to git' },
            { key: 2, scope: 'Preview', where: 'Vercel Dashboard → Settings → Env Vars', notes: 'Applied to PR previews' },
            { key: 3, scope: 'Production', where: 'Vercel Dashboard → Settings → Env Vars', notes: 'Applied to main branch' },
          ]}
          columns={[
            { title: 'Scope', dataIndex: 'scope', key: 'scope', width: 100 },
            { title: 'Where to Set', dataIndex: 'where', key: 'where' },
            { title: 'Notes', dataIndex: 'notes', key: 'notes' },
          ]}
          style={{ marginBottom: 12 }}
        />
        <Alert
          type="error"
          showIcon
          icon={<WarningOutlined />}
          message="Never commit secrets"
          description={
            <>
              <Text style={{ fontSize: fontSize.sm }}>
                Add <Text code>.env.local</Text> to <Text code>.gitignore</Text>. 
                Create <Text code>.env.example</Text> with placeholder values for documentation.
              </Text>
            </>
          }
        />
      </Section>

      {/* Where to Troubleshoot */}
      <Section title="Where to Troubleshoot">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          {[
            { title: 'Deployment Status', location: 'Vercel Dashboard → Deployments', icon: <CloudUploadOutlined /> },
            { title: 'Build Logs', location: 'Click any deployment → Building → View logs', icon: <FileOutlined /> },
            { title: 'Runtime Errors', location: 'Vercel Dashboard → Logs (or browser console)', icon: <BugOutlined /> },
            { title: 'Git Integration', location: 'Vercel → Settings → Git → check webhooks', icon: <GithubOutlined /> },
          ].map((item, idx) => (
            <Col xs={24} sm={12} key={idx}>
              <Card size="small">
                <Space>
                  <span style={{ color: primary[500] }}>{item.icon}</span>
                  <div>
                    <Text strong>{item.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: fontSize.sm }}>{item.location}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Alert
          type="info"
          showIcon
          message="See Troubleshooting Tab"
          description="For common issues and fixes, check the Troubleshooting tab."
          style={{ marginTop: layout.cardGap }}
        />
      </Section>

      {/* AI-Assisted Deployment */}
      <Section title="AI-Assisted Deployment Workflow">
        <Alert
          type="success"
          showIcon
          icon={<BulbOutlined />}
          message="Safe Pattern: AI proposes, human executes"
          description="Let AI generate commands and configs, but always review before running — especially for deploy, push, and env var operations."
          style={{ marginBottom: layout.cardGap }}
        />

        <Title level={5} style={{ marginBottom: 12 }}>Ready-to-Use Prompts</Title>
        
        <Collapse
          size="small"
          items={[
            {
              key: '1',
              label: <Text strong>Prepare repo for first Vercel deploy</Text>,
              children: (
                <CodeBlock>{`Read AGENTS.md. I want to deploy this project to Vercel for the first time.

Check that:
1. The project builds successfully (npm run build)
2. .env.example exists with all required env vars documented
3. .gitignore includes .env.local
4. package.json has correct build scripts

List any issues found and provide fixes.`}</CodeBlock>
              ),
            },
            {
              key: '2',
              label: <Text strong>Fix Vercel "git author" access error</Text>,
              children: (
                <CodeBlock>{`I'm getting this Vercel error: "Deployment request did not have a git author that has access to the project"

Help me fix this by:
1. Showing me how to check my current git config email
2. Providing commands to update my git author email
3. Amending my last commit with the correct author
4. Force pushing safely

My GitHub email is: [INSERT YOUR GITHUB EMAIL]`}</CodeBlock>
              ),
            },
            {
              key: '3',
              label: <Text strong>Add Supabase env vars safely</Text>,
              children: (
                <CodeBlock>{`Read AGENTS.md. I need to add Supabase to this Huri Noa POC 1 project.

Help me:
1. Create/update .env.example with placeholder Supabase vars
2. Document what each variable is for
3. Remind me where to add real values (local .env.local + Vercel dashboard)
4. Verify .env.local is gitignored

Do NOT output any real secrets.`}</CodeBlock>
              ),
            },
          ]}
        />

        <Paragraph type="secondary" style={{ fontSize: fontSize.sm, marginTop: layout.cardGap }}>
          <Text strong>Note:</Text> MCP integrations for GitHub/Vercel can be added later for automation, 
          but the default workflow above is simple and reliable.
        </Paragraph>
      </Section>

      {/* ================================================================== */}
      {/* TROUBLESHOOTING SECTION (merged from Troubleshooting tab) */}
      {/* ================================================================== */}

      <Divider orientation="left">
        <Space>
          <BugOutlined style={{ color: semantic.error.base }} />
          <Text strong>Troubleshooting</Text>
        </Space>
      </Divider>

      {/* Quick Reference */}
      <Section title="Quick Diagnostic Checklist">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={12}>
            <Card size="small" title="Before Deploying">
              <List
                size="small"
                dataSource={[
                  'npm run build succeeds locally',
                  'git status is clean (all changes committed)',
                  'Pushing to correct branch (main for production)',
                  'Git author email matches GitHub account',
                  'All required env vars documented in .env.example',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Checkbox>{item}</Checkbox>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" title="If Deployment Fails">
              <List
                size="small"
                dataSource={[
                  'Check Vercel Dashboard → Deployments → Build logs',
                  'Verify all env vars are set in Vercel',
                  'Check Node version matches local (18.x)',
                  'Run npm run build locally to reproduce',
                  'Check GitHub → Vercel integration is connected',
                ]}
                renderItem={(item) => (
                  <List.Item style={{ padding: '4px 0', border: 'none' }}>
                    <Text style={{ fontSize: fontSize.sm }}>• {item}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Section>

      {/* Detailed Issues */}
      <Section title="Common Issues & Fixes">
        <Collapse
          size="small"
          items={commonIssues.map((issue) => ({
            key: issue.key,
            label: (
              <Space>
                <BugOutlined style={{ color: semantic.error.base }} />
                <Text strong>{issue.title}</Text>
              </Space>
            ),
            children: (
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                    <Text strong>Symptoms: </Text>{issue.symptoms}
                  </Text>
                </div>
                <div>
                  <Text strong style={{ fontSize: fontSize.sm }}>Possible Causes:</Text>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
                    {issue.causes.map((cause, idx) => (
                      <li key={idx} style={{ fontSize: fontSize.sm, color: neutral[600] }}>{cause}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Text strong style={{ fontSize: fontSize.sm, color: semantic.success.dark }}>Fixes:</Text>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
                    {issue.fixes.map((fix, idx) => (
                      <li key={idx} style={{ fontSize: fontSize.sm }}>{fix}</li>
                    ))}
                  </ul>
                </div>
              </Space>
            ),
          }))}
        />
      </Section>

      {/* Useful Commands */}
      <Section title="Useful Commands Reference">
        <Table
          size="small"
          pagination={false}
          scroll={{ x: 500 }}
          dataSource={[
            { key: 1, command: 'npm run build', purpose: 'Test production build locally before deploying' },
            { key: 2, command: 'git config user.email', purpose: 'Check current git author email' },
            { key: 3, command: 'git config user.email "you@example.com"', purpose: 'Set git author email' },
            { key: 4, command: 'git commit --amend --reset-author', purpose: 'Update author on last commit' },
            { key: 5, command: 'git push --force-with-lease', purpose: 'Safe force push after amending' },
            { key: 6, command: 'git log --oneline -5', purpose: 'Check recent commits and authors' },
            { key: 7, command: 'npx vercel', purpose: 'Manual deploy via Vercel CLI (optional)' },
          ]}
          columns={[
            { 
              title: 'Command', 
              dataIndex: 'command', 
              key: 'command', 
              width: 280,
              render: (text: string) => <Text code style={{ fontSize: fontSize.sm }}>{text}</Text>,
            },
            { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
          ]}
        />
      </Section>

      {/* Get Help */}
      <Section title="Still Stuck?">
        <Row gutter={[layout.cardGap, layout.cardGap]}>
          <Col xs={24} md={8}>
            <Card size="small">
              <Space direction="vertical">
                <Text strong><TeamOutlined style={{ marginRight: 8, color: primary[500] }} />Ask AI</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  Copy the error message and ask your AI assistant. Include context from AGENTS.md.
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small">
              <Space direction="vertical">
                <Text strong><FileOutlined style={{ marginRight: 8, color: secondary[500] }} />Check Logs</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  Vercel build logs contain detailed error messages. Read them carefully.
                </Text>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small">
              <Space direction="vertical">
                <Text strong><LinkOutlined style={{ marginRight: 8, color: '#722ed1' }} />Documentation</Text>
                <Text type="secondary" style={{ fontSize: fontSize.sm }}>
                  Vercel Docs: vercel.com/docs<br />
                  Next.js Docs: nextjs.org/docs
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Section>
    </Space>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

const DEFAULT_TAB = 'overview'

export default function DocsPage() {
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
      key: 'overview',
      label: 'Overview',
      children: <OverviewTab />,
    },
    {
      key: 'getting-started',
      label: 'Setup',
      children: <GettingStartedTab />,
    },
    {
      key: 'ai-workflow',
      label: isMobile ? 'AI' : 'AI Workflow',
      children: <AIWorkflowTab />,
    },
    {
      key: 'conventions',
      label: isMobile ? 'Code' : 'Conventions',
      children: <ConventionsTab />,
    },
    {
      key: 'architecture',
      label: isMobile ? 'Arch' : 'Architecture',
      children: <ArchitectureTab />,
    },
    {
      key: 'infrastructure',
      label: isMobile ? 'Infra' : 'Infrastructure',
      children: <InfrastructureTab />,
    },
  ]

  return (
    <>
      <PageHeader 
        title="Documents" 
        description={navItem.description}
        breadcrumbs={[{ label: 'Docs' }]}
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

