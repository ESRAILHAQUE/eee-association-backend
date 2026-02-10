// Matches Prisma CurrentRole enum
export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  CR: "cr",
  MODERATOR: "moderator",
  STUDENT: "student",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
