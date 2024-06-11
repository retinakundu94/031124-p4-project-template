import React from "react"


export default function Home({ currentUser }){
    console.log('currentUser is on Homepage:', currentUser);
    return (
        <div >
          {currentUser && (
            <div className="user-info">
              <span>Welcome, {currentUser.username}!</span>
            </div>
          )}
        </div>
      );
    }
