// backend/source/modules/category/category.controller.js
import { prisma } from "../../lib/prisma.js";
import ApiError from "../../errors/apiError.js";
// Assuming a utility for audit logging exists
import { buildAuditEntry } from "../../utils/audit.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: { children: true },
    });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, image, parentId } = req.body;
    if (!name) {
      throw new ApiError(400, "Name is required");
    }
    const category = await prisma.category.create({
      data: { name, slug, description, image, parentId },
    });
    if (!category) {
      throw new ApiError(500, "Failed to create category");
    }
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, parentId } = req.body;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) {
      throw new ApiError(404, "Category not found");
    }
    const updated = await prisma.category.update({
      where: { id },
      data: { name, slug, description, image, parentId },
    });
    await prisma.auditLog.create({
      data: buildAuditEntry({
        userId: req.user.id,
        action: "CATEGORY_UPDATED",
        entity: "Category",
        entityId: id,
        oldData: existing,
        newData: updated,
        req,
      }),
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing || existing.deletedAt) {
      throw new ApiError(404, "Category not found");
    }
    const deleted = await prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    await prisma.auditLog.create({
      data: buildAuditEntry({
        userId: req.user.id,
        action: "CATEGORY_DELETED",
        entity: "Category",
        entityId: id,
        oldData: existing,
        newData: deleted,
        req,
      }),
    });
    res.json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};
