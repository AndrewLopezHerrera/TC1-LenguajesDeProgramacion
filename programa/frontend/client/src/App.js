import './App.css';

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
    <div class = "PantallaJuego">
      <h1 class = "TituloHistorial">Historial de Juegos</h1>
      <table id = "Historial" class = "TablaHistorial">
        <InsertarEncabezado />

      </table>
    </div>
  );
}

function InsertarEncabezado(){
  return (
    <thead>
      <tr>
        <td>Número de Juego</td>
        <td>Jugador 1</td>
        <td>Jugador 2</td>
        <td>Resultado</td>
        <td>Ganador</td>
      </tr>
    </thead>
  );
}

function AgregarPantallaJuego(){
  return (
    <div class = "PantallaJuego" style={{display: "none"}}>
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
        <button class = "BotonesInicio">Ver historial de juego</button>
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