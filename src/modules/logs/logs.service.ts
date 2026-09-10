import { logsRepository } from "./logs.repository";

export const logsService = {
  async getLoginLogs(userId?: string, limit = 50) {
    return logsRepository.findLoginLogs(userId, limit);
  },

  async getPasswordResetLogs(limit = 50) {
    return logsRepository.findPasswordResetLogs(limit);
  },
};
