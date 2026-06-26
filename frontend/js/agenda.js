const actividadesAgenda = [
    {
        nombre: 'Hackathon Universitario',
        fecha: '14 Junio 2026',
        hora: '08:00 - 20:00',
        lugar: 'Auditorio Principal',
        estado: 'Disponible'
    },
    {
        nombre: 'Torneo de Fútbol Interfacultades',
        fecha: '15 Junio 2026',
        hora: '09:00 - 18:00',
        lugar: 'Canchas Deportivas Norte',
        estado: 'Lleno'
    },
    {
        nombre: 'Exposición de Arte Contemporáneo',
        fecha: '14 Junio 2026',
        hora: '10:00 - 17:00',
        lugar: 'Galería Central',
        estado: 'Disponible'
    }
];

const contenedorAgenda =
    document.getElementById('contenedorAgenda');

function cargarAgenda(){

    actividadesAgenda.forEach(function(actividad){

        let claseEstado = 'estado_disponible';

        if(actividad.estado === 'Lleno'){
            claseEstado = 'estado_lleno';
        }

        if(actividad.estado === 'Cancelado'){
            claseEstado = 'estado_cancelado';
        }

        contenedorAgenda.innerHTML += `
            <div class="card_agenda">
                <h3>${actividad.nombre}</h3>
                <p><strong>Fecha:</strong> ${actividad.fecha}</p>
                <p><strong>Hora:</strong> ${actividad.hora}</p>
                <p><strong>Lugar:</strong> ${actividad.lugar}</p>
                <p class="${claseEstado}">
                    ${actividad.estado}
                </p>
            </div>
        `;
    });
}

cargarAgenda();