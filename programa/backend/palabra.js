const readFile = require("fs");

/**
 * Esta clase extrae las palabras que se utilizarán en el juego.
 * 
 * @author Andrew Denilson López Herrera
 * @version 1.0
 */
class Palabra{
    /**
     * El método constructor.
     */
    constructor(){
        this.PalabraUno = [];
        this.PalabraDos = [];
        this.PalabraTres = [];
        this.PalabraCuatro = [];
        this.PalabraActual = 1;
    }

    /**
     * Extrae las palabras de la base de datos JSON.
     */
    ExtraerPalabras(){
        readFile.readFile('palabras.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return 0;
        }
        const palabrasPorLongitud = JSON.parse(data);
        this.EscogerLargoPalabra(palabrasPorLongitud);
        });
    }

    /**
     * Escoge el largo de las palabras para la todas las rondas.
     * @param {any} json La base de datos.
     */
    EscogerLargoPalabra(json){
        const tamanos = ["six", "seven", "eight", "nine"];
        const indice = Math.floor(Math.random() * 4 );
        const tamano = tamanos[indice];
        const palabras = json[tamano];
        this.AsignarPalabras(palabras);
    }

    /**
     * Selecciona las palabras que se utilizarán en el juego.
     * @param {string[]} palabras El arreglo de palabras del mismo largo.
     */
    AsignarPalabras(palabras){
        console.log(palabras);
        for(var max = 15; max > 11; max--){
            var indice = Math.floor(Math.random() * (max) );
            console.log(indice);
            if (max == 15)
                this.PalabraUno = palabras[indice].split("");
            else if (max == 14)
                this.PalabraDos = palabras[indice].split("");
            else if (max == 13)
                this.PalabraTres = palabras[indice].split("");
            else
                this.PalabraCuatro = palabras[indice].split("");
            palabras.splice(indice, 1);
        }
    }

    /**
     * Elige la palabra que corresponde a cada ronda.
     * @returns {string[]} La palabra seleccionada.
     */
    EscogerPalabra(){
        if(this.PalabraActual == 1){
            this.PalabraActual = 2;
            return this.PalabraUno;
        }
        if(this.PalabraActual == 2){
            this.PalabraActual = 3;
            return this.PalabraDos;
        }
        if(this.PalabraActual == 3){
            this.PalabraActual = 4;
            return this.PalabraTres;
        }
        this.PalabraActual = 1;
        return this.PalabraCuatro;
    }
};

module.exports = Palabra;