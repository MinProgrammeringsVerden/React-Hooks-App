import React, { useContext , useEffect } from 'react';
import { GlobalContext } from '../context/Provider';
import  {UserContext } from "../context/userContext/UserContext";


 


const  Profile = (props) =>{
 
 //const {appointmentState , appointmentDispatch} = useContext(GlobalContext);
 //const {requestingAppontment, appointment , error } = appointmentState;
    const {user , setUser} = useContext(GlobalContext);
    const {signinState , signinDispatch} = useContext(UserContext);
     console.log('profile' , {signinState})
     console.log(user)



 









  
  
 
   
    return ( 
        
        <div className = 'profile-container'>

            
        </div>
    )
}
 
export default Profile;

