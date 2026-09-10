// Logs module types

export interface LoginLogItem {
  id: string;
  loggedAt: Date;
  ip: string | null;
  userAgent: string | null;
  user: {
    id: string;
    fullName: string;
    registrationNumber: string;
    currentRole: string;
  };
}

export interface PasswordResetLogItem {
  id: string;
  resetAt: Date;
  user: {
    id: string;
    fullName: string;
    registrationNumber: string;
  };
}

export interface GetLoginLogsQuery {
  userId?: string;
  limit?: string;
}
