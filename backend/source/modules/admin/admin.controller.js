import { prisma } from "../../lib/prisma.js";
import ApiError from "../../errors/apiError.js";
import hashPassword from "../../utils/hashPassword.js";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"];

export const listAdmins = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: {
                    name: {
                        in: ADMIN_ROLES,
                    },
                },
                deletedAt: null,
            },
            select: {
                id: true,
                email: true,
                username: true,
                status: true,
                createdAt: true,
                role: true,
            },
        });

        res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

export const getAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: { role: true },
        });

        if (!user || user.deletedAt) {
            throw new ApiError(404, "Admin not found.");
        }

        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const createAdmin = async (req, res, next) => {
    try {
        const { email, username, password, roleName } = req.body;

        if (!email || !username || !password || !roleName) {
            throw new ApiError(400, "Missing required fields: email, username, password, roleName");
        }

        if (!ADMIN_ROLES.includes(roleName)) {
            throw new ApiError(400, "Invalid admin role specified.");
        }

        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existing) {
            throw new ApiError(409, "User with given email or username already exists.");
        }

        const role = await prisma.role.findUnique({ where: { name: roleName } });

        if (!role) {
            throw new ApiError(400, "Invalid role specified.");
        }

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: await hashPassword(password),
                emailVerified: true,
                role: { connect: { id: role.id } },
            },
            select: { id: true, email: true, username: true, role: true, status: true, createdAt: true },
        });

        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const updateAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, username, password, status, roleName } = req.body;

        const toUpdate = {};

        if (email) toUpdate.email = email;
        if (username) toUpdate.username = username;
        if (status) toUpdate.status = status;
        if (password) toUpdate.password = await hashPassword(password);

        if (roleName) {
            const role = await prisma.role.findUnique({ where: { name: roleName } });
            if (!role) throw new ApiError(400, "Invalid role specified.");
            toUpdate.role = { connect: { id: role.id } };
        }

        const updated = await prisma.user.update({
            where: { id },
            data: toUpdate,
            select: { id: true, email: true, username: true, role: true, updatedAt: true },
        });

        res.json({ success: true, data: updated });
    } catch (err) {
        next(err);
    }
};

export const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) throw new ApiError(404, "Admin not found.");

        await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });

        res.json({ success: true, data: { id } });
    } catch (err) {
        next(err);
    }
};
