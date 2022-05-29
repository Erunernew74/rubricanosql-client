import React from 'react'
import Indirizzi from '../Indirizzi/Indirizzi'
import VisualizzaContatti from '../VisualizzaContatti/index'

const Rubrica = () => {
  return (
    <div>
        <h1 
          style={{
              textAlign:'center',
              fontSize:'55px',
              margin: '35px 0'
            }}>
            Rubrica
        </h1>
        <Indirizzi />
        <VisualizzaContatti />
    </div>
  )
}

export default Rubrica