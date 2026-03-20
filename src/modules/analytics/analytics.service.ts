import { prisma } from "../../database";

export const analyticsService = {
  async getOverview() {
    const [
      totalUsers,
      verifiedUsers,
      totalEvents,
      publishedEvents,
      totalNotices,
      totalAttendance,
      totalFeedback,
      totalLeave,
      totalClubs,
      totalProjects,
      totalResources,
      usersByRole,
    ] = await Promise.all([
      prisma.user.count({ where: { isDeleted: false } }),
      prisma.user.count({ where: { isDeleted: false, isVerified: true } }),
      prisma.event.count(),
      prisma.event.count({ where: { status: "published" } }),
      prisma.notice.count(),
      prisma.attendance.count(),
      prisma.feedback.count(),
      prisma.leaveRequest.count(),
      prisma.club.count({ where: { isActive: true } }),
      prisma.project.count(),
      prisma.resource.count({ where: { status: "approved" } }),
      prisma.user.groupBy({
        by: ["currentRole"],
        where: { isDeleted: false },
        _count: { id: true },
      }),
    ]);

    // Recent signups last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentSignups = await prisma.user.count({
      where: { accountCreatedAt: { gte: sevenDaysAgo }, isDeleted: false },
    });

    // Fee stats
    const feeAgg = await prisma.associationFee.aggregate({
      _sum: { feeAmount: true, paidAmount: true, dueAmount: true },
    });

    return {
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        unverified: totalUsers - verifiedUsers,
        recentSignups,
        byRole: usersByRole.reduce(
          (acc, r) => ({ ...acc, [r.currentRole]: r._count.id }),
          {} as Record<string, number>,
        ),
      },
      events: { total: totalEvents, published: publishedEvents, draft: totalEvents - publishedEvents },
      notices: { total: totalNotices },
      attendance: { total: totalAttendance },
      feedback: { total: totalFeedback },
      leaveRequests: { total: totalLeave },
      clubs: { total: totalClubs },
      projects: { total: totalProjects },
      resources: { total: totalResources },
      fees: {
        totalExpected: feeAgg._sum.feeAmount ?? 0,
        totalCollected: feeAgg._sum.paidAmount ?? 0,
        totalDue: feeAgg._sum.dueAmount ?? 0,
      },
    };
  },

  /** Batch-level stats for CR or admin scoped to a batch */
  async getBatchOverview(batch: string) {
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
