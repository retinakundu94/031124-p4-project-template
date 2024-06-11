import { useState } from "react"

function Signup({setCurrentUser}){
    //state
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState ('')
    const [age, setAge] = useState(0)
    
    //Event //
    
    function handleSubmit(e){
        e.preventDefault()

        fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({username, password, age})
          })
          .then(response => {
            if (response.ok) {
              response.json()
              .then(newUser => setCurrentUser(newUser) )
            } else {
              alert("Signup unsuccessful")
            }
          })
        }

    // this coverts the string to int
    const handleAgeChange = (e) => {
        const value = e.target.value;
        setAge(value === '' ? '' : parseInt(value, 10));
    };
    
    //Render
    
    return(
        <form className="user-form" onSubmit={handleSubmit}>

            <input 
            className='input-field'
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={username}
            placeholder='Username'
            />

            <input 
            className='input-field'
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            />

            <input 
            className='input-field'
            type="number"
            onChange = {handleAgeChange}
            value={age}
            placeholder='Age'
            />

            <input 
            type="submit"
            value="signup"
            />
        </form>
    )
}

export default Signup