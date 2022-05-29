import React from "react";
import './register.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState(false)
  const [state, setState] = useState({
    nome: '',
    cognome: '',
    email: '',
    username: '',
    password: '',
    passwordVerify:''
  })

  const { nome, cognome, email, username, password, passwordVerify } = state
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({...state, [name]: value})
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/auth/register`,{
      method:'POST',
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        email: email,
        username: username,
        password: password,
        passwordVerify: passwordVerify
      })
    })
    const data = await res.json()
    setData(data)
  }
  if(data) return <Navigate to='/registerSuccess' />
  return (
    <>
      <div className="containerRegister">
          <h1 className="container containerH1">Form di registrazione</h1>
        <form className="formindirizzi" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Nome..." 
              name='nome'
              value={nome}
              onChange={handleChange}
              required
              />
            <input 
              type="text" 
              placeholder="Cognome..." 
              name='cognome'
              value={cognome}
              onChange={handleChange}
              required
              />
            <input 
              type="text" 
              placeholder="Email..." 
              name='email'
              value={email}
              onChange={handleChange}
              required
              />
            <input 
              type="text" 
              placeholder="Username..." 
              name='username'
              value={username}
              onChange={handleChange}
              required
              />
            <input 
              type="password" 
              placeholder="Password..." 
              name='password'
              value={password}
              onChange={handleChange}
              required
              />
            <input 
              type="password" 
              placeholder="Confirm password..." 
              name='passwordVerify'
              value={passwordVerify}
              onChange={handleChange}
              required
              />
            <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
