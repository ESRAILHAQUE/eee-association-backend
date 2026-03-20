import { prisma } from "../../database";
import type { ProjectCategory } from "./projects.types";

const projectSelect = {
  id: true,
  title: true,
  abstract: true,
  category: true,
  batch: true,
  githubUrl: true,
  docUrl: true,
  likes: true,
  createdAt: true,
  user: { select: { id: true, fullName: true, registrationNumber: true } },
};

export const projectsRepository = {
  async create(data: {
    title: string;
    abstract: string;
    category: ProjectCategory;
    githubUrl?: string | null;
    docUrl?: string | null;
    userId: string;
    batch: string | null;
  }) {
    return prisma.project.create({ data, select: projectSelect });
  },

  async findAll(filters?: { category?: ProjectCategory; batch?: string }) {
    return prisma.project.findMany({
      where: {
        ...(filters?.category ? { category: filters.category } : {}),
        ...(filters?.batch ? { batch: filters.batch } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: projectSelect,
    });
  },

  async findById(id: string) {
    return prisma.project.findUnique({ where: { id }, select: projectSelect });
  },

  /** Increment likes by 1 */
  async incrementLikes(id: string) {
    return prisma.project.update({
      where: { id },
      data: { likes: { increment: 1 } },
      select: projectSelect,
    });
  },

  /** Decrement likes by 1 (min 0) */
  async decrementLikes(id: string, currentLikes: number) {
    return prisma.project.update({
      where: { id },
      data: { likes: Math.max(0, currentLikes - 1) },
      select: projectSelect,
    });
  },

  async delete(id: string) {
    return prisma.project.delete({ where: { id } });
  },
};
