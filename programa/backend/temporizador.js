/**
 * Esta clase sirve para tomar el tiempo de los jugadores.
 * 
 * @author Andrew Denilson López Herrera
 * @version 1.0
 */
class Temporizador{
    /**
     * El método constructor.
     */
    constructor(){
        this.Tiempo = 0;
        this.Contador = null;
    }

    /**
     * Inicia el temporizador.
     */
    IniciarTemporizador(){
        this.Contador = setInterval(this.SumarTiempo, 1000);
    }

    /**
     * Suma un segundo al tiempo.
     */
    SumarTiempo(){
        this.Tiempo++;
    }
    /**
     * Detiene el temporizador.
     */
    DetenerTemporizador(){
        clearInterval(this.Contador);
    }

    /**
     * Restablece el tiempo del temporizador.
     */
    RestablecerTemporizador(){
        this.Tiempo = 0;
    }
};

module.exports = Temporizador;