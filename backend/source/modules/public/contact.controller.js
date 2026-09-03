import ApiError from "../../errors/apiError.js";
import { prisma } from "../../lib/prisma.js";

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if ((!name, !email, !message)) {
      return next(ApiError.badRequest("Name, email, and message are required"));
    }

    const ipAddress = req.ip;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
        ipAddress,
      },
    });

    res.status(201).json({
      success: true,
      message: "Contact message created successfully",
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
};
