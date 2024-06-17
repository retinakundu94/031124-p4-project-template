import {useState} from 'react'

function Login({setCurrentUser}){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    function handleSubmit(e){
        e.preventDefault()

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'},
            body: JSON.stringify({username, password})
          }).then(response => {
            if(response.ok) {
              response.json()
              .then(user => setCurrentUser(user))
            }else{
              alert('invalid username or password')
            }
          })
        }

    return (
        <div>
            <form className='form-container' onSubmit={handleSubmit}>

                <input 
                className='input-field' 
                type="text"
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder='username'
                />

                <input 
                className='input-field' 
                type="password"
                onChange = {e => setPassword(e.target.value)}
                value={password}
                placeholder='password'
                />

                <input 
                type="submit"
                value='Login'
                />
                
            </form>

        </div>
    )
}

export default Login