//Dependencias del programa
const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;
const Juego = require("./juego.js");
let juego = new Juego();

app.use(cors());

app.use(express.json());

/**
 * Indica que se ha activado el servidor.
 */
app.get("/", (req, res) => {
  res.send("Se ha activado el servidor")
})

/**
 * Indica en que puerto está escuchando el servidor.
 */
app.listen(port, () =>{
  console.log("The server is running on port", port);
})

/**
 * Indica que debe iniciar el juego.
 */
app.post("/iniciarjuego", (req, res) => {
  const { nombreUno, nombreDos } = req.body;
  juego = new Juego(nombreUno, nombreDos);
  juego.IniciarJuego();
  res.json({mensaje: "Juego Iniciado en estos momentos"});
});

/**
 * Envía el jugador que está jugando actualmente.
 */
app.get("obtenerjugadoractual", (req, res) => {
  const jugador = juego.ObtenerNombreJugadorActual;
  res.json({jugador: jugador});
})

/**
 * Indica que se debe iniciar una nueva ronda.
 */
app.get("/jugarronda", (req, res) => {
  juego.IniciarRonda();
  res.json({mensaje: "Ronda Iniciada"})
})

/**
 * Indica que se debe detener la ronda actual.
 */
app.get("/detenerronda", (req, res) => {
  juego.DetenerRonda();
})

/**
 * Envía a comprobar si la letra ingresada por el usuario es correcta.
 */
app.post("/comprobarletra", (req, res) => {
  const { letra } = req.body;
  const resultado = juego.IngresarLetra(letra);
  if (resultado == "Detener"){
    juego.DetenerRonda();
  }
  res.json({respuesta: resultado});
})

/**
 * Envía el jugador que está jugando actualmente.
 */
app.get("/solicitarnombrejugador", (req, res) => {
  const nombre = juego.ObtenerNombreJugadorActual();
  res.json({nombre: nombre});
})

/**
 * Solicita la palabra oculta.
 */
app.get("/solicitarpalabraoculta", (req, res) => {
  const palabra = juego.ObtenerPalabraOculta();
  res.json({palabra: palabra});
})

/**
 * Solicita el ganador del juego
 */
app.get("/solicitarganador", (req, res) => {
  const ganador = juego.ObtenerGanador();
  res.json({ganador: ganador});
})

/**
 * Solicita los resultados del juego.
 */
app.get("/solicitarresultados", (req, res) => {
  const resultados = juego.ObtenerResultados();
  res.json({resultados: resultados});
})

/**
 * Solicita el historial del juego.
 */
app.get("/soliciarhistorialjuegos", async (req, res) => {
  const historial = await juego.ObtenerHistorialJuegos();
  res.json({historial: historial});
});