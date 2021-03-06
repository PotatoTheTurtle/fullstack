const express = require("express");
const mongoBlog = require("../models/mongo");
const mongoUsers = require("../models/mongousers");
const jwt = require("jsonwebtoken");
const expressRouter = express.Router();



expressRouter.get('/', async (request, response) => {
  const result = await mongoBlog.find({}).populate("user", {blogs: 0});   //Find all blogs, empty means all

  response.json(result.map(blog => blog))
});

expressRouter.post('/', async (request, response) => {
  if((request.body.title === undefined) || (request.body.url === undefined)){
    return response.status(400).send({error: "Bad Request"})
  }
  const decodedtoken = jwt.decode(request.token, "test");

  if(!(decodedtoken.username || request.token)){
    return response.status(400).send({error: "missing or invalid token"})
  }

  const user = await mongoUsers.findOne({username: decodedtoken.username});

  if(request.body.likes === undefined){
    request.body.likes = 0
  }

  const newblog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id
  };

  const blog = new mongoBlog(newblog);
  const saved = await blog.save();
  user.blogs = user.blogs.concat(saved._id);
  await user.save();
  const populatedblogs = await blog.populate("user", {passwordHash: 0, __v: 0, blogs: 0}).execPopulate()
  response.json(populatedblogs.toJSON())
});

expressRouter.delete('/:id', async (request, response) => {
  const decodedtoken = jwt.decode(request.token, "test");

  if(!decodedtoken.username){
    return response.status(400).send({error: "missing or invalid token"})
  }


  await mongoBlog.findByIdAndDelete(request.params.id)
    .catch(error => response.status(400).send({error: error.message}));

  response.status(204).end()
});

expressRouter.put('/:id', async (request, response) => {
  const likes = {likes: request.body.likes};

  const updated = await mongoBlog.findByIdAndUpdate(request.params.id, likes, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .catch(error => response.status(400).send({error: error.message}));

  const populateupdated = await updated.populate("user", {passwordHash: 0, __v: 0, blogs: 0}).execPopulate();
  response.status(200).json(populateupdated.toJSON())

});

expressRouter.put('/:id/comments', async (request, response) => {
  const comments = {comments: request.body.comments};

  const updated = await mongoBlog.findByIdAndUpdate(request.params.id, comments, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .catch(error => response.status(400).send({error: error.message}));
  const populateupdated = await updated.populate("user", {passwordHash: 0, __v: 0, blogs: 0}).execPopulate();
  response.status(200).json(populateupdated.toJSON())
});

module.exports = expressRouter;