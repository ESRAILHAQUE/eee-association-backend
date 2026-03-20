export interface SendNotificationBody {
  title: string;
  message: string;
  /** Array of specific userIds. If omitted or empty, sends to all users in batch (or all users if admin). */
  userIds?: string[];
  /** Optional: target a specific batch. Admin can specify; CR is auto-scoped to their own batch. */
  batch?: string;
}

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  status: string;
  createdAt: Date;
}
