import React  , {useContext}  from 'react';
import {GlobalContext} from '../context/Provider.js'
import  {UserContext } from "../context/userContext/UserContext";




const Home = () => {


    const { user , setUser } = useContext(UserContext);
    console.log({user , setUser})


  



    return (

     <div className ='container'>
         {user.user? <div>You are Logged in </div> : <div>You are Logged out </div>}

    </div>
      );
     }
          
 
export default Home;

