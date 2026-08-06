const txtBuscarActividad = document.getElementById('txtBuscarActividad');
const filtrosCategoria = document.getElementById('filtrosCategoria');
const gridActividades = document.getElementById('gridActividades');
const contadorResultados = document.getElementById('contadorResultados');
const sinResultados = document.getElementById('sinResultados');

let tarjetasActividad = [];
let categoriaActiva = 'todas';

const claseCategoria = {
    'Tecnológico': 'tecnologico',
    'Deportivo': 'deportivo',
    'Cultural': 'cultural',
    'Artístico': 'artistico',
    'Gastronómico': 'gastronomico'
};

function crearTarjetaActividad(actividad) {
    const cupoDisponible = actividad.cupoMaximo - actividad.cuposOcupados;
    const lleno = cupoDisponible <= 0;
    const categoriaClase = claseCategoria[actividad.categoria] || 'tecnologico';
    const porcentaje = Math.round((actividad.cuposOcupados / actividad.cupoMaximo) * 100);

    const articulo = document.createElement('article');
    articulo.className = 'card_actividad';
    articulo.dataset.categoria = categoriaClase;
    articulo.dataset.nombre = actividad.nombre.toLowerCase();
    articulo.dataset.lugar = actividad.lugar.toLowerCase();

    articulo.innerHTML = `
        <div class="card_imagen">
            <img src="${actividad.imagen}" alt="${actividad.nombre}">
            <span class="card_badge_categoria ${categoriaClase}">${actividad.categoria}</span>
            ${lleno ? '<span class="card_badge_estado lleno">Lleno</span>' : ''}
        </div>
        <div class="card_cuerpo">
            <h3>${actividad.nombre}</h3>
            <p class="card_meta">
                <i data-lucide="calendar-days"></i>
                ${new Date(actividad.fecha).toLocaleDateString('es-CR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <p class="card_meta">
                <i data-lucide="clock"></i>
                ${actividad.horaInicio} - ${actividad.horaFin}
            </p>
            <p class="card_meta">
                <i data-lucide="map-pin"></i>
                ${actividad.lugar}
            </p>
            <div class="card_barra_cupo">
                <div class="card_barra_cupo_relleno" style="width:${porcentaje}%; background-color: var(--color-support1);"></div>
            </div>
            <p class="card_texto_cupo">${actividad.cuposOcupados}/${actividad.cupoMaximo} cupos</p>
            ${lleno
                ? '<span class="card_btn_deshabilitado">Sin cupos</span>'
                : `<a href="detalle_actividad.html?id=${actividad._id}" class="card_btn_detalle">Ver detalle →</a>`
            }
        </div>
    `;

    return articulo;
}

async function cargarActividades() {
    try {
        const respuesta = await fetch('/api/actividades');
        const actividades = await respuesta.json();

        gridActividades.innerHTML = '';
        actividades.forEach(function (actividad) {
            gridActividades.appendChild(crearTarjetaActividad(actividad));
        });

        tarjetasActividad = gridActividades.querySelectorAll('.card_actividad');

        if (window.lucide) {
            lucide.createIcons();
        }

        filtrarActividades();
    } catch (error) {
        console.error('Error al cargar actividades:', error.message);
        gridActividades.innerHTML = '<p>No fue posible cargar las actividades.</p>';
    }
}

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

function actualizarContador(cantidad) {
    const textoPlural = cantidad === 1 ? 'actividad encontrada' : 'actividades encontradas';
    contadorResultados.textContent = cantidad + ' ' + textoPlural;
    sinResultados.style.display = cantidad === 0 ? 'block' : 'none';
}

function activarBotonCategoria(botonSeleccionado) {
    const botones = filtrosCategoria.querySelectorAll('.filtro_btn');
    botones.forEach(function (boton) {
        boton.classList.remove('activo');
    });
    botonSeleccionado.classList.add('activo');
}

filtrosCategoria.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.filtro_btn');
    if (!boton) return;
    categoriaActiva = boton.dataset.categoria;
    activarBotonCategoria(boton);
    filtrarActividades();
});

txtBuscarActividad.addEventListener('input', filtrarActividades);

cargarActividades();