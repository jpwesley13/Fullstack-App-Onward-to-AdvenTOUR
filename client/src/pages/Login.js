// import { useState } from "react";

// function Login({ onLogin }) {


//     return (
//         <h2>yay</h2>
//     )
// }

// export default Login;

import React from 'react'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function Login() {
    //states
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const {setTrainer} = useOutletContext();

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch('/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }, 
            body:JSON.stringify(
                {name, password}
            )
        })
        .then(res => {
            if (res.ok) {
                res.json()
                .then(data => setTrainer(data))
            } else{
                alert('Invalid username or password')
            }
        })
    }

  return (

    <form className='user-form' onSubmit={handleSubmit}>

    <h2>Login</h2>

    <input type="text"
    onChange={e => setName(e.target.value)}
    value={name}
    placeholder='username'
    />

    <input type="password"
    onChange={e => setPassword(e.target.value)}
    value={password}
    placeholder='password'
    />

    <input type="submit"
    value='Login'
    />

  </form>
  )
}