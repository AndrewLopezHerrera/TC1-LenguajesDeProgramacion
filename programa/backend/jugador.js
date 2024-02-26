/**
 * Esta clase guarda la información del jugador requeridas por el juego.
 * 
 * @author Andrew Denilson López Herrera
 * @version 1.0
 */
class Jugador{
    /**
     * El método constructor.
     * @param {string} nombre El nombre del jugador.
     */
    constructor(nombre){
        this.Nombre = nombre;
        this.TiempoJugado = 0;
        this.ResultadoRondaUno = "";
        this.ResultadoRondaDos = "";
    }

    /**
     * Suma el tiempo tardado del jugador en una ronda.
     * @param {number} tiempo El tiempo tardado en una ronda.
     */
    SumarTiempoJugador(tiempo){
        this.TiempoJugado += tiempo;
    }

    /**
     * Ingresa el resultado de la ronda uno.
     * @param {string} resultado El resultado de la ronda uno.
     */
    IngresarResultadorRondaUno(resultado){
        this.ResultadoRondaUno = resultado;
    }

    /**
     * Ingresa el resultado de la ronda dos.
     * @param {string} resultado El resultado de la ronda dos.
     */
    IngresarResultadorRondaDos(resultado){
        this.ResultadoRondaDos = resultado;
    }

    /**
     * Cuenta la cantidad de rondas ganadas.
     * @returns {number} cantidad de rondas ganadas.
     */
    CantidadRondasGanadas(){
        var rondasGanadas = 0;
        if (this.ResultadoRondaUno == "Gano")
            rondasGanadas++;
        if (this-this.ResultadoRondaDos == "Gano")
            rondasGanadas++;
        return rondasGanadas;
    }
};

module.exports = Jugador;