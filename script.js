let tiempoRestante = 30;
let temporizadorInterval;

function iniciarTemporizador() {
    tiempoRestante = 30;
    document.getElementById('tiempo-restante').textContent = tiempoRestante;
    temporizadorInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo-restante').textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            avanzarPregunta();
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(temporizadorInterval);
}

// Obtener elementos del DOM
const inicioPantalla = document.getElementById('inicio');
const comenzarBtn = document.getElementById('comenzar-btn');
const preguntasPantalla = document.getElementById('preguntas');

// Variables de control del quiz
let preguntaActual = 0;
let puntaje = 0;
let respuestasUsuario = [];

// Array de preguntas
const preguntas = [
    {
        pregunta: "¿Cuál es el lenguaje de marcado utilizado para crear páginas web?",
        opciones: ["JavaScript", "HTML", "CSS", "Python"],
        respuesta: "HTML",
        
    },
    {
        pregunta: "¿Cuál es el símbolo para seleccionar un elemento por clase en CSS?",
        opciones: [".", "#", "*", "&"],
        respuesta: ".",
        
    },
    {
        pregunta: "¿Qué método se utiliza para añadir un elemento al final de un array en JavaScript?",
        opciones: ["push()", "pop()", "shift()", "unshift()"],
        respuesta: "push()",
        
    },
    {
        pregunta: "¿Qué propiedad en CSS se utiliza para cambiar el color de fondo de un elemento?",
        opciones: ["background-color", "color", "font-color", "border-color"],
        respuesta: "background-color",
    },    
        
    {
        pregunta: "¿Cuál es el lenguaje de programación que se ejecuta en el lado del servidor?",
        opciones: ["HTML", "CSS", "PHP", "SQL"],
        respuesta: "PHP",
        
    },
    {
        pregunta: "¿Qué etiqueta HTML se usa para crear un enlace?",
        opciones: ["<div>", "<a>", "<link>", "<href>"],
        respuesta: "<a>",
       
    },
    {
        pregunta: "¿Qué propiedad en CSS controla el tamaño del texto?",
        opciones: ["text-size", "font-size", "size", "font-weight"],
        respuesta: "font-size",
        
    },
    {
        pregunta: "¿Qué método en JavaScript se utiliza para unir dos o más arrays?",
        opciones: ["concat()", "join()", "push()", "merge()"],
        respuesta: "concat()",
        
    },
    {
        pregunta: "¿Qué significa 'HTML'?",
        opciones: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Tool Markup Language"],
        respuesta: "Hyper Text Markup Language",
        
    },
    {
        pregunta: "¿Qué estructura de control se usa en JavaScript para repetir un bloque de código un número determinado de veces?",
        opciones: ["for", "if", "while", "switch"],
        respuesta: "for",
        
    }
];

// Orden aleatorio de preguntas
function mezclarPreguntas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Evento para comenzar el quiz
comenzarBtn.addEventListener('click', () => {
    mezclarPreguntas(preguntas);
    inicioPantalla.classList.add('ocultar');
    preguntasPantalla.classList.remove('ocultar');
    mostrarPregunta();
    iniciarTemporizador();
});

const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesLista = document.getElementById('opciones-lista');

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesLista.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const li = document.createElement('li');
        li.textContent = opcion;
        li.classList.add('opcion');
        li.addEventListener('click', seleccionarOpcion);
        opcionesLista.appendChild(li);
    });

    actualizarBarraProgreso();
}

let opcionSeleccionada = null;

function seleccionarOpcion(e) {
    // Remover la clase 'seleccionado' de todas las opciones
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(op => op.classList.remove('seleccionado'));

    // Añadir la clase 'seleccionado' a la opción clicada
    e.target.classList.add('seleccionado');
    opcionSeleccionada = e.target.textContent;
}

const siguienteBtn = document.getElementById('siguiente-btn');

siguienteBtn.addEventListener('click', () => {
    pausarTemporizador();
    verificarRespuesta();
    avanzarPregunta();
});

function verificarRespuesta() {
    const pregunta = preguntas[preguntaActual];
    const esCorrecto = opcionSeleccionada === pregunta.respuesta;
    
    respuestasUsuario.push({
        pregunta: pregunta.pregunta,
        seleccionada: opcionSeleccionada,
        correcta: pregunta.respuesta,
        esCorrecto: esCorrecto
    });

    if (esCorrecto) {
        puntaje++;
        mostrarRetroalimentacion(true);
    } else {
        mostrarRetroalimentacion(false);
    }
    opcionSeleccionada = null;
}

function avanzarPregunta() {
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
        iniciarTemporizador();
    } else {
        mostrarResultados();
    }
}

// Obtener elementos de la pantalla de resultados
const resultadosPantalla = document.getElementById('resultados');
const puntajeFinal = document.getElementById('puntaje-final');
const totalPreguntas = document.getElementById('total-preguntas');
const reiniciarBtn = document.getElementById('reiniciar-btn');
const retroalimentacion = document.getElementById('retroalimentacion');
const mensajeFinal = document.getElementById('mensaje-final');
const barraProgreso = document.getElementById('barra-progreso');

function mostrarResultados() {
    preguntasPantalla.classList.add('ocultar');
    resultadosPantalla.classList.remove('ocultar');
    puntajeFinal.textContent = puntaje;
    totalPreguntas.textContent = preguntas.length;

    const porcentaje = (puntaje / preguntas.length) * 100;
    if (porcentaje === 100) {
        mensajeFinal.textContent = "¡Excelente! Respondiste todas las preguntas correctamente.";
    } else if (porcentaje >= 70) {
        mensajeFinal.textContent = "¡Muy bien! Tienes un buen conocimiento.";
    } else if (porcentaje >= 40) {
        mensajeFinal.textContent = "Está bien, pero puedes mejorar.";
    } else {
        mensajeFinal.textContent = "Necesitas estudiar más. ¡Inténtalo de nuevo!";
    }

    // Mostrar detalles de respuestas incorrectas
    const detalles = respuestasUsuario.filter(res => !res.esCorrecto);
    if (detalles.length > 0) {
        resultadosPantalla.innerHTML += '<h3>Revisa tus respuestas incorrectas:</h3>';
        detalles.forEach(det => {
            resultadosPantalla.innerHTML += `
                <p><strong>Pregunta:</strong> ${det.pregunta}</p>
                <p><strong>Tu respuesta:</strong> ${det.seleccionada}</p>
                <p><strong>Respuesta correcta:</strong> ${det.correcta}</p>
            `;
        });
    }

    // Guardar puntaje en localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push({
        fecha: new Date().toLocaleString(),
        puntaje: puntaje,
        total: preguntas.length
    });
    localStorage.setItem('historial', JSON.stringify(historial));
}

reiniciarBtn.addEventListener('click', reiniciarQuiz);

function reiniciarQuiz() {
    resultadosPantalla.classList.add('ocultar');
    inicioPantalla.classList.remove('ocultar');
    preguntaActual = 0;
    puntaje = 0;
    respuestasUsuario = [];
    actualizarBarraProgreso();
}

function mostrarRetroalimentacion(esCorrecto) {
    retroalimentacion.classList.remove('ocultar');
    if (esCorrecto) {
        retroalimentacion.textContent = "¡Correcto!";
        retroalimentacion.classList.add('correcto');
    } else {
        retroalimentacion.textContent = `Incorrecto. La respuesta correcta era: ${preguntas[preguntaActual].respuesta}`;
        retroalimentacion.classList.add('incorrecto');
    }
    setTimeout(() => {
        retroalimentacion.classList.add('ocultar');
        retroalimentacion.classList.remove('correcto', 'incorrecto');
    }, 2000);
}

function actualizarBarraProgreso() {
    const porcentaje = ((preguntaActual) / preguntas.length) * 100;
    barraProgreso.style.width = `${porcentaje}%`;
}
