import React from 'react';
import './App.css';
import Titulos from './h1';
import luxury from './images/icon-luxury.svg'; 
import sedans from './images/icon-sedans.svg'; 
import suvs from './images/icon-suvs.svg'; 

function App() {
  return (
    <body>
    <div className="App">
<Titulos id="SEDANS"  rutaimagen={sedans} texto="SEDANS" parrafo="Choise a sedan for its affordability and excellent fuel economy.Ideal for cruising in the city or on your next road trip." titulo="Learn More"idboton="SEDANSb"/>

<Titulos id="SUVS" rutaimagen={luxury} texto="SUVS" parrafo="Take an SUV for its spacious interior,power, and versatility. perfect for your next family vacation and off-road adventures." titulo="Learn More" idboton="SUVSb"/>

<Titulos id="LUXURY" rutaimagen={suvs} texto="LUXURY" parrafo="cruise in the best car brands without the bloated prices. Enjoy the enhanced confort of a luxury rental and arrive in style" titulo="Learn More" idboton="LUXURYb"/>
    </div>
    </body>
  );
}

export default App;
