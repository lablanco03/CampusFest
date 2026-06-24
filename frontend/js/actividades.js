// ============================================================
// actividades.js
// Logica de filtrado por categoria y busqueda de actividades
// Pagina: actividades.html (RF-FE-02)
// ============================================================

const txtBuscarActividad = document.getElementById('txtBuscarActividad');
const filtrosCategoria = document.getElementById('filtrosCategoria');
const gridActividades = document.getElementById('gridActividades');
const contadorResultados = document.getElementById('contadorResultados');
const sinResultados = document.getElementById('sinResultados');

const tarjetasActividad = gridActividades.querySelectorAll('.card_actividad');

let categoriaActiva = 'todas';

/**
 * Aplica el filtro de categoria y el texto de busqueda sobre
 * todas las tarjetas de actividades, mostrando u ocultando
 * cada una segun corresponda.
 */
function filtrarActividades() {
    const textoBusqueda = txtBuscarActividad.value.trim().toLowerCase();
    let actividadesVisibles = 0;

    tarjetasActividad.forEach(function (tarjeta) {
        const categoriaTarjeta = tarjeta.dataset.categoria;
        const nombreTarjeta = tarjeta.dataset.nombre;
        const lugarTarjeta = tarjeta.dataset.lugar;

        const coincideCategoria =
            categoriaActiva === 'todas' || categoriaTarjeta === categoriaActiva;

        const coincideBusqueda =
            textoBusqueda === '' ||
            nombreTarjeta.includes(textoBusqueda) ||
            lugarTarjeta.includes(textoBusqueda);

        const debeMostrarse = coincideCategoria && coincideBusqueda;

        tarjeta.style.display = debeMostrarse ? '' : 'none';

        if (debeMostrarse) {
            actividadesVisibles++;
        }
    });

    actualizarContador(actividadesVisibles);
}

/**
 * Actualiza el texto del contador de resultados y muestra
 * el mensaje de "sin resultados" cuando corresponde.
 */
function actualizarContador(cantidad) {
    const textoPlural = cantidad === 1 ? 'actividad encontrada' : 'actividades encontradas';
    contadorResultados.textContent = cantidad + ' ' + textoPlural;

    sinResultados.style.display = cantidad === 0 ? 'block' : 'none';
}

/**
 * Activa visualmente el boton de categoria seleccionado
 * y desactiva los demas.
 */
function activarBotonCategoria(botonSeleccionado) {
    const botones = filtrosCategoria.querySelectorAll('.filtro_btn');
    botones.forEach(function (boton) {
        boton.classList.remove('activo');
    });
    botonSeleccionado.classList.add('activo');
}

// Evento: clic en cualquier boton de categoria
filtrosCategoria.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.filtro_btn');
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria;
    activarBotonCategoria(boton);
    filtrarActividades();
});

// Evento: escribir en el buscador (filtra en tiempo real)
txtBuscarActividad.addEventListener('input', filtrarActividades);

// Filtrado inicial al cargar la pagina
filtrarActividades();
