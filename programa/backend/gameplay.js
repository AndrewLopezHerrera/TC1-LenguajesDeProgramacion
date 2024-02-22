const fs = require('fs');

export class Juego{
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

    IniciarJuego(){
        ReordenarJugadores();
        this.Palabra.ExtraerPalabras();
    }

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

    DetenerRonda(){
        this.Temporizador.DetenerTemporizador();
        const tiempo = this.Temporizador.Tiempo;
        this.Temporizador.RestablecerTemporizador();
        this.JugadorActual.SumarTiempoJugador(tiempo);
        this.Fallos = 0;
    }

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

    VerificarOportunidades(){
        this.Fallos++;
        if (this.Oportunidades == this.Fallos){
            return "Detener";
        }
    }

    ReordenarJugadores(){
        const resultado = Math.random();
        if (resultado == 1){
            jugadorAux = this.JugadorUno;
            this.JugadorUno = this.JugadorDos;
            this.JugadorDos = jugadorAux;
        }
    }
}

class Jugador{
    constructor(nombre){
        this.Nombre = nombre;
        this.TiempoJugado = 0;
        this.ResultadoRondaUno = "";
        this.ResultadoRondaDos = "";
    }

    SumarTiempoJugador(tiempo){
        this.TiempoJugado += tiempo;
    }

    DarResultadorRondaUno(resultado){
        this.ResultadoRondaUno = resultado;
    }

    DarResultadorRondaDos(resultado){
        this.ResultadoRondaDos = resultado;
    }
};

class Temporizador{
    constructor(){
        this.Tiempo = 0;
        this.Contador = null;
    }

    IniciarTemporizador(){
        this.Contador = setInterval(this.SumarTiempo, 1000);
    }

    SumarTiempo(){
        this.Tiempo++;
    }

    DetenerTemporizador(){
        clearInterval(this.Contador);
    }

    RestablecerTemporizador(){
        this.Tiempo = 0;
    }
};

class Palabra{
    constructor(){
        this.PalabraUno = [];
        this.PalabraDos = [];
        this.PalabraTres = [];
        this.PalabraCuatro = [];
        this.PalabraActual = 1;
    }

    ExtraerPalabras(){
        fs.readFile('palabras.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return 0;
        }
        const palabrasPorLongitud = JSON.parse(data);
        EscogerLargoPalabra(palabrasPorLongitud);
        });
    }

    EscogerLargoPalabra(json){
        const tamanos = ["six", "seven", "eight", "nine"];
        const indice = Math.random() * (4 - 1) + 1;
        const tamano = tamanos[indice];
        const palabras = json[tamano];
        AsignarPalabras(palabras);
    }

    AsignarPalabras(palabras){
        for(var max = 15; max > 11; max--){
            var indice = Math.random() * (max - 1) + 1;
            if (max == 15)
                PalabraUno = palabras[indice].split("");
            else if (max == 14)
                PalabraDos = palabras[indice].split("");
            else if (max == 13)
                PalabraTres = palabras[indice].split("");
            else
                PalabraCuatro = palabras[indice].split("");
            palabras.splice(indice, 1);
        }
    }

    EscogerPalabra(){
        if(this.PalabraActual == 1){
            this.PalabraActual = 2;
            return this.PalabraUno;
        }
        if(this.PalabraActual == 1){
            this.PalabraActual = 3;
            return this.PalabraDos;
        }
        if(this.PalabraActual == 1){
            this.PalabraActual = 4;
            return this.PalabraTres;
        }
        this.PalabraActual = 1;
        return this.PalabraCuatro;
    }
};