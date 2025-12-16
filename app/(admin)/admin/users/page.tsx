'use client'

import { useState, useCallback } from 'react'
import { 
  Typography, 
  Card, 
  Button, 
  Space, 
  Table, 
  Tag, 
  Tooltip, 
  Input,
  Select,
  Row,
  Col,
  Modal,
  Form,
  Avatar,
  Dropdown,
  Empty,
  App,
  Statistic
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  MoreOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { PageHeader, PocContextCard } from '@/components'
import { 
  getMyUri, 
  getUriStats,
  createUri,
  updateUri,
  deleteUri,
  Uri
} from '@/lib/mockData'
import { primary, secondary, neutral, semantic, layout } from '@/theme'
import { matchesSearch } from '@/lib/utils'

const { Text } = Typography

/**
 * Users Page
 * ==========
 * Manage uri (users) linked to the current kaupapa.
 * - View all uri with search and filters
 * - Add new uri
 * - Edit uri details
 * - Change status (active/inactive)
 */
export default function UsersPage() {
  const { message, modal } = App.useApp()
  
  // Search and filter state
  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUri, setEditingUri] = useState<Uri | null>(null)
  const [form] = Form.useForm()
  
  // Data
  const [refreshKey, setRefreshKey] = useState(0)
  const allUri = getMyUri()
  const stats = getUriStats()
  
  // Refresh data after mutations
  const refresh = useCallback(() => setRefreshKey(k => k + 1), [])

  // Filter uri based on search and filters
  const filteredUri = allUri.filter(u => {
    const matchesSearchText = searchText === '' || 
      matchesSearch(`${u.firstName} ${u.lastName}`, searchText) ||
      matchesSearch(u.email, searchText)
    const matchesRole = !roleFilter || u.role === roleFilter
    const matchesStatus = !statusFilter || u.status === statusFilter
    return matchesSearchText && matchesRole && matchesStatus
  })

  // Open create modal
  const openCreateModal = () => {
    setEditingUri(null)
    form.resetFields()
    form.setFieldsValue({
      role: 'uri',
      status: 'active',
    })
    setModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (uri: Uri) => {
    setEditingUri(uri)
    form.setFieldsValue({
      firstName: uri.firstName,
      lastName: uri.lastName,
      email: uri.email,
      phone: uri.phone,
      role: uri.role,
      status: uri.status,
      notes: uri.notes,
    })
    setModalOpen(true)
  }

  // Handle save (create or update)
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      
      if (editingUri) {
        updateUri(editingUri.id, values)
        message.success('User updated successfully')
      } else {
        createUri({
          ...values,
          kaupapa: ['kp-1'], // Current kaupapa
        })
        message.success('User added successfully')
      }
      
      setModalOpen(false)
      form.resetFields()
      setEditingUri(null)
      refresh()
    } catch (error) {
      // Validation error
    }
  }

  // Handle delete
  const handleDelete = (uri: Uri) => {
    modal.confirm({
      title: 'Remove User',
      content: `Are you sure you want to remove ${uri.firstName} ${uri.lastName} from this kaupapa?`,
      okText: 'Remove',
      okButtonProps: { danger: true },
      onOk: () => {
        deleteUri(uri.id)
        message.success('User removed')
        refresh()
      },
    })
  }

  // Handle status toggle
  const handleToggleStatus = (uri: Uri) => {
    const newStatus = uri.status === 'active' ? 'inactive' : 'active'
    updateUri(uri.id, { status: newStatus })
    message.success(`User marked as ${newStatus}`)
    refresh()
  }

  // Role tag color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'contributor': return 'blue'
      case 'uri': return 'default'
      default: return 'default'
    }
  }

  // Role label
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'contributor': return 'Contributor'
      case 'uri': return 'Uri'
      default: return role
    }
  }

  // Table columns
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: unknown, record: Uri) => (
        <Space>
          <Avatar 
            style={{ 
              backgroundColor: record.status === 'active' ? primary[100] : neutral[200],
              color: record.status === 'active' ? primary[600] : neutral[500],
            }}
          >
            {record.firstName[0]}{record.lastName[0]}
          </Avatar>
          <div>
            <Text strong>{record.firstName} {record.lastName}</Text>
            {record.status === 'inactive' && (
              <Tag color="default" style={{ marginLeft: 8 }}>Inactive</Tag>
            )}
            <div>
              <Text type="secondary" style={{ fontSize: 13 }}>{record.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>{getRoleLabel(role)}</Tag>
      ),
      filters: [
        { text: 'Contributor', value: 'contributor' },
        { text: 'Uri', value: 'uri' },
      ],
      onFilter: (value: unknown, record: Uri) => record.role === value,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (phone: string) => phone || <Text type="secondary">—</Text>,
    },
    {
      title: 'Joined',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      width: 120,
      sorter: (a: Uri, b: Uri) => a.joinedAt.localeCompare(b.joinedAt),
      render: (date: string) => dayjs(date).format('MMM YYYY'),
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_: unknown, record: Uri) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                icon: <EditOutlined />,
                label: 'Edit',
                onClick: () => openEditModal(record),
              },
              {
                key: 'email',
                icon: <MailOutlined />,
                label: 'Send Email',
                disabled: true,
              },
              {
                key: 'status',
                icon: record.status === 'active' ? <ClockCircleOutlined /> : <CheckCircleOutlined />,
                label: record.status === 'active' ? 'Mark Inactive' : 'Mark Active',
                onClick: () => handleToggleStatus(record),
              },
              { type: 'divider' },
              {
                key: 'delete',
                icon: <DeleteOutlined />,
                label: 'Remove',
                danger: true,
                onClick: () => handleDelete(record),
              },
            ],
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage uri linked to your kaupapa"
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Users' }]}
        actions={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
            Add User
          </Button>
        }
      />

      <PocContextCard title="POC Context: User Management">
        <strong>Why this page exists:</strong> The brief requires admins to be able to upload CSV or manually 
        assign users (uri) to kaupapa. This page demonstrates the contributor's ability to manage their user list, 
        which is the basis for the uri-to-kaupapa linkage that powers the Uri Dashboard.
        <br />
        <strong>What we're demonstrating:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: 20 }}>
          <li>View all uri linked to this kaupapa with search and filters</li>
          <li>Add new uri manually (simplified form in lieu of full CSV import)</li>
          <li>Edit uri details and toggle active/inactive status</li>
          <li>Role assignment (contributor vs uri) — scoped to one kaupapa per the MVP assumption</li>
        </ul>
        <strong>Design decisions:</strong> For the POC, we simplified the "manual import" requirement to a form-based 
        entry rather than full CSV upload. This proves the data model and UI patterns without the complexity of file parsing. 
        CSV upload could be added in a future phase.
        <br />
        <strong>Scope note:</strong> The brief states "one contributor or uri per kaupapa for MVP". We've shown users 
        can be linked to multiple kaupapa in the data model (for future flexibility), but the UI is scoped to managing 
        users within the current contributor's single kaupapa.
      </PocContextCard>

      {/* Stats Cards */}
      <Row gutter={layout.cardGap} style={{ marginBottom: layout.cardGap }}>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic 
              title="Total Users" 
              value={stats.total} 
              prefix={<TeamOutlined style={{ color: primary[500] }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic 
              title="Active" 
              value={stats.active}
              valueStyle={{ color: semantic.success.base }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic 
              title="Contributors" 
              value={stats.contributors}
              valueStyle={{ color: primary[500] }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card bordered={false}>
            <Statistic 
              title="Uri" 
              value={stats.uriCount}
              valueStyle={{ color: neutral[600] }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Card bordered={false} style={{ marginBottom: layout.cardGap }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input
              placeholder="Search by name or email..."
              prefix={<SearchOutlined style={{ color: neutral[400] }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ maxWidth: 300 }}
            />
          </Col>
          <Col>
            <Space>
              <Select
                placeholder="All roles"
                value={roleFilter}
                onChange={setRoleFilter}
                allowClear
                style={{ width: 140 }}
                options={[
                  { label: 'Contributor', value: 'contributor' },
                  { label: 'Uri', value: 'uri' },
                ]}
              />
              <Select
                placeholder="All statuses"
                value={statusFilter}
                onChange={setStatusFilter}
                allowClear
                style={{ width: 130 }}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
              />
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Users Table */}
      <Card bordered={false}>
        {allUri.length === 0 ? (
          <Empty 
            description="No users yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={openCreateModal}>
              Add your first user
            </Button>
          </Empty>
        ) : (
          <Table
            dataSource={filteredUri}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={editingUri ? 'Edit User' : 'Add User'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => {
          setModalOpen(false)
          form.resetFields()
          setEditingUri(null)
        }}
        okText={editingUri ? 'Save Changes' : 'Add User'}
        width={520}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="e.g., Hine" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="e.g., Moana" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Required' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="email@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone (optional)"
          >
            <Input prefix={<PhoneOutlined />} placeholder="021 123 4567" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  options={[
                    { label: 'Uri', value: 'uri' },
                    { label: 'Contributor', value: 'contributor' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Select
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label="Notes (optional)"
          >
            <Input.TextArea 
              rows={2} 
              placeholder="Any additional information..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
