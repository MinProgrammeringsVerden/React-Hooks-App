import React  , {useContext  }  from 'react';
import {Link  , useHistory  } from 'react-router-dom';
import  {UserContext }from "../context/userContext/UserContext";

const Nav = () => {

  const {user , setUser} = useContext(UserContext)
  console.log(user , 'NAV')
    const history = useHistory()


    const handleLogout = () => {
       localStorage.removeItem('auth-token')
         setUser ({
             token :undefined ,
             user : undefined
         })

    };



    return ( 
        <nav className ='navbar'>
            <div className='container'>
                <div>Logo</div>
                {user.user?
                    (<div><button onClick ={handleLogout}>Log out</button></div>)
                        :
                    (<div className='navbar-links'>
                            <ul>
                                <li>
                                    <Link to ={'/sign'}>Sign In</Link>
                                </li>
                                <li>
                                    <Link to ={'/register'}>Register</Link>
                                </li>
                            </ul>
                    </div>) }

            </div>
        </nav>
     );
}
 
export default Nav;