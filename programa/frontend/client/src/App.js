import './App.css';

function VolverHistorialJuegos(){
  document.getElementById("PantallaHistorial").style.display = "none";
  document.getElementById("PantallaInicio").style.display = "flex";
}

function VerHistorialJuegos(){
  document.getElementById("PantallaInicio").style.display = "none";
  document.getElementById("PantallaHistorial").style.display = "flex";
}

function InsertarZonaJuego(){
  
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
    <div id = "PantallaInicio" class = "PantallaJuego" style={{display: "none"}}>
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
        <input></input>
      </div>
      <div id = "MensajeJugadorUno"></div>
      <div class = "ContenedorBotonAceptarNombre">
        <button class = "BotonAceptarNombre">Aceptar</button>
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
        <input></input>
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