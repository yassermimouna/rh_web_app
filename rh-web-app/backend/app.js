const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");

const candidatesRoutes = require("./routes/candidates");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();

mongoose.connect("mongodb+srv://yasser:VedrV6gz8v49goZG@cluster0.p98t1.mongodb.net/First-app?&w=majority")
.then(()=> {
  console.log('Connected to database !');
})
.catch(()=>{
  console.log('Connection failed !');
});

app.use("/images", express.static(path.join("backend/images")));

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT , DELETE, OPTIONS");
  next();
});

app.use("/api/candidates", candidatesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports =app;