import { prisma } from "../../database";

const notificationSelect = {
  id: true,
  title: true,
  message: true,
  status: true,
  createdAt: true,
};

export const notificationsRepository = {
  /** Bulk-insert notifications for a list of userIds */
  async createMany(data: { userId: string; title: string; message: string; senderId?: string }[]) {
    return prisma.notification.createMany({ data });
  },

  /** Get notifications sent by a specific user */
  async findSentByUserId(senderId: string) {
    // To avoid fetching N copies of the same broadcast, we select distinct
    return prisma.notification.findMany({
      where: { senderId },
      distinct: ['title', 'message', 'createdAt'],
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        message: true,
        createdAt: true,
      },
    });
  },

  /** Fetch all users in a specific batch */
  async getUserIdsByBatch(batch: string): Promise<string[]> {
    const profiles = await prisma.userProfile.findMany({
      where: { batch },
      select: { userId: true },
    });
    return profiles.map((p: { userId: string }) => p.userId);
  },

  /** Fetch all user ids (non-deleted) */
  async getAllUserIds(): Promise<string[]> {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      select: { id: true },
    });
    return users.map((u: { id: string }) => u.id);
  },

  /** Get all notifications for a user, newest first */
  async findByUserId(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: notificationSelect,
    });
  },

  /** Mark all notifications as read for a user */
  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, status: "unread" },
      data: { status: "read" },
    });
  },

  /** Find a single notification by id */
  async findById(id: string) {
    return prisma.notification.findUnique({
      where: { id },
      select: { ...notificationSelect, userId: true },
    });
  },

  /** Mark a single notification as read */
  async markOneRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { status: "read" },
      select: notificationSelect,
    });
  },
};
