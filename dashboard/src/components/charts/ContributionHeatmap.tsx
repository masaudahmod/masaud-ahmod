interface ContributionHeatmapProps {
  data: number[][]
}

const intensityClasses = [
  'bg-[var(--surface-elevated)]',
  'bg-blue-900/40',
  'bg-blue-700/50',
  'bg-blue-600/70',
  'bg-[var(--accent)]',
]

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((level, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`h-3 w-3 rounded-sm ${intensityClasses[level]}`}
                  title={`Level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="font-label text-[var(--text-subtle)]">Less</span>
        {intensityClasses.map((cls, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${cls}`} />
        ))}
        <span className="font-label text-[var(--text-subtle)]">More</span>
      </div>
    </div>
  )
}

export function generateHeatmapData(rows = 7, cols = 13): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 5)),
  )
}
