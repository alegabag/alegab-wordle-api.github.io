let intentos = 6;
let palabra;

fetch("https://random-word.ryanrk.com/api/en/word/random/?length=5")
    .then( response => response.json())
    .then( response => {
        palabra = response[0].toUpperCase();
    })
    .catch(err => alert("ups, sucedió un error, intentelo de nuevo más tarde"));

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);


function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1");
        mostrarBotonReiniciar();
        mostrarPalabra();
        return;
    }

    if (INTENTO.length !== 5) {
        alert("Debe ingresar solo palabras con 5 letras");
        return
    }

    if (contieneNumeros(INTENTO)) {
        alert("No se permiten números");
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";

    for (let i in palabra) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#79B851";
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#F3C237";
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#A4AEC4";
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    if(intentos === 0) {
        terminar("<h1>PERDISTE!😖</h1></h1>");
        mostrarBotonReiniciar();
        mostrarPalabra();
    }

}

const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento() {
    let intento = document.getElementById("guess-input")
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function tieneLetrasRepetidas(palabra) {
    const letras = new Set();
    for (let letra of palabra) {
        if (letras.has(letra)) {
            return true;
        }
        letras.add(letra);
    }
    return false;
}

function contieneNumeros(palabra) {
    return /\d/.test(palabra);
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true; 
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}

function mostrarBotonReiniciar() {
    const REINICIAR = document.createElement("button");
    REINICIAR.className = "bot-reiniciar";
    REINICIAR.innerHTML = "Jugar de Nuevo";
    REINICIAR.onclick = reiniciarJuego;
    document.body.appendChild(REINICIAR)
}

function reiniciarJuego() {
    intentos = 6;
    fetch("https://random-word.ryanrk.com/api/en/word/random/?length=5")
    .then( response => response.json())
    .then( response => {
        palabra = response[0].toUpperCase();
    })
    .catch(err => alert("ups, sucedió un error, intentelo de nuevo más tarde"));
    document.getElementById("grid").innerHTML = "";
    document.getElementById("guesses").innerHTML = "";
    document.getElementById("guess-input").value = "";
    document.getElementById("guess-input").disabled = false;
    document.getElementById("guess-button").disabled = false;

    const BOTON = document.querySelector(".bot-reiniciar");
    if (BOTON) BOTON.remove();
}

function mostrarPalabra() {
    alert("La palabra era: " + palabra);    
}

const modoBtn = document.getElementById('modo-btn');
const body = document.getElementById('body');

modoBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        modoBtn.textContent = 'Modo Claro';
    } else {
        modoBtn.textContent = 'Modo Oscuro';
    }
});