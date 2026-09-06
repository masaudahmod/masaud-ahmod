import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { DataTable } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { ConfirmModal } from "../components/ui/ConfirmModal";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  type Category,
  type CreateCategoryPayload,
  type UpdateCategoryPayload,
} from "../services/categoryApi";
import { useNavigate } from "react-router-dom";

const defaultFormState = {
  name: "",
  slug: "",
  description: "",
  parentId: "",
};

type FormState = typeof defaultFormState;

export function CategoriesPage() {
    const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string;
    name: string;
  }>({ open: false, id: "", name: "" });

  // API hooks
  const {
    data: categories = [],
    isLoading,
    error: queryError,
  } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const openNewModal = () => {
    setEditCategoryId(null);
    setFormState(defaultFormState);
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditCategoryId(category.id);
    setFormState({
      name: category.name,
      slug: category.slug ?? "",
      description: category.description ?? "",
      parentId: category.parentId ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCategoryId(null);
    setFormState(defaultFormState);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formState.name.trim()) {
      setError("Name is required.");
      return;
    }
    const payload: CreateCategoryPayload = {
      name: formState.name.trim(),
      slug: formState.slug.trim() || undefined,
      description: formState.description.trim() || undefined,
      parentId: formState.parentId || undefined,
    };
    try {
      setSaving(true);
      if (editCategoryId) {
        await updateCategory({
          id: editCategoryId,
          payload: payload as UpdateCategoryPayload,
        }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }
      closeModal();
    } catch (err: unknown) {
      setError(
        (err as { error?: string })?.error ?? "Failed to save category.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await deleteCategory(confirmDelete.id).unwrap();
      setConfirmDelete({ open: false, id: "", name: "" });
    } catch (err: unknown) {
      setError(
        (err as { error?: string })?.error ?? "Failed to delete category.",
      );
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "NAME",
      render: (cat: Category) => (
        <span className="font-medium text-(--text-primary)">{cat.name}</span>
      ),
    },
    {
      key: "slug",
      header: "SLUG",
      render: (cat: Category) => <span>{cat.slug ?? "-"}</span>,
    },
    {
      key: "description",
      header: "DESCRIPTION",
      render: (cat: Category) => <span>{cat.description ?? "-"}</span>,
    },
    {
      key: "actions",
      header: "",
      className: "w-28",
      render: (cat: Category) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => openEditModal(cat)}
            className="rounded-lg p-1.5 text-(--text-muted) hover:text-(--text-primary)"
            aria-label="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setConfirmDelete({ open: true, id: cat.id, name: cat.name })
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
        title="Categories"
        subtitle="Manage blog categories"
        action={
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              onClick={() => navigate("/blog")}
              className="ml-2"
            >
              <Plus className="h-4 w-4" />
              Blogs
            </Button>
            <Button size="lg" onClick={openNewModal}>
              <Plus className="h-4 w-4" />
              New Category
            </Button>
          </div>
        }
      />

      {error || queryError ? (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
          {error ??
            (queryError as { data?: { message?: string } })?.data?.message ??
            "Failed to load categories."}
        </div>
      ) : null}

      {isLoading ? (
        <div className="py-12 text-center text-sm text-(--text-muted)">
          Loading categories…
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={categories}
          keyExtractor={(c) => c.id}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-xl overflow-x-hidden overflow-y-scroll h-full rounded-3xl bg-(--bg) shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center justify-between border-b border-(--border) px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-(--text-primary)">
                  {editCategoryId ? "Edit Category" : "New Category"}
                </h2>
                <p className="text-sm text-(--text-muted)">
                  Provide category details and save.
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
              <label className="block text-sm text-(--text-muted)">
                Name
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                  required
                />
              </label>
              <label className="block text-sm text-(--text-muted)">
                Slug
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, slug: e.target.value }))
                  }
                  className="mt-2 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                />
              </label>
              <label className="block text-sm text-(--text-muted)">
                Description
                <textarea
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, description: e.target.value }))
                  }
                  className="mt-2 min-h-24 w-full rounded-xl border border-(--border) bg-(--surface) px-3 py-2 text-sm text-(--text-primary) outline-none focus:border-(--accent)"
                />
              </label>
              {/* Additional fields like parentId can be added here */}
              <div className="flex flex-wrap gap-3">
                <Button type="submit" disabled={saving}>
                  {saving
                    ? "Saving…"
                    : editCategoryId
                      ? "Update Category"
                      : "Create Category"}
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
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        open={confirmDelete.open}
        title="Delete Category"
        description={`Are you sure you want to delete "${confirmDelete.name}"? This will soft‑delete the category.`}
        onConfirm={handleDelete}
        onClose={() => setConfirmDelete({ open: false, id: "", name: "" })}
      />
    </div>
  );
}
