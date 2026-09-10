// Analytics response types

export interface UserStats {
  total: number;
  verified: number;
  unverified: number;
  recentSignups: number;
  byRole: Record<string, number>;
}

export interface AnalyticsOverview {
  users: UserStats;
  events: { total: number; published: number; draft: number };
  notices: { total: number };
  attendance: { total: number };
  feedback: { total: number };
  leaveRequests: { total: number };
  clubs: { total: number };
  projects: { total: number };
  resources: { total: number };
  fees: {
    totalExpected: number | object;
    totalCollected: number | object;
    totalDue: number | object;
  };
}

export interface BatchOverview {
  batch: string;
  totalStudents: number;
  verifiedStudents: number;
  events: number;
  notices: number;
  leaveRequests: number;
  attendance: number;
}
