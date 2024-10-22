## API Documentation

### Contents

- [Get All Posts or Filter Posts by Title](#get-all-posts-or-filter-posts-by-title)
- [Get a Single Post by ID](#get-a-single-post-by-id)
- [Add a New Post](#add-a-new-post)
- [Delete a Post by ID](#delete-a-post-by-id)
- [Add a Comment to a Post by Post ID](#add-a-comment-to-a-post-by-post-id)
- [Delete a Comment by Comment ID](#delete-a-comment-by-comment-id)
- [Post Object Structure](#post-object-structure)
- [Comment Structure](#comment-structure)

### Get All Posts or Filter Posts by Title

[View Post Object Structure](#post-object-structure)

| ENDPOINT | Method | Params | URL Params         | Success Response                                                                                | Error Response                                                                     |
| -------- | ------ | ------ | ------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| /posts   | `GET`  | -      | `title` (optional) | **Code:** 200 - OK <br/>**Content:** `{`<br/> `"posts": [Post](#post-object-structure)`<br/>`}` | **Code:** 200 - OK <br/>**Content:** Empty array `[]` if no posts match the filter |

#### Notes:

- **Params**: This API does not require any specific parameters passed as part of the path.
- **URL Params**: Optional `title` query string to filter posts based on their title. The search is case-insensitive.
- **Success Response**: Returns an array of posts, each excluding the comments for simulation purposes. If a `title` query is specified, only posts containing the title text will be returned. The search is case-insensitive, enhancing usability.
- **Error Response**: Since the operation of retrieving posts should not logically fail due to HTTP errors but may simply return no matches, returns a 200 OK with an empty array.

### Get a Single Post by ID

[View Post Object Structure](#post-object-structure)

| ENDPOINT   | Method | Params | URL Params | Success Response                                                                               | Error Response                                                                         |
| ---------- | ------ | ------ | ---------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| /posts/:id | `GET`  | `id`   | -          | **Code:** 200 - OK <br/>**Content:** `{`<br/> `"post": [Post](#post-object-structure)`<br/>`}` | **Code:** 404 Not Found <br/>**Content:** `{ message: "Post with ID {id} not found" }` |

#### Notes:

- **Params**: This API requires an `id` parameter to be passed as part of the URL path.
- **URL Params**: None beyond the ID specified in the path.
- **Success Response**: Returns a single post object if a post with the specified ID exists.
- **Error Response**: Returns a 404 Not Found if no post matches the given ID, indicating that the requested resource is not available.

## Add a New Post

| ENDPOINT | Method | Params | URL Params | Success Response                                                                   | Error Response                                                               |
| -------- | ------ | ------ | ---------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| /posts   | `POST` | -      | -          | **Code:** 201 - Created <br/>**Content:** `{`<br/> `"post": [Post](#post)`<br/>`}` | **Code:** 400 Bad Request <br/>**Content:** `{ message: "<error message>" }` |

### Notes:

- **Params**: No path parameters are required.
- **URL Params**: None.
- **Success Response**: Returns the newly created post object, including a unique identifier and an empty comments array.
- **Error Response**: If there are missing fields or type validation errors, a 400 Bad Request is returned with a message detailing the specific issue:
  - Missing fields: If any required fields (`title`, `description`) are missing, the response message will indicate which fields are required.
  - Type validation: If fields are of the incorrect type, the response message will specify which fields must be strings.

### Request Body

The request body must contain the following properties with appropriate types:

| Key         | Type   | Required | Description                  |
| ----------- | ------ | -------- | ---------------------------- |
| title       | String | Yes      | The title of the post.       |
| description | String | Yes      | The description of the post. |

## Delete a Post by ID

| ENDPOINT   | Method   | Params | URL Params | Success Response                                                                       | Error Response                                                                         |
| ---------- | -------- | ------ | ---------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| /posts/:id | `DELETE` | `id`   | -          | **Code:** 200 OK <br/>**Content:** `{ message: "Post has been deleted successfully" }` | **Code:** 404 Not Found <br/>**Content:** `{ message: "Post with ID {id} not found" }` |

### Notes:

- **Params**: This API requires an `id` parameter to be passed as part of the URL path.
- **URL Params**: None beyond the ID specified in the path.
- **Success Response**: Indicates successful deletion of the post with a confirmation message.
- **Error Response**: If no post with the given ID exists, a 404 Not Found error is returned, specifying that the post could not be found.

## Add a Comment to a Post by Post ID

| ENDPOINT            | Method | Params | URL Params | Success Response                                                                                                           | Error Response                                                                                                                                                        |
| ------------------- | ------ | ------ | ---------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /posts/:id/comments | `POST` | `id`   | -          | **Code:** 201 Created <br/>**Content:** `{ message: "Comment has been added successfully", comment: [Comment](#comment) }` | **Code:** 404 Not Found <br/>**Content:** `{ message: "Post not found" }` <br/> Or <br/> **Code:** 400 Bad Request <br/>**Content:** `{ message: "<error message>" }` |

### Notes:

- **Params**: This API requires an `id` parameter to be passed as part of the URL path to identify the post to which the comment is being added.
- **URL Params**: None.
- **Success Response**: Returns the newly created comment object along with a success message.
- **Error Response**:
  - If the specified post ID does not exist, a 404 Not Found error is returned.
  - If there are missing required fields or type validation errors, a 400 Bad Request is returned with a message detailing the specific issue.

### Request Body

The request body must contain the following properties with appropriate types:

| Key      | Type   | Required | Description                    |
| -------- | ------ | -------- | ------------------------------ |
| username | String | Yes      | The username of the commenter. |
| comment  | String | Yes      | The content of the comment.    |

## Delete a Comment by Comment ID

| ENDPOINT            | Method   | Params | URL Params | Success Response                                                                          | Error Response                                                               |
| ------------------- | -------- | ------ | ---------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| /posts/comments/:id | `DELETE` | `id`   | -          | **Code:** 200 OK <br/>**Content:** `{ message: "Comment has been deleted successfully" }` | **Code:** 404 Not Found <br/>**Content:** `{ message: "Comment not found" }` |

### Notes:

- **Params**: This API requires an `id` parameter to be passed as part of the URL path to identify the comment to be deleted.
- **URL Params**: None.
- **Success Response**: Returns a message confirming that the comment has been successfully deleted.
- **Error Response**: If no comment with the given ID exists across any posts, a 404 Not Found error is returned.

<br />
<hr />

### Post Object Structure

Details the structure of a `Post` object returned by the API.

| Key         | Type                                   | Description                                                |
| ----------- | -------------------------------------- | ---------------------------------------------------------- |
| id          | String                                 | Unique identifier for the post.                            |
| title       | String                                 | Title of the post.                                         |
| description | String                                 | Detailed description of the post.                          |
| comments    | Array of [Comment](#comment-structure) | Array containing comment objects associated with the post. |

#### Comment Structure

[Back to Get All Posts](#get-all-posts-or-filter-posts-by-title) | [Back to Get a Single Post by ID](#get-a-single-post-by-id)

| Key      | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| id       | String | Unique identifier for the comment.    |
| username | String | The username of the comment's author. |
| comment  | String | The content of the comment.           |
