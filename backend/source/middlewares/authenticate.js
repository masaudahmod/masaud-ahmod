// ======================================================
// authenticate.js
// Description: Authentication Middleware
// ======================================================

import { prisma } from "../lib/prisma.js";
import ApiError from "../errors/apiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;
        const token = req.cookies?.accessToken || bearerToken;

        if (!token) {
            return next(new ApiError(401, "Authentication required."));
        }

        const decoded = verifyAccessToken(token);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return next(new ApiError(401, "User not found."));
        }

        if (!user.emailVerified) {
            return next(
                new ApiError(403, "Please verify your email.")
            );
        }

        if (user.status !== "ACTIVE") {
            return next(
                new ApiError(403, "Your account is not active.")
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(new ApiError(401, "Invalid or expired access token."));
    }
};

export default authenticate;
