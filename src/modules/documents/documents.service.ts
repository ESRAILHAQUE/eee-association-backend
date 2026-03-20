import { AppError } from "../../common/middleware";
import { documentsRepository } from "./documents.repository";
import type { CreateDocumentBody } from "./documents.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const documentsService = {
  /** List documents filtered by category */
  async getAll(query: { category?: string }) {
    return documentsRepository.findAll({ category: query.category });
  },

  /** Admin/super_admin uploads document metadata */
  async create(actor: JwtPayload, body: CreateDocumentBody) {
    const role = actor.role ?? "";
    if (role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Only admin can upload documents");
    }

    return documentsRepository.create({
      title: body.title,
      description: body.description ?? null,
      fileUrl: body.fileUrl,
      fileType: body.fileType,
      category: body.category,
      accessLevel: body.accessLevel ?? "all",
      uploadedById: actor.userId,
    });
  },

  /** Admin/super_admin deletes a document */
  async delete(actor: JwtPayload, id: string) {
    const role = actor.role ?? "";
    if (role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Only admin can delete documents");
    }

    const document = await documentsRepository.findById(id);
    if (!document) throw new AppError(404, "Document not found");

    await documentsRepository.delete(id);
  },
};
