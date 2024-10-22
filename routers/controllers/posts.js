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

const isString = (value) => typeof value === "string";

const getPosts = (req, res) => {
  const { title } = req.query;

  // In a production environment, comments would likely be stored in a separate collection or table to improve scalability and manageability.
  let responsePosts = posts.map((post) => {
    const { comments, ...postWithoutComments } = post;
    return postWithoutComments;
  });

  if (title) {
    responsePosts = responsePosts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return res.json(responsePosts);
};

const getPostById = (req, res) => {
  const { id } = req.params;

  const result = posts.find((post) => post.id === id);

  if (result) {
    return res.send(result);
  } else {
    return res.status(404).send({ message: `Post with ID ${id} not found` });
  }
};

const addPost = (req, res) => {
  const requiredFields = ["title", "description"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  // validate missing fields
  if (missingFields.length > 0) {
    return res
      .status(400)
      .send({ message: `${missingFields.join(", ")} required.` });
  }

  const { title, description } = req.body;

  // validate invalid fields types
  const typeErrors = [];
  if (!isString(title)) typeErrors.push("title");
  if (!isString(description)) typeErrors.push("description");

  if (typeErrors.length > 0) {
    const fieldsLabel = typeErrors.length > 1 ? "fields" : "field";
    return res.status(400).json({
      message: `${typeErrors.join(", ")} ${fieldsLabel} must be strings.`,
    });
  }

  const newPost = {
    id: uuidv4(), // generate a unique id for new post
    title,
    description,
    comments: [], // create empty comments array for new post
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

  // validate missing fields
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: `${missingFields.join(", ")} required.` });
  }

  const { username, comment } = req.body;
  // validate invalid fields types
  const typeErrors = [];
  if (!isString(username)) typeErrors.push("username");
  if (!isString(comment)) typeErrors.push("comment");

  if (typeErrors.length > 0) {
    const fieldsLabel = typeErrors.length > 1 ? "fields" : "field";
    return res.status(400).json({
      message: `${typeErrors.join(", ")} ${fieldsLabel} must be strings.`,
    });
  }

  const newComment = {
    id: uuidv4(), // generate a unique id for new post
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
