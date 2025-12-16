'use client'

import { Typography, Breadcrumb, Grid } from 'antd'
import { HomeOutlined, RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { neutral, layout, fontSize, borderRadius } from '@/theme'

const { Title, Text } = Typography
const { useBreakpoint } = Grid

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  /** Page title - clear and readable */
  title: string
  /** Optional description below the title */
  description?: string
  /** 
   * Breadcrumb trail. If not provided, shows Home only.
   * Last item is automatically treated as current page (no link).
   */
  breadcrumbs?: BreadcrumbItem[]
  /** Optional page-level actions (right aligned on desktop, full-width on mobile) */
  actions?: React.ReactNode
}

/**
 * PageHeader Component
 * ====================
 * Consistent page header pattern for all pages.
 * 
 * Responsive behavior:
 * - Desktop: Title and actions on same row
 * - Mobile: Stacked layout with full-width actions
 * 
 * Structure:
 * - Breadcrumbs (small, subtle)
 * - Page title (clear and readable)
 * - Optional description
 * - Optional page-level actions (right aligned)
 * 
 * Usage:
 * ```tsx
 * <PageHeader 
 *   title="Dashboard"
 *   description="Overview and key metrics"
 *   breadcrumbs={[{ label: 'Dashboard' }]}
 *   actions={<Button type="primary">Create</Button>}
 * />
 * ```
 */
export function PageHeader({ 
  title, 
  description, 
  breadcrumbs = [],
  actions,
}: PageHeaderProps) {
  const screens = useBreakpoint()
  const isMobile = !screens.md

  // Build breadcrumb items with Home as first item
  const breadcrumbItems = [
    {
      title: (
        <Link href="/dashboard" style={{ color: neutral[500] }}>
          <HomeOutlined />
        </Link>
      ),
    },
    ...breadcrumbs.map((item, index) => {
      const isLast = index === breadcrumbs.length - 1
      return {
        title: isLast ? (
          <span style={{ color: neutral[700] }}>{item.label}</span>
        ) : item.href ? (
          <Link href={item.href} style={{ color: neutral[500] }}>
            {item.label}
          </Link>
        ) : (
          <span style={{ color: neutral[500] }}>{item.label}</span>
        ),
      }
    }),
  ]

  return (
    <div 
      style={{ 
        background: '#fff',
        marginTop: isMobile ? -16 : -layout.pagePadding,
        marginLeft: isMobile ? -16 : -layout.pagePadding,
        marginRight: isMobile ? -16 : -layout.pagePadding,
        marginBottom: isMobile ? 16 : layout.sectionGap,
        padding: isMobile ? 16 : layout.pagePadding,
        paddingBottom: isMobile ? 16 : 20,
      }}
    >
      {/* Breadcrumbs - small and subtle */}
      <Breadcrumb
        items={breadcrumbItems}
        separator={<RightOutlined style={{ fontSize: 10, color: neutral[400] }} />}
        style={{ 
          marginBottom: 8,
          fontSize: fontSize.sm,
        }}
      />

      {/* Title row with optional actions */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'flex-start', 
          justifyContent: 'space-between',
          gap: isMobile ? 12 : layout.cardGap,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Title 
            level={isMobile ? 3 : 2} 
            style={{ margin: 0, marginBottom: description ? 4 : 0 }}
          >
            {title}
          </Title>
          {description && (
            <Text type="secondary" style={{ fontSize: isMobile ? fontSize.sm : fontSize.base }}>
              {description}
            </Text>
          )}
        </div>

        {/* Page-level actions (right aligned on desktop, full-width on mobile) */}
        {actions && (
          <div style={{ 
            flexShrink: 0,
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
          }}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
