const express = require('express');
const multer = require("multer");

const Post = require('../models/post');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid){
      error = null;
    }
    cb(error,"backend/images");
  },
  filename:(req, file, cb) => {
    const name = file.originalname.toLowerCase().split('').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '-' + ext);
  }
});

router.post("" ,checkAuth ,(req,res,next)=> {
  const url = req.protocol + '://' +req.get("host");
  const post = new Post( {
  jobtitle : req.body.jobtitle,
  description: req.body.desc,
  skills: req.body.skills,
  exp: req.body.exp,
  creator :  req.userData.userId
  });
  post.save().then(createdPost => {
   res.status(201).json({
     message: 'Post added successfuly',
     post: {
       ...createdPost,
       id: createdPost._id
     }
   });
  });
});

router.put(
  "/:id", checkAuth,

  (req, res, next)=> {
   /*let imagePath = req.body.imagePath;
    if (req.file){
    const url = req.protocol + '://' +req.get("host");
    imagePath = url + "/images/"+ req.file.filename ;
   }*/
 const post = new Post({
   _id: req.body.id,
   jobtitle: req.body.jobtitle,
   description: req.body.description,
   skills: req.body.skills,
   exp: req.body.exp,
   creator: req.userData.userId
 });
 console.log(post);
 Post.updateOne({_id: req.params.id, creator : req.userData.userId},post).then(result => {
   if(result.nModified > 0){
    res.status(200).json({ message : "Update successful !"});
   }else {
    res.status(401).json({ message : "not authorized"});
   }
 })
});

router.get("", (req ,res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
      postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
 postQuery
 .then(documents => {
      fetchedPosts = documents;
      return Post.count();
   })
   .then(count => {
    res.status(200).json({
      message:"Posts fetched successfuly ",
      posts: fetchedPosts,
      maxPosts: count
 });
});
});

router.get("/:id",(req ,res, next)=> {
 Post.findById(req.params.id).then(post => {
   if(post){
     res.status(200).json(post);
   }else {
     res.status(404).json({message: 'Post not found !'});
   }
 })
});

router.delete("/:id",checkAuth, (req,res, next)=> {
 Post.deleteOne({_id: req.params.id, creator : req.userData.userId}).then(result => {
  if(result.n > 0){
    res.status(200).json({ message : "Deletion successful !"});
   }else {
    res.status(401).json({ message : "not authorized"});
   }
 });

});

module.exports = router;
