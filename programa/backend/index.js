//Dependencias del programa
import { Juego } from "./gameplay";
const express = require("express");
const cors = require('cors');
const app = express();
const port = 5000;
let juego = Juego;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Se ha activado el servidor")
})

app.listen(port, () =>{
  console.log("The server is running on port", port);
})

app.post("/comprobarnombre", (req, res) => {
  const { nombre } = req.body;
  console.log('Mensaje recibido en el servidor:', nombre);
  res.json({ respuesta: 'Mensaje recibido correctamente' });
})

app.post("/jugar", (req, res) => {
  const { nombreUno, nombreDos } = req.body;
  var juego = new Juego(nombreUno, nombreDos);
  juego.IniciarJuego();
})