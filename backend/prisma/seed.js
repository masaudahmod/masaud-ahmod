import dotenv from "dotenv";
import bcrypt from "bcrypt";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Please configure your backend environment before running the seed.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const adminCredentials = {
  email: process.env.SEED_ADMIN_EMAIL || "mr.masaud1403@gmail.com",
  username: process.env.SEED_ADMIN_USERNAME || "superadmin",
  password: process.env.SEED_ADMIN_PASSWORD || "Password!2004",
  firstName: process.env.SEED_ADMIN_FIRST_NAME || "Masaud",
  lastName: process.env.SEED_ADMIN_LAST_NAME || "Ahmod",
};

const roleDefinitions = [
  { name: "SUPER_ADMIN", description: "Full access to the application" },
  { name: "ADMIN", description: "Administrative access" },
  { name: "EDITOR", description: "Can manage content" },
  { name: "AUTHOR", description: "Can create content" },
  { name: "USER", description: "Default user role" },
];

const permissionDefinitions = [
  { resource: "users", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "roles", actions: ["READ", "UPDATE", "MANAGE"] },
  { resource: "permissions", actions: ["READ", "MANAGE"] },
  { resource: "posts", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "categories", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "comments", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "media", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "pages", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "settings", actions: ["READ", "UPDATE", "MANAGE"] },
  { resource: "contacts", actions: ["READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "newsletters", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "menus", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "social-links", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "redirects", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "visitors", actions: ["READ", "MANAGE"] },
  { resource: "notifications", actions: ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"] },
  { resource: "audit-logs", actions: ["READ", "MANAGE"] },
];

async function ensureRoles() {
  for (const role of roleDefinitions) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: { name: role.name, description: role.description },
    });
  }
}

async function ensurePermissions() {
  const createdPermissions = [];

  for (const definition of permissionDefinitions) {
    for (const action of definition.actions) {
      const existing = await prisma.permission.findFirst({
        where: { resource: definition.resource, action },
      });

      if (existing) {
        createdPermissions.push(existing);
        continue;
      }

      const created = await prisma.permission.create({
        data: {
          resource: definition.resource,
          action,
          description: `${action} access for ${definition.resource}`,
        },
      });

      createdPermissions.push(created);
    }
  }

  return createdPermissions;
}

async function assignPermissionsToSuperAdmin(permissions) {
  const superAdminRole = await prisma.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });

  if (!superAdminRole) {
    throw new Error("SUPER_ADMIN role was not created");
  }

  const existingPermissions = await prisma.rolePermission.findMany({
    where: { roleId: superAdminRole.id },
    select: { permissionId: true },
  });

  const existingPermissionIds = new Set(existingPermissions.map((item) => item.permissionId));

  const permissionData = permissions
    .filter((permission) => !existingPermissionIds.has(permission.id))
    .map((permission) => ({
      roleId: superAdminRole.id,
      permissionId: permission.id,
    }));

  if (permissionData.length > 0) {
    await prisma.rolePermission.createMany({
      data: permissionData,
      skipDuplicates: true,
    });
  }
}

async function ensureAdminUser() {
  const superAdminRole = await prisma.role.findUnique({
    where: { name: "SUPER_ADMIN" },
  });

  if (!superAdminRole) {
    throw new Error("SUPER_ADMIN role not found after role creation");
  }

  const hashedPassword = await bcrypt.hash(adminCredentials.password, 10);
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: adminCredentials.email }, { username: adminCredentials.username }],
    },
  });

  if (existingUser) {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        email: adminCredentials.email,
        username: adminCredentials.username,
        password: hashedPassword,
        emailVerified: true,
        status: "ACTIVE",
        role: { connect: { id: superAdminRole.id } },
      },
    });

    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: existingUser.id },
    });

    if (existingProfile) {
      await prisma.userProfile.update({
        where: { id: existingProfile.id },
        data: {
          firstName: adminCredentials.firstName,
          lastName: adminCredentials.lastName,
          displayName: adminCredentials.username,
        },
      });
    } else {
      await prisma.userProfile.create({
        data: {
          userId: existingUser.id,
          firstName: adminCredentials.firstName,
          lastName: adminCredentials.lastName,
          displayName: adminCredentials.username,
        },
      });
    }

    return existingUser.id;
  }

  const newUser = await prisma.user.create({
    data: {
      email: adminCredentials.email,
      username: adminCredentials.username,
      password: hashedPassword,
      emailVerified: true,
      status: "ACTIVE",
      role: { connect: { id: superAdminRole.id } },
      profile: {
        create: {
          firstName: adminCredentials.firstName,
          lastName: adminCredentials.lastName,
          displayName: adminCredentials.username,
        },
      },
    },
  });

  return newUser.id;
}

async function main() {
  await prisma.$connect();

  await ensureRoles();
  const permissions = await ensurePermissions();
  await assignPermissionsToSuperAdmin(permissions);
  await ensureAdminUser();

  console.log("Seed completed successfully.");
  console.log(`Admin email: ${adminCredentials.email}`);
  console.log(`Admin username: ${adminCredentials.username}`);
  console.log(`Admin password: ${adminCredentials.password}`);
  console.log("Please change this password after your first login.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
