import { useEffect, useMemo, useState } from 'react'
import {
  Archive,
  CheckCircle,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Mail,
  Phone,
  RefreshCw,
  Reply,
  User,
  X,
} from 'lucide-react'

import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusPill } from '../components/ui/StatusPill'
import { Tabs } from '../components/ui/Tabs'
import { pageMeta } from '../data/dummy/navigation'

import {
  useGetContactMessagesQuery,
  useGetContactMessageByIdQuery,
  useUpdateContactStatusMutation,
  type ContactStatus,
  type ContactMessage,
} from '../services/contactMessage'

const filterTabs = [
  { id: 'ALL', label: 'ALL' },
  { id: 'NEW', label: 'UNREAD' },
  { id: 'READ', label: 'READ' },
  { id: 'REPLIED', label: 'REPLIED' },
  { id: 'CLOSED', label: 'CLOSED' },
]

const PAGE_SIZE = 10

function formatDate(value?: string | null) {
  if (!value) return '—'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatShortDate(value?: string | null) {
  if (!value) return '—'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

export function MessagesPage() {
  const meta = pageMeta['/messages'] ?? {
    title: 'Messages',
    subtitle: 'Manage contact inquiries',
  }

  const [activeTab, setActiveTab] = useState('ALL')
  const [page, setPage] = useState(1)
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null)

  const queryParams = useMemo(
    () => ({
      ...(activeTab !== 'ALL' && {
        status: activeTab as ContactStatus,
      }),
      page,
      limit: PAGE_SIZE,
    }),
    [activeTab, page],
  )

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetContactMessagesQuery(queryParams)

  const {
    data: detailedMessage,
    isLoading: isDetailLoading,
    isError: isDetailError,
    refetch: refetchDetail,
  } = useGetContactMessageByIdQuery(selectedMessage?.id ?? '', {
    skip: !selectedMessage?.id,
  })

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateContactStatusMutation()

  const messages = data?.data ?? []
  const pagination = data?.meta

  const activeMessage = detailedMessage ?? selectedMessage

  /*
   * Lock page scroll while modal is open.
   */
  useEffect(() => {
    if (!selectedMessage) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [selectedMessage])

  /*
   * Close modal with Escape.
   */
  useEffect(() => {
    if (!selectedMessage) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMessage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedMessage])

  /*
   * Open message.
   *
   * The detail endpoint is fetched here. If the message is NEW,
   * explicitly update it to READ so the state is controlled by
   * the status API instead of relying on GET side effects.
   */
  const handleOpenModal = async (message: ContactMessage) => {
    setSelectedMessage(message)

    if (message.status === 'NEW') {
      try {
        await updateStatus({
          id: message.id,
          status: 'READ',
        }).unwrap()
      } catch (error) {
        console.error('Failed to mark message as read:', error)
      }
    }
  }

  const handleCloseModal = () => {
    setSelectedMessage(null)
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setPage(1)
  }

  const handleStatusUpdate = async (
    id: string,
    status: ContactStatus,
  ) => {
    try {
      await updateStatus({
        id,
        status,
      }).unwrap()

      setSelectedMessage((current) => {
        if (!current || current.id !== id) return current

        return {
          ...current,
          status,
          repliedAt:
            status === 'REPLIED'
              ? current.repliedAt ?? new Date().toISOString()
              : current.repliedAt,
        }
      })
    } catch (error) {
      console.error('Failed to update message status:', error)
    }
  }

  /*
   * Closing an inquiry should normally update its status to CLOSED,
   * not delete the database record.
   */
  const handleCloseInquiry = async (id: string) => {
    await handleStatusUpdate(id, 'CLOSED')
    setSelectedMessage(null)
  }

  const handleReplyMail = (
    email: string,
    subject?: string | null,
  ) => {
    const replySubject = `Re: ${subject ?? 'Your inquiry'}`

    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(replySubject)}`
  }

  const hasMessages = messages.length > 0
  const showInitialLoading = isLoading && !hasMessages

  return (
    <div className="min-h-full">
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
      />

      {/* Filters */}
      <Card
        className="mb-6 overflow-hidden"
        padding="none"
      >
        <div className="flex items-center justify-between gap-4 p-2">
          <Tabs
            tabs={filterTabs}
            activeTab={activeTab}
            onChange={handleTabChange}
          />

          <Button
            variant="outline"
            size="sm"
            disabled={isFetching}
            onClick={() => refetch()}
            className="mr-2 shrink-0"
          >
            <RefreshCw
              className={`mr-1.5 h-4 w-4 ${
                isFetching ? 'animate-spin' : ''
              }`}
            />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Loading */}
      {showInitialLoading && (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-(--accent)" />

            <p className="text-sm text-(--text-muted)">
              Loading messages...
            </p>
          </div>
        </Card>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <Card className="border-red-500/20 bg-red-500/5 p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Mail className="h-5 w-5 text-red-400" />
            </div>

            <h3 className="font-semibold text-(--text-primary)">
              Unable to load messages
            </h3>

            <p className="mt-1 max-w-md text-sm text-(--text-muted)">
              Something went wrong while retrieving your contact
              inquiries.
            </p>

            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => refetch()}
            >
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </Card>
      )}

      {/* Empty */}
      {!isLoading && !isError && !hasMessages && (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--surface-elevated)">
              <Mail className="h-6 w-6 text-(--text-muted)" />
            </div>

            <h3 className="font-semibold text-(--text-primary)">
              No messages found
            </h3>

            <p className="mt-1 text-sm text-(--text-muted)">
              There are no contact inquiries in this category.
            </p>
          </div>
        </Card>
      )}

      {/* Messages */}
      {!isLoading && !isError && hasMessages && (
        <div className="space-y-3">
          {messages.map((message) => {
            const isUnread = message.status === 'NEW'

            return (
              <Card
                key={message.id}
                padding="none"
                className={[
                  'group overflow-hidden transition-all',
                  'hover:border-(--accent)/30',
                  isUnread
                    ? 'border-(--accent)/30 bg-(--accent-soft)/5'
                    : '',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => handleOpenModal(message)}
                  className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-(--surface-elevated)/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-(--accent)"
                >
                  {/* Avatar */}
                  <div
                    className={[
                      'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                      isUnread
                        ? 'bg-(--accent-soft) text-(--accent)'
                        : 'bg-(--surface-elevated) text-(--text-muted)',
                    ].join(' ')}
                  >
                    <Mail className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-(--text-primary)">
                        {message.name}
                      </span>

                      <StatusPill status={message.status} />

                      <span className="ml-auto shrink-0 text-xs text-(--text-subtle)">
                        {formatShortDate(message.createdAt)}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm font-medium text-(--text-primary)">
                      {message.subject || 'No Subject'}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-(--text-muted)">
                      {message.message}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs text-(--text-subtle)">
                      <span className="truncate">
                        {message.email}
                      </span>

                      {message.phone && (
                        <>
                          <span>•</span>
                          <span>{message.phone}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-(--text-subtle) transition-transform group-hover:translate-x-0.5" />
                </button>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {!isLoading &&
        !isError &&
        pagination &&
        pagination.totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-4 border-t border-(--border) pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-(--text-subtle)">
              Showing page{' '}
              <span className="font-semibold text-(--text-primary)">
                {pagination.page}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-(--text-primary)">
                {pagination.totalPages}
              </span>{' '}
              · {pagination.total} total messages
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || isFetching}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={
                  page >= pagination.totalPages || isFetching
                }
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      pagination.totalPages,
                      current + 1,
                    ),
                  )
                }
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal()
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-dialog-title"
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-(--border) px-6 py-5">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <StatusPill
                    status={
                      activeMessage?.status ??
                      selectedMessage.status
                    }
                  />

                  {isDetailLoading && (
                    <span className="flex items-center gap-1 text-xs text-(--text-subtle)">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Loading details
                    </span>
                  )}
                </div>

                <h2
                  id="message-dialog-title"
                  className="truncate text-xl font-semibold text-(--text-primary)"
                >
                  {activeMessage?.subject || 'No Subject'}
                </h2>

                <p className="mt-1 text-xs text-(--text-subtle)">
                  Received {formatDate(activeMessage?.createdAt)}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close message"
                onClick={handleCloseModal}
                className="shrink-0 rounded-lg p-2 text-(--text-muted) transition-colors hover:bg-(--surface-elevated) hover:text-(--text-primary) focus:outline-none focus:ring-2 focus:ring-(--accent)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 py-6">
              {isDetailError ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                  <p className="text-sm font-medium text-red-400">
                    Failed to load message details.
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => refetchDetail()}
                  >
                    <RefreshCw className="mr-1.5 h-4 w-4" />
                    Retry
                  </Button>
                </div>
              ) : (
                <>
                  {/* Sender information */}
                  <div className="rounded-xl border border-(--border) bg-(--surface-elevated)/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-(--text-subtle)">
                        Contact Information
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft)">
                          <User className="h-4 w-4 text-(--accent)" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-(--text-subtle)">
                            Name
                          </p>
                          <p className="truncate text-sm font-medium text-(--text-primary)">
                            {activeMessage?.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft)">
                          <Mail className="h-4 w-4 text-(--accent)" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs text-(--text-subtle)  ">
                            Email
                          </p>
                          <a
                            href={`mailto:${activeMessage?.email}`}
                            className="truncate text-sm font-medium text-(--text-primary) hover:text-(--accent)"
                          >
                            {activeMessage?.email}
                          </a>
                        </div>
                      </div>

                      {activeMessage?.phone && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft)">
                            <Phone className="h-4 w-4 text-(--accent)" />
                          </div>

                          <div>
                            <p className="text-xs text-(--text-subtle)">
                              Phone
                            </p>
                            <a
                              href={`tel:${activeMessage.phone}`}
                              className="text-sm font-medium text-(--text-primary) hover:text-(--accent)"
                            >
                              {activeMessage.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {activeMessage?.ipAddress && (
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft)">
                            <Globe className="h-4 w-4 text-(--accent)" />
                          </div>

                          <div>
                            <p className="text-xs text-(--text-subtle)">
                              IP Address
                            </p>
                            <p className="font-mono text-sm text-(--text-primary)">
                              {activeMessage.ipAddress}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-(--text-primary)">
                        Message
                      </h3>

                      <span className="text-xs text-(--text-subtle)">
                        {activeMessage?.message?.length ?? 0} characters
                      </span>
                    </div>

                    <div className="rounded-xl border border-(--border) bg-(--surface-elevated)/20 p-5">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-(--text-primary)">
                        {activeMessage?.message}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-(--border) p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-(--accent)" />
                        <span className="text-xs font-medium text-(--text-subtle)">
                          Received
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-(--text-primary)">
                        {formatDate(activeMessage?.createdAt)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-(--border) p-4">
                      <div className="flex items-center gap-2">
                        <CheckCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-medium text-(--text-subtle)">
                          Replied
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-(--text-primary)">
                        {activeMessage?.repliedAt
                          ? formatDate(activeMessage.repliedAt)
                          : 'Not replied yet'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-(--border) bg-(--surface) px-6 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  size="sm"
                  disabled={!activeMessage?.email}
                  onClick={() =>
                    activeMessage &&
                    handleReplyMail(
                      activeMessage.email,
                      activeMessage.subject,
                    )
                  }
                >
                  <Reply className="mr-1.5 h-4 w-4" />
                  Reply via Email
                </Button>

                <div className="flex flex-wrap gap-2">
                  {activeMessage?.status === 'NEW' && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusUpdate(
                          activeMessage.id,
                          'READ',
                        )
                      }
                    >
                      {isUpdating ? (
                        <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-1.5 h-4 w-4 text-blue-400" />
                      )}
                      Mark Read
                    </Button>
                  )}

                  {activeMessage?.status !== 'REPLIED' &&
                    activeMessage?.status !== 'CLOSED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(
                            activeMessage?.id ?? '',
                            'REPLIED',
                          )
                        }
                      >
                        {isUpdating ? (
                          <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCheck className="mr-1.5 h-4 w-4 text-emerald-400" />
                        )}
                        Mark Replied
                      </Button>
                    )}

                  {activeMessage?.status !== 'CLOSED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUpdating}
                      className="hover:border-red-500/50 hover:text-red-400"
                      onClick={() =>
                        activeMessage &&
                        handleCloseInquiry(activeMessage.id)
                      }
                    >
                      {isUpdating ? (
                        <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                      ) : (
                        <Archive className="mr-1.5 h-4 w-4" />
                      )}
                      Close Inquiry
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
