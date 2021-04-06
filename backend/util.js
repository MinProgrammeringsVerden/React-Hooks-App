import jwt from 'jsonwebtoken'
import config from './config'

const privatKey = config.SECRET_KEY

const getToken = (signInUser  => {
   return jwt.sign({
        _id : signInUser._id ,
        email: signInUser.email, 
       } ,  privatKey , {expiresIn :'1h'})

}) ;


   
export {getToken };