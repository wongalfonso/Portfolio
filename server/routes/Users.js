const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Kyus = require("../models/Kyus");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("yes");
})

router.post("/signup", (req, res, next) => {
  if (req.body.username && req.body.password && req.body.date) {
    let username = req.body.username;
    let password;    
    let date = req.body.date
    console.log(date)
    bcrypt.genSalt(10, (err, salt) => {
      
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) console.log("ERROR", err);
        password = hash;
        const userData = {
          username: username,
          password: password
        }
        User.create(userData, (err, user) => {
          if (err) {
            return res.status(401).send(err)
          } else {
            newKyus = new Kyus({
              "kyuType" : "8 kyu", 
              "name" : "My First Kyu", 
              "instructions" : "post how the instructions of a kyu here", 
              "thinking" : "Post your thought process here", 
              "answer" : "Post how you got the answer", 
              "user" : user._id, 
              "created" : date})
            newKyus.save((err, kyu) => {
              console.log(kyu);
              if (err) {
                console.log(err) 
                return res.status(500).send(err)
              }
              user.dateCreated = date
              user.challenges.push(kyu);

              return res.status(201).send(user);
            })            
          }
        })
      })            
    })    
  }
})

router.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let date = req.body.date;
    User.findOne({ username: username })
      .exec((err, user) => {
        if (err) {
          const error = new Error("User Not Found!");
          return res.status(402).send(error)
        } else if (!user) {
          const error = "User Not Found!";          
          return res.status(401).send(error);
        }
        const id = {"user" : user._id}        
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {      
            Kyus.find(id).then(kyus => {
              kyus.map((kyu) => {
                user.challenges.push(kyu)
              })                         
              user.lastLogin = date;
              return res.send(user);
            })
            .catch(err => {              
              res.status(500).send(err);
            })                         
          } else {
            const error = new Error("Wrong Password");
            return res.status(406).send(error)
          }                    
        })
      })
  
})

module.exports = router;