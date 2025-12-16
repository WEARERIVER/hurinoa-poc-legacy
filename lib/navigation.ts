import {
  AppstoreOutlined,
  ReadOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons'

export interface NavItem {
  key: string
  path: string
  label: string
  description: string
  icon: React.ComponentType
}

export const navigation: NavItem[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    description: 'Example dashboard with interactive components',
    icon: AppstoreOutlined,
  },
  {
    key: 'docs',
    path: '/docs',
    label: 'Docs',
    description: 'Get started, prompts, and conventions',
    icon: ReadOutlined,
  },
  {
    key: 'design',
    path: '/ds',
    label: 'Design',
    description: 'Component patterns and examples',
    icon: FormatPainterOutlined,
  },
]

export function getNavItem(key: string): NavItem | undefined {
  return navigation.find((item) => item.key === key)
}
