const express    = require('express');
const userRoutes = express.Router();
const User = require ('../models/user-model');


userRoutes.get('/searchUser',(req,res)=>{

User.find({"username": { "$regex": req.body.search, "$options": "i" }},{"username":1})
  .then(response =>{
    res.status(200).json(response)
  })
})

module.exports = userRoutes