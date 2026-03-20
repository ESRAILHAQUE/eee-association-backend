import type { Request, Response, NextFunction } from "express";
import { forumService } from "./forum.service";
import type { ForumPostStatus } from "./forum.types";

export const forumController = {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await forumService.getCategories();
      res.json({ success: true, data: categories });
    } catch (err) {
      next(err);
    }
  },

  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.query as Record<string, string>;
      const posts = await forumService.getPosts(req.user!, categoryId);
      res.json({ success: true, data: posts });
    } catch (err) {
      next(err);
    }
  },

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await forumService.createPost(req.user!, req.body);
      res.status(201).json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await forumService.getPost(req.params.id);
      res.json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },

  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const comment = await forumService.addComment(
        req.user!,
        req.params.id,
        req.body.content,
      );
      res.status(201).json({ success: true, data: comment });
    } catch (err) {
      next(err);
    }
  },

  async vote(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forumService.vote(req.user!, req.params.id, req.body.vote);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await forumService.updateStatus(
        req.user!,
        req.params.id,
        req.body.status as ForumPostStatus,
      );
      res.json({ success: true, data: post });
    } catch (err) {
      next(err);
    }
  },
};
