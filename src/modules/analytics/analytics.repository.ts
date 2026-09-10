import { prisma } from "../../database";

export const analyticsRepository = {
  async getUserStats() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalUsers, verifiedUsers, recentSignups, usersByRole] = await Promise.all([
      prisma.user.count({ where: { isDeleted: false } }),
      prisma.user.count({ where: { isDeleted: false, isVerified: true } }),
      prisma.user.count({
        where: { accountCreatedAt: { gte: sevenDaysAgo }, isDeleted: false },
      }),
      prisma.user.groupBy({
        by: ["currentRole"],
        where: { isDeleted: false },
        _count: { id: true },
      }),
    ]);

    return {
      total: totalUsers,
      verified: verifiedUsers,
      unverified: totalUsers - verifiedUsers,
      recentSignups,
      byRole: usersByRole.reduce(
        (acc, r) => ({ ...acc, [r.currentRole]: r._count.id }),
        {} as Record<string, number>,
      ),
    };
  },

  async getEventStats() {
    const [totalEvents, publishedEvents] = await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: "published" } }),
    ]);
    return { total: totalEvents, published: publishedEvents, draft: totalEvents - publishedEvents };
  },

  async getModuleCountStats() {
    const [
      totalNotices,
      totalAttendance,
      totalFeedback,
      totalLeave,
      totalClubs,
      totalProjects,
      totalResources,
    ] = await Promise.all([
      prisma.notice.count(),
      prisma.attendance.count(),
      prisma.feedback.count(),
      prisma.leaveRequest.count(),
      prisma.club.count({ where: { isActive: true } }),
      prisma.project.count(),
      prisma.resource.count({ where: { status: "approved" } }),
    ]);
    return {
      notices: { total: totalNotices },
      attendance: { total: totalAttendance },
      feedback: { total: totalFeedback },
      leaveRequests: { total: totalLeave },
      clubs: { total: totalClubs },
      projects: { total: totalProjects },
      resources: { total: totalResources },
    };
  },

  async getFeeStats() {
    const agg = await prisma.associationFee.aggregate({
      _sum: { feeAmount: true, paidAmount: true, dueAmount: true },
    });
    return {
      totalExpected: agg._sum.feeAmount ?? 0,
      totalCollected: agg._sum.paidAmount ?? 0,
      totalDue: agg._sum.dueAmount ?? 0,
    };
  },

  async getBatchStats(batch: string) {
    const [totalStudents, verifiedStudents, events, notices, leaveRequests, attendance] =
      await Promise.all([
        prisma.userProfile.count({ where: { batch } }),
        prisma.user.count({ where: { isVerified: true, profile: { batch } } }),
        prisma.event.count({ where: { targetBatch: batch } }),
        prisma.notice.count({ where: { batch } }),
        prisma.leaveRequest.count({ where: { user: { profile: { batch } } } }),
        prisma.attendance.count({ where: { user: { profile: { batch } } } }),
      ]);
    return { batch, totalStudents, verifiedStudents, events, notices, leaveRequests, attendance };
  },
};
