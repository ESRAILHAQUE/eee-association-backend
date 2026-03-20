import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { projectsRepository } from "./projects.repository";
import type { CreateProjectBody, ProjectCategory } from "./projects.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const projectsService = {
  /** Any authenticated user submits a project; batch auto-filled from profile */
  async create(actor: JwtPayload, body: CreateProjectBody) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });

    return projectsRepository.create({
      title: body.title,
      abstract: body.abstract,
      category: body.category ?? "other",
      githubUrl: body.githubUrl ?? null,
      docUrl: body.docUrl ?? null,
      userId: actor.userId,
      batch: profile?.batch ?? null,
    });
  },

  /** List projects with optional filters */
  async getAll(query: { category?: string; batch?: string }) {
    return projectsRepository.findAll({
      category: query.category as ProjectCategory | undefined,
      batch: query.batch,
    });
  },

  /**
   * Toggle like on a project.
   * Simple increment strategy — not idempotent per user (no separate likes table in schema).
   * Each call flips: if liked (arbitrary heuristic), decrement; else increment.
   * Since the schema has no separate like-tracking table, we increment on every call.
   */
  async toggleLike(_actor: JwtPayload, id: string) {
    const project = await projectsRepository.findById(id);
    if (!project) throw new AppError(404, "Project not found");
    // Increment likes — simple approach matching the schema (no per-user like tracking table)
    return projectsRepository.incrementLikes(id);
  },

  /** Owner or admin deletes a project */
  async delete(actor: JwtPayload, id: string) {
    const role = actor.role ?? "";
    const project = await projectsRepository.findById(id);
    if (!project) throw new AppError(404, "Project not found");

    const isOwner = project.user.id === actor.userId;
    const isAdmin = role === "admin" || role === "super_admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(403, "Not authorized to delete this project");
    }

    await projectsRepository.delete(id);
  },
};
