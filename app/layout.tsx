import type { Metadata } from 'next'
import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import { theme } from '@/theme'
import { AppShell } from '@/components'
import './globals.css'

export const metadata: Metadata = {
  title: 'CATALYST',
  description: 'AI Starter Kit for Rapid Development',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <App>
              <AppShell>{children}</AppShell>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
