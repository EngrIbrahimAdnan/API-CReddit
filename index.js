const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const postsRouter = require("./routers/routes/posts.js");

app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
