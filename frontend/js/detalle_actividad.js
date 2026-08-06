const claseCategoria = {
    'Tecnológico': 'tecnologico',
    'Deportivo': 'deportivo',
    'Cultural': 'cultural',
    'Artístico': 'artistico',
    'Gastronómico': 'gastronomico'
};

async function cargarDetalleActividad() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');

    if (!id) {
        document.querySelector('main').innerHTML = '<p>Actividad no especificada.</p>';
        return;
    }

    try {
        const respuesta = await fetch('/api/actividades/' + id);

        if (!respuesta.ok) {
            document.querySelector('main').innerHTML = '<p>Actividad no encontrada.</p>';
            return;
        }

        const actividad = await respuesta.json();
        const cupoDisponible = actividad.cupoMaximo - actividad.cuposOcupados;
        const lleno = cupoDisponible <= 0;
        const categoriaClase = claseCategoria[actividad.categoria] || 'tecnologico';
        const porcentaje = Math.round((actividad.cuposOcupados / actividad.cupoMaximo) * 100);

        document.getElementById('detalle_imagen').src = actividad.imagen;
        document.getElementById('detalle_imagen').alt = actividad.nombre;
        document.getElementById('detalle_categoria').textContent = actividad.categoria;
        document.getElementById('detalle_categoria').classList.add(categoriaClase);
        document.getElementById('detalle_nombre').textContent = actividad.nombre;

        document.getElementById('detalle_fecha').textContent = new Date(actividad.fecha)
            .toLocaleDateString('es-CR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
        document.getElementById('detalle_horario').textContent = actividad.horaInicio + ' - ' + actividad.horaFin;
        document.getElementById('detalle_lugar').textContent = actividad.lugar;
        document.getElementById('detalle_cupo_maximo').textContent = actividad.cupoMaximo + ' personas';

        document.getElementById('detalle_descripcion').textContent = actividad.descripcion;
        document.getElementById('detalle_requisitos').textContent = actividad.requisitos;

        document.getElementById('detalle_inscritos').textContent = actividad.cuposOcupados + '/' + actividad.cupoMaximo;
        document.getElementById('detalle_barra_relleno').style.width = porcentaje + '%';

        const spanCupos = document.getElementById('detalle_cupos_disponibles');
        const botonInscribirme = document.getElementById('detalle_btn_inscribirme');

        if (lleno) {
            spanCupos.textContent = 'Sin cupos disponibles';
            botonInscribirme.textContent = 'Sin cupos';
            botonInscribirme.classList.add('btn_deshabilitado');
            botonInscribirme.removeAttribute('href');
        } else {
            spanCupos.textContent = cupoDisponible + ' cupos disponibles';
            botonInscribirme.href = 'inscripcion.html?id=' + actividad._id;
        }

        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (error) {
        console.error('Error al cargar el detalle de la actividad:', error.message);
        document.querySelector('main').innerHTML = '<p>No fue posible cargar la actividad.</p>';
    }
}

cargarDetalleActividad();