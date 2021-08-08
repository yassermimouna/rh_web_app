const express = require('express');
const app = express();

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts',(req,res,next)=> {
  
});

app.use("/api/posts", (req ,res, next) => {
  const posts = [
    {id : "4070",
    title: "First post",
    content: "This is the first port"
    },
    {id : "4071",
    title: "Second post",
    content: "This is the second port!"
    }
  ];
res.status(200).json({
    message:"Posts fetched successfuly ",
    posts:posts
  });
});
module.exports =app;