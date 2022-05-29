//* Pagina che ci permette di fare l'update dei valori nella nostra rubrica
//* QUI VISUALIZZO L'UTENTE E I SUOI DATI IN BASE ALL'ID SELEZIONATO

import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import BtnAbilita from "../Bottoni/BtnAbilita";
import BtnDisabilita from "../Bottoni/BtnDisabilita";
import FormNumero from "../FormNumero";
import "./index.css";

const Index = () => {
    //* State per il toggle
    const [disable, setDisable] = useState(true);

    //* Per il rendering condizionale
    const [dati, setDati] = useState(false);

    //* State per prendere il body della tabella indirizzi
    const [state, setState] = useState({
        nome: "",
        cognome: "",
    });

    //* State per prendere il body della tabella numeri
    const [numeri, setNumeri] = useState([
        {
            tipologia: "FISSO",
            numeroTelefono: "",
        },
    ]);

    const { id } = useParams();
    const { nome, cognome } = state;

    //* Questo useEffect mi fa caricare la pagina con i valori necessari per popolare gli input
    useEffect(() => {
        const getContatto = async () => {
            const res = await fetch(
                `http://localhost:8000/indirizzi/numeri/${id}`
            );

            const [contatto] = await res.json();
            //* Settiamo i valori della tabella Indirizzi
            setState({
                nome: contatto.nome,
                cognome: contatto.cognome,
            });
            //* Settiamo i valori della tabella NumeriTelefono
            setNumeri(contatto.numeri);
        };

        getContatto();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const addNumeriForm = () => {
        setNumeri([...numeri, { tipologia: "FISSO", numeroTelefono: "" }]);
    };

    const changeInputNum = (e, i) => {
        const { name, value } = e.target;
        const newNumeri = [...numeri];
        newNumeri[i][name] = value;
        setNumeri(newNumeri);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({
            nome: nome,
            cognome: cognome,
            numeri,
        });

        //* Fetch che serve per effettuare l'update
        const res = await fetch(
            `http://localhost:8000/indirizzi/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    cognome: cognome,
                    numeri,
                }),
            }
        );
        const data = await res.json();
        setDati(res.ok);
    };

    const handleToggle = () => {
        setDisable(!disable);
    };

    if (dati) return <Navigate to="/updateSuccess" />;

    return (
        <div className="containerIndexUpdate">
            <div className="btnContainerAddIndex">
                <Link to="/rubrica">
                    <button>RUBRICA</button>
                </Link>
                <div onClick={handleToggle}>
                    {disable ? <BtnAbilita /> : <BtnDisabilita />}
                </div>
            </div>

            <form className="formindirizzi" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome..."
                    name="nome"
                    value={state.nome}
                    onChange={handleChange}
                    required
                    disabled={disable}
                />
                <input
                    type="text"
                    placeholder="Cognome..."
                    name="cognome"
                    value={state.cognome}
                    onChange={handleChange}
                    required
                    disabled={disable}
                />
                {/* Faccio questa map per vedere i numeri associati all'inidirizzo */}
                {/* Passeremo dei valori come prop al componente FormNumero.jsx*/}
                {numeri.map((elem, i) => {
                    return (
                        <FormNumero
                            elem={elem} // Lo passeremo come prop
                            key={i}
                            i={i} // Lo passeremo come prop
                            handleChange={changeInputNum} // Lo passeremo come prop
                            disabled={disable} // Glielo passo come porp
                        />
                    );
                })}
                <input
                    type="button"
                    value="AGGIUNGI NUMERO"
                    onClick={addNumeriForm}
                    disabled={disable}
                    className="inputButtonAdd"
                />
                <button disabled={disable} className="btnSubmitUpdate">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Index;
