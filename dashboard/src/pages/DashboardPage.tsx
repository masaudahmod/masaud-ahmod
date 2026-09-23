import { Eye, FileText, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import { WeeklyBarChart } from "../components/charts/WeeklyBarChart";
import { GitHubIcon } from "../components/ui/GitHubIcon";
import { Card } from "../components/ui/Card";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";
import { ProgressBar } from "../components/ui/ProgressBar";
import {
  dashboardMetrics,
  recentActivity,
  techStackDistribution,
  weeklyViews,
} from "../data/dummy/dashboard";
import { pageMeta } from "../data/dummy/navigation";
import { useGetContactMessagesQuery } from "../services/contactMessage";

const metricIcons = {
  folder: FolderKanban,
  file: FileText,
  eye: Eye,
  github: GitHubIcon,
};

export function DashboardPage() {
  const meta = pageMeta["/"];
  const { data, isLoading } = useGetContactMessagesQuery();
  
  return (
    <div>
      <PageHeader title={meta.title} subtitle={meta.subtitle} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => {
          const Icon = metricIcons[metric.icon];
          return (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              subtext={metric.subtext}
              trend={metric.trend}
              trendPositive={metric.trendPositive}
              icon={Icon}
            />
          );
        })}
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-(--text-primary)">
            Portfolio Views (Weekly)
          </h2>
          <WeeklyBarChart data={weeklyViews} />
        </Card>

        <Card padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-(--text-primary)">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    item.type === "success"
                      ? "bg-emerald-500"
                      : item.type === "draft"
                        ? "bg-(--draft)"
                        : "bg-(--accent)"
                  }`}
                />
                <div>
                  <p className="text-sm text-(--text-primary)">
                    {item.text}
                  </p>
                  <p className="mt-0.5 text-xs text-(--text-subtle)">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padding="lg">
          <h2 className="mb-4 text-lg font-semibold text-(--text-primary)">
            Tech Stack Distribution
          </h2>
          <div className="space-y-4">
            {techStackDistribution.map((item) => (
              <ProgressBar
                key={item.label}
                label={item.label}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-(--text-primary)">
              Inbox Preview
            </h2>
            {/* <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-label text-[0.625rem] text-[var(--accent)]">
              2 Unread
            </span> */}
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : data?.data?.length ? (
              data?.data?.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-lg border p-3 ${
                    msg.status
                      ? "border-(--accent)/30 bg-(--accent-soft)/30"
                      : "border-(--border)"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-(--text-primary)">
                      {msg.name}
                    </p>
                    <span className="shrink-0 text-xs text-(--text-subtle)">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-(--text-muted)">
                    {msg.message}
                  </p>
                </div>
              ))
            ) : (
              <p>No messages found.</p>
            )}
          </div>
          <Link
            to="/messages"
            className="mt-4 block text-center font-label text-[0.625rem] text-(--accent) hover:underline"
          >
            VIEW ALL MESSAGES
          </Link>
        </Card>
      </div>
    </div>
  );
}
