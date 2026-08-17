import ApiError from "../../errors/apiError.js";
import { prisma } from "../../lib/prisma.js";

/**
 * GET /api/public/blogs
 *
 * Public blog listing
 *
 * Query params:
 * ?page=1
 * ?limit=10
 * ?search=react
 * ?category=technology
 * ?tag=javascript
 * ?featured=true
 */
export const getPublicPosts = async (req, res, next) => {
  try {
    const {
      page = "1",
      limit = "10",
      search,
      category,
      tag,
      featured,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const skip = (currentPage - 1) * perPage;

    const where = {
      deletedAt: null,
      status: "PUBLISHED",
    };

    // Search
    if (search?.trim()) {
      where.OR = [
        {
          title: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          excerpt: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search.trim(),
            mode: "insensitive",
          },
        },
      ];
    }

    // Category
    if (category?.trim()) {
      where.category = {
        slug: category.trim().toLowerCase(),
      };
    }

    // Tag
    if (tag?.trim()) {
      where.tags = {
        some: {
          tag: {
            slug: tag.trim().toLowerCase(),
          },
        },
      };
    }

    // Featured
    if (featured === "true") {
      where.isFeatured = true;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: perPage,

        orderBy: {
          publishedAt: "desc",
        },

        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          status: true,
          isFeatured: true,
          allowComments: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,

          featuredImage: {
            select: {
              id: true,
              url: true,
              originalName: true,
              mimeType: true,
              width: true,
              height: true,
            },
          },

          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          content: {
            select: {
              wordCount: true,
              readingTime: true,
            },
          },

          tags: {
            select: {
              tag: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
        },
      }),

      prisma.post.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / perPage);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: currentPage,
        limit: perPage,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/public/blogs/:slug
 *
 * Get single public blog
 */
export const getPublicPost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      throw new ApiError(400, "Slug is required.");
    }

    const post = await prisma.post.findFirst({
      where: {
        slug,
        deletedAt: null,
        status: "PUBLISHED",
      },

      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        status: true,
        isFeatured: true,
        allowComments: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,

        featuredImage: {
          select: {
            id: true,
            url: true,
            originalName: true,
            mimeType: true,
            width: true,
            height: true,
          },
        },

        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        content: {
          select: {
            content: true,
            wordCount: true,
            readingTime: true,
          },
        },

        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      throw new ApiError(404, "Blog post not found.");
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
