import { prisma } from "../../lib/prisma.js";
import ApiError from "../../errors/apiError.js";
import { uploadImage, deleteImage } from "./cloudinary.service.js";

const generateSlug = (title) => {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
};

const buildAuditEntry = ({ userId, action, entity, entityId, oldData = null, newData = null, req }) => {
  return {
    userId,
    action,
    entity,
    entityId,
    oldData,
    newData,
    ipAddress: req?.ip,
    userAgent: req?.get("user-agent"),
  };
};

export const createPost = async (req, res, next) => {
  try {
    const { title, excerpt, categoryId, status, isFeatured, allowComments, publishedAt, scheduledAt, tags, content, featuredImage } = req.body;

    if (!title || !content) {
      throw new ApiError(400, "Title and content are required.");
    }

    const slug = generateSlug(title);
    const existingSlug = await prisma.post.findUnique({ where: { slug } });
    const uniqueSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    let featuredImageId = null;

    if (featuredImage) {
      const uploadResult = await uploadImage(featuredImage);
      const media = await prisma.media.create({
        data: {
          filename: uploadResult.originalFilename ?? uniqueSlug,
          originalName: uploadResult.originalFilename ?? uniqueSlug,
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          mimeType: uploadResult.mimeType,
          extension: uploadResult.format,
          size: uploadResult.bytes,
          provider: "CLOUDINARY",
          type: "IMAGE",
          folder: uploadResult.folder,
          uploadedById: req.user.id,
        },
      });
      featuredImageId = media.id;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: uniqueSlug,
        excerpt,
        featuredImageId,
        authorId: req.user.id,
        categoryId,
        status,
        isFeatured: isFeatured ?? false,
        allowComments: allowComments ?? true,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        content: {
          create: {
            content,
            wordCount: content.split(/\s+/).filter(Boolean).length,
            readingTime: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)),
          },
        },
        tags: {
          create: Array.isArray(tags)
            ? tags.map((tag) => ({ tag: { connectOrCreate: { where: { slug: tag.toString().trim().toLowerCase() }, create: { name: tag.toString().trim(), slug: tag.toString().trim().toLowerCase() } } } }))
            : [],
        },
      },
      include: {
        content: true,
        featuredImage: true,
      },
    });

    await prisma.auditLog.create({ data: buildAuditEntry({
      userId: req.user.id,
      action: "POST_CREATED",
      entity: "Post",
      entityId: post.id,
      newData: post,
      req,
    }) });

    res.status(201).json({ success: true, message: "Post created successfully.", data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, excerpt, categoryId, status, isFeatured, allowComments, publishedAt, scheduledAt, tags, content, featuredImage } = req.body;

    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { featuredImage: true, content: true, tags: { include: { tag: true } } },
    });

    if (!existingPost || existingPost.deletedAt) {
      throw new ApiError(404, "Post not found.");
    }

    const oldData = { ...existingPost };
    let featuredImageId = existingPost.featuredImageId;

    if (featuredImage) {
      if (existingPost.featuredImage?.id && existingPost.featuredImage.publicId) {
        await deleteImage(existingPost.featuredImage.publicId);
        await prisma.media.delete({ where: { id: existingPost.featuredImage.id } });
      }

      const uploadResult = await uploadImage(featuredImage);
      const media = await prisma.media.create({
        data: {
          filename: uploadResult.originalFilename ?? `${title}-featured`,
          originalName: uploadResult.originalFilename ?? `${title}-featured`,
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          mimeType: uploadResult.mimeType,
          extension: uploadResult.format,
          size: uploadResult.bytes,
          provider: "CLOUDINARY",
          type: "IMAGE",
          folder: uploadResult.folder,
          uploadedById: req.user.id,
        },
      });
      featuredImageId = media.id;
    }

    const updates = {
      title,
      excerpt,
      categoryId,
      status,
      isFeatured,
      allowComments,
      publishedAt: publishedAt ? new Date(publishedAt) : existingPost.publishedAt,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : existingPost.scheduledAt,
      featuredImageId,
      updatedAt: new Date(),
    };

    if (title && title !== existingPost.title) {
      updates.slug = generateSlug(title);
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...updates,
        content: content
          ? {
              upsert: {
                where: { postId: id },
                create: {
                  content,
                  wordCount: content.split(/\s+/).filter(Boolean).length,
                  readingTime: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)),
                },
                update: {
                  content,
                  wordCount: content.split(/\s+/).filter(Boolean).length,
                  readingTime: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)),
                },
              },
            }
          : undefined,
        tags: Array.isArray(tags)
          ? {
              deleteMany: {},
              create: tags.map((tag) => ({ tag: { connectOrCreate: { where: { slug: tag.toString().trim().toLowerCase() }, create: { name: tag.toString().trim(), slug: tag.toString().trim().toLowerCase() } } } })),
            }
          : undefined,
      },
      include: {
        content: true,
        featuredImage: true,
      },
    });

    await prisma.auditLog.create({ data: buildAuditEntry({
      userId: req.user.id,
      action: "POST_UPDATED",
      entity: "Post",
      entityId: post.id,
      oldData,
      newData: post,
      req,
    }) });

    res.json({ success: true, message: "Post updated successfully.", data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { featuredImage: true },
    });

    if (!post || post.deletedAt) {
      throw new ApiError(404, "Post not found.");
    }

    if (post.featuredImage?.id) {
      await deleteImage(post.featuredImage.publicId);
      await prisma.media.delete({ where: { id: post.featuredImage.id } });
    }

    const deletedPost = await prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await prisma.auditLog.create({ data: buildAuditEntry({
      userId: req.user.id,
      action: "POST_DELETED",
      entity: "Post",
      entityId: deletedPost.id,
      oldData: post,
      req,
    }) });

    res.json({ success: true, message: "Post soft deleted successfully.", data: { id: deletedPost.id } });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { deletedAt: null },
      include: { featuredImage: true, content: true, tags: { include: { tag: true } }, author: { select: { id: true, username: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { featuredImage: true, content: true, tags: { include: { tag: true } }, author: { select: { id: true, username: true, email: true } } },
    });

    if (!post || post.deletedAt) {
      throw new ApiError(404, "Post not found.");
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
