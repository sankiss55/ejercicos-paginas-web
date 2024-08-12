import React from 'react';

const Titulos = ({ id, rutaimagen, texto, parrafo, titulo,idboton }) => {
  return (
    <div id={id} className="titulos-container">
      <img src={rutaimagen} alt={texto} className="titulos-imagen" />
      <h1 className="titulos-texto">{texto}</h1>
      <p className="titulos-parrafo">{parrafo}</p>
      <button id={idboton} className="titulos-boton">{titulo}</button>
    </div>
  );
};

export default Titulos;
