import React, {  useState, useEffect, useContext } from 'react';
import {GlobalContext} from '../context/Provider.js'
import  {UserContext } from "../context/userContext/UserContext";
import Axios from 'axios';
import {  USER_SIGNIN_REQUEST ,
  USER_SIGNIN_SUCCESS ,
  USER_SIGNIN_FAIL } from '../constans/userConstans';
  import { useHistory  } from 'react-router-dom';






const SignIn = () => {
    const [email , setEmail] = useState ('')
    const [password , setPassword] = useState ('')

    const {signinState , signinDispatch} = useContext(GlobalContext);
    const {user , setUser} = useContext(UserContext);
    const {isSigning, userInfo, error } = signinState;
    const history = useHistory()







    const submitHandler = async (e) => {
         e.preventDefault();


       signinDispatch ({type : USER_SIGNIN_REQUEST,  payload:{email , password}})
        try{
          const data= await Axios.post("/signin", { email, password})
          console.log(data)
       signinDispatch ({type : USER_SIGNIN_SUCCESS , payload: data  })


            setUser({
                token :data.data.token ,
                user :data.data.name
            })
            console.log(data.data.token, 'sign in')
            console.log(data.data.name , 'sign in')

            localStorage.setItem('auth-token' ,data.data.token);
            history.push('/')
      } catch(error){
        signinDispatch({type : USER_SIGNIN_FAIL , payload: error.message})
      }
        }
           
 
   
   return (
      <div className ="signin-container">

          
            <h2>Sign In </h2>
           <form onSubmit={submitHandler}>
               <input type ="text" placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} />
               <input   type ="text" placeholder="password"  value={password}  onChange={e =>setPassword(e.target.value)} />
               <button type ="submit">Send</button>
           </form>


        </div>)
}
 
export default SignIn;


