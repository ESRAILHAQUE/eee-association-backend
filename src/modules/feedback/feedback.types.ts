export type FeedbackStatus = "open" | "in_progress" | "resolved" | "dismissed";

export interface CreateFeedbackBody {
  title: string;
  content: string;
  isAnonymous?: boolean;
}

export interface UpdateFeedbackBody {
  status?: FeedbackStatus;
  resolution?: string;
}
