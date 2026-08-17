import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Edit, Maximize2, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusPill, type Status } from "../components/ui/StatusPill";
import { Tabs } from "../components/ui/Tabs";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import type { Blog, CreateBlogPayload, UpdateBlogPayload } from "../types/blog";
import { pageMeta } from "../data/dummy/navigation";
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../services/blogApi";
import RTE from "../components/rich-text-editor/RTE";

const articleTabs = [
  { id: "all", label: "ALL" },
  { id: "draft", label: "DRAFTS" },
  { id: "published", label: "PUBLISHED" },
];

const getStatusPill = (status: string | null | undefined) => {
  const label = status
    ? `${status.charAt(0)}${status.slice(1).toLowerCase()}`
    : "Draft";

  return {
    status: status === "PUBLISHED" ? "published" : ("draft" as Status),
    label,
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (typeof error === "object" && error && "error" in error) {
    const message = error.error;
    if (typeof message === "string") return message;
  }
  return fallback;
};

const defaultFormState = {
  title: "",
  excerpt: "",
  status: "DRAFT",
  categoryId: "",
  tags: "",
  content: "",
  featuredImage: null as File | null,
  featuredImagePreview: "",
};

type FormState = typeof defaultFormState;

export function BlogPage() {
  const meta = pageMeta["/blog"];
  const [activeTab, setActiveTab] = useState("all");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string;
    title: string;
  }>({ open: false, id: "", title: "" });

  // api call (RTK Query)
  const {
    data: postsData = [],
    isLoading: postsLoading,
    isError: postsError,
    error: postsQueryError,
  } = useGetBlogsQuery();

  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return postsData ?? [];
    return postsData.filter((post) => post.status === activeTab.toUpperCase());
  }, [activeTab, postsData]);

  const openNewPostModal = () => {
    setEditPostId(null);
    setFormState(defaultFormState);
    setModalOpen(true);
  };

  const openEditModal = (post: Blog) => {
    setEditPostId(post.id);
    setFormState({
      title: post.title,
      excerpt: post.excerpt ?? "",
      status: post.status ?? "DRAFT",
      categoryId: post.category?.id ?? "",
      tags: post.tags.map((item) => item.tag.name).join(", "),
      content: post.content?.content ?? "",
      featuredImage: null,
      featuredImagePreview: post.featuredImage?.url ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditPostId(null);
    setFormState(defaultFormState);
    setError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setFormState((state) => ({
        ...state,
        featuredImage: null,
        featuredImagePreview: "",
      }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFormState((state) => ({
      ...state,
      featuredImage: file,
      featuredImagePreview: previewUrl,
    }));
  };

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Unable to read file."));
        }
      };
      reader.onerror = () => reject(new Error("Unable to read file."));
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    console.log("Form state before submission:", formState);

    if (!formState.title.trim() || !formState.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const payload: Record<string, unknown> = {
      title: formState.title.trim(),
      excerpt: formState.excerpt.trim() || undefined,
      status: formState.status,
      categoryId: formState.categoryId || undefined,
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: formState.content,
    };

    if (formState.featuredImage) {
      payload.featuredImage = await fileToBase64(formState.featuredImage);
    }

    console.log("Payload to submit:", payload);

    try {
      setSaving(true);
      if (editPostId) {
        await updateBlog({
          id: editPostId,
          payload: payload as UpdateBlogPayload,
        }).unwrap();
      } else {
        const result = await createBlog(payload as CreateBlogPayload).unwrap();
        console.log(result);
      }
      closeModal();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to save post."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await deleteBlog(confirmDelete.id).unwrap();
      setConfirmDelete({ open: false, id: "", title: "" });
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to delete post."));
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "title",
      header: "TITLE",
      render: (post: Blog) => (
        <span className="font-medium text-(--text-primary)">{post.title}</span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (post: Blog) => <StatusPill {...getStatusPill(post.status)} />,
    },
    {
      key: "category",
      header: "CATEGORY",
      render: (post: Blog) => <span>{post.category?.name ?? "-"}</span>,
    },
    {
      key: "time",
      header: "READ",
      render: (post: Blog) => (
        <span className="text-(--text-muted)">
          {post.content?.readingTime ?? "-"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-28",
      render: (post: Blog) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => openEditModal(post)}
            className="rounded-lg p-1.5 text-(--text-muted) hover:text-(--text-primary)"
            aria-label="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setConfirmDelete({ open: true, id: post.id, title: post.title })
            }
            className="rounded-lg p-1.5 text-(--text-muted) hover:text-red-500"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        action={
          <Button size="lg" onClick={openNewPostModal}>
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        }
      />

      {error || postsError ? (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {error ?? getErrorMessage(postsQueryError, "Failed to load posts.")}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card padding="lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-(--text-primary)">
                Recent Articles
              </h2>
              <Tabs
                tabs={articleTabs}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {postsLoading ? (
              <div className="py-12 text-center text-sm text-(--text-muted)">
                Loading posts…
              </div>
            ) : filteredPosts.length ? (
              <DataTable
                columns={columns}
                data={filteredPosts}
                keyExtractor={(post) => post.id}
              />
            ) : (
              <div className="rounded-lg border border-dashed border-(--border)] p-8 text-center text-sm text-(--text-muted)">
                No posts found. Click New Post to add your first article.
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card padding="md">
            <p className="font-label text-(--text-subtle)">Total Posts</p>
            <p className="mt-1 text-2xl font-semibold text-(--text-primary)">
              {postsData?.length ?? 0}
            </p>
          </Card>
          <Card padding="md">
            <p className="font-label text-(--text-subtle)">Published</p>
            <p className="mt-1 text-2xl font-semibold text-(--text-primary)">
              {postsData?.filter((post) => post.status === "PUBLISHED")
                .length ?? 0}
            </p>
          </Card>
          <Card padding="lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-(--text-primary)">
                Draft Preview
              </h3>
              <button
                type="button"
                className="text-(--text-muted)] hover:text-(--text-primary)"
                aria-label="Expand"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-(--text-muted)">
              Create, edit, and publish your blog posts directly from this
              dashboard. Use image upload to add a featured image to your
              article.
            </p>
          </Card>
        </div>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-3xl overflow-x-hidden overflow-y-scroll h-full rounded-3xl bg-(--bg) shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-(--border) px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {editPostId ? "Edit Post" : "New Post"}
                </h2>
                <p className="text-sm text-(--text-muted)">
                  Save your post and upload a featured image if needed.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg px-3 py-2 text-sm text-(--text-muted) hover:text-(--text-primary)"
              >
                Close
              </button>
            </div>

            <form className="space-y-6 p-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-(--text-muted)">
                  Title
                  <input
                    type="text"
                    value={formState.title}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        title: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                    required
                  />
                </label>
                <label className="block text-sm text-(--text-muted)">
                  Status
                  <select
                    value={formState.status}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        status: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="REVIEW">Review</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm text-(--text-muted)">
                Excerpt
                <textarea
                  value={formState.excerpt}
                  onChange={(event) =>
                    setFormState((state) => ({
                      ...state,
                      excerpt: event.target.value,
                    }))
                  }
                  className="mt-2 min-h-24 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                />
              </label>

              <label className="block text-sm text-(--text-muted)">
                Content
                {/* <textarea
                  value={formState.content}
                  onChange={(event) =>
                    setFormState((state) => ({
                      ...state,
                      content: event.target.value,
                    }))
                  }
                  className="mt-2 min-h-40 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                  required
                /> */}
                <RTE
                  initialValue={formState.content}
                  onChange={(content: any) =>
                    setFormState((state) => ({
                      ...state,
                      content: content,
                    }))
                  }
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-(--text-muted)">
                  Tags (comma separated)
                  <input
                    type="text"
                    value={formState.tags}
                    onChange={(event) =>
                      setFormState((state) => ({
                        ...state,
                        tags: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                    placeholder="e.g. react, node.js"
                  />
                </label>
                <label className="block text-sm text-(--text-muted)">
                  Featured Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                  />
                </label>
              </div>

              {formState.featuredImagePreview ? (
                <div className="rounded-3xl border border-(--border) bg-(--surface) p-4">
                  <p className="mb-2 text-sm text-(--text-muted)">
                    Featured image preview
                  </p>
                  <img
                    src={formState.featuredImagePreview}
                    alt="Featured preview"
                    className="max-h-60 w-full rounded-3xl object-cover"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={saving}>
                  {saving
                    ? "Saving…"
                    : editPostId
                      ? "Update Post"
                      : "Create Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="border-(--border)!"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={confirmDelete.open}
        title="Delete Blog Post"
        description={`Are you sure you want to delete "${confirmDelete.title}"? This action will soft delete the post.`}
        onConfirm={handleDelete}
        onClose={() => setConfirmDelete({ open: false, id: "", title: "" })}
      />
    </div>
  );
}
