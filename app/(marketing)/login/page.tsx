'use client'

import { Alert, Button, Card, Form, Input, Space, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { neutral, layout } from '@/theme'

const { Title, Text } = Typography

type LoginRole = 'uri' | 'contributor'

function normalizeRole(value: string | null): LoginRole | null {
  if (!value) return null
  const lowered = value.toLowerCase()
  if (lowered === 'uri') return 'uri'
  if (lowered === 'contributor') return 'contributor'
  return null
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const role = normalizeRole(searchParams.get('role'))

  const initialValues = useMemo(() => {
    if (role === 'uri') {
      return {
        email: 'uri.demo@hurinoa.nz',
        password: '',
      }
    }

    if (role === 'contributor') {
      return {
        email: 'contributor.demo@hurinoa.nz',
        password: '',
      }
    }

    return {
      email: 'demo@hurinoa.nz',
      password: '',
    }
  }, [role])

  const continueHref = role === 'contributor' ? '/admin' : role === 'uri' ? '/app' : '/'

  const roleLabel = role === 'uri' ? 'Uri' : role === 'contributor' ? 'Contributor' : null

  return (
    <div
      style={{
        padding: layout.pagePadding,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Card variant="borderless">
          <Title level={3} style={{ marginBottom: 24, textAlign: 'center' }}>
            Login
          </Title>

          <Form layout="vertical" initialValues={initialValues}>
            <Form.Item label="Email" name="email">
              <Input autoComplete="off" size="large" />
            </Form.Item>

            <Form.Item label="Password" name="password" style={{ marginBottom: 24 }}>
              <Input.Password autoComplete="off" size="large" placeholder="Enter any password" />
            </Form.Item>

            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              {role ? (
                <Link href={continueHref} style={{ width: '100%' }}>
                  <Button type="primary" block size="large">
                    Login
                  </Button>
                </Link>
              ) : (
                <Space direction="vertical" size={10} style={{ width: '100%' }}>
                  <Link href="/login?role=uri" style={{ width: '100%' }}>
                    <Button type="primary" block size="large">
                      Login as Uri
                    </Button>
                  </Link>
                  <Link href="/login?role=contributor" style={{ width: '100%' }}>
                    <Button type="primary" block size="large">
                      Login as Contributor
                    </Button>
                  </Link>
                </Space>
              )}

              <Link href="/" style={{ width: '100%' }}>
                <Button block size="large">Back to home</Button>
              </Link>
            </Space>
          </Form>
        </Card>

        <Alert
          showIcon
          icon={<InfoCircleOutlined />}
          message="This is a test login screen"
          description={
            <div>
              {roleLabel && (
                <div style={{ marginBottom: 4 }}>
                  <Text strong>Logging in as:</Text> {roleLabel}
                </div>
              )}
              <Text style={{ color: neutral[600] }}>
                Any password will work — this form is for demonstration purposes only.
              </Text>
            </div>
          }
          type="info"
          style={{ marginTop: 16 }}
        />
      </div>
    </div>
  )
}
