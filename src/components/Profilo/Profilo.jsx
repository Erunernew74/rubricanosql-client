import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import './profilo.css'

const Profilo = () => {
  const [userData, setUserData] = useState({});
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const setData = async () => {
      const cookie = Cookies.get("user");
      const user = JSON.parse(cookie);
      setUserData(user);
    };
    setData();
  }, []);

  const handleDisabled = () => {
    setDisabled(!disabled)
  }

  return (
    <div className='profileContainer'>
      <h1>Profilo</h1>
      <button onClick={handleDisabled}>{disabled ? 'ABILITA' : 'DISABILITA'}</button>
      <div className="containerProfile">
        <label>Nome</label>
        <input type="text" value={userData.nome} disabled={disabled}/>
        <label>Cognome:</label>
        <input type="text" value={userData.cognome} disabled={disabled}/>
        <label>Email:</label>
        <input type="text" value={userData.email} disabled/>
        <label>Username</label>
        <input type="text" value={userData.username} disabled={disabled}/>
      </div>
    </div>
  );
};

export default Profilo;
