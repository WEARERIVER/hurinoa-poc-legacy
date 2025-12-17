import {
  AppstoreOutlined,
  CalendarOutlined,
  TeamOutlined,
  EyeOutlined,
  ReadOutlined,
  FormatPainterOutlined,
  CodeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { UserType } from './userContext'

// ============================================================================
// Navigation Configuration
// ============================================================================
// Role-based navigation. Contributors manage events, Uri views them,
// Developers access docs and design system.

export interface NavItem {
  key: string
  path: string
  label: string
  description: string
  icon: React.ComponentType
}

// Contributor navigation (admin screens)
export const contributorNavigation: NavItem[] = [
  {
    key: 'admin-dashboard',
    path: '/admin',
    label: 'Dashboard',
    description: 'Contributor overview and quick actions',
    icon: AppstoreOutlined,
  },
  {
    key: 'admin-events',
    path: '/admin/events',
    label: 'Events',
    description: 'Create and manage kaupapa events',
    icon: CalendarOutlined,
  },
  {
    key: 'admin-users',
    path: '/admin/users',
    label: 'Users',
    description: 'Manage uri and user assignments',
    icon: TeamOutlined,
  },
  {
    key: 'admin-profile',
    path: '/admin/profile',
    label: 'My Profile',
    description: 'View your account details',
    icon: UserOutlined,
  },
]

// Uri navigation (app screens)
export const uriNavigation: NavItem[] = [
  {
    key: 'app-dashboard',
    path: '/app',
    label: 'Dashboard',
    description: 'Your kaupapa overview',
    icon: AppstoreOutlined,
  },
  {
    key: 'app-events',
    path: '/app/events',
    label: 'Events',
    description: 'View events from your kaupapa',
    icon: EyeOutlined,
  },
  {
    key: 'app-profile',
    path: '/app/profile',
    label: 'My Profile',
    description: 'View your account details',
    icon: UserOutlined,
  },
]

// Developer navigation (docs, design system, demo)
export const developerNavigation: NavItem[] = [
  {
    key: 'dev-dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    description: 'Example dashboard with interactive components',
    icon: AppstoreOutlined,
  },
  {
    key: 'dev-docs',
    path: '/docs',
    label: 'Docs',
    description: 'Get started, prompts, and conventions',
    icon: ReadOutlined,
  },
  {
    key: 'dev-design',
    path: '/ds',
    label: 'Design System',
    description: 'Component patterns and examples',
    icon: FormatPainterOutlined,
  },
]

// Get navigation based on user type
export function getNavigationForUserType(userType: UserType): NavItem[] {
  switch (userType) {
    case 'contributor':
      return contributorNavigation
    case 'uri':
      return uriNavigation
    case 'developer':
      return developerNavigation
    default:
      return contributorNavigation
  }
}

// Get user type from pathname (for auto-detection when visiting a route)
export function getUserTypeFromPath(pathname: string): UserType | null {
  if (pathname.startsWith('/admin')) return 'contributor'
  if (pathname.startsWith('/app')) return 'uri'
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/docs') || pathname.startsWith('/ds')) return 'developer'
  return null
}

// Get home path for a user type
export function getHomePathForUserType(userType: UserType): string {
  switch (userType) {
    case 'contributor':
      return '/admin'
    case 'uri':
      return '/app'
    case 'developer':
      return '/dashboard'
    default:
      return '/admin'
  }
}

export function getNavItem(key: string): NavItem | undefined {
  const allNavigation = [...contributorNavigation, ...uriNavigation, ...developerNavigation]
  return allNavigation.find((item) => item.key === key)
}

// Legacy export for backwards compatibility
export const navigation = contributorNavigation
