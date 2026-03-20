import { prisma } from "../../database";
import { AppError } from "../../common/middleware";
import { notificationsRepository } from "./notifications.repository";
import type { SendNotificationBody } from "./notifications.types";
import type { JwtPayload } from "../../common/middleware/authMiddleware";

export const notificationsService = {
  /** Send notifications in bulk. CR is batch-scoped; admin can target by batch or all. */
  async send(actor: JwtPayload, body: SendNotificationBody) {
    const role = actor.role ?? "";
    let targetUserIds: string[] = [];

    if (role === "cr") {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: actor.userId },
        select: { batch: true },
      });
      if (!profile?.batch) throw new AppError(403, "CR profile has no batch assigned");

      if (body.userIds && body.userIds.length > 0) {
        // CR can only send to users in their own batch — validate intersection
        const batchUserIds = await notificationsRepository.getUserIdsByBatch(profile.batch);
        const batchSet = new Set(batchUserIds);
        targetUserIds = body.userIds.filter((id) => batchSet.has(id));
        if (targetUserIds.length === 0) {
          throw new AppError(400, "None of the provided userIds belong to your batch");
        }
      } else {
        // No specific users → send to entire batch
        targetUserIds = await notificationsRepository.getUserIdsByBatch(profile.batch);
      }
    } else if (role === "admin" || role === "super_admin") {
      if (body.userIds && body.userIds.length > 0) {
        targetUserIds = body.userIds;
      } else if (body.batch) {
        targetUserIds = await notificationsRepository.getUserIdsByBatch(body.batch);
      } else {
        // Send to everyone
        targetUserIds = await notificationsRepository.getAllUserIds();
      }
    } else {
      throw new AppError(403, "Not authorized to send notifications");
    }

    if (targetUserIds.length === 0) {
      throw new AppError(400, "No valid recipients found");
    }

    const records = targetUserIds.map((userId) => ({
      userId,
      title: body.title,
      message: body.message,
    }));

    await notificationsRepository.createMany(records);
    return { sent: records.length };
  },

  /** Get all notifications for the authenticated user */
  async getMy(actor: JwtPayload) {
    return notificationsRepository.findByUserId(actor.userId);
  },

  /** Mark all of the current user's notifications as read */
  async markAllRead(actor: JwtPayload) {
    await notificationsRepository.markAllRead(actor.userId);
    return { success: true };
  },

  /** Mark a single notification as read — user must own it */
  async markOneRead(actor: JwtPayload, id: string) {
    const notification = await notificationsRepository.findById(id);
    if (!notification) throw new AppError(404, "Notification not found");
    if (notification.userId !== actor.userId) {
      throw new AppError(403, "You can only mark your own notifications as read");
    }
    return notificationsRepository.markOneRead(id);
  },
};
