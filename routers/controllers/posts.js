const { v4: uuidv4 } = require("uuid");

const posts = [
  {
    id: uuidv4(),
    title: "First Post",
    description: "This is the description of the first post.",
    comments: [],
  },
  {
    id: uuidv4(),
    title: "Second Post",
    description: "This is the description of the second post.",
    comments: [],
  },
  {
    id: uuidv4(),
    title: "Third Post",
    description: "This is the description of the third post.",
    comments: [],
  },
];

const getPosts = (req, res) => {
  const { title } = req.query;

  let responsePosts = posts.map((post) => {
    const { comments, ...postWithoutComments } = post;
    return postWithoutComments;
  });

  if (title) {
    responsePosts = responsePosts.filter((post) => post.title.includes(title));
  }

  return res.json(responsePosts);
};

const getPostById = (req, res) => {
  const { id } = req.params;

  const result = posts.find((post) => post.id === id);

  if (result) {
    return res.send(result);
  } else {
    return res.status(404).send({ message: "Post not found" });
  }
};

const addPost = (req, res) => {
  const requiredFields = ["title", "description"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .send({ message: `${missingFields.join(", ")} required.` });
  }

  const { title, description } = req.body;
  const newPost = {
    id: uuidv4(),
    title,
    description,
    comments: [],
  };

  posts.push(newPost);
  res.status(201).send(newPost);
};

const deletePostById = (req, res) => {
  const { id } = req.params;

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Post with ID ${id} not found` });
  }

  posts.splice(index, 1);
  return res.json({ message: "Post has been deleted successfully" });
};

const addComment = (req, res) => {
  const { id } = req.params;
  const requiredFields = ["username", "comment"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: `${missingFields.join(", ")} required.` });
  }

  const { username, comment } = req.body;
  const newComment = {
    id: uuidv4(),
    username,
    comment,
  };

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[index].comments.unshift(newComment);

  return res.status(201).json({
    message: "Comment has been added successfully",
    comment: newComment,
  });
};

const deleteCommentById = (req, res) => {
  const { id } = req.params;

  let found = false;

  posts.forEach((post) => {
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex > -1) {
      post.comments.splice(commentIndex, 1);
      found = true;
    }
  });

  if (!found) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.json({ message: "Comment has been deleted successfully" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  deletePostById,
  addComment,
  deleteCommentById,
};
