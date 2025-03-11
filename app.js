let amigos = [];
let amigosSorteados = [];

window.onload = function() {
    iniciarJuego();
};

function iniciarJuego() {
    amigos = [];
    amigosSorteados = [];
    mostrarListaAmigos();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ""; // Limpiar cualquier mensaje anterior
}

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.length >= 10) {
        alert("No puedes agregar más de 10 amigos.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre);
    mostrarListaAmigos();

    inputAmigo.value = ""; // Limpiar el campo después de agregar
}

function mostrarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ""; // Limpiar la lista antes de mostrarla

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("Agrega al menos un amigo antes de sortear.");
        return;
    }

    let amigoSorteado;
    do {
        amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    } while (amigosSorteados.includes(amigoSorteado));

    amigosSorteados.push(amigoSorteado);

    // Elimino amigo sorteado de la lista 
    amigos = amigos.filter(amigo => amigo !== amigoSorteado);
    mostrarListaAmigos(); // Actualizo la lista de amigos

    const resultado = document.getElementById('resultado');
    const mensaje = document.createElement('li');
    mensaje.textContent = `🎁 Tu amigo secreto es: ${amigoSorteado}`;
    resultado.appendChild(mensaje);

    if (amigos.length === 0) {
        const mensajeFinal = document.createElement('li');
        mensajeFinal.textContent = "🎉 ¡Ya se han sorteado todos los amigos!";
        resultado.appendChild(mensajeFinal);
        lanzarConfettiYSonido(); // Llamar a la función de confetti y sonido
        setTimeout(finalizarJuego, 5000); // Limpiar todo después de 5 segundos
    }
}

function finalizarJuego() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ""; // Limpiar la lista de resultados
    const mensajeNuevoJuego = document.createElement('li');
    mensajeNuevoJuego.textContent = "🔄 Reinicia el juego";
    resultado.appendChild(mensajeNuevoJuego);
    setTimeout(iniciarJuego, 5000); // Reiniciar el juego después de 5 segundos
}

function lanzarConfettiYSonido() {
    // Lanzar confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Reproducir el sonido de trompeta
    const audioFestejo = document.getElementById('audioFestejo');
    audioFestejo.play().catch(error => {
        console.log('No se pudo reproducir el audio automáticamente: ', error);
        document.body.addEventListener('click', () => {
            audioFestejo.play();
        }, { once: true });
    });
}
