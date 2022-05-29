import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthComponent";
import './login.css'

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const { email, password } = state;

  const { isAuth, setIsAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/auth/login`,  {
      method: 'POST',
      credentials:"include",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email, email,
        password: password
      })
    })
    setIsAuth(res.ok)
  }

  if(isAuth) return <Navigate to='/loginSuccess' />
  return (
    <div className="containerLogin">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="formindirizzi">
        <input
          type="text"
          placeholder="Email..."
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password..."
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
