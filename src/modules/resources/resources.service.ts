import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { resourcesRepository } from "./resources.repository";
import type { CreateResourceBody, UpdateResourceStatusBody } from "./resources.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const resourcesService = {
  /** Member or CR uploads a resource (metadata only, no file handling) */
  async create(actor: JwtPayload, body: CreateResourceBody) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });

    return resourcesRepository.create({
      title: body.title,
      description: body.description ?? null,
      subject: body.subject,
      semester: body.semester ?? null,
      fileUrl: body.fileUrl,
      fileType: body.fileType,
      uploadedById: actor.userId,
      batch: body.batch ?? profile?.batch ?? null,
    });
  },

  /** Any authenticated user lists approved resources */
  async getApproved(actor: JwtPayload, query: { subject?: string; semester?: string }) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: actor.userId },
      select: { batch: true },
    });
    const isAdmin = actor.role === "admin" || actor.role === "super_admin";

    const semester = query.semester ? parseInt(query.semester, 10) : undefined;
    return resourcesRepository.findApproved(profile?.batch ?? null, isAdmin, {
      subject: query.subject,
      semester: isNaN(semester as number) ? undefined : semester,
    });
  },

  /** Moderator/admin views pending resources */
  async getPending(actor: JwtPayload) {
    const role = actor.role ?? "";
    if (role !== "moderator" && role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Not authorized to view pending resources");
    }
    return resourcesRepository.findPending();
  },

  /** Moderator/admin approves or rejects a resource */
  async updateStatus(actor: JwtPayload, id: string, body: UpdateResourceStatusBody) {
    const role = actor.role ?? "";
    if (role !== "moderator" && role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Not authorized to update resource status");
    }

    const resource = await resourcesRepository.findById(id);
    if (!resource) throw new AppError(404, "Resource not found");

    return resourcesRepository.updateStatus(id, body.status);
  },
};
