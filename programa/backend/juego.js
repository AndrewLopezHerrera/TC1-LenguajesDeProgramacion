const Jugador = require("./jugador");
const Temporizador = require("./temporizador");
const Palabra = require("./palabra");

/**
 * Esta clase es la que controla la lógica del juego.
 * 
 * @author Andrew Denilson López Herrera
 * @version 1.0
 */
class Juego{

    /**
     * El método constructor.
     * @param {string} jugadorUno El nombre del jugador uno.
     * @param {string} jugadorDos El nombre del jugador dos.
     */
    constructor(jugadorUno, jugadorDos){
        this.JugadorUno = new Jugador(jugadorUno);
        this.JugadorDos = new Jugador(jugadorDos);
        this.JugadorActual = null;
        this.Temporizador = new Temporizador();
        this.Palabra = new Palabra();
        this.PalabraSeleccionada = [];
        this.PalabraOculta = [];
        this.Ronda = 1;
        this.Oportunidades = 7;
        this.Fallos = 0;
    }

    /**
     * Este método inicia el juego. Sin este método el juego no inicia de manera correcta.
     */
    IniciarJuego(){
        this.ReordenarJugadores();
        this.Palabra.ExtraerPalabras();
    }

    /**
     * Este método inicia una ronda. Este método sabe que ronda se debe iniciar y prepara el juego para la ronda.
     */
    IniciarRonda(){
        if (this.Ronda == 1){
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.PalabraOculta = Array(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorUno;
        }
        else if (this.Ronda == 2){
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.PalabraOculta = Array(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorDos;
        }
        else if (this.Ronda == 3){
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.PalabraOculta = Array(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorUno;
        }
        else{
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.PalabraOculta = Array(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorDos;
        }
        this.Temporizador.IniciarTemporizador
    }

    /**
     * Este método detiene la ronda actual, suma el tiempo jugado al jugador actual y reinicia los valores para la siguiente ronda.
     */
    DetenerRonda(){
        this.Temporizador.DetenerTemporizador();
        const tiempo = this.Temporizador.Tiempo;
        this.Temporizador.RestablecerTemporizador();
        this.JugadorActual.SumarTiempoJugador(tiempo);
        this.Fallos = 0;
    }

    /**
     * Este método verifica si la letra ingresada por el usuario es válida.
     * @param {string} letra La letra que ingresó el usuario.
     * @returns {string} Continuar si el jugador aún tiene oportunidades, Detener si el jugador no tiene oportunidades, Fallo si el jugador falló la letra pero aún tiene oportunidades.
     */
    IngresarLetra(letra){
        var acertadas = 0;
        for (var indice = 0; indice < this.palabraSeleccionada.length; indice++){
            if (this.PalabraSeleccionada == letra){
                this.PalabraOculta[indice] == letra;
                acertadas++;
            }
        }
        if(acertadas == 0){
            return VerificarOportunidades();
        }
        return "Continuar";
    }

    /**
     * 
     * @returns {string} Envia Detener si el jugador no tiene oportunidades. Envía Fallo si el jugador aún cuenta con oportunidades.
     */
    VerificarOportunidades(){
        this.Fallos++;
        if (this.Oportunidades == this.Fallos){
            return "Detener";
        }
        return "Fallo";
    }

    /**
     * Elije de manera aleatoria quien es el primer jugador y quien es el segundo jugador.
     */
    ReordenarJugadores(){
        const resultado = Math.random();
        if (resultado == 1){
            jugadorAux = this.JugadorUno;
            this.JugadorUno = this.JugadorDos;
            this.JugadorDos = jugadorAux;
        }
    }

    /**
     * Devuelve el nombre del jugador que está jugando.
     * @returns {string} nombre del jugador.
     */
    ObtenerNombreJugadorActual(){
        return this.JugadorActual.Nombre;
    }
}

module.exports = Juego;