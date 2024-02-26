const Jugador = require("./jugador");
const Temporizador = require("./temporizador");
const Palabra = require("./palabra");
const Historial = require("./historial");

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
        this.Ganador = null;
        this.Historial = new Historial();
        this.Resultado = "";
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
            this.ConstruirPalabraOculta(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorUno;
        }
        else if (this.Ronda == 2){
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.ConstruirPalabraOculta(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorDos;
        }
        else if (this.Ronda == 3){
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.ConstruirPalabraOculta(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorUno;
        }
        else{
            this.PalabraSeleccionada = this.Palabra.EscogerPalabra();
            this.ConstruirPalabraOculta(this.PalabraSeleccionada.length);
            this.JugadorActual = this.JugadorDos;
        }
        this.Temporizador.IniciarTemporizador();
        this.Ronda++;
        console.log("Palabra seleccionada: ", this.PalabraSeleccionada);
        console.log("Palabra oculta: ", this.PalabraOculta);
    }

    /**
     * Construye la palabra oculta.
     * @param {number} tamano El tamaño de la palabra oculta.
     */
    ConstruirPalabraOculta(tamano){
        this.PalabraOculta = Array(tamano);
        for (var indice = 0; indice < tamano; indice++){
            this.PalabraOculta[indice] = "_";
        }
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
     * Declara cual de los dos jugadores es el ganador.
     */
    DeclararGanador(){
        var puntosJugadorUno = 0;
        var puntosJugadorDos = 0;
        if (this.JugadorUno.ResultadoRondaUno === "Gano") {
            puntosJugadorUno++;
        }
        if (this.JugadorUno.ResultadoRondaDos === "Gano") {
            puntosJugadorUno++;
        }
        if (this.JugadorDos.ResultadoRondaUno === "Gano") {
            puntosJugadorDos++;
        }
        if (this.JugadorDos.ResultadoRondaDos === "Gano") {
            puntosJugadorDos++;
        }
        if(puntosJugadorUno > puntosJugadorDos){
            this.Ganador = this.JugadorUno.Nombre;
        }
        else if(puntosJugadorUno < puntosJugadorDos){
            this.Ganador = this.JugadorDos.Nombre;
        }
        else{
            this.DesempatarJugadores();
        }
        //this.Historial.InsertarPartida(this.JugadorUno.Nombre, this.JugadorDos.Nombre, this.Resultado, this.Ganador);
    }

    /**
     * Desempata los jugadores en caso de que hayan tenido la misma cantidad de rondas ganadas.
     */
    DesempatarJugadores(){
        if(this.JugadorUno.TiempoJugado < this.JugadorDos.TiempoJugado){
            this.Ganador = this.JugadorUno.Nombre;
            this.Resultado = "Gane";
        }
        else if(this.JugadorUno.TiempoJugado > this.JugadorUno.TiempoJugado){
            this.Ganador = this.JugadorDos.Nombre;
            this.Resultado = "Gane"
        }
        else{
            this.Ganador = "Ninguno";
            this.Resultado = "Empate";
        }
    }

    /**
     * Indica en cual de las rondas ha perdido el jugador.
     */
    OtorgarPerdida(){
        if (this.Ronda == 1 || this.Ronda == 2){
            this.JugadorActual.ResultadoRondaUno = "Perdio";
        }
        else{
            this.JugadorActual.ResultadoRondaDos = "Perdio"
        }
    }

    /**
     * Este método verifica si la letra ingresada por el usuario es válida.
     * @param {string} letra La letra que ingresó el usuario.
     * @returns {string} Continuar si el jugador aún tiene oportunidades, Detener si el jugador no tiene oportunidades, Fallo si el jugador falló la letra pero aún tiene oportunidades.
     */
    IngresarLetra(letra){
        var acertadas = 0;
        for (var indice = 0; indice < this.PalabraSeleccionada.length; indice++){
            if (this.PalabraSeleccionada[indice] === letra){
                this.PalabraOculta[indice] = letra;
                acertadas++;
            }
        }
        if(acertadas == 0){
            return this.VerificarOportunidades();
        }
        return this.VerificarGane();
    }

    /**
     * Este método verifica si el jugador ganó.
     * @returns {string} resultado de ingresar la letra.
     */
    VerificarGane(){
        for (var indice = 0; indice < this.PalabraOculta.length; indice++){
            if (this.PalabraOculta[indice] == "_"){
                return "Continuar"
            }
        }
        this.OtorgarGane();
        this.DetenerRonda();
        return "Gano"
    }

    /**
     * Este método otorga el gane al jugador actual.
     */
    OtorgarGane(){
        if (this.Ronda == 1 || this.Ronda == 2){
            this.JugadorActual.ResultadoRondaUno = "Gano";
        }
        else{
            this.JugadorActual.ResultadoRondaDos = "Gano"
        }
    }

    /**
     * 
     * @returns {string} Envia Detener si el jugador no tiene oportunidades. Envía Fallo si el jugador aún cuenta con oportunidades.
     */
    VerificarOportunidades(){
        this.Fallos++;
        if (this.Oportunidades == this.Fallos){
            this.OtorgarPerdida();
            this.DetenerRonda();
            return "Detener";
        }
        return "Fallo";
    }

    /**
     * Elije de manera aleatoria quien es el primer jugador y quien es el segundo jugador.
     */
    ReordenarJugadores(){
        const resultado = Math.floor(Math.random() * ( 2 ));
        if (resultado == 1){
            const jugadorAux = this.JugadorUno;
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

    /**
     * Devuelve el arreglo de la palabra oculta.
     * @returns {string} La palabra oculta.
     */
    ObtenerPalabraOculta(){
        return this.PalabraOculta;
    }

    /**
     * Envía el jugador ganador.
     * @returns {string} El jugador ganador
     */
    ObtenerGanador(){
        this.DeclararGanador();
        return this.Ganador;
    }

    /**
     * Envía el resultado del juego.
     * @returns {string} El resultado del juego.
     */
    ObtenerResultados(){
        const mensaje = "Jugador uno: " + this.JugadorUno.Nombre + " || Tiempo jugado: " +
            this.JugadorUno.TiempoJugado + "s || Rondas Ganadas: " +
            this.JugadorUno.CantidadRondasGanadas() + "<br/>Jugador dos: " +
            this.JugadorDos.Nombre + " || Tiempo jugado: " + this.JugadorDos.TiempoJugado +
            "s || Rondas Ganadas: " + this.JugadorDos.CantidadRondasGanadas();
        return mensaje;
    }

    /**
     * Envía el historial de juego.
     * @returns {JSON[]} El arreglo de JSON.
     */
    async ObtenerHistorialJuegos(){
        return await this.Historial.LeerPartidas();
    }
}

module.exports = Juego;