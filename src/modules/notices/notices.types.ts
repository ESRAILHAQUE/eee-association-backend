export type NoticeTarget = "all" | "batch_specific";

export interface CreateNoticeBody {
  title: string;
  content: string;
  targetType?: NoticeTarget;
  batch?: string; // required when targetType = batch_specific and role = admin
  isPinned?: boolean;
  isUrgent?: boolean;
}

export interface NoticeResponse {
  id: string;
  title: string;
  content: string;
  targetType: NoticeTarget;
  batch: string | null;
  isPinned: boolean;
  isUrgent: boolean;
  createdAt: string;
  createdBy: {
    id: string;
    fullName: string;
    currentRole: string;
  };
}
