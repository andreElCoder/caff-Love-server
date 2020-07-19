const express    = require('express');
const userRoutes = express.Router();
const User = require ('../models/user-model');
const { response } = require('express');
const Coffee = require('../models/coffee-model');


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

userRoutes.get('/username/:id/coffees' ,(req,res)=>{
  

  User.findById(req.params.id)
  .then(user =>{
      
      if(user){
        let coffeesToBeRetrived = []
        user.coffees.forEach(coffee => {
          Coffee.findById(coffee)
          .then(coffeeFound =>{
            
            coffeesToBeRetrived.push(coffeeFound)
            console.log(coffeesToBeRetrived)
            if(coffeesToBeRetrived.length===user.coffees.length){
              res.status(200).json(coffeesToBeRetrived)
            }
            }) 
          });
          
        }
      })
      
    })  
module.exports = userRoutes