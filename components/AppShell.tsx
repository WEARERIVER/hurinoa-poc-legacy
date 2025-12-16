'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Layout, Menu, Input, Avatar, Space, Typography, Dropdown, Drawer, Grid, App } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { navigation } from '@/lib/navigation'
import { primary, neutral, layout, borderRadius } from '@/theme'

const { Header, Sider, Content } = Layout
const { Text } = Typography
const { useBreakpoint } = Grid

interface AppShellProps {
  children: React.ReactNode
}

/**
 * AppShell Component
 * ==================
 * Main layout wrapper for all pages.
 * 
 * Responsive behavior:
 * - Desktop (lg+): Fixed sidebar with collapse toggle
 * - Mobile (<lg): Hidden sidebar with hamburger menu + drawer
 * 
 * Structure:
 * - Sidebar: Logo + primary navigation
 * - Header: Toggle, search, user menu
 * - Content: Page content area
 * 
 * Uses layout tokens from theme/tokens.ts for consistent sizing.
 */
export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const screens = useBreakpoint()
  const { message } = App.useApp()
  
  // Determine if we're on mobile
  const isMobile = !screens.lg
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Determine active menu key from pathname
  const activeKey = navigation.find((item) => pathname.startsWith(item.path))?.key || 'dashboard'

  // Use Link components for navigation to enable prefetching
  const menuItems = navigation.map((item) => ({
    key: item.key,
    icon: <item.icon />,
    label: <Link href={item.path} style={{ color: 'inherit' }}>{item.label}</Link>,
  }))

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined style={{ color: primary[500] }} />, label: <span style={{ color: primary[500] }}>Sign out</span> },
  ]

  const currentSidebarWidth = collapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth

  // Shared menu component for sidebar and drawer
  const NavigationMenu = (
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      items={menuItems}
      style={{ 
        border: 'none', 
        padding: '16px 8px',
        fontWeight: 500,
      }}
      onClick={() => isMobile && setMobileMenuOpen(false)}
    />
  )

  // Logo component
  const Logo = ({ showText = true }: { showText?: boolean }) => (
    <div
      style={{
        height: layout.headerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: showText ? 'flex-start' : 'center',
        padding: showText ? '0 20px' : 0,
        borderBottom: `1px solid ${neutral[200]}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          background: primary[500],
          borderRadius: borderRadius.md,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        C
      </div>
      {showText && (
        <Text strong style={{ marginLeft: 12, fontSize: 15, color: neutral[800] }}>
          CATALYST
        </Text>
      )}
    </div>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ================================================================== */}
      {/* DESKTOP SIDEBAR (hidden on mobile)                                */}
      {/* ================================================================== */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={layout.sidebarWidth}
          collapsedWidth={layout.sidebarCollapsedWidth}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: '#fff',
            borderRight: `1px solid ${neutral[200]}`,
          }}
        >
          <Logo showText={!collapsed} />
          {NavigationMenu}
        </Sider>
      )}

      {/* ================================================================== */}
      {/* MOBILE DRAWER                                                     */}
      {/* ================================================================== */}
      <Drawer
        placement="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={layout.sidebarWidth}
        styles={{ 
          body: { padding: 0 },
          header: { display: 'none' },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 12 }}>
          <Logo showText />
          <CloseOutlined 
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              fontSize: 16, 
              color: neutral[500], 
              cursor: 'pointer',
              padding: 8,
            }}
          />
        </div>
        {NavigationMenu}
      </Drawer>

      <Layout style={{ 
        marginLeft: isMobile ? 0 : currentSidebarWidth, 
        transition: 'margin-left 0.2s',
      }}>
        {/* ================================================================== */}
        {/* GLOBAL HEADER                                                     */}
        {/* ================================================================== */}
        <Header
          style={{
            padding: isMobile ? '0 16px' : `0 ${layout.pagePadding}px`,
            background: '#fff',
            height: layout.headerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${neutral[200]}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            gap: 12,
          }}
        >
          {/* Left side: Toggle + Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 16, flex: 1, minWidth: 0 }}>
            <div
              onClick={() => isMobile ? setMobileMenuOpen(true) : setCollapsed(!collapsed)}
              style={{ 
                cursor: 'pointer', 
                fontSize: 18, 
                padding: 8,
                borderRadius: borderRadius.md,
                color: neutral[600],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = neutral[100]}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {isMobile ? <MenuOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            </div>
            
            {/* Search - hidden on very small screens, compact on mobile */}
            {!screens.xs && (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined style={{ color: neutral[400] }} />}
                style={{ 
                  width: isMobile ? 180 : 280,
                  flexShrink: 1,
                  borderRadius: borderRadius.md,
                }}
                variant="filled"
              />
            )}
          </div>

          {/* Right side: User Avatar with Dropdown */}
          <Dropdown 
            menu={{ 
              items: userMenuItems,
              onClick: ({ key }) => {
                if (key === 'logout') {
                  message.success('Successfully logged out')
                }
              }
            }} 
            trigger={['click']} 
            placement="bottomRight"
          >
            <Space 
              style={{ 
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: borderRadius.lg,
                transition: 'background 0.2s',
                flexShrink: 0,
                height: 44,
                maxHeight: 44,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = neutral[100]}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Avatar 
                size={32} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#5b9bf8' }} 
              />
              {/* Hide username on mobile */}
              {!isMobile && <Text style={{ color: neutral[700] }}>User</Text>}
            </Space>
          </Dropdown>
        </Header>

        {/* ================================================================== */}
        {/* CONTENT AREA                                                      */}
        {/* ================================================================== */}
        <Content
          style={{
            padding: isMobile ? 16 : layout.pagePadding,
            minHeight: `calc(100vh - ${layout.headerHeight}px)`,
            background: neutral[50],
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
