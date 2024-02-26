import './App.css';
import React from 'react';
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
var ronda = 0;

//Lógica de la interfaz gráfica

/**
 * Comprueba que el nombre del jugador uno no sea vacío.
 * @returns {string} El nombre del jugador uno.
 */
function ComprobarNombreUno(){
  const nombreUno = document.getElementById("NombreUno").value;
  const mensajeJugadorUno = document.getElementById("MensajeJugadorUno");
  if (nombreUno === ""){
    mensajeJugadorUno.textContent = "El nombre está vacío";
  }
  else{
    mensajeJugadorUno.textContent = "";
  }
  return nombreUno;
}

/**
 * Comprueba que el nombre del jugador dos no sea vacío.
 * @returns {string} El nombre del jugador dos.
 */
function ComprobarNombreDos(){
  const nombreDos = document.getElementById("NombreDos").value;
  const mensajeJugadorDos = document.getElementById("MensajeJugadorDos");
  if (nombreDos === ""){
    mensajeJugadorDos.textContent = "El nombre está vacío";
  }
  else{
    mensajeJugadorDos.textContent = "";
  }
  return nombreDos;
}

/**
 * Envía los nombres de lo jugadores al servidor.
 * @param {string} nombreUno El nombre del jugador uno.
 * @param {string} nombreDos El nombre del jugador dos.
 * @returns {boolean} True si los jugadores fueron aceptados, false si los jugadores no fueron aceptados.
 */
function EnviarNombres(nombreUno, nombreDos){
  var jugadoresAceptados = true;
  const nombres = {nombreUno: nombreUno, nombreDos: nombreDos};
  axios.post("http://localhost:5000/iniciarjuego", nombres)
    .then(reponse => {
      console.log(reponse.data)
    })
    .catch(error => {
      console.error(error);
      jugadoresAceptados = false;
    })
  return jugadoresAceptados;
}

/**
 * Carga las imágenes que se utilizarán en el juego.
 */
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
  const imagen = document.getElementById("ImagenAhorcado");
  imagen.src = imagen1;
}

/**
 * Envía a iniciar la ronda.
 * @returns {boolean} True si la ronda se pudo iniciar, false si no se pudo iniciar.
 */
function IniciarRonda(){
  var resultado = true;
  axios.get("http://localhost:5000/jugarronda")
    .then( response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
      resultado = false;
    })
  ronda++;
  const aceptarLetra = document.getElementById("AceptarLetra");
  aceptarLetra.style.display = "flex";
  const entradaLetra = document.getElementById("EntradaLetra");
  entradaLetra.style.display = "flex";
  CargarImagenes();
  return resultado;
}

/**
 * Inicia el juego.
 */
function JugarAhorcado(){
  const nombreUno = ComprobarNombreUno();
  const nombreDos = ComprobarNombreDos();
  ronda = 0;
  if(nombreUno !== "" && nombreDos !== "" && EnviarNombres(nombreUno, nombreDos)){
    setTimeout(IniciarRonda, 100);
    setTimeout(MostrarPantallaJuego, 150);
    setTimeout(InsertarInformación, 200);
    setTimeout(RecuperarPalabraOculta, 250);
  }
}

/**
 * Envía la letra indicada por el jugador.
 */
function EnviarLetra(){
  const letra = document.getElementById("EntradaLetra").value;
  const dato = {letra: letra}
  var resultado = "";
  axios.post("http://localhost:5000/comprobarletra", dato)
    .then( response => {
      console.log(response.data);
      resultado = response.data["respuesta"];
      AnalizarResultado(resultado);
    })
    .catch(error => {
      console.error(error);
    })
  document.getElementById("EntradaLetra").value = "";
}

/**
 * Analiza el resultado indicado por el servidor.
 * @param {string} resultado 
 */
function AnalizarResultado(resultado){
  const informacionJugador = document.getElementById("InformacionJugador");
  if(resultado === "Detener"){
    informacionJugador.textContent = informacionJugador.textContent + " - Has perdido la ronda";
    FinalizarRonda()
    CargarSiguienteImagen();
  }
  else if(resultado === "Fallo" ){
    CargarSiguienteImagen();
  }
  else if (resultado === "Gano"){
    informacionJugador.textContent = informacionJugador.textContent + " - Has ganado la ronda";
    RecuperarPalabraOculta();
    FinalizarRonda()
  }
  else{
    RecuperarPalabraOculta();
  }
}

/**
 * Envía a finalizar la ronda actual.
 */
function FinalizarRonda(){
  const aceptarLetra = document.getElementById("AceptarLetra");
  aceptarLetra.style.display = "none";
  const entradaLetra = document.getElementById("EntradaLetra");
  entradaLetra.value = "";
  entradaLetra.style.display = "none";
  if(ronda == 4){
    const cerrarPantallaJuego = document.getElementById("CerrarPantallaJuego");
    cerrarPantallaJuego.style.display = "flex"
    MostrarGanador();
  }
  else{
    const siguienteJugador = document.getElementById("SiguienteJugador");
    siguienteJugador.style.display = "flex";
  }
}

/**
 * Indica quien es el ganador de la ronda.
 */
function MostrarGanador(){
  axios.get("http://localhost:5000/solicitarganador")
    .then(response => {
      const ganador = response.data["ganador"];
      const barraPalabra = document.getElementById("BarraPalabra");
      barraPalabra.textContent = "El ganador es " + ganador;
    })
    .catch(error => {
      console.error(error);
    })
    MostrarResultados();
}

/**
 * Indica los resultados del juego.
 */
function MostrarResultados(){
  axios.get("http://localhost:5000/solicitarresultados")
    .then(response => {
      const resultados = response.data["resultados"];
      const informacionJugador = document.getElementById("InformacionJugador");
      informacionJugador.textContent = resultados;
    })
    .catch(error => {
      console.error(error);
    })
}

/**
 * Actualiza la interfaz gráfica para la siguiente ronda.
 */
function IrSiguienteRonda(){
  const aceptarLetra = document.getElementById("AceptarLetra");
  aceptarLetra.style.display = "flex";
  const entradaLetra = document.getElementById("EntradaLetra");
  entradaLetra.style.display = "flex";
  const siguienteJugador = document.getElementById("SiguienteJugador");
  siguienteJugador.style.display = "none"
  setTimeout(IniciarRonda, 100);
  setTimeout(InsertarInformación, 200);
  setTimeout(RecuperarPalabraOculta, 250);
}

/**
 * Carga la siguiente imagen cuando el jugador falla una letra.
 */
function CargarSiguienteImagen(){
  const imagen = document.getElementById("ImagenAhorcado");
  console.log(imagenes);
  imagen.src = imagenes[0];
  imagenes.splice(0, 1);
}

/**
 * Valida que la entrada de la letra se correcta.
 */
function validarInput() {
  const entradaLetra = document.getElementById("EntradaLetra");
  // Obtener el valor actual del input
  let valor = entradaLetra.value.toLowerCase();

  // Remover caracteres no permitidos
  valor = valor.replace(/[^a-zñ]/g, '');

  // Actualizar el valor del input

  if(valor.length > 1){
    valor = valor[0];
  }

  entradaLetra.value = valor;
}

/**
 * Inserta quien es el jugador que está jugando la ronda actual.
 */
function InsertarInformación(){
  axios.get("http://localhost:5000/solicitarnombrejugador")
    .then(response => {
      var jugador = response.data["nombre"];
      jugador = "Jugador: " + jugador.concat();
      const nombre = document.getElementById("InformacionJugador");
      nombre.textContent = jugador;
    })
    .catch(error => {
      console.error(error);
    })
}

/**
 * Solicita la palabra oculta y la muestra.
 */
function RecuperarPalabraOculta(){
  var palabra = [];
  axios.get("http://localhost:5000/solicitarpalabraoculta")
    .then(response => {
      palabra = response.data["palabra"];
      ActualizarPalabraOculta(palabra);
    })
    .catch(error => {
      console.error(error);
    })
}

/**
 * Actualiza en pantalla la palabra oculta.
 * @param {string[]} palabraArreglo Cada letra de la palabra en una posición del arreglo
 */
function ActualizarPalabraOculta(palabraArreglo){
  var palabra = "";
  for(var indice = 0; indice < palabraArreglo.length; indice++){
    if(palabraArreglo[indice] === "_"){
      palabra = palabra.concat("_  ");
    }
    else{
      palabra = palabra.concat(palabraArreglo[indice] + " ");
    }
  }
  console.log(palabra, palabraArreglo)
  const barraPalabra = document.getElementById("BarraPalabra");
  barraPalabra.textContent = palabra;
}

/**
 * Solicita el historial de partidas.
 * @returns {JSON[]} el historial de juegos.
 */
function SolicitarHistorial(){
  const historial = [];
  axios.get("http://localhost:5000/soliciarhistorialjuegos")
    .then(response => {
      const partidas = response.data["historial"];
      historial.push(partidas);
    })
    .catch(error => {
      console.error(error);
    })
  return historial[0];
}

//Interfaz gráfica

//Pantalla de juego
/**
 * Actualiza la interfaz gráfica para volver a la pantalla principal.
 */
function VolverPantallaInicio(){
  document.getElementById("PantallaHistorial").style.display = "none";
  document.getElementById("PantallaJuego").style.display = "none";
  document.getElementById("CerrarPantallaJuego").style.display = "none";
  document.getElementById("PantallaInicio").style.display = "flex";
}

/**
 * Actualiza la interfaz gráfica para mostrar el historial de partidas.
 */
function VerHistorialJuegos(){
  //InsertarInformacion();
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaHistorial").style.display = "flex";
}

/**
 * Actualiza la interfaz gráfica para mostrar la pantalla de juego.
 */
function MostrarPantallaJuego(){
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaJuego").style.display = "flex";
}

/**
 * Inserta la zona del juego en el área especificada.
 * @returns {HTMLElement} la zona del juego.
 */
function InsertarZonaJuego(){
  return (
    <div id = "PantallaJuego" class = "PantallaJuego" style={{display: "none"}}>
      <div class = "CajaJuego">
        <div class = "CajaImagen">
          <img id = "ImagenAhorcado" class = "ImagenAhorcador" src = {imagen1} />
        </div>
        <div class = "ZonaJuego">
          <InsertarBarraPalabra />
          <div id = "InformacionJugador" class = "BarraControles">Jugador</div>
          <InsertarControlesJuego />
        </div>
      </div>
    </div>
  );
}

/**
 * Inserta la barra de la palabra oculta.
 * @returns {HTMLElement} El div de la palabra oculta.
 */
function InsertarBarraPalabra(){
  return (
    <div id = "BarraPalabra" class = "BarraPalabra">

    </div>
  );
}

/**
 * Inserta la barra de controles y los controles.
 * @returns {HTMLElement} La barra de controles y los controles.
 */
function InsertarControlesJuego(){
  return (
    <div class = "BarraControles">
      <input id='EntradaLetra' type = 'text' placeholder = 'Escribe la letra' onInput={validarInput}></input>
      <button id = "AceptarLetra" onClick={EnviarLetra}>Aceptar</button>
      <button id = "SiguienteJugador" style={{display: "none"}} onClick = {IrSiguienteRonda}>Siguiente Jugador</button>
      <button id = "CerrarPantallaJuego" style={{display: "none"}} onClick = {VolverPantallaInicio}>Volver a la pantalla principal</button>
    </div>
  );
}

/**
 * Inserta el título del programa.
 * @returns {HTMLElement} El título del programa.
 */
function InsertarTitulo(){
  return (
    <div class = "titulo">Ahorcado</div>
  );
}

/**
 * Inserta el cuerpo de la interfaz gráfica.
 * @returns {HTMLElement} El cuerpo de la interfaz gráfica.
 */
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
/**
 * Inserta el cuerpo del historial de partidas.
 * @returns {HTMLElement} El cuerpo del historial de partidas.
 */
function InsertarHistorialJuegos(){
  return (
    <div id = "PantallaHistorial" class = "PantallaJuego" style = {{display: "none"}}>
      <h1 class = "TituloHistorial">Historial de Juegos</h1>
      <InsertarTabla />
      <InsertarBotonVolverHistorial />
    </div>
  );
}

/**
 * Inserta la tabla del historial de partidas.
 * @returns {HTMLTableElement} La tabla del historial de partidas.
 */
function InsertarTabla(){
  return (
    <table id = "Historial" class = "TablaHistorial">
      <InsertarEncabezado />
      <tbody id = "CuerpoTabla" />
    </table>
  );
}

/**
 * Inserta las filas del historial de partidas.
 */
function InsertarInformacion(){
  const partidas = SolicitarHistorial();
  const tabla = document.getElementById("Historial");
  for (var indice = 0; indice < partidas.length; indice++){
    const fila = CrearFila(partidas, indice);
    tabla.appendChild(fila);
  }
}

/**
 * Crea las filas de la tabla del historial de partidas.
 * @param {JSON[]} partidas las partidas jugadas.
 * @param {number} indice el número de partida a seleccionar.
 * @returns {HTMLTableRowElement}  La fila de la tabla del historial de partidas.
 */
function CrearFila(partidas, indice){
  const partida = partidas[indice];
  const fila = document.createElement("tr");
  const nombreJugadorUno = document.createElement("td");
  nombreJugadorUno.textContent = partida["jugadorUno"];
  fila.appendChild(nombreJugadorUno);
  const nombreJugadorDos = document.createElement("td");
  nombreJugadorDos.textContent = partida["jugadorDos"];
  fila.appendChild(nombreJugadorDos);
  const resultado = document.createElement("td");
  resultado.textContent = partida["resultado"];
  fila.appendChild(resultado);
  const ganador = document.createElement("td");
  ganador.textContent = partida["ganador"];
  fila.appendChild(ganador);
  return fila;
}

/**
 * Inserta el botón para salir de historial de partidas.
 * @returns {HTMLDivElement} El boton para salir del historial.
 */
function InsertarBotonVolverHistorial(){
  return (
    <div class = "ContenedorBotonAceptarNombre">
      <button class = "BotonesInicio" onClick = {VolverPantallaInicio}>Volver</button>
    </div>
  );
}

/**
 * Inserta el encabezado de la tabla del historial de partidas. 
 * @returns {HTMLTableSectionElement} El encabezado de la tabla del historial de partidas. 
 */
function InsertarEncabezado(){
  return (
    <thead class = "FilaTabla">
      <tr class = "FilaTabla">
        <td class = "cuadroTablaEncabezado">Jugador 1</td>
        <td class = "cuadroTablaEncabezado">Jugador 2</td>
        <td class = "cuadroTablaEncabezado">Resultado</td>
        <td class = "cuadroTablaEncabezado">Ganador</td>
      </tr>
    </thead>
  );
}

//Pantalla de inicio

/**
 * Inserta la pantalla principal.
 * @returns {HTMLDivElement} La pantalla principal.
 */
function AgregarPantallaJuego(){
  return (
    <div id = "PantallaInicio" class = "PantallaJuego">
        <div style={{height: "50%"}} />
        <AgregarRegistradoresJugadores />
        <AgregarControlesInicio />
    </div>
  );
}

/**
 * Inserta los apartados para registrar al jugador.
 * @returns {HTMLDivElement} Los apartados para registrar al jugador.
 */
function AgregarRegistradoresJugadores(){
  return(
    <div class = "IngreseNombre">
      <AgregarRegistradorJugadorUno />
      <div class = "EspacioJugadores"></div>
      <AgregarRegistradorJugadorDos />
    </div>
  );
}

/**
 * Inserta el registrador del jugador uno.
 * @returns {HTMLDivElement} Registrador del jugador uno.
 */
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

/**
 * Inserta el registrador del jugador dos.
 * @returns {HTMLDivElement} Registrador del jugador dos.
 */
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

/**
 * Inserta los controles de inicio.
 * @returns {HTMLDivElement} Los controles de inicio.
 */
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


/**
 * Inserta el cuerpo de la interfaz gráfica.
 * @returns {HTMLElement} El cuerpo de la interfaz gráfica.
 */
function App() {
  document.getElementById("root").style.width = "100%";
  document.getElementById("root").style.height = "100%"
  return (
    <InsertarCuerpo />
  );
}

export default App;