import { analyticsRepository } from "./analytics.repository";

export const analyticsService = {
  async getOverview() {
    const [userStats, eventStats, moduleStats, feeStats] = await Promise.all([
      analyticsRepository.getUserStats(),
      analyticsRepository.getEventStats(),
      analyticsRepository.getModuleCountStats(),
      analyticsRepository.getFeeStats(),
    ]);

    return {
      users: userStats,
      events: eventStats,
      ...moduleStats,
      fees: feeStats,
    };
  },

  /** Batch-level stats for CR or admin scoped to a batch */
  async getBatchOverview(batch: string) {
    return analyticsRepository.getBatchStats(batch);
  },
};
