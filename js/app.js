const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnDesayunos = document.querySelector('.desayunos');
const btnTortas = document.querySelector('.tortas');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platillos();
});

const eventos = () => {
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if (document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);

}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen => {

    observer.observe(imagen);
});
const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function () {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}
const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo, platillo]);

    const desayunos = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo') === 'desayuno');
    const tortas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'torta');
    const postres = platillosArreglo.filter(postres => postres.getAttribute('data-platillo') === 'postres');

    mostrarPlatillos(desayunos, tortas, postres, platillosArreglo);

}

const mostrarPlatillos = (desayunos, tortas, postres, todos) => {
    btnDesayunos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        desayunos.forEach(desayunos => contenedorPlatillos.appendChild(desayunos));
    });

    btnTortas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        tortas.forEach(tortas => contenedorPlatillos.appendChild(tortas));
    });

    btnPostres.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postres => contenedorPlatillos.appendChild(postres));
    });

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo => contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}