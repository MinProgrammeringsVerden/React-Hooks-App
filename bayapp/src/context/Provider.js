  import React , {createContext , useReducer}  from 'react';
  import {  USER_SIGNIN_REQUEST ,
          USER_SIGNIN_SUCCESS ,
            USER_SIGNIN_FAIL ,
          USER_REGISTER_REQUEST ,
          USER_REGISTER_SUCCESS ,
          USER_REGISTER_FAIL ,
          USER_LOGOUT, 
          USER_APPOINTMENT_REQUEST ,
          USER_APPOINTMENT_SUCCESS ,
          USER_APPOINTMENT_FAIL  
          } from '../constans/userConstans';

            
            
        
        
    
    

   






  const signInInitialState = {
      isSigning :'' , 
      userInfo :'' ,
      error :'' ,
      isSigned :''
    
  }





  const signInReduser = ( state , action ) => {

        switch (action.type ){
            case USER_SIGNIN_REQUEST :
              return{  ...state,
                 isSigning :true ,
                 error :false , 
                 isSigned :false
                }
                      
            case USER_SIGNIN_SUCCESS :
              return{ ...state , 
                  isSigning :false , 
                  error :false,
                  userInfo :action.payload  , 
                  isSigned :true
                }
              
            case USER_SIGNIN_FAIL :
              return{ ...state  , 
                  isSigning :false, 
                  error : action.payload }
            case USER_LOGOUT :
              return{ ...state  , 
                isSigning :false, 
                userInfo :'' , 
                isSigned :false
              
                }
              
            default :
             return state;
        }
    };


    const registerInitialState = {
        isRegistrering :'' , 
        userInfo :'' ,
        error :'' ,
       
     }
    
    
    
    
    
     const registerReduser = ( state , action ) => {
    
            switch (action.type ){
                case USER_REGISTER_REQUEST :
                  return{  ...state,
                     isRegistering :true ,
                     error :false }
                          
                case USER_REGISTER_SUCCESS :
                  return{ ...state , 
                      isRegistering :false , 
                      error :false,
                      userRegisterInfo :action.payload }
                  
                case USER_REGISTER_FAIL :
                  return{ ...state  , 
                      isRegistering :false, 
                      error : action.payload }
                default :
                 return state;
            }
        };
        
    
        const appointmentInitialState = {
            requesting :'' , 
            appointment :'' ,
            error :'' ,
           
         }
        
        
        
        
        
         const appointmentReduser = ( state , action ) => {
        
                switch (action.type ){
                    case USER_APPOINTMENT_REQUEST :
                      return{  ...state,
                        requesting :true ,
                         error :false }
                              
                    case USER_APPOINTMENT_SUCCESS :
                      return{ ...state , 
                        requesting:false , 
                          error :false,
                          appointment:action.payload }
                      
                    case USER_APPOINTMENT_FAIL :
                      return{ ...state  , 
                        requesting :false, 
                          error : action.payload }
                      
                    default :
                     return state;
                }
            };
            
        
       
    


export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {
   const[signinState , signinDispatch] = useReducer(signInReduser ,signInInitialState )
   const[registerState , registerDispatch] = useReducer(registerReduser ,registerInitialState )
   const[appointmentState , appointmentDispatch] = useReducer(appointmentReduser ,appointmentInitialState )
  return(
        <GlobalContext.Provider value = {{signinState , signinDispatch ,registerState , registerDispatch , appointmentState , appointmentDispatch} }>
             {children}
         </GlobalContext.Provider>
    );

};


