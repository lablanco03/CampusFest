// ============================================================
// stands.js
// Carga de stands desde la API y renderizado en el grid
// Pagina: stands.html
// ============================================================
const gridStands = document.getElementById('gridStands');
const sinResultadosStands = document.getElementById('sinResultados');

const claseCategoriaStand = {
    'Tecnológico': 'tecnologico',
    'Deportivo': 'deportivo',
    'Cultural': 'cultural',
    'Artístico': 'artistico',
    'Gastronómico': 'gastronomico'
};

/**
 * Construye el nodo HTML de una tarjeta de stand
 * a partir de los datos recibidos de la API.
 */
function crearTarjetaStand(stand) {
    const categoriaClase = claseCategoriaStand[stand.categoria] || 'tecnologico';

    const articulo = document.createElement('article');
    articulo.className = 'card_stand';
    articulo.dataset.categoria = categoriaClase;
    articulo.dataset.nombre = stand.nombre.toLowerCase();
    articulo.dataset.lugar = stand.ubicacion.toLowerCase();

    articulo.innerHTML = `
        <div class="card_imagen">
            <img src="${stand.imagen}" alt="${stand.nombre}">
            <span class="card_badge_categoria ${categoriaClase}">${stand.categoria}</span>
        </div>
        <div class="card_cuerpo">
            <h3>${stand.nombre}</h3>
            <p class="card_meta">
                <i data-lucide="user"></i>
                ${stand.responsable}
            </p>
            <p class="card_meta">
                <i data-lucide="map-pin"></i>
                ${stand.ubicacion}
            </p>
            <p class="card_meta">
                <i data-lucide="clock"></i>
                ${stand.horario}
            </p>
            <p class="card_descripcion">${stand.descripcion}</p>
        </div>
    `;

    return articulo;
}

/**
 * Obtiene los stands desde la API y los pinta en el grid.
 * Solo se muestran los stands en estado Activo.
 */
async function cargarStands() {
    try {
        const respuesta = await fetch('/api/stands');
        const stands = await respuesta.json();
        const standsActivos = stands.filter(function (s) {
            return s.estado === 'Activo';
        });

        gridStands.innerHTML = '';

        if (standsActivos.length === 0) {
            sinResultadosStands.style.display = 'block';
        } else {
            sinResultadosStands.style.display = 'none';
            standsActivos.forEach(function (stand) {
                gridStands.appendChild(crearTarjetaStand(stand));
            });
        }

        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Error al cargar stands:', error.message);
        gridStands.innerHTML = '<p>No fue posible cargar los stands.</p>';
    }
}

cargarStands();