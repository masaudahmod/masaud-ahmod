import ApiError from "../../errors/apiError.js";
import { prisma } from "../../lib/prisma.js";


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

/**
 * Get List of Contact Messages with Search, Filter & Pagination
 */
export const getContactMessages = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const pageNumber = Math.max(1, parseInt(page));
    const pageSize = Math.max(1, parseInt(limit));
    const skip = (pageNumber - 1) * pageSize;

    // Dynamic Filter Constructs
    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { subject: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    res.json({
      success: true,
      data: messages,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Contact Message & Auto-Update status to READ if NEW
 */
export const getContactMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new ApiError(404, "Contact message not found.");
    }

    // Auto update status from NEW -> READ on viewing details
    if (message.status === "NEW") {
      const updatedMessage = await prisma.contactMessage.update({
        where: { id },
        data: { status: "READ" },
      });

      return res.json({ success: true, data: updatedMessage });
    }

    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Contact Message Status Manually (e.g., REPLIED, READ, CLOSED)
 */
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["NEW", "READ", "REPLIED", "CLOSED"];
    if (!status || !allowedStatuses.includes(status)) {
      throw new ApiError(400, "Invalid or missing status value.");
    }

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingMessage) {
      throw new ApiError(404, "Contact message not found.");
    }

    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (status === "REPLIED") {
      updateData.repliedAt = new Date();
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: buildAuditEntry({
        userId: req.user.id,
        action: "CONTACT_STATUS_UPDATED",
        entity: "ContactMessage",
        entityId: updatedMessage.id,
        oldData: existingMessage,
        newData: updatedMessage,
        req,
      }),
    });

    res.json({
      success: true,
      message: "Contact message status updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Soft Close Contact Message (Status -> CLOSED)
 */
export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new ApiError(404, "Contact message not found.");
    }

    const closedMessage = await prisma.contactMessage.update({
      where: { id },
      data: {
        status: "CLOSED",
        updatedAt: new Date(),
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: buildAuditEntry({
        userId: req.user.id,
        action: "CONTACT_CLOSED",
        entity: "ContactMessage",
        entityId: closedMessage.id,
        oldData: message,
        newData: closedMessage,
        req,
      }),
    });

    res.json({
      success: true,
      message: "Contact message closed successfully.",
      data: { id: closedMessage.id },
    });
  } catch (error) {
    next(error);
  }
};