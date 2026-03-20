import { AppError } from "../../common/middleware";
import { forumRepository } from "./forum.repository";
import type { JwtPayload } from "../../common/middleware/authMiddleware";
import type { ForumPostStatus, CreatePostBody } from "./forum.types";

export const forumService = {
  /** Public — no auth needed */
  async getCategories() {
    return forumRepository.findCategories();
  },

  /** Active posts for students; all posts for moderator/admin/super_admin */
  async getPosts(actor: JwtPayload, categoryId?: string) {
    const role = actor.role ?? "";
    const isMod = role === "moderator" || role === "admin" || role === "super_admin";

    return forumRepository.findPosts({
      categoryId,
      status: isMod ? undefined : "active",
    });
  },

  /** Any authenticated user can create a post */
  async createPost(actor: JwtPayload, body: CreatePostBody) {
    return forumRepository.createPost({
      title: body.title,
      content: body.content,
      categoryId: body.categoryId,
      authorId: actor.userId,
    });
  },

  /** Returns post with comments and votes */
  async getPost(id: string) {
    const post = await forumRepository.findPostById(id);
    if (!post) throw new AppError(404, "Post not found");
    return post;
  },

  /** Any authenticated user can comment */
  async addComment(actor: JwtPayload, postId: string, content: string) {
    const post = await forumRepository.findPostById(postId);
    if (!post) throw new AppError(404, "Post not found");
    if (post.status === "removed") throw new AppError(400, "Cannot comment on a removed post");
    return forumRepository.createComment(postId, actor.userId, content);
  },

  /** Any authenticated user can vote, except on their own post */
  async vote(actor: JwtPayload, postId: string, vote: 1 | -1) {
    const post = await forumRepository.findPostById(postId);
    if (!post) throw new AppError(404, "Post not found");
    if (post.author.id === actor.userId) {
      throw new AppError(400, "You cannot vote on your own post");
    }
    return forumRepository.upsertVote(postId, actor.userId, vote);
  },

  /** Moderator/admin/super_admin only */
  async updateStatus(actor: JwtPayload, postId: string, status: ForumPostStatus) {
    const role = actor.role ?? "";
    if (role !== "moderator" && role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Insufficient permissions");
    }
    const post = await forumRepository.findPostById(postId);
    if (!post) throw new AppError(404, "Post not found");
    return forumRepository.updatePostStatus(postId, status);
  },

  /** All posts for moderation view — moderator/admin/super_admin */
  async getPostsForModeration(actor: JwtPayload, status?: ForumPostStatus) {
    const role = actor.role ?? "";
    if (role !== "moderator" && role !== "admin" && role !== "super_admin") {
      throw new AppError(403, "Insufficient permissions");
    }
    return forumRepository.findAllForModeration(status);
  },
};
