const express = require('express');
const multer = require("multer");
const candidat = require('../models/candidat');

const Candidat = require('../models/candidat');
const router = express.Router();
/* const checkAuth = require("../middleware/check-auth"); */
/* const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
} */

/* const storage = multer.diskStorage({
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
}); */

router.post("" , (req,res,next)=> {
  const url = req.protocol + '://' +req.get("host");
  const candidat = new Candidat( {
    email: req.body.email,
    fullname: req.body.fullname,
    cin: req.body.cin,
    age: req.body.age,
    postId: req.body.postId
    });
  candidat.save().then(createdCandidat => {
   res.status(201).json({
     message: 'Apply added successfuly',
     post: {
       ...createdCandidat,
       id: createdCandidat._id
     }
   });
  });
});

/* router.put(
  "/:id", checkAuth,

  (req, res, next)=> {
   /*let imagePath = req.body.imagePath;
    if (req.file){
    const url = req.protocol + '://' +req.get("host");
    imagePath = url + "/images/"+ req.file.filename ;
   }*/
 /* const candidat = new candidat({
   _id: req.body.id,
   email: req.body.email,
   fullname: req.body.fullname,
   cin: req.body.cin,
   age: req.body.age
 });
 console.log(candidat);
});   */
router.get("", (req ,res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const candidatQuery = Candidat.find({postId: req.query.postId});

  let fetchedCandidates;
  if(pageSize && currentPage){
    candidatQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
 candidatQuery
 .then(documents => {
    fetchedCandidates = documents;
      return fetchedCandidates.length;
   })
   .then(count => {
    res.status(200).json({
      message:"Posts fetched successfuly ",
      candidates: fetchedCandidates,
      maxCandidates: count
 });
});
});

/* router.delete("/:id",checkAuth, (req,res, next)=> {
 Post.deleteOne({_id: req.params.id, creator : req.userData.userId}).then(result => {
  if(result.n > 0){
    res.status(200).json({ message : "Deletion successful !"});
   }else {
    res.status(401).json({ message : "not authorized"});
   }
 });

});*/
router.get("/:id",(req ,res, next)=> {
  Post.findById(req.params.id).then(joboffer => {
    if(joboffer){
      res.status(200).json(joboffer);
    }else {
      res.status(404).json({message: 'joboffer not found !'});
    }
  })
 });

 router.delete("/:id",(req,res, next)=> {
  Candidat.deleteOne({_id: req.params.id}).then(result => {
   if(result.n > 0){
     res.status(200).json({ message : "Deletion successful !"});
    }else {
     res.status(401).json({ message : "not authorized"});
    }
  });
 });



module.exports = router;
