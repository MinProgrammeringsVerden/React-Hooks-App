import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/userModel';
import {getToken  } from './util';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';





dotenv.config();
const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl , {useNewUrlParser:true ,  useUnifiedTopology: true , useCreateIndex :true} , console.log('connected to mangodb')).catch(error => console.log(error.reason))
mongoose.connection.on('connected' , () => {
    console.log('mongoose is connected !!!!!')
})


const app = express();
const port = 8080
app.use(bodyParser.json());
app.use(morgan('dev'))

//app.use('/api/users' , userRoute )





   app.post('/signin' ,   async(req , res) => {

     const signInUser = await User.findOne({
        email: req.body.email , 
        password: req.body.password
    });
    if (signInUser !== null){
        res.send({
            _id : signInUser._id ,
            name:signInUser.name ,
            token: getToken(signInUser)
        }) ;  
      
    }else {
       res.status(401).send('sorry could not find User')
     }
    });



    app.post('/register' , async (req , res) => {
    const user = new User({
        name:req.body.name,
        surname:req.body.surname,
        mobile:req.body.mobile,
        email:req.body.email, 
        password :req.body.password,
        
    });
 const newUser = await user.save()
    if( newUser){
    res.send(newUser) 
    
    }else {
    res.send('Error from signin')
    }
});

    app.get('/user' ,  async(req , res) => {
        const user = await User.findOne()
        if (user) {
            res.send(user)
        } else {
            res.send('cant find any users')
        }
    })



    app.post('/tokenIsValid' ,  async(req , res) => {

          try{
              const token = req.header("x-auth-token")

              if (!token ) {
                  return res.json(false)
              };
              const verified= jwt.verify(token , privatKey)
              if (!verified) {
                  return res.json(false)
              };
              console.log(verified)

              const user = await User.findById(verified.id)
              if(!user) {
                  return res.json(false)
              } return res.json(true )


          } catch (error){

          console.log(error)
              res.status(500).json({error:error.message})

          }


  
 });

  app.listen(port , () => {
    console.log (`Server listen at port ${port}`)
})
