//* Questo è il form di inserimento dei numeri di telefono che poi metteremo come componente nella
//* pagina Indirizzi.jsx

import React from "react";
import './formNumero.css'

//* RICEVO LE PROP DA Indirizzi.jsx
const FormNumero = ({ elem, i, handleChange, disabled }) => {
    return (
        <div>
            <input
                type="number"
                placeholder="Numero..."
                name="numeroTelefono"
                value={elem.numeroTelefono}
                onChange={(e) => handleChange(e, i)}
                disabled={disabled} // Passo la funzione o prop disabled alla proprietà disabled dell'input
            />
            <select
                className="labelFormNumero"
                value={elem.tipologia}
                name="tipologia"
                onChange={(e) => handleChange(e, i)}
                disabled={disabled}
            >
                <option value="FISSO">FISSO</option>
                <option value="CEL">CEL</option>
            </select>
        </div>
    );
};

export default FormNumero;
