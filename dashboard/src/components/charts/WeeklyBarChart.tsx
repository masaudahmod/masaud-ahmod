import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export interface WeeklyDataPoint {
  day: string
  views: number
  highlight?: boolean
}

interface WeeklyBarChartProps {
  data: WeeklyDataPoint[]
}

export function WeeklyBarChart({ data }: WeeklyBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'var(--text-subtle)', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'var(--text-subtle)', fontSize: 12 }}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
          }}
          formatter={(value) => [`${value} views`, 'Views']}
        />
        <Bar dataKey="views" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.day}
              fill="var(--accent)"
              opacity={entry.highlight ? 1 : 0.45}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
