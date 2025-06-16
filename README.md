# Blogging Platform API

This is a simple blogging platform ,which allows users to create, read, update, and delete blog posts.

The API is built using Restful principles.

## Technologies Used

- **Node.js**
- **Express.js** for server and route handling.
- **Prisma ORM** for database interactions.
- **PostgreSQL** as the database.
- **Render** for deployment.

| Http Method | Endpoint   | Description                                                                           |
| ----------- | ---------- | ------------------------------------------------------------------------------------- |
| GET         | /users     | Get all users                                                                         |
| GET         | /users/:id | Retrieve a specific user by their ID, including all blog posts authored by that user. |
| POST        | users      | Create a new user                                                                     |
| GET         | /posts     | Get all posts                                                                         |
| GET         | /posts/:id | Get a specific post                                                                   |
| POST        | /posts     | Create a new post                                                                     |
| PUT         | /posts/:id | Update a post                                                                         |
| DELETE      | /posts/:id | Delete a blog post by ID                                                              |

![Blog API Cover](assets\Blog_example.png)
