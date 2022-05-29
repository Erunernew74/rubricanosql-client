import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cerca.css";

const Cerca = () => {
  const [opzioniRicerca, setOpzioniRicerca] = useState({
    nome: "",
    cognome: "",
    tipologia: "",
    numeroTelefono: "",
  });

  const { nome, cognome, tipologia, numeroTelefono } = opzioniRicerca;

  const [risulatoRicerca, setRisultatoRicerca] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOpzioniRicerca({ ...opzioniRicerca, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //* Fetch che serve per effettuare l'update => POST
    const res = await fetch(`http://localhost:8000/indirizzi/search`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(opzioniRicerca),
    });

    const data = await res.json();

    setRisultatoRicerca(data.ris); //* metto data.ris perché è un array di oggetti che ha come nome iniziale dell'oggettone ris

    //setDati(res.ok);
  };

  return (
    <>
      <div className="containerBtn">
        <Link to="/rubrica">
          <button>RUBRICA</button>
        </Link>
      </div>
      <div className="containerCerca">
        <div className="formCerca">
          <h1>Cerca</h1>
          <form className="formindirizzi" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome..."
              name="nome"
              onChange={handleChange}
              value={nome}
            />
            <input
              type="text"
              placeholder="Cognome..."
              name="cognome"
              onChange={handleChange}
              value={cognome}
            />
            <input
              type="text"
              placeholder="Tipologia..."
              name="tipologia"
              onChange={handleChange}
              value={tipologia}
            />
            <input
              type="text"
              placeholder="Numero Telefono..."
              name="numeroTelefono"
              onChange={handleChange}
              value={numeroTelefono}
            />
            {/* <select
              type="text"
              placeholder="Tipologia..."
              name="tipologia"
              onChange={handleChange}
              value={tipologia}
            >
              <option value="FISSO">FISSO</option>
              <option value="CEL">CEL</option>
            </select> */}
            <button>CERCA</button>
          </form>
        </div>
        <div className="containerRisultati">
          <h1>Elenco risultati</h1>
          {/* {JSON.stringify(risulatoRicerca)} */}

          {
            //* Mappo i valori ottenuti dalla fetch di ricerca
            risulatoRicerca.map((ele, i) => {
              return (
                <div>
                  <Link to={`/update/${ele._id}`}>
                    <h4 style={{ textAlign: "left", paddingLeft: "30px" }}>
                      {i + 1} {ele.nome} {ele.cognome}
                    </h4>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default Cerca;
