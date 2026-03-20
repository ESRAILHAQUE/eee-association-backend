import { AppError } from "../../common/middleware";
import { clubsRepository } from "./clubs.repository";
import type { CreateClubBody } from "./clubs.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const clubsService = {
  /** Admin creates a new club */
  async create(actor: JwtPayload, body: CreateClubBody) {
    const role = actor.role ?? "";
    if (role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Only admin can create clubs");
    }
    return clubsRepository.create({
      name: body.name,
      description: body.description,
      logoUrl: body.logoUrl ?? null,
    });
  },

  /** Any authenticated user lists all active clubs */
  async getAll() {
    return clubsRepository.findAllActive();
  },

  /** Member joins a club */
  async join(actor: JwtPayload, clubId: string) {
    const club = await clubsRepository.findById(clubId);
    if (!club) throw new AppError(404, "Club not found");
    if (!club.isActive) throw new AppError(400, "Club is not active");

    const existing = await clubsRepository.findMembership(clubId, actor.userId);
    if (existing) throw new AppError(409, "Already a member of this club");

    return clubsRepository.addMember(clubId, actor.userId);
  },

  /** Member leaves a club */
  async leave(actor: JwtPayload, clubId: string) {
    const club = await clubsRepository.findById(clubId);
    if (!club) throw new AppError(404, "Club not found");

    const existing = await clubsRepository.findMembership(clubId, actor.userId);
    if (!existing) throw new AppError(404, "You are not a member of this club");

    await clubsRepository.removeMember(clubId, actor.userId);
    return { left: true };
  },

  /** Member gets their own clubs */
  async getMy(actor: JwtPayload) {
    const memberships = await clubsRepository.findByUser(actor.userId);
    return memberships.map((m) => m.club);
  },
};
