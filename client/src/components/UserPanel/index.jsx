// UserPanel.jsx
import React, { useContext } from 'react';
import Signup from './Signup';
import Login from './Login';
import CurrentUserContext from '../CurrentUserContext'

function UserPanel() {
    
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return (
      <div className='login-signup-container'>
        <div className='login-container'>
          <h2>Login</h2>
          <Login setCurrentUser={setCurrentUser} />
        </div>
        <div className='signup-container'>
          <h2>Signup</h2>
          <Signup setCurrentUser={setCurrentUser} />
        </div>
      </div>
    )
  } 
}

export default UserPanel;
