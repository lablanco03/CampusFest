const cuerpoAgenda = document.getElementById("cuerpoAgenda");
const btnSabado = document.getElementById("btnSabado");
const btnDomingo = document.getElementById("btnDomingo");

let actividadesAgenda = [];

const mapaFechaDia = {
    sabado: "2026-06-14",
    domingo: "2026-06-15"
};

function obtenerClaseCategoria(categoria) {
    switch (categoria) {
        case "Tecnológico":
            return "tecnologico";
        case "Artístico":
            return "artistico";
        case "Deportivo":
            return "deportivo";
        case "Cultural":
            return "cultural";
        case "Gastronómico":
            return "gastronomico";
        case "Recreativo":
            return "recreativo";
        default:
            return "tecnologico";
    }
}

function calcularEstado(actividad) {
    if (actividad.estado === "Cancelada") {
        return "Cancelado";
    }
    if (actividad.cuposOcupados >= actividad.cupoMaximo) {
        return "Lleno";
    }
    return "Disponible";
}

function obtenerClaseEstado(estado) {
    switch (estado) {
        case "Disponible":
            return "disponible";
        case "Lleno":
            return "lleno";
        default:
            return "cancelado";
    }
}

function cargarAgenda(dia) {
    cuerpoAgenda.innerHTML = "";

    const fechaDia = mapaFechaDia[dia];
    const actividadesDelDia = actividadesAgenda.filter(function (actividad) {
        const fechaActividad = new Date(actividad.fecha).toISOString().slice(0, 10);
        return fechaActividad === fechaDia;
    });

    if (actividadesDelDia.length === 0) {
        cuerpoAgenda.innerHTML = "<p>No hay actividades programadas para este día.</p>";
        return;
    }

    actividadesDelDia.forEach(function (actividad) {
        const estadoTexto = calcularEstado(actividad);

        cuerpoAgenda.innerHTML += `
            <div class="fila_agenda">
                <div class="agenda_hora">
                    <strong>${actividad.horaInicio}</strong>
                    <span>hasta ${actividad.horaFin}</span>
                </div>
                <div>
                    ${actividad.nombre}
                </div>
                <div class="agenda_lugar">
                    <i data-lucide="map-pin"></i>
                    ${actividad.lugar}
                </div>
                <div>
                    <span class="card_badge_categoria ${obtenerClaseCategoria(actividad.categoria)}">
                        ${actividad.categoria}
                    </span>
                </div>
                <div>
                    <span class="card_badge_estado ${obtenerClaseEstado(estadoTexto)}">
                        ${estadoTexto}
                    </span>
                </div>
            </div>
        `;
    });

    lucide.createIcons();
}

async function inicializarAgenda() {
    try {
        const respuesta = await fetch("/api/agenda");
        actividadesAgenda = await respuesta.json();
        cargarAgenda("sabado");
    } catch (error) {
        console.error("Error al cargar la agenda:", error.message);
        cuerpoAgenda.innerHTML = "<p>No fue posible cargar la agenda.</p>";
    }
}

btnSabado.addEventListener("click", function () {
    btnSabado.classList.add("activo");
    btnDomingo.classList.remove("activo");
    cargarAgenda("sabado");
});

btnDomingo.addEventListener("click", function () {
    btnDomingo.classList.add("activo");
    btnSabado.classList.remove("activo");
    cargarAgenda("domingo");
});

inicializarAgenda();