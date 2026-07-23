import type { ReactNode } from 'react'

interface Column<T> {
  key: string
  header: string
  render: (item: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  footer?: ReactNode
}

export function DataTable<T>({ columns, data, keyExtractor, footer }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`pb-3 text-left font-label text-[var(--text-subtle)] ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-elevated)]/50"
            >
              {columns.map((col) => (
                <td key={col.key} className={`py-4 text-sm ${col.className ?? ''}`}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {footer}
    </div>
  )
}
