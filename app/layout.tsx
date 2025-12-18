import type { Metadata } from 'next'
import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App } from 'antd'
import { theme } from '@/theme'
import { UserProvider } from '@/lib/userContext'
import { PocModeProvider } from '@/lib/pocModeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Huri Noa',
  description: 'Huri Noa MVP for Contributor Event Coordination and Uri Visibility',
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <App>
              <UserProvider>
                <PocModeProvider>
                  {children}
                </PocModeProvider>
              </UserProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
