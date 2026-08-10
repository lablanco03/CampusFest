document.addEventListener('DOMContentLoaded', () => {
    cargarActividades();
    cargarStands();
    cargarInscripciones();
    cargarReportes();

    document.querySelector('.btn_cerrar_sesion')?.addEventListener('click', manejarCierreSesion);
});

async function fetchProtegido(url, opciones = {}) {
    const respuesta = await fetch(url, {
        ...opciones,
        headers: { 'Content-Type': 'application/json', ...(opciones.headers || {}) }
    });

    if (respuesta.status === 401) {
        window.location.href = 'login_admin.html';
        return null;
    }

    return respuesta;
}

async function manejarCierreSesion(evento) {
    evento.preventDefault();
    await fetchProtegido('/api/admin/logout', { method: 'POST' });
    window.location.href = 'login_admin.html';
}

function claseCategoria(categoria) {
    return categoria
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function formatearFecha(fechaISO) {
    return new Date(fechaISO).toLocaleDateString('es-CR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });
}

// ---------- ACTIVIDADES ----------

async function cargarActividades() {
    const respuesta = await fetchProtegido('/api/admin/actividades');
    if (!respuesta) return;

    const actividades = await respuesta.json();
    const cuerpoTabla = document.querySelector('#actividades tbody');
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = '';

    actividades.forEach((actividad, indice) => {
        const clase = claseCategoria(actividad.categoria);
        const canceladaTexto = actividad.estado === 'Cancelada' ? ' (Cancelada)' : '';

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${actividad.nombre}</td>
            <td><span class="cat_badge cat_${clase}">${actividad.categoria}</span></td>
            <td>${formatearFecha(actividad.fecha)}</td>
            <td>${actividad.cuposOcupados}/${actividad.cupoMaximo}${canceladaTexto}</td>
            <td class="acciones">
                <span class="icono_accion btn-editar-actividad" data-id="${actividad._id}"><i data-lucide="edit"></i></span>
                <span class="icono_accion btn-toggle-actividad" data-id="${actividad._id}"><i data-lucide="rotate-ccw"></i></span>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    lucide.createIcons();

    document.querySelectorAll('.btn-toggle-actividad').forEach((boton) => {
        boton.addEventListener('click', async () => {
            const id = boton.dataset.id;
            if (!confirm('¿Cambiar el estado (activa/cancelada) de esta actividad?')) return;

            const respuestaToggle = await fetchProtegido(`/api/admin/actividades/${id}/estado`, { method: 'PATCH' });
            if (respuestaToggle && respuestaToggle.ok) cargarActividades();
        });
    });

    document.querySelectorAll('.btn-editar-actividad').forEach((boton) => {
        boton.addEventListener('click', () => abrirEdicionActividad(boton.dataset.id, actividades));
    });
}

async function abrirEdicionActividad(id, actividades) {
    const actividad = actividades.find((a) => a._id === id);
    if (!actividad) return;

    const lugar = prompt('Lugar:', actividad.lugar);
    if (lugar === null) return;

    const descripcion = prompt('Descripción:', actividad.descripcion);
    if (descripcion === null) return;

    const requisitos = prompt('Requisitos:', actividad.requisitos);
    if (requisitos === null) return;

    const cupoMaximo = prompt('Cupo máximo:', actividad.cupoMaximo);
    if (cupoMaximo === null) return;

    const respuesta = await fetchProtegido(`/api/admin/actividades/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ lugar, descripcion, requisitos, cupoMaximo: Number(cupoMaximo) })
    });

    if (respuesta && respuesta.ok) {
        cargarActividades();
    } else if (respuesta) {
        const datos = await respuesta.json();
        alert(datos.error || 'No se pudo actualizar la actividad.');
    }
}

// ---------- STANDS ----------

async function cargarStands() {
    const respuesta = await fetchProtegido('/api/admin/stands');
    if (!respuesta) return;

    const stands = await respuesta.json();
    const cuerpoTabla = document.querySelector('#stands tbody');
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = '';

    stands.forEach((stand, indice) => {
        const clase = claseCategoria(stand.categoria);
        const canceladoTexto = stand.estado === 'Cancelado' ? ' (Cancelado)' : '';

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${stand.nombre}</td>
            <td><span class="cat_badge cat_${clase}">${stand.categoria}</span></td>
            <td>${stand.responsable}</td>
            <td>${stand.ubicacion}${canceladoTexto}</td>
            <td class="acciones">
                <span class="icono_accion btn-editar-stand" data-id="${stand._id}"><i data-lucide="edit"></i></span>
                <span class="icono_accion btn-toggle-stand" data-id="${stand._id}"><i data-lucide="rotate-ccw"></i></span>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    lucide.createIcons();

    document.querySelectorAll('.btn-toggle-stand').forEach((boton) => {
        boton.addEventListener('click', async () => {
            const id = boton.dataset.id;
            if (!confirm('¿Cambiar el estado (activo/cancelado) de este stand?')) return;

            const respuestaToggle = await fetchProtegido(`/api/admin/stands/${id}/estado`, { method: 'PATCH' });
            if (respuestaToggle && respuestaToggle.ok) cargarStands();
        });
    });

    document.querySelectorAll('.btn-editar-stand').forEach((boton) => {
        boton.addEventListener('click', () => abrirEdicionStand(boton.dataset.id, stands));
    });
}

async function abrirEdicionStand(id, stands) {
    const stand = stands.find((s) => s._id === id);
    if (!stand) return;

    const responsable = prompt('Responsable:', stand.responsable);
    if (responsable === null) return;

    const ubicacion = prompt('Ubicación:', stand.ubicacion);
    if (ubicacion === null) return;

    const descripcion = prompt('Descripción:', stand.descripcion);
    if (descripcion === null) return;

    const respuesta = await fetchProtegido(`/api/admin/stands/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ responsable, ubicacion, descripcion })
    });

    if (respuesta && respuesta.ok) {
        cargarStands();
    } else if (respuesta) {
        const datos = await respuesta.json();
        alert(datos.error || 'No se pudo actualizar el stand.');
    }
}

// ---------- INSCRIPCIONES ----------

async function cargarInscripciones() {
    const respuesta = await fetchProtegido('/api/admin/inscripciones');
    if (!respuesta) return;

    const inscripciones = await respuesta.json();
    const cuerpoTabla = document.querySelector('#inscripciones tbody');
    if (!cuerpoTabla) return;

    cuerpoTabla.innerHTML = '';

    inscripciones.forEach((inscripcion, indice) => {
        const inicial = inscripcion.nombreCompleto.charAt(0).toUpperCase();
        const nombreActividad = inscripcion.actividad?.nombre || '(actividad eliminada)';

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td><span class="avatar_inicial">${inicial}</span> ${inscripcion.nombreCompleto}</td>
            <td>${inscripcion.identificacion}</td>
            <td>${inscripcion.correoElectronico}</td>
            <td>${nombreActividad}</td>
            <td>${inscripcion.carreraGrupo}</td>
            <td>${formatearFecha(inscripcion.createdAt)}</td>
            <td class="acciones">
                <span class="icono_accion btn-eliminar-inscripcion" data-id="${inscripcion._id}"><i data-lucide="x"></i></span>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    lucide.createIcons();

    document.querySelectorAll('.btn-eliminar-inscripcion').forEach((boton) => {
        boton.addEventListener('click', async () => {
            const id = boton.dataset.id;
            if (!confirm('¿Eliminar esta inscripción? Esto libera el cupo de la actividad.')) return;

            const respuestaEliminar = await fetchProtegido(`/api/admin/inscripciones/${id}`, { method: 'DELETE' });
            if (respuestaEliminar && respuestaEliminar.ok) cargarInscripciones();
        });
    });
}

// ---------- REPORTES (RF-21) ----------

async function cargarReportes() {
    const respuesta = await fetchProtegido('/api/admin/reportes');
    if (!respuesta) return;

    const reportes = await respuesta.json();

    const tarjetas = document.querySelectorAll('.tarjeta_numero');
    if (tarjetas.length >= 3) {
        tarjetas[0].textContent = reportes.totales.actividades;
        tarjetas[1].textContent = reportes.totales.inscripciones;
        tarjetas[2].textContent = reportes.totales.stands;
    }

    // Bloque 1: "Actividades por Categoría"
    const bloqueCategoria = document.querySelectorAll('.reporte_bloque')[0];
    if (bloqueCategoria) {
        const totalActividades = reportes.totales.actividades || 1;
        const filasHtml = Object.entries(reportes.porCategoria)
            .map(([categoria, cantidad]) => {
                const porcentaje = Math.round((cantidad / totalActividades) * 100);
                const clase = claseCategoria(categoria);
                return `
                    <div class="barra_item">
                        <div class="barra_label"><span>${categoria}</span><span>${cantidad} (${porcentaje}%)</span></div>
                        <div class="barra_fondo"><div class="barra_relleno bg_${clase}" style="width:${porcentaje}%"></div></div>
                    </div>
                `;
            })
            .join('');

        const titulo = bloqueCategoria.querySelector('h3');
        bloqueCategoria.innerHTML = '';
        if (titulo) bloqueCategoria.appendChild(titulo);
        bloqueCategoria.insertAdjacentHTML('beforeend', filasHtml);
    }

    // Bloque 2: "Ocupación por Actividad"
    const bloqueOcupacion = document.querySelectorAll('.reporte_bloque')[1];
    if (bloqueOcupacion) {
        const filasHtml = reportes.ocupacionPorActividad
            .map((item) => {
                const clase = claseCategoria(item.categoria);
                return `
                    <div class="barra_item">
                        <div class="barra_label"><span>${item.nombre}</span><span>${item.porcentaje}%</span></div>
                        <div class="barra_fondo"><div class="barra_relleno bg_${clase}" style="width:${item.porcentaje}%"></div></div>
                    </div>
                `;
            })
            .join('');

        const titulo = bloqueOcupacion.querySelector('h3');
        bloqueOcupacion.innerHTML = '';
        if (titulo) bloqueOcupacion.appendChild(titulo);
        bloqueOcupacion.insertAdjacentHTML('beforeend', filasHtml);
    }
}