export type LeaveStatus = "pending" | "approved" | "rejected";

export interface CreateLeaveBody {
  title: string;
  reason: string;
  leaveDate: string; // ISO date string
  returnDate: string; // ISO date string
}

export interface UpdateLeaveBody {
  status: LeaveStatus;
  reviewNote?: string;
}
