//* Pagina per visualizzare tutti gli indirizzi con i numeri di telefono a loro associati della rubrica
//* QUESTO COMPONENTE LO PASSAEREMO IN Rubrica.jsx

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './visualizzaContatti.css'

const Index = () => {
    //* State per andare a visualizzare i dati richiesti al server che poi andremo a mappare sulla
    //* variabile contatti dello state
    const [contatti, setContatti] = useState([]);

    //* Con questo useEffect faccio la richiesta al server di darmi i valori della tabella indirizzi e numeri PERCHE' NELLA ROTTA
    //* ABBIAMO MESSO .populate(numeri) E DUNQUE VENGONO PRESI ANCHE I NUMERI ASSOCIATI AD OGNI INDIRIZZO
    //* nel momento in cui viene caricata la pagina
    useEffect(() => {
        const getContatti = async () => {
            const res = await fetch("http://localhost:8000/indirizzi/numeri");

            const data = await res.json();

            setContatti(data);
        };

        getContatti();
    }, []);
    return (
        <div>
            {/* Cicliemo i valori della variabile dello state per visualizzare gli indirizzi */}
            {contatti.map((e, i) => {
                return (
                    <div key={i} className='containerContatti'>
                        <div className='dettagliNome'>
                            <h1>
                                {i+1}) {e.nome} {e.cognome}
                            </h1>
                        </div>

                        {/* mappatura annidata sui valori della tabella 'numeri' così potrò vedere i numeri
                        di telefono associati agli indirizzi*/}
                        <div>
                           {e.numeri.map((num, i) => {
                            return (
                                <div>
                                    <h2 key={i} className="dettagliNumeri">
                                        {num.numeroTelefono} ({num.tipologia})
                                    </h2>
                                </div>
                            );
                        })} 
                            {/* Questo Link mi permette di saltare alla pagina specifica dell'id */}
                            <Link to={`/update/${e._id}`}>
                                <button className='btnUpdate'>UPDATE</button>
                            </Link> 
                        </div>
                        
                         
                    </div>
                );
            })}
            
        </div>
    );
};

export default Index;
