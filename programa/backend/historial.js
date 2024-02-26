const fs = require("fs");

class Historial{
    InsertarPartida(jugadorUno, jugadorDos, resultado, ganador){
        const partida = {
            jugadorUno: jugadorUno,
            jugadorDos: jugadorDos,
            resultado: resultado,
            ganador: ganador
        }
        this.InsertarPartidaAux(partida);
    }

    InsertarPartidaAux(partida){
        fs.readFile('historial.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error al leer el archivo:', err);
              return;
            }
            const partidas = JSON.parse(data);
            partidas.push(partida);
            const historialJson = JSON.stringify(partidas);
            this.GuardarPartidas(historialJson)
        });
    }

    GuardarPartidas(historialJson){
        fs.writeFile('historial.json', historialJson, (err) => {
            if (err) {
              console.error('Error al guardar el historial:', err);
              return;
            }
            console.log('Historial actualizado y guardado correctamente.');
        });
    }

    async LeerPartidas(){
        try {
            const data = await fs.readFile('historial.json', 'utf8');
            return JSON.parse(data).partidas;
        } catch (err) {
            console.error('Error al leer el archivo:', err);
            return null;
        }
    }
};

module.exports = Historial;