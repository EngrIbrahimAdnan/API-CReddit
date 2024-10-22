const express = require("express");
const postsRouter = express.Router();

const {
  getPosts,
  getPostById,
  addPost,
  deletePostById,
  addComment,
  deleteCommentById,
} = require("../controllers/posts");

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPostById);
postsRouter.post("/", addPost);
postsRouter.delete("/:id", deletePostById);
postsRouter.post("/:id/comments", addComment);
postsRouter.delete("/comments/:id", deleteCommentById);

module.exports = postsRouter;
