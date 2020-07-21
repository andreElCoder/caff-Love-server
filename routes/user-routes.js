const express    = require('express');
const userRoutes = express.Router();
const User = require ('../models/user-model');
const { response } = require('express');
const Coffee = require('../models/coffee-model');
const mongoose = require('mongoose');
const { compare } = require('bcryptjs');

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
    
    userRoutes.delete('/username/:uid/delete-coffee/:id', (req, res) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.uid)) {
        res.status(400).json({ message: 'Specified id is not valid'});
      }
      User.findById(req.params.uid).then(user =>{
        console.log(user)
        const copyCoffees = user.coffees
        console.log(copyCoffees)
        const index=copyCoffees.findIndex(coffeeElement => coffeeElement._id==req.params.id)
        console.log(index)
        copyCoffees.splice(index,1)
        console.log(copyCoffees)
        user.coffees=copyCoffees
        console.log(user)
        User.findByIdAndUpdate(req.params.uid,user)
        .then(() =>{
            Coffee.findByIdAndDelete(req.params.id)
          .then((response) => {
            res.json({ message: response})
          })
          .catch(error => {
            res.status(500).json({ message: `Error occurred: ${error}`});
          });
          })
        }) 

      /*
      */
    });


module.exports = userRoutes