'use client'

import { useState } from 'react'
import {
  Card, 
  Row, 
  Col, 
  Statistic, 
  Space, 
  Typography, 
  Progress, 
  Avatar, 
  List, 
  Tag, 
  Button, 
  Checkbox,
  Timeline,
  Tooltip,
  Badge,
  Divider,
  Table,
  Grid,
} from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  FireOutlined,
  CalendarOutlined,
  MoreOutlined,
  PlusOutlined,
  EyeOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { PageHeader } from '@/components'
import { getNavItem } from '@/lib/navigation'
import { primary, secondary, neutral, layout, fontSize, borderRadius } from '@/theme'

const { Text } = Typography
const { useBreakpoint } = Grid

const navItem = getNavItem('dashboard')!

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const cardStyle = {
  borderRadius: borderRadius.lg,
  border: `1px solid ${neutral[200]}`,
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
}

const gradients = {
  blue: `linear-gradient(135deg, ${primary[50]} 0%, #ffffff 100%)`,
  green: `linear-gradient(135deg, ${secondary[50]} 0%, #ffffff 100%)`,
  purple: `linear-gradient(135deg, #f5f0ff 0%, #ffffff 100%)`,
  orange: `linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)`,
  neutral: `linear-gradient(135deg, ${neutral[50]} 0%, #ffffff 100%)`,
}

// ============================================================================
// MOCK DATA
// ============================================================================

const recentOrders = [
  { id: 'ORD-001', customer: 'Sarah Chen', product: 'Enterprise Plan', amount: 2400, status: 'completed', time: '2 min ago' },
  { id: 'ORD-002', customer: 'Mike Johnson', product: 'Pro Plan', amount: 799, status: 'processing', time: '15 min ago' },
  { id: 'ORD-003', customer: 'Emily Davis', product: 'Starter Pack', amount: 199, status: 'completed', time: '1 hour ago' },
  { id: 'ORD-004', customer: 'Alex Thompson', product: 'Enterprise Plan', amount: 2400, status: 'pending', time: '2 hours ago' },
  { id: 'ORD-005', customer: 'Lisa Wang', product: 'Pro Plan', amount: 799, status: 'completed', time: '3 hours ago' },
]

const teamMembers = [
  { name: 'Sarah Chen', role: 'Product Lead', status: 'online', tasks: 12 },
  { name: 'Mike Johnson', role: 'Developer', status: 'online', tasks: 8 },
  { name: 'Emily Davis', role: 'Designer', status: 'away', tasks: 5 },
  { name: 'Alex Thompson', role: 'Developer', status: 'online', tasks: 15 },
]

const activityItems = [
  { type: 'success', content: 'New user registered', user: 'Sarah Chen', time: '2 min ago' },
  { type: 'info', content: 'Order #1234 completed', user: 'System', time: '15 min ago' },
  { type: 'warning', content: 'Low inventory alert', user: 'System', time: '1 hour ago' },
  { type: 'success', content: 'Payment received', user: 'Mike Johnson', time: '2 hours ago' },
  { type: 'info', content: 'Report generated', user: 'Emily Davis', time: '3 hours ago' },
]

const initialTasks = [
  { id: 1, text: 'Review Q4 marketing budget', done: false, priority: 'high' },
  { id: 2, text: 'Prepare client presentation', done: false, priority: 'high' },
  { id: 3, text: 'Update documentation', done: true, priority: 'medium' },
  { id: 4, text: 'Team standup meeting', done: true, priority: 'low' },
  { id: 5, text: 'Code review for PR #142', done: false, priority: 'medium' },
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function StatCard({ 
  title, 
  value, 
  prefix, 
  suffix,
  trend, 
  trendValue, 
  color,
  progress,
  target,
  gradient,
}: { 
  title: string
  value: number | string
  prefix?: React.ReactNode
  suffix?: string
  trend?: 'up' | 'down'
  trendValue?: string
  color?: string
  progress?: number
  target?: string
  gradient?: string
}) {
  return (
    <Card 
      hoverable 
      style={{ 
        height: '100%', 
        ...cardStyle,
        background: gradient || '#fff',
      }}
    >
      <Text type="secondary" style={{ fontSize: fontSize.sm, display: 'block', marginBottom: 8 }}>{title}</Text>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: color || primary[500], fontSize: 14 }}>{prefix}</span>
        <span style={{ color: color || primary[500], fontSize: 32, fontWeight: 600, lineHeight: 1.2 }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {suffix && <span style={{ color: color || primary[500], fontSize: 20, fontWeight: 500 }}>{suffix}</span>}
      </div>
      {progress !== undefined && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text type="secondary" style={{ fontSize: fontSize.xs }}>Progress</Text>
            <Text type="secondary" style={{ fontSize: fontSize.xs }}>{target}</Text>
          </div>
          <Progress 
            percent={progress} 
            showInfo={false} 
            strokeColor={color || primary[500]}
            trailColor={neutral[100]}
            size="small"
          />
        </div>
      )}
      {trend && trendValue && (
        <div style={{ marginTop: progress ? 12 : 16 }}>
          {trend === 'up' ? (
            <Text style={{ fontSize: fontSize.xs, color: secondary[600] }}>
              <ArrowUpOutlined style={{ marginRight: 4 }} />{trendValue} from last month
            </Text>
          ) : (
            <Text style={{ fontSize: fontSize.xs, color: '#ff4d4f' }}>
              <ArrowDownOutlined style={{ marginRight: 4 }} />{trendValue} from last month
            </Text>
          )}
        </div>
      )}
    </Card>
  )
}

function MiniAreaChart({ data, color, label }: { data: number[], color: string, label: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', gap: 6, height: 60 }}>
        {data.map((value, i) => {
          const height = ((value - min) / range) * 80 + 20 // 20-100% range
          const isLast = i === data.length - 1
          const opacity = 0.3 + (i / data.length) * 0.7
          return (
            <Tooltip key={i} title={`${label}: ${value}`}>
              <div
                style={{
                  width: 12,
                  height: `${height}%`,
                  minHeight: 12,
                  backgroundColor: color,
                  opacity: isLast ? 1 : opacity,
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  boxShadow: isLast ? `0 2px 8px ${color}40` : 'none',
                }}
              />
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function DashboardPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completedTasks = tasks.filter(t => t.done).length
  const totalTasks = tasks.length

  const orderColumns = [
    { 
      title: 'Order', 
      dataIndex: 'id', 
      key: 'id',
      render: (id: string) => <Text strong style={{ fontSize: fontSize.sm, color: neutral[700] }}>{id}</Text>
    },
    { 
      title: 'Customer', 
      dataIndex: 'customer', 
      key: 'customer',
      render: (name: string, record: typeof recentOrders[0], index: number) => {
        const colors = [primary[500], secondary[500], '#722ed1', '#fa8c16', '#eb2f96']
        return (
          <Space>
            <Avatar size="small" style={{ backgroundColor: colors[index % colors.length], fontWeight: 500, fontSize: 11 }}>
              {name.charAt(0)}
            </Avatar>
            <Text style={{ fontSize: fontSize.sm }}>{name}</Text>
          </Space>
        )
      }
    },
    { 
      title: 'Product', 
      dataIndex: 'product', 
      key: 'product',
      render: (product: string) => <Text type="secondary" style={{ fontSize: fontSize.sm }}>{product}</Text>
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount: number) => <Text strong style={{ fontSize: fontSize.sm, color: secondary[600] }}>${amount}</Text>
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const config: Record<string, { color: string, text: string }> = {
          completed: { color: 'success', text: 'Completed' },
          processing: { color: 'processing', text: 'Processing' },
          pending: { color: 'warning', text: 'Pending' },
        }
        return <Tag color={config[status]?.color} style={{ borderRadius: 4 }}>{config[status]?.text || status}</Tag>
      }
    },
    { 
      title: 'Time', 
      dataIndex: 'time', 
      key: 'time',
      render: (time: string) => <Text type="secondary" style={{ fontSize: fontSize.xs }}>{time}</Text>
    },
  ]

  return (
    <>
      <PageHeader 
        title={navItem.label} 
        description={navItem.description}
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <Space size={isMobile ? 8 : 12} wrap>
            <Button icon={<CalendarOutlined />} size={isMobile ? 'middle' : 'middle'}>
              {isMobile ? 'Month' : 'This Month'}
            </Button>
            <Button type="primary" icon={<PlusOutlined />} size={isMobile ? 'middle' : 'middle'}>
              {isMobile ? 'Report' : 'New Report'}
            </Button>
          </Space>
        }
      />

      {/* ================================================================== */}
      {/* STATS ROW                                                         */}
      {/* ================================================================== */}
      <Row gutter={[layout.cardGap, layout.cardGap]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={52840}
            prefix={<DollarOutlined />}
            color={primary[500]}
            trend="up"
            trendValue="12.5%"
            progress={78}
            target="$68,000 goal"
            gradient={gradients.blue}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Users"
            value={1284}
            prefix={<UserOutlined />}
            color={secondary[500]}
            trend="up"
            trendValue="8.2%"
            progress={64}
            target="2,000 goal"
            gradient={gradients.green}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Orders"
            value={542}
            prefix={<ShoppingCartOutlined />}
            color="#722ed1"
            trend="up"
            trendValue="24%"
            progress={90}
            target="600 goal"
            gradient={gradients.purple}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Conversion Rate"
            value="3.2"
            suffix="%"
            prefix={<ThunderboltOutlined />}
            color="#fa8c16"
            trend="up"
            trendValue="0.8%"
            gradient={gradients.orange}
          />
        </Col>
      </Row>

      {/* ================================================================== */}
      {/* CHARTS & ACTIVITY ROW                                             */}
      {/* ================================================================== */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginTop: layout.cardGap }}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <FireOutlined style={{ color: '#fa541c' }} />
                <Text strong>Performance Overview</Text>
              </Space>
            }
            extra={<Button type="text" icon={<MoreOutlined />} />}
            style={{ height: '100%', ...cardStyle }}
            styles={{ body: { height: 'calc(100% - 58px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
          >
            <Row gutter={[32, 24]} align="middle">
              <Col xs={24} md={8}>
                <Card size="small" style={{ background: gradients.blue, border: 'none', borderRadius: borderRadius.lg }}>
                  <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: fontSize.sm, color: neutral[700] }}>Weekly Sales</Text>
                    <MiniAreaChart 
                      data={[65, 78, 52, 91, 85, 72, 95]} 
                      color={primary[500]}
                      label="Sales"
                    />
                    <Space size={4}>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[500] }}>Mon</Text>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[300] }}>→</Text>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[500] }}>Sun</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'center' }}>
                  <Progress 
                    type="dashboard" 
                    percent={78} 
                    strokeColor={secondary[500]}
                    trailColor={neutral[100]}
                    format={(percent) => (
                      <div>
                        <div style={{ fontSize: 28, fontWeight: 600, color: neutral[800] }}>{percent}%</div>
                        <div style={{ fontSize: fontSize.xs, color: neutral[500] }}>of goal</div>
                      </div>
                    )}
                    size={130}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong style={{ fontSize: fontSize.sm, color: neutral[700] }}>Monthly Target</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" style={{ background: gradients.green, border: 'none', borderRadius: borderRadius.lg }}>
                  <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: fontSize.sm, color: neutral[700] }}>User Growth</Text>
                    <MiniAreaChart 
                      data={[42, 55, 48, 62, 71, 68, 82]} 
                      color={secondary[500]}
                      label="Users" 
                    />
                    <Space size={4}>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[500] }}>7 days ago</Text>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[300] }}>→</Text>
                      <Text style={{ fontSize: fontSize.xs, color: neutral[500] }}>Today</Text>
                    </Space>
                  </div>
                </Card>
              </Col>
            </Row>

            <Divider style={{ margin: '20px 0 16px' }} />

            <Row gutter={16}>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<Text type="secondary" style={{ fontSize: fontSize.xs }}>Avg. Order Value</Text>}
                  value={127.50} 
                  prefix="$" 
                  valueStyle={{ fontSize: 20, fontWeight: 600 }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<Text type="secondary" style={{ fontSize: fontSize.xs }}>Customer Lifetime</Text>}
                  value={847} 
                  prefix="$" 
                  valueStyle={{ fontSize: 20, fontWeight: 600 }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<Text type="secondary" style={{ fontSize: fontSize.xs }}>Return Rate</Text>}
                  value={2.4} 
                  suffix="%" 
                  valueStyle={{ fontSize: 20, fontWeight: 600, color: secondary[600] }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<Text type="secondary" style={{ fontSize: fontSize.xs }}>NPS Score</Text>}
                  value={72} 
                  valueStyle={{ fontSize: 20, fontWeight: 600, color: secondary[600] }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <ClockCircleOutlined style={{ color: primary[500] }} />
                <Text strong>Recent Activity</Text>
              </Space>
            }
            extra={<Button type="link" size="small">View All</Button>}
            style={{ height: '100%', ...cardStyle }}
          >
            <Timeline
              items={activityItems.map((item, idx) => ({
                color: item.type === 'success' ? secondary[500] : item.type === 'warning' ? '#fa8c16' : primary[500],
                children: (
                  <div key={idx}>
                    <Text style={{ fontSize: fontSize.sm }}>{item.content}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: fontSize.xs }}>
                      {item.user} • {item.time}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>

      {/* ================================================================== */}
      {/* TASKS & TEAM ROW                                                  */}
      {/* ================================================================== */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginTop: layout.cardGap }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <CheckCircleOutlined style={{ color: secondary[500] }} />
                <Text strong>My Tasks</Text>
                <Tag color="processing" style={{ borderRadius: 10, fontWeight: 500 }}>{completedTasks}/{totalTasks}</Tag>
              </Space>
            }
            extra={<Button type="primary" size="small" icon={<PlusOutlined />}>Add</Button>}
            style={{ height: '100%', ...cardStyle }}
          >
            <Progress 
              percent={Math.round((completedTasks / totalTasks) * 100)} 
              strokeColor={secondary[500]}
              trailColor={neutral[100]}
              size="small"
              style={{ marginBottom: 16 }}
            />
            <List
              size="small"
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item
                  style={{ 
                    padding: '10px 0',
                    opacity: task.done ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                  }}
                  actions={[
                    <Tag 
                      key="priority"
                      color={
                        task.priority === 'high' ? 'error' : 
                        task.priority === 'medium' ? 'warning' : 'default'
                      }
                      style={{ fontSize: 11, borderRadius: 4 }}
                    >
                      {task.priority}
                    </Tag>
                  ]}
                >
                  <Checkbox 
                    checked={task.done} 
                    onChange={() => toggleTask(task.id)}
                    style={{ marginRight: 12 }}
                  >
                    <Text 
                      delete={task.done}
                      style={{ fontSize: fontSize.sm, color: task.done ? neutral[400] : neutral[700] }}
                    >
                      {task.text}
                    </Text>
                  </Checkbox>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <TeamOutlined style={{ color: '#722ed1' }} />
                <Text strong>Team Members</Text>
              </Space>
            }
            extra={<Button type="link" size="small">Manage</Button>}
            style={{ height: '100%', ...cardStyle }}
          >
            <List
              size="small"
              dataSource={teamMembers}
              renderItem={(member) => (
                <List.Item
                  style={{ padding: '12px 0' }}
                  actions={[
                    <Text key="tasks" type="secondary" style={{ fontSize: fontSize.xs }}>
                      {member.tasks} tasks
                    </Text>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        dot 
                        status={member.status === 'online' ? 'success' : 'warning'}
                        offset={[-4, 28]}
                      >
                        <Avatar 
                          style={{ 
                            backgroundColor: member.status === 'online' ? secondary[500] : neutral[400],
                            fontWeight: 500,
                          }}
                        >
                          {member.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    }
                    title={<Text strong style={{ fontSize: fontSize.sm }}>{member.name}</Text>}
                    description={<Text type="secondary" style={{ fontSize: fontSize.xs }}>{member.role}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* ================================================================== */}
      {/* RECENT ORDERS TABLE                                               */}
      {/* ================================================================== */}
      <Row gutter={[layout.cardGap, layout.cardGap]} style={{ marginTop: layout.cardGap }}>
        <Col xs={24}>
          <Card 
            title={
              <Space>
                <ShoppingCartOutlined style={{ color: '#fa8c16' }} />
                <Text strong>Recent Orders</Text>
              </Space>
            }
            extra={
              <Space size={isMobile ? 4 : 8}>
                <Button type="text" size="small" style={{ color: neutral[600] }}>Export</Button>
                <Button type="primary" size="small" icon={<EyeOutlined />}>
                  View All
                </Button>
              </Space>
            }
            style={cardStyle}
          >
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
