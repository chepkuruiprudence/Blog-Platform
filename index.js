const express = require('express');
const { PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get ('/', (_req, res) => {res.send('<h1> Start a Blog API</h1>')})

//Get all Users
app.get ("/users", async (req, res) => {
 try{
  const users = await prisma.user.findMany();
  res.json(users);
 } catch (error) {
  return req.status(500).json({message: "error getting user"})
 }
});


//Get user by ID
app.get("/users/:id", async (req, res) => {
 try{
  const user = await prisma.user.findUnique({
   where:{
    id: req.params.id
   },
   include: { posts: true},
  });

  if (!user) {
   return res.status (404).json({message: "User not found"})
  }
  res.json(user);
 } catch (error) {
   return res.status(500).json({message: "Could not get user"});
 }
});


//Create new user
app.post ("/users" , async (req, res) => {
 try{
  const { firstName, lastName, emailAddress, username} = req.body;
  const newUser = await prisma.user.create({
   data: {firstName, lastName, emailAddress, username},
  });
  res.json(newUser);
 } catch (error){
  // console.log("Error creating user:", error);
  return res.status(500).json
  ({message: "Error creating user. Please try again later."})
 }
});

//Get all posts
app.get("/posts", async (req, res) => {
 try{
  const posts = await prisma.post.findMany();
  res.json(posts);
 } catch (error) {
   return res.status(500).json
   ({message: "Could not find post"})
 }
});

// Get a specific post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { user: true },
    });
    res.json(post);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    console.log("Incoming POST data:", req.body);
    const newPost = await prisma.post.create({
      data: {
        Title: title,
        Content: content,
        userId: userId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Update a post
app.put("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        Title: title,
        Content: content,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not update post" });
  }
});

//Delete a given post
app.delete("/posts/:id", async (req, res) => {
  try{
    const deletedPost = await prisma.post.update({
      where: { id: req.params.id},
      data: {isDeleted: true},
    });
    res.json({message:"Post marked as deleted.", deletedPost })
  } catch (error){
    res.status(500).json({ message: "Could not delete post" });
  }
  
}
);

app.listen(port, () => {
 console.log(`Server listening on port ${port}`)
});