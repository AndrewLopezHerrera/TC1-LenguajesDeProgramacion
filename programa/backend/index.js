//Dependencias del programa
const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;
const Juego = require("./juego.js");
let juego = null;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Se ha activado el servidor")
})

app.listen(port, () =>{
  console.log("The server is running on port", port);
})

app.post("/iniciarjuego", (req, res) => {
  const { nombreUno, nombreDos } = req.body;
  juego = new Juego(nombreUno, nombreDos);
  juego.IniciarJuego();
  res.json({mensaje: "Juego Iniciado"});
});

app.get("obtenerjugadoractual", (req, res) => {
  const jugador = juego.ObtenerNombreJugadorActual;
  res.json({jugador: jugador});
})

app.get("/jugarronda", (req, res) => {
  juego.IniciarRonda();
  res.json({mensaje: "Ronda Iniciada"})
})

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