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

var imagenes = [];

//Lógica de la interfaz gráfica
function ComprobarNombreUno(){
  const nombreUno = document.getElementById("NombreUno").value;
  const mensajeJugadorUno = document.getElementById("MensajeJugadorUno");
  if (nombreUno == ""){
    mensajeJugadorUno.textContent = "El nombre está vacío";
  }
  else{
    mensajeJugadorUno.textContent = "";
  }
  return nombreUno;
}

function ComprobarNombreDos(){
  const nombreDos = document.getElementById("NombreDos").value;
  const mensajeJugadorDos = document.getElementById("MensajeJugadorDos");
  if (nombreDos == ""){
    mensajeJugadorDos.textContent = "El nombre está vacío";
  }
  else{
    mensajeJugadorDos.textContent = "";
  }
  return nombreDos;
}

function EnviarNombres(nombreUno, nombreDos){
  const nombres = {nombreUno: nombreUno, nombreDos: nombreDos};
  axios.post("http://localhost:5000/iniciarjuego", nombres)
    .then(reponse => {
      console.log(reponse.data)
    })
    .catch(error => {
      console.error(error);
      return false;
    })
  return true;
}

function CargarImagenes(){
  imagenes = [
    imagen2,
    imagen3,
    imagen4,
    imagen5,
    imagen6,
    imagen7,
    imagen8
  ]
}

function IniciarRonda(){
  axios.get("http://localhost:5000/jugarronda")
    .then( response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
      return false;
    })
  CargarImagenes();
  return true;
}

function JugarAhorcado(){
  const nombreUno = ComprobarNombreUno();
  const nombreDos = ComprobarNombreDos();
  if(nombreUno !== "" && nombreDos !== "" && EnviarNombres(nombreUno, nombreDos) && IniciarRonda()){
    MostrarPantallaJuego();
  }
}

function EnviarLetra(){
  const letra = document.getElementById("EntradaLetra").value;
  const dato = {letra: letra}
  var resultado = "";
  axios.post("http://localhost:5000/comprobarletra", dato)
    .then( response => {
      console.log(response.data)
      resultado = response.data;
    })
    .catch(error => {
      console.error(error);
      return false;
    })
  
}

function AnalizarResultado(resultado){
  if(resultado === "Fallo"){

  }
}

function validarInput(input) {
  // Obtener el valor actual del input
  let valor = input.value.toLowerCase();

  // Remover caracteres no permitidos
  valor = valor.replace(/[^a-zñ]/g, '');

  // Actualizar el valor del input
  input.value = valor;
}

//Interfaz gráfica

//Pantalla de juego
function VolverPantallaInicio(){
  document.getElementById("PantallaHistorial").style.display = "none";
  document.getElementById("PantallaJuego").style.display = "none";
  document.getElementById("PantallaInicio").style.display = "flex";
}

function VerHistorialJuegos(){
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaHistorial").style.display = "flex";
}

function MostrarPantallaJuego(){
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaJuego").style.display = "flex";
}

function InsertarZonaJuego(){
  return (
    <div id = "PantallaJuego" class = "PantallaJuego" style={{display: "none"}}>
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
    <div id = "BarraPalabra" class = "BarraPalabra">

    </div>
  );
}

function InsertarControlesJuego(){
  return (
    <div class = "BarraControles">
      <input id='EntradaLetra' type = 'text' placeholder = 'Escribe la letra' onInput={validarInput(this)}></input>
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

//Historial de juegos.
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
      <button class = "BotonesInicio" onClick = {VolverPantallaInicio}>Volver</button>
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

//Pantalla de inicio
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
  return(
    <div class = "NombreJugadores">
      <div class = "TituloJugador">
        Jugador 1
      </div>
      <div class = "SeccionEntradaNombres">
        <input id = "NombreUno" type = "text" placeholder = 'Escribe el nombre'></input>
      </div>
      <div id = "MensajeJugadorUno"></div>
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
        <input id = "NombreDos" type = "text" placeholder = 'Escribe el nombre'></input>
      </div>
      <div id = "MensajeJugadorDos"></div>
    </div>
  );
}

function AgregarControlesInicio(){
  return(
    <div class = "contenedorBotonesInicio">
      <div class = "ContenedorBotonInicio">
        <button class = "BotonesInicio" onClick={JugarAhorcado}>Jugar</button>
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