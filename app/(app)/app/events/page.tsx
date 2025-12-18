'use client'

import { useMemo, useState, useEffect } from 'react'
import { Typography, Card, Tag, Space, Modal, Button, Empty, Row, Col, Segmented, Select, Input } from 'antd'
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import { PageHeader, PocContextCard, EventCalendar, CalendarEvent } from '@/components'
import {
  getUpcomingEventsForCurrentUri,
  getKaupapa,
  Event,
} from '@/lib/mockData'
import { matchesSearch } from '@/lib/utils'
import { neutral, layout, tertiary, primary } from '@/theme'

const { Title, Text } = Typography

function formatTime(event: Event): string {
  if (!event.startTime) return 'All day'
  if (!event.endTime) return event.startTime
  return `${event.startTime} – ${event.endTime}`
}

export default function UriEventsPage() {
  type ViewMode = 'list' | 'calendar'
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [searchText, setSearchText] = useState('')
  const [kaupapaFilter, setKaupapaFilter] = useState<string[]>([])

  // Sync view mode with URL hash (#list or #calendar)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'list' || hash === 'calendar') {
      setViewMode(hash)
    }
  }, [])

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    window.history.pushState(null, '', `/app/events#${mode}`)
  }

  const events = getUpcomingEventsForCurrentUri()

  const availableKaupapa = useMemo(() => {
    const ids = new Set<string>()
    for (const event of events) ids.add(event.kaupapa)
    return Array.from(ids)
      .map((id) => getKaupapa(id))
      .filter(Boolean)
  }, [events])

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (kaupapaFilter.length > 0 && !kaupapaFilter.includes(event.kaupapa)) return false
        if (!searchText) return true

        const kaupapa = getKaupapa(event.kaupapa)
        const haystack = [
          event.title,
          event.description,
          event.location,
          dayjs(event.date).format('ddd D MMM YYYY'),
          kaupapa?.name ?? '',
        ].filter(Boolean).join(' ')

        return matchesSearch(haystack, searchText)
      })
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date)
        if (dateCompare !== 0) return dateCompare
        return (a.startTime ?? '00:00').localeCompare(b.startTime ?? '00:00')
      })
  }, [events, searchText, kaupapaFilter])

  const calendarEvents: CalendarEvent[] = useMemo(() => {
    return filteredEvents.map((event) => {
      let start: Date
      let end: Date | undefined
      let allDay = false

      if (event.startTime) {
        start = dayjs(`${event.date} ${event.startTime}`).toDate()
        end = event.endTime
          ? dayjs(`${event.date} ${event.endTime}`).toDate()
          : dayjs(`${event.date} ${event.startTime}`).add(1, 'hour').toDate()
      } else {
        start = dayjs(event.date).toDate()
        allDay = true
      }

      const kaupapa = getKaupapa(event.kaupapa)
      return {
        id: event.id,
        title: event.title,
        start,
        end,
        allDay,
        kaupapa: kaupapa?.name,
        isOwn: true,
        hasClash: false,
        color: primary[500],
      }
    })
  }, [filteredEvents])

  const [previewEvent, setPreviewEvent] = useState<Event | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const openPreview = (event: Event) => {
    setPreviewEvent(event)
    setPreviewOpen(true)
  }

  const closePreview = () => {
    setPreviewOpen(false)
    setPreviewEvent(null)
  }

  const previewKaupapa = previewEvent ? getKaupapa(previewEvent.kaupapa) : undefined

  return (
    <>
      <PageHeader
        title="Events"
        description="Events from the communities you're connected to"
        breadcrumbs={[{ label: 'Dashboard', href: '/app' }, { label: 'Events' }]}
      />

      <PocContextCard title="MVP Context: Uri Events">
        <strong>Why this page exists:</strong> Uri need a simple, read-only view of what's coming up across their linked communities.
        <br />
        <strong>What we're demonstrating:</strong> A clear card-based list and a calendar view, with quick preview and a full page for reading.
        <br />
        <strong>Scope note:</strong> No RSVP, notifications, or calendar export (.ics deferred for privacy) in this phase.
      </PocContextCard>

      <Card bordered={false} style={{ marginBottom: layout.cardGap }}>
        <Row gutter={16} align="middle" justify="space-between">
          <Col>
            <Space size={12} wrap>
              <Input
                allowClear
                placeholder="Search events"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 240 }}
              />
              <Select
                mode="multiple"
                placeholder="Show all communities"
                style={{ width: 250 }}
                value={kaupapaFilter}
                onChange={(v) => setKaupapaFilter(v)}
                allowClear
                maxTagCount={2}
                options={availableKaupapa.map((k) => ({ label: k!.name, value: k!.id }))}
              />
            </Space>
          </Col>

          <Col>
            <Segmented
              value={viewMode}
              onChange={(v) => handleViewModeChange(v as ViewMode)}
              options={[
                { label: 'List', value: 'list', icon: <UnorderedListOutlined /> },
                { label: 'Calendar', value: 'calendar', icon: <CalendarOutlined /> },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {filteredEvents.length === 0 ? (
        <Card bordered={false}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No events match your filters" />
        </Card>
      ) : viewMode === 'calendar' ? (
        <Card bordered={false}>
          <EventCalendar
            events={calendarEvents}
            onEventClick={(eventId) => {
              const event = filteredEvents.find((e) => e.id === eventId)
              if (event) openPreview(event)
            }}
            initialView="dayGridMonth"
          />
        </Card>
      ) : (
        <Space direction="vertical" size={layout.cardGap} style={{ width: '100%' }}>
          {filteredEvents.map((event) => {
            const kaupapa = getKaupapa(event.kaupapa)
            return (
              <Card
                key={event.id}
                bordered={false}
                hoverable
                onClick={() => openPreview(event)}
              >
                <Row gutter={[layout.cardGap, layout.cardGap]} align="middle">
                  <Col xs={24} md={18}>
                    <Space direction="vertical" size={8} style={{ width: '100%' }}>
                      <Space wrap size={8}>
                        <Text strong style={{ fontSize: 16 }}>{event.title}</Text>
                        {kaupapa && <Tag>{kaupapa.name}</Tag>}
                        <Tag color="default">{dayjs(event.date).format('ddd, D MMM YYYY')}</Tag>
                      </Space>

                      <Space wrap size={16}>
                        <Space size={6}>
                          <ClockCircleOutlined style={{ color: neutral[500] }} />
                          <Text type="secondary">{formatTime(event)}</Text>
                        </Space>
                        <Space size={6}>
                          <EnvironmentOutlined style={{ color: neutral[500] }} />
                          <Text type="secondary">{event.location || 'No location provided'}</Text>
                        </Space>
                      </Space>

                      {event.description && (
                        <Text style={{ color: neutral[600] }}>{event.description}</Text>
                      )}
                    </Space>
                  </Col>

                  <Col xs={24} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link
                      href={`/app/events/${event.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button type="primary" icon={<EyeOutlined />}>
                        Open
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            )
          })}
        </Space>
      )}

      <Modal
        title={previewEvent?.title ?? 'Event'}
        open={previewOpen}
        onCancel={closePreview}
        footer={
          <Space>
            {previewEvent && (
              <Link href={`/app/events/${previewEvent.id}`}>
                <Button type="primary">Open full page</Button>
              </Link>
            )}
            <Button onClick={closePreview}>Close</Button>
          </Space>
        }
      >
        {previewEvent && (
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Space wrap size={8}>
              {previewKaupapa && <Tag>{previewKaupapa.name}</Tag>}
              <Text type="secondary">
                {dayjs(previewEvent.date).format('ddd, D MMM YYYY')}
              </Text>
            </Space>

            <Space direction="vertical" size={6}>
              <Space size={8}>
                <ClockCircleOutlined style={{ color: neutral[500] }} />
                <Text>{formatTime(previewEvent)}</Text>
              </Space>
              <Space size={8}>
                <EnvironmentOutlined style={{ color: neutral[500] }} />
                <Text>{previewEvent.location || 'No location provided'}</Text>
              </Space>
            </Space>

            {previewEvent.description ? (
              <Text style={{ color: neutral[600] }}>{previewEvent.description}</Text>
            ) : (
              <Text type="secondary">No description provided.</Text>
            )}
          </Space>
        )}
      </Modal>
    </>
  )
}
