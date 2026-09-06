export type Category = {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type CreateCategoryPayload = {
  name: string;
  slug?: string;
  description?: string;
  parentId?: string;
};

export type UpdateCategoryPayload = {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string | null;
};

