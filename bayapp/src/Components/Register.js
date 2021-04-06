import React, {  useState, useEffect, useContext } from 'react';
import {  USER_REGISTER_REQUEST ,USER_REGISTER_SUCCESS ,USER_REGISTER_FAIL } from '../constans/userConstans';
import  {UserContext } from "../context/userContext/UserContext";
import {GlobalContext} from '../context/Provider.js'
import Axios from 'axios';
import {useHistory  } from 'react-router-dom';






const Register = (props) => {
    const [name , setName] = useState ('');
    const [surname , setSurname] = useState ('');
    const [email , setEmail] = useState ('')
    const [password , setPassword] = useState ('');
    const [mobile , setMobile] = useState ('');

    const {registerState , registerDispatch} = useContext(GlobalContext);
    const {signinState , signinDispatch} = useContext(GlobalContext);
    const {user , setUser} = useContext(UserContext);
    const {isSigning, userInfo, error } = signinState;
    const {isRegistering, userRegisterInfo } = registerState;
    console.log({isSigning, userInfo, error })
    const history = useHistory()

   
   



    

    const submitHandler = async (e) => {
        
         e.preventDefault();


       registerDispatch ({type : USER_REGISTER_REQUEST,  payload:{name, surname , mobile ,email, password}})
        try{
             const {data}= await Axios.post("/register", { name, surname , mobile ,email, password})
              console.log({data} , 'register')
            registerDispatch ({type : USER_REGISTER_SUCCESS , payload: data  });

        } catch(error){

            registerDispatch({type :  USER_REGISTER_FAIL  , payload: error.message})
        }
         history.push('/sign')
        }
           
 
   
   return (
      <div className ="register-container">
            <h2>Register</h2>

           <form onSubmit={submitHandler}>
               <input type ="text" placeholder="name"  value={name} onChange={e => setName(e.target.value)} />
               <input   type ="text" placeholder="surname"  value={surname}  onChange={e =>setSurname(e.target.value)} />
               <input   type ="text" placeholder="mobile"  value={mobile}  onChange={e =>setMobile(e.target.value)} />
               <input type ="text" placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} />
               <input   type ="text" placeholder="password"  value={password}  onChange={e =>setPassword(e.target.value)} />
             
               <button type ="submit">Send</button>
           </form>


        </div>)
}
 
export default Register;