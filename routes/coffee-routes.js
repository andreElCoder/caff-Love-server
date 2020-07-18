const express    = require('express');
const coffeeRoutes = express.Router();
const Coffee = require('../models/coffee-model')
const User = require ('../models/user-model');
const mongoose = require('mongoose');
const uploadCloud = require('../configs/cloudinary.js');

coffeeRoutes.get('/coffees' ,(req,res)=>{
    Coffee.find()
    .then(coffees =>{
        if(coffees)
        res.status(200).json(coffees)
        else{res.status(404).json({message: "No coffee found"})}
    })
    .catch(err =>{
        res.status(400).json({message: "Something went wrong, " + err})
    })
})

coffeeRoutes.get('/coffees/:username' ,(req,res)=>{

    User.find({"username": req.params.username})
    .then(responseFromAPI =>{
        if(responseFromAPI){
        res.status(200).json(responseFromAPI)
    }
        else{res.status(404).json({message: "No coffee found"})}
    })
    .catch(err =>{
        res.status(400).json({message: "Something went wrong, " + err})
    })
})

coffeeRoutes.get('/coffee-detail/:id' ,(req,res)=>{
    Coffee.findById(req.params.id)
    .then(coffee =>{
        if(coffee)
        res.status(200).json(coffee)
        else{res.status(404).json({message: "No coffee found"})}
    })
    .catch(err =>{
        res.status(400).json({message: "Something went wrong, " + err})
    })
})

coffeeRoutes.get('/search-coffee',(req,res)=>{

    Coffee.find({"name": { "$regex": req.body.search, "$options": "i" }},{"name":1})
      .then(response =>{
        res.status(200).json(response)
      })
    })

coffeeRoutes.post('/add-coffee' ,(req,res)=>{
    Coffee.create({
        name: req.body.name,
        description:req.body.description,
        url:req.body.url,
        rating:req.body.rating,
        markers:req.body.markers
    })
    .then(response =>{
        User.findOneAndUpdate(req.body.username,{
            $push:{coffees:response._id}
        }).then(()=>{
            res.status(200).json(response)
        })    
        .catch(err =>{
            res.status(404).json({message: "Something went wrong, when associating the coffee to the user " + err})
        })
    })
    .catch(err =>{
        res.status(400).json({message: "Something went wrong, when adding the coffee " + err})
    })
})

coffeeRoutes.put('/edit-coffee/:id' ,(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid'});
      }
    Coffee.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description:req.body.description,
        url:req.body.url,
        rating:req.body.rating,
        markers:req.body.markers
    }).then(coffee =>{
        if(coffee)
        res.status(200).json(coffee)
    })
})
    
coffeeRoutes.delete('/delete-coffee/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid'});
    }
  
    Coffee.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.json({ message: response})
      })
      .catch(error => {
        res.status(500).json({ message: `Error occurred: ${error}`});
      });
  });

coffeeRoutes.post('/images/create', (req, res, next) => {
  
    Image.create(req.body)
      .then(newImage => {
        res.status(200).json(newImage);
      })
      .catch(err => next(err));
  });
  
  coffeeRoutes.post('/upload-coffee', uploadCloud.single("url"), (req, res, next) => {
      res.json({ url: req.file.secure_url });
  })

module.exports = coffeeRoutes