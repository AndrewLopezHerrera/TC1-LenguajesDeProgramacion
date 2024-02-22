import './App.css';
import React, { useState } from 'react';
import axios from "axios";
import imagen1 from "./resources/images/Imagen1.png";
import imagen2 from "./resources/images/Imagen2.png";
import imagen3 from "./resources/images/Imagen3.png";
import imagen4 from "./resources/images/Imagen4.png";
import imagen5 from "./resources/images/Imagen5.png";
import imagen6 from "./resources/images/Imagen6.png";
import imagen7 from "./resources/images/Imagen7.png";
import imagen8 from "./resources/images/Imagen8.png";

//Lógica de la interfaz gráfica
function RevisarNombreDos(){

}


//Interfaz gráfica

function VolverHistorialJuegos(){
  document.getElementById("PantallaHistorial").style.display = "none";
  document.getElementById("PantallaInicio").style.display = "flex";
}

function VerHistorialJuegos(){
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaHistorial").style.display = "flex";
}

function InsertarZonaJuego(){
  return (
    <div class = "PantallaJuego" style={{display: "none"}}>
      <div class = "CajaJuego">
        <div class = "CajaImagen">
          <InsertarCajaImagen />
        </div>
        <div class = "ZonaJuego">
          <InsertarBarraPalabra />
          <InsertarControlesJuego />
        </div>
      </div>
    </div>
  );
}

function InsertarBarraPalabra(){
  return (
    <div class = "BarraPalabra">

    </div>
  );
}

function InsertarControlesJuego(){
  return (
    <div class = "BarraControles">
      <input></input>
      <button>Aceptar</button>
      <button>Borrar</button>
    </div>
  );
}

function InsertarCajaImagen(){
  return(
    <img class = "ImagenAhorcador" src = {imagen1} />
  );
}

function InsertarTitulo(){
  return (
    <div class = "titulo">Ahorcado</div>
  );
}

function InsertarCuerpo(){
  return (
    <div class = "ContenedorPantalla">
      <InsertarTitulo />
      <AgregarPantallaJuego />
      <InsertarHistorialJuegos />
      <InsertarZonaJuego />
    </div>
  );
}

function InsertarHistorialJuegos(){
  return (
    <div id = "PantallaHistorial" class = "PantallaJuego" style = {{display: "none"}}>
      <h1 class = "TituloHistorial">Historial de Juegos</h1>
      <InsertarTabla />
      <InsertarBotonVolverHistorial />
    </div>
  );
}

function InsertarTabla(){
  return (
    <table id = "Historial" class = "TablaHistorial">
      <InsertarEncabezado />
      <tbody id = "CuerpoTabla" />
    </table>
  );
}

function InsertarBotonVolverHistorial(){
  return (
    <div class = "ContenedorBotonAceptarNombre">
      <button class = "BotonesInicio" onClick = {VolverHistorialJuegos}>Volver</button>
    </div>
  );
}

function InsertarEncabezado(){
  return (
    <thead class = "FilaTabla">
      <tr class = "FilaTabla">
        <td class = "cuadroTablaEncabezado">Número de Juego</td>
        <td class = "cuadroTablaEncabezado">Jugador 1</td>
        <td class = "cuadroTablaEncabezado">Jugador 2</td>
        <td class = "cuadroTablaEncabezado">Resultado</td>
        <td class = "cuadroTablaEncabezado">Ganador</td>
      </tr>
    </thead>
  );
}

function AgregarPantallaJuego(){
  return (
    <div id = "PantallaInicio" class = "PantallaJuego">
        <div style={{height: "50%"}} />
        <AgregarRegistradoresJugadores />
        <AgregarControlesInicio />
    </div>
  );
}

function AgregarRegistradoresJugadores(){
  return(
    <div class = "IngreseNombre">
      <AgregarRegistradorJugadorUno />
      <div class = "EspacioJugadores"></div>
      <AgregarRegistradorJugadorDos />
    </div>
  );
}

function AgregarRegistradorJugadorUno(){
  const [datos, setDatos] = useState({nombre: ""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/comprobarnombre', datos);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return(
    <div class = "NombreJugadores">
      <div class = "TituloJugador">
        Jugador 1
      </div>
      <div class = "SeccionEntradaNombres">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={datos.nombre}
            onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
            placeholder="Nombre"
          />
          <div class = "ContenedorBotonAceptarNombre">
            <button class = "BotonAceptarNombre" type="submit">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AgregarRegistradorJugadorDos(){
  return(
    <div class = "NombreJugadores">
      <div class = "TituloJugador">
        Jugador 2
      </div>
      <div class = "SeccionEntradaNombres">
        <input id = "NombreDos"></input>
      </div>
      <div id = "MensajeJugadorDos"></div>
      <div class = "ContenedorBotonAceptarNombre">
        <button class = "BotonAceptarNombre">Aceptar</button>
      </div>
    </div>
  );
}

function AgregarControlesInicio(){
  return(
    <div class = "contenedorBotonesInicio">
      <div class = "ContenedorBotonInicio">
        <button class = "BotonesInicio">Jugar</button>
      </div>
      <div class = "ContenedorBotonInicio">
        <button class = "BotonesInicio" onClick = {VerHistorialJuegos}>Ver historial de juego</button>
      </div>
    </div>
  );
}

function App() {
  document.getElementById("root").style.width = "100%";
  document.getElementById("root").style.height = "100%"
  return (
    <InsertarCuerpo />
  );
}

export default App;