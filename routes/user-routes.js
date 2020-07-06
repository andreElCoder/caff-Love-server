const express    = require('express');
const userRoutes = express.Router();
const User = require ('../models/user-model');
const { response } = require('express');


userRoutes.get('/searchUser',(req,res)=>{

User.find({"username": { "$regex": req.body.search, "$options": "i" }},{"username":1})
  .then(response =>{
    res.status(200).json(response)
  })
})

userRoutes.get('/profile',(req,res)=>{
  User.find({"username": req.body.username})
  res.status(200).json(response)
})



module.exports = userRoutes