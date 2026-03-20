import { prisma } from "../../database";
import type { ForumPostStatus } from "./forum.types";

const postListSelect = {
  id: true,
  title: true,
  content: true,
  status: true,
  createdAt: true,
  category: { select: { id: true, name: true } },
  author: { select: { id: true, fullName: true } },
  _count: { select: { comments: true, votes: true } },
};

const postDetailSelect = {
  id: true,
  title: true,
  content: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  category: { select: { id: true, name: true } },
  author: { select: { id: true, fullName: true } },
  comments: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, fullName: true } },
    },
    orderBy: { createdAt: "asc" as const },
  },
  votes: { select: { userId: true, vote: true } },
  _count: { select: { comments: true, votes: true } },
};

export const forumRepository = {
  async findCategories() {
    return prisma.forumCategory.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  },

  async createPost(data: {
    title: string;
    content: string;
    categoryId: string;
    authorId: string;
  }) {
    return prisma.forumPost.create({
      data,
      select: postListSelect,
    });
  },

  async findPosts(filters: { categoryId?: string; status?: ForumPostStatus }) {
    return prisma.forumPost.findMany({
      where: {
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
        ...(filters.status ? { status: filters.status } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: postListSelect,
    });
  },

  async findPostById(id: string) {
    return prisma.forumPost.findUnique({
      where: { id },
      select: postDetailSelect,
    });
  },

  async createComment(postId: string, authorId: string, content: string) {
    return prisma.forumComment.create({
      data: { postId, authorId, content },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: { select: { id: true, fullName: true } },
      },
    });
  },

  async upsertVote(postId: string, userId: string, vote: 1 | -1) {
    await prisma.forumVote.upsert({
      where: { postId_userId: { postId, userId } },
      create: { postId, userId, vote },
      update: { vote },
    });
    // Recalculate score as sum of all votes on this post
    const result = await prisma.forumVote.aggregate({
      where: { postId },
      _sum: { vote: true },
    });
    return { score: result._sum.vote ?? 0 };
  },

  async updatePostStatus(id: string, status: ForumPostStatus) {
    return prisma.forumPost.update({
      where: { id },
      data: { status },
      select: postListSelect,
    });
  },

  async findAllForModeration(status?: ForumPostStatus) {
    return prisma.forumPost.findMany({
      where: {
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: {
        ...postListSelect,
        author: { select: { id: true, fullName: true } },
        category: { select: { id: true, name: true } },
      },
    });
  },
};
