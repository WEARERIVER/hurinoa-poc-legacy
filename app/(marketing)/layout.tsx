'use client'

import { Layout, Typography, Space, Button, Grid } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { primary, secondary, neutral, layout, borderRadius } from '@/theme'

const { Header, Content, Footer } = Layout
const { Text } = Typography

/**
 * Marketing Layout
 * ================
 * Clean layout for public-facing pages (landing, about, etc.)
 * No sidebar — just header, content, footer.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens.md

  return (
    <Layout style={{ minHeight: '100vh', background: neutral[50] }}>
      {/* ================================================================== */}
      {/* MARKETING HEADER                                                   */}
      {/* ================================================================== */}
      <Header
        style={{
          background: '#fff',
          height: layout.headerHeight,
          padding: isMobile ? '0 16px' : '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${neutral[200]}`,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: `linear-gradient(135deg, ${primary[400]} 0%, ${primary[600]} 100%)`,
              borderRadius: borderRadius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              boxShadow: `0 2px 8px ${primary[500]}30`,
            }}
          >
            H
          </div>
          <Text strong style={{ marginLeft: 12, fontSize: 18, color: neutral[800], letterSpacing: '-0.02em' }}>
            Huri Noa POC
          </Text>
        </Link>

        {/* Navigation */}
        <Space size={isMobile ? 8 : 16} wrap style={{ justifyContent: 'flex-end' }}>
          <Link href="/app">
            <Button size={isMobile ? 'small' : 'middle'} type="primary" style={{ fontWeight: 500 }}>
              Open Uri <ArrowRightOutlined />
            </Button>
          </Link>
          <Link href="/admin">
            <Button size={isMobile ? 'small' : 'middle'} type="primary" style={{ fontWeight: 500 }}>
              Open Contributor <ArrowRightOutlined />
            </Button>
          </Link>
        </Space>
      </Header>

      {/* ================================================================== */}
      {/* CONTENT                                                            */}
      {/* ================================================================== */}
      <Content>
        {children}
      </Content>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}
      <Footer
        style={{
          background: neutral[800],
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <Text style={{ color: neutral[400], fontSize: 14 }}>
          Huri Noa — Kaupapa Coordination Platform
        </Text>
        <br />
        <Text style={{ color: neutral[500], fontSize: 13, marginTop: 8, display: 'inline-block' }}>
          Built with care for our communities | Powered by{' '}
          <a
            href="https://www.weareriver.nz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: neutral[400], textDecoration: 'none', fontWeight: 500 }}
          >
            RIVER Group
          </a>
        </Text>
      </Footer>
    </Layout>
  )
}
