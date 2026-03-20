import { Router } from "express";
import { body } from "express-validator";
import { forumController } from "./forum.controller";
import { authMiddleware, requireRoles } from "../../common/middleware/authMiddleware";
import { validate } from "../../common/middleware/validate";

const router = Router();

const createPostValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("categoryId").trim().notEmpty().withMessage("Category is required"),
];

const createCommentValidation = [
  body("content").trim().notEmpty().withMessage("Content is required"),
];

const voteValidation = [
  body("vote").isIn([1, -1]).withMessage("Vote must be 1 or -1"),
];

const statusValidation = [
  body("status")
    .isIn(["active", "flagged", "removed"])
    .withMessage("Status must be active, flagged, or removed"),
];

// Public — no auth needed
router.get("/categories", forumController.getCategories);

// All authenticated users
router.get("/posts", authMiddleware, forumController.getPosts);

router.post(
  "/posts",
  authMiddleware,
  validate(createPostValidation),
  forumController.createPost,
);

router.get("/posts/:id", authMiddleware, forumController.getPost);

router.post(
  "/posts/:id/comments",
  authMiddleware,
  validate(createCommentValidation),
  forumController.addComment,
);

router.post(
  "/posts/:id/vote",
  authMiddleware,
  validate(voteValidation),
  forumController.vote,
);

// Moderator / admin / super_admin only
router.patch(
  "/posts/:id/status",
  authMiddleware,
  requireRoles("moderator", "admin", "super_admin"),
  validate(statusValidation),
  forumController.updateStatus,
);

export const forumRoutes = router;
