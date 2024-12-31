const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let puntaje = 0;
const respuestasUsuario = [];

const preguntas = [
    {
        pregunta: '¿Cuántos peones tiene cada jugador al inicio del juego?',
        opciones: ['1) 6', '2) 7', '3) 8', '4) 9'],
        respuestaCorrecta: 3,
    },
    {
        pregunta: '¿Qué pieza empieza en las esquinas del tablero?',
        opciones: ['1) Torre', '2) Rey', '3) Alfil', '4) Caballo'],
        respuestaCorrecta: 1,
    },
    {
        pregunta: '¿Cuál de las siguientes piezas se mueve diagonalmente?',
        opciones: ['1) Torre', '2) Alfil', '3) Rey', '4) Caballo'],
        respuestaCorrecta: 2,
    },
];

function mostrarPregunta(index) {
    console.log('\nPregunta ' + (index + 1) + ': ' + preguntas[index].pregunta);
    for (var i = 0; i < preguntas[index].opciones.length; i++) {
        console.log(preguntas[index].opciones[i]);
    }
}

function gestionarRespuesta(index, continuar) {
    rl.question('Selecciona la opción correcta (1-4): ', function (respuesta) {
        var respuestaNumerica = parseInt(respuesta, 10);

        if (respuestaNumerica >= 1 && respuestaNumerica <= 4) {
            respuestasUsuario.push(respuestaNumerica);
            if (respuestaNumerica === preguntas[index].respuestaCorrecta) {
                console.log('¡Correcto!');
                puntaje++;
            } else {
                console.log('Incorrecto. La respuesta correcta era: ' + preguntas[index].opciones[preguntas[index].respuestaCorrecta - 1]);
            }
            continuar();
        } else {
            console.log('Por favor, selecciona una opción válida (1-4).');
            gestionarRespuesta(index, continuar);
        }
    });
}

function mostrarResumen() {
    console.log('\n--- Resumen del cuestionario ---');
    for (var i = 0; i < preguntas.length; i++) {
        console.log('\nPregunta ' + (i + 1) + ': ' + preguntas[i].pregunta);
        console.log('Tu respuesta: ' + preguntas[i].opciones[respuestasUsuario[i] - 1]);
        console.log('Respuesta correcta: ' + preguntas[i].opciones[preguntas[i].respuestaCorrecta - 1]);
    }
    console.log('\nTu puntaje final es: ' + puntaje + '/' + preguntas.length);
}

function iniciarCuestionario(index) {
    if (index < preguntas.length) {
        mostrarPregunta(index);
        gestionarRespuesta(index, function () {
            iniciarCuestionario(index + 1);
        });
    } else {
        mostrarResumen();
        rl.close();
    }
}

console.log('¡Bienvenido al cuestionario de ajedrez!');
iniciarCuestionario(0);