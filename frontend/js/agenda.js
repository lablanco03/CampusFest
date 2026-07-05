const actividadesAgenda = {
    sabado: [
        {
            hora: "08:00",
            fin: "20:00",
            actividad: "Hackathon Universitario",
            lugar: "Auditorio Principal",
            categoria: "Tecnológico",
            estado: "Disponible"
        },
        {
            hora: "10:00",
            fin: "17:00",
            actividad: "Exposición de Arte Contemporáneo",
            lugar: "Galería Central",
            categoria: "Artístico",
            estado: "Disponible"
        },
        {
            hora: "14:00",
            fin: "17:00",
            actividad: "Taller de Robótica e IA",
            lugar: "Laboratorio Ingeniería B3",
            categoria: "Tecnológico",
            estado: "Disponible"
        },
        {
            hora: "15:00",
            fin: "16:30",
            actividad: "Show de Danza Folklórica",
            lugar: "Tarima Principal",
            categoria: "Cultural",
            estado: "Disponible"
        }
    ],

    domingo: [
        {
            hora: "09:00",
            fin: "18:00",
            actividad: "Torneo de Fútbol Interfacultades",
            lugar: "Canchas Deportivas Norte",
            categoria: "Deportivo",
            estado: "Lleno"
        },
        {
            hora: "11:00",
            fin: "12:30",
            actividad: "Festival Gastronómico",
            lugar: "Zona Verde",
            categoria: "Gastronómico",
            estado: "Disponible"
        },
        {
            hora: "16:00",
            fin: "18:00",
            actividad: "Torneo de Videojuegos",
            lugar: "Sala Multimedia",
            categoria: "Recreativo",
            estado: "Cancelado"
        },
        {
            hora: "19:00",
            fin: "23:00",
            actividad: "Concierto de Bandas Universitarias",
            lugar: "Auditorio Principal",
            categoria: "Cultural",
            estado: "Disponible"
        }
    ]
};

const cuerpoAgenda = document.getElementById("cuerpoAgenda");

const btnSabado = document.getElementById("btnSabado");
const btnDomingo = document.getElementById("btnDomingo");

function obtenerClaseCategoria(categoria) {

    switch(categoria){

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

function obtenerClaseEstado(estado){

    switch(estado){

        case "Disponible":
            return "disponible";

        case "Lleno":
            return "lleno";

        default:
            return "cancelado";
    }
}

function cargarAgenda(dia){

    cuerpoAgenda.innerHTML = "";

    actividadesAgenda[dia].forEach(function(actividad){

        cuerpoAgenda.innerHTML += `
            <div class="fila_agenda">

                <div class="agenda_hora">
                    <strong>${actividad.hora}</strong>
                    <span>hasta ${actividad.fin}</span>
                </div>

                <div>
                    ${actividad.actividad}
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
                    <span class="card_badge_estado ${obtenerClaseEstado(actividad.estado)}">
                        ${actividad.estado}
                    </span>
                </div>

            </div>
        `;
    });
    lucide.createIcons();
}

btnSabado.addEventListener("click", function(){

    btnSabado.classList.add("activo");
    btnDomingo.classList.remove("activo");

    cargarAgenda("sabado");
});

btnDomingo.addEventListener("click", function(){

    btnDomingo.classList.add("activo");
    btnSabado.classList.remove("activo");

    cargarAgenda("domingo");
});

cargarAgenda("sabado");