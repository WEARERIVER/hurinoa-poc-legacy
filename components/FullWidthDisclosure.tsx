'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button, Typography } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { borderRadius, neutral, primary } from '@/theme'

const { Title, Paragraph, Text } = Typography

type FullWidthDisclosureProps = {
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  description?: string
  openLabel?: string
  closeLabel?: string
  defaultOpen?: boolean
  floatingCard?: React.ReactNode
  children: React.ReactNode
}

export function FullWidthDisclosure({
  id,
  eyebrow,
  title,
  subtitle,
  description,
  openLabel = 'Open',
  closeLabel = 'Close',
  defaultOpen = false,
  floatingCard,
  children,
}: FullWidthDisclosureProps) {
  const autoId = useId()
  const contentId = useMemo(() => `${autoId}-content`, [autoId])

  const [open, setOpen] = useState(defaultOpen)
  const [height, setHeight] = useState<number>(0)

  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = innerRef.current
    if (!node) return

    const update = () => {
      if (!innerRef.current) return
      setHeight(innerRef.current.scrollHeight)
    }

    // Always measure on mount and when children change
    update()

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [children])

  return (
    <div
      id={id}
      style={{
        background: neutral[900],
        color: '#fff',
        position: 'relative',
        overflowX: 'hidden',
        borderTop: `1px solid ${neutral[800]}`,
      }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hn-disclosure-anim {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative background glow (landing hero style) */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 680,
          height: 680,
          background: primary[500],
          opacity: 0.16,
          filter: 'blur(110px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          padding: 'clamp(88px, 10vw, 120px) 24px clamp(120px, 14vw, 160px)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: borderRadius.full,
              marginBottom: 20,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Text
              style={{
                color: primary[300],
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </Text>
          </div>
        ) : null}

        <Title
          style={{
            color: '#fff',
            fontSize: 'clamp(40px, 8vw, 72px)',
            marginBottom: 24,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {title}
        </Title>

        {subtitle ? (
          <Paragraph
            style={{
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: neutral[300],
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </Paragraph>
        ) : null}

        {description ? (
          <Paragraph style={{ color: neutral[400], maxWidth: 580, margin: '16px auto 0' }}>
            {description}
          </Paragraph>
        ) : null}

        <div style={{ marginTop: 24 }}>
          <Button
            type="link"
            size="large"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={contentId}
            className="hn-disclosure-anim"
            style={{
              padding: 0,
              height: 'auto',
              color: neutral[200],
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span>{open ? closeLabel : openLabel}</span>
              {open ? <UpOutlined /> : <DownOutlined />}
            </span>
          </Button>
        </div>
      </div>

      {/* Floating card area (always visible, landing-style) */}
      {floatingCard ? (
        <div
          style={{
            marginTop: -120,
            padding: '0 24px 64px',
            position: 'relative',
            zIndex: 10,
            background: 'linear-gradient(to bottom, transparent 120px, #fff 120px)',
          }}
        >
          {floatingCard}
        </div>
      ) : null}

      {/* Expandable content (full-width, animates height) */}
      <div
        id={contentId}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          ref={innerRef}
          style={{
            overflow: 'hidden',
          }}
        >
          <div
            className="hn-disclosure-anim"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 400ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
