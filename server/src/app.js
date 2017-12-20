const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Post = require("../models/post");

mongoose.connect('mongodb://localhost:27017/posts');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection error"));
db.once('open', (callback) => {
  console.log("Connection succeeded!");
});

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  Post.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send({posts: data});
  }).sort({_id: -1});
});

app.post("/posts", (req, res) => {
  const db = req.db;
  const title = req.body.title;
  const description = req.body.description;
  
  const new_post = new Post({
    title: title,
    description: description
  });

  new_post.save((err) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send({
      success: true,
      message: "Post was created!"
    })
  })

})


app.listen(process.env.PORT || 3000 );
