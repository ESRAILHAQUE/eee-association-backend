import { PrismaClient } from "@prisma/client";
import { env } from "../config";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** Verify database is reachable; throws if connection fails. */
export async function ensureDatabaseConnection(): Promise<void> {
  await prisma.$connect();
}
