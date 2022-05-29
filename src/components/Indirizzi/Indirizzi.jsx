//* PAGINA DI INSERIMENTO INDIRIZZI E NUMERITELEFONO
//* Il form FormNumero è il componente esterno relativo al form dei numeri di telefono a cui passeremo delle prop

import React from "react";
import "./indirizzi.css";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import FormNumero from "../FormNumero";
import BtnCerca from "../Bottoni/BtnCerca";


const Indirizzi = () => {
    //* State per il toggle 
    const [disable, setDisable] = useState(true)

    //* Per il rendering condizionale
    const [dati, setDati] = useState(false);
    //* State del form indirizzi
    const [state, setState] = useState({
        nome: "",
        cognome: "",
    });
    //* State per il form numeri
    const [numeri, setNumeri] = useState([
        {
            tipologia: "FISSO",//* Devo scrivere il valore inziale di default
            numeroTelefono: "",
        },
    ]);

    //* Destrutturo il corpo della tabella indirizzi
    const { nome, cognome } = state;

    //* L'onChange relativo alla tabella indirizzi
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    //* Funzione che serve ad aggiungere dinamicamente l'input dei numeri di telefono
    const addNumeriForm = () => {
        setNumeri([...numeri, { tipologia: "FISSO", numeroTelefono: "" }]);
    };

    //* Funzione che constituisce l'onChange del FormNumeri
    const changeInputNum = (e, i) => {
        const { name, value } = e.target;
        const newNumeri = [...numeri];//* Faccio una copia dell'oggetto numeri e la metto in newNumeri
        newNumeri[i][name] = value;//* Prendo l'i-esimo valore dell'array copiato in newNumeri
        setNumeri(newNumeri);//* Setto lo state della variabile numeri con il valore inserito in newNumeri
    };


    //* Fetch di inserimento dei valori nel db
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:8000/indirizzi/insert`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                cognome: cognome,
                numeri,
            }),
        });
        const data = await res.json();
        setDati(data);
    };

    const handleDisable = () => {
        setDisable(!disable)
    }

    if (dati) return <Navigate to="/inserimentoSuccess" />;

    return (
        <div className='containerIndirizzi'>
            <div className="containerTitle">
                <h1>Inserimento Indirizzi</h1>
                <dir>
                    <button onClick={handleDisable}>{disable ? 'ABILITA' : 'DISABILITA'}</button>
                    <Link to='/cerca'>
                        <button><BtnCerca /></button>
                    </Link>
                </dir>
                
                
            </div>
            <form className="formindirizzi" onSubmit={handleSubmit}>
                <input
                    placeholder="Nome..."
                    name="nome"
                    value={nome}
                    onChange={handleChange}
                    required
                    disabled={disable}
                />
                <input
                    placeholder="Cognome..."
                    name="cognome"
                    value={cognome}
                    onChange={handleChange}
                    required
                    disabled={disable}
                />
                
                
                 {/* mappo i valori della variabile dello state 'numeri'
                 li passo come props al form FormNumero */}
                {numeri.map((elem, i) => {
                    return (
                        // Questo è il formnumeri che permette di inserire i numeri di telefono
                        <FormNumero
                            elem={elem} // Passo come prop
                            key={i}
                            i={i} // Passo come prop
                            handleChange={changeInputNum} // Passo come prop
                            disabled={disable} // Passo come prop
                        />
                    );
                })}
                
                <input 
                    type="button" 
                    value="AGGIUNGI NUMERO" 
                    onClick={addNumeriForm} 
                    disabled={disable}
                    />
                <button disabled={disable} className='inputButtonAdd'>Submit</button>
            </form>
        </div>
    );
};

export default Indirizzi;
