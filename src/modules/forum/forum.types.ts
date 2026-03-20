export type ForumPostStatus = "active" | "flagged" | "removed";

export interface CreatePostBody {
  title: string;
  content: string;
  categoryId: string;
}

export interface CreateCommentBody {
  content: string;
}

export interface VoteBody {
  vote: 1 | -1;
}
