import React , {useState , useEffect , createContext}   from 'react';
import './App.css';
import {BrowserRouter ,Route , Switch } from 'react-router-dom';
import Nav from './Components/Nav';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import Register from './Components/Register';
import Home from './Components/Home';
import Cart from './Components/Cart';
import {GlobalProvider } from '../src/context/Provider';
import Axios from 'axios';
import {UserContext } from "./context/userContext/UserContext";

function App() {
    const [user , setUser] = useState({
                      token :undefined ,
                      user : undefined
                    })

    let token = localStorage.getItem('auth-token')
    console.log(token)
    useEffect (() => {

      const checkLoggedIn = async () => {
         let token = localStorage.getItem('auth-token')
          console.log(token)
          if (token === null){
              localStorage.setItem('auth-token' , '');
              token = '';
          };

          const tokenCheckResponse = await Axios.post('/tokenIsValid' ,{ header:{'x-auth-token' :token }})
          console.log(tokenCheckResponse , 'app');
          if (tokenCheckResponse){
              const data = await Axios.get('/user', {header:{'x-auth-token' :token }})
              console.log(data , 'App');
              setUser({
                  token  ,
                  user : data.user
              })
          }
      }
      checkLoggedIn();

    } , [ ]);


     return (
             <GlobalProvider>
                 <BrowserRouter>
                     <UserContext.Provider value={{user , setUser}}>
                         <Nav/>
                         <main className ='main'>

                             <Switch>
                                 <Route path ='/'  exact component={Home}/>
                                 <Route path ='/sign'  component={SignIn}/>
                                 <Route path ='/profile'   component={Profile}/>
                                 <Route path ='/cart'  component={Cart}/>
                                 <Route path ='/register'   component={Register}/>

                             </Switch>
                         </main>
                     </UserContext.Provider>
                 </BrowserRouter>
             </GlobalProvider>)



}



export default App;



