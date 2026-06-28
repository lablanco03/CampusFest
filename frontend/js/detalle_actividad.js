// ============================================================
// detalle_actividad.js
// Muestra los datos de la actividad seleccionada en actividades.html,
// leyendo el parametro "actividad" de la URL.
// Pagina: detalle_actividad.html (RF-FE-03)
// ============================================================

// Datos de muestra de cada actividad (simulados, sin backend en Etapa 1)
const datosActividades = {
    hackathon: {
        nombre: 'Hackathon Universitario',
        categoria: 'tecnologico',
        categoriaTexto: 'Tecnológico',
        imagen: 'img/actividades/hackathon.jpg',
        posicionImagen: 'center 35%',
        fecha: 'Sáb 14 jun 2026',
        horario: '08:00 - 20:00',
        lugar: 'Auditorio Principal',
        cupoMaximo: 120,
        inscritos: 98,
        descripcion: 'Compite en equipos de 3 a 5 personas para desarrollar soluciones ' +
            'innovadoras a retos reales del campus. 12 horas continuas de código, ' +
            'creatividad, diseño y colaboración. Habrá mentores expertos disponibles ' +
            'durante todo el evento, premios en efectivo para los tres mejores ' +
            'proyectos y certificados de participación para todos los equipos inscritos.',
        requisitos: 'Laptop propia, conocimientos básicos de programación y equipo ' +
            'conformado de 3 a 5 personas. Registro previo obligatorio antes del 10 ' +
            'de junio. Cada integrante del equipo debe completar el formulario de ' +
            'inscripción de forma individual.'
    },
    futbol: {
        nombre: 'Torneo de Fútbol Interfacultades',
        categoria: 'deportivo',
        categoriaTexto: 'Deportivo',
        imagen: 'img/actividades/futbol.jpg',
        posicionImagen: 'center 50%',
        fecha: 'Dom 15 jun 2026',
        horario: '09:00 - 18:00',
        lugar: 'Canchas Deportivas Norte',
        cupoMaximo: 200,
        inscritos: 200,
        descripcion: 'Torneo interfacultades de fútbol 11. Cada facultad inscribe un ' +
            'equipo representativo para competir por el trofeo anual de CampusFest. ' +
            'Los partidos se juegan en formato de eliminación directa durante todo el día.',
        requisitos: 'Equipo conformado por estudiantes activos de la misma facultad. ' +
            'Indumentaria deportiva propia y carné estudiantil vigente para validar ' +
            'la inscripción el día del evento.'
    },
    arte: {
        nombre: 'Exposición de Arte Contemporáneo',
        categoria: 'artistico',
        categoriaTexto: 'Artístico',
        imagen: 'img/actividades/arte.jpg',
        posicionImagen: 'center 65%',
        fecha: 'Sáb 14 jun 2026',
        horario: '10:00 - 17:00',
        lugar: 'Galería Central',
        cupoMaximo: 300,
        inscritos: 145,
        descripcion: 'Muestra abierta al público con obras de estudiantes de Artes ' +
            'Plásticas y Diseño Gráfico. Incluye pintura, escultura, fotografía e ' +
            'instalaciones interactivas creadas durante el semestre.',
        requisitos: 'Entrada libre, no requiere inscripción previa para visitar la ' +
            'exposición. Los artistas participantes ya fueron seleccionados por el ' +
            'comité de Artes.'
    },
    gastronomico: {
        nombre: 'Festival Gastronómico',
        categoria: 'gastronomico',
        categoriaTexto: 'Gastronómico',
        imagen: 'img/actividades/gastronomico.jpg',
        posicionImagen: 'center 50%',
        fecha: 'Dom 15 jun 2026',
        horario: '11:00 - 20:00',
        lugar: 'Plaza Central',
        cupoMaximo: 500,
        inscritos: 312,
        descripcion: 'Stands de comida preparados por estudiantes y asociaciones ' +
            'estudiantiles, con platillos típicos costarricenses y propuestas de ' +
            'fusión internacional. Incluye concurso de mejor stand del festival.',
        requisitos: 'Entrada libre. Los stands manejan precios accesibles para ' +
            'estudiantes. Se recomienda llegar temprano para evitar filas largas.'
    },
    concierto: {
        nombre: 'Concierto de Bandas Universitarias',
        categoria: 'cultural',
        categoriaTexto: 'Cultural',
        imagen: 'img/actividades/concierto.jpg',
        posicionImagen: 'center 60%',
        fecha: 'Dom 15 jun 2026',
        horario: '19:00 - 23:00',
        lugar: 'Auditorio Principal',
        cupoMaximo: 800,
        inscritos: 650,
        descripcion: 'Noche de conciertos con bandas formadas por estudiantes de la ' +
            'universidad, en géneros que van desde rock hasta música tradicional ' +
            'costarricense. Cierre musical del festival.',
        requisitos: 'Entrada libre con cupo limitado por capacidad del auditorio. ' +
            'Recomendado llegar con al menos 30 minutos de anticipación.'
    },
    robotica: {
        nombre: 'Taller de Robótica e IA',
        categoria: 'tecnologico',
        categoriaTexto: 'Tecnológico',
        imagen: 'img/actividades/robotica.jpg',
        posicionImagen: 'center 30%',
        fecha: 'Sáb 14 jun 2026',
        horario: '14:00 - 17:00',
        lugar: 'Laboratorio Ingeniería B5',
        cupoMaximo: 40,
        inscritos: 38,
        descripcion: 'Taller práctico introductorio sobre robótica e inteligencia ' +
            'artificial, donde los participantes programan y controlan un robot ' +
            'básico usando sensores y modelos de IA sencillos.',
        requisitos: 'Conocimientos básicos de programación. Cupo muy limitado por ' +
            'la cantidad de kits de robótica disponibles. Inscripción previa obligatoria.'
    }
};

/**
 * Lee el parametro "actividad" de la URL actual.
 * Ejemplo: detalle_actividad.html?actividad=futbol -> devuelve "futbol"
 */
function obtenerSlugDeURL() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('actividad');
}

/**
 * Rellena todos los elementos del HTML con los datos de la
 * actividad recibida. Si no se reconoce el slug, usa Hackathon
 * como actividad por defecto.
 */
function mostrarDetalleActividad() {
    const slug = obtenerSlugDeURL();
    const actividad = datosActividades[slug] || datosActividades.hackathon;

    // Banner
    document.getElementById('imagenBanner').src = actividad.imagen;
    document.getElementById('imagenBanner').alt = actividad.nombre;
    document.getElementById('imagenBanner').style.objectPosition =
        actividad.posicionImagen || 'center 50%';
    document.getElementById('badgeCategoria').textContent = actividad.categoriaTexto;
    document.getElementById('badgeCategoria').className =
        'card_badge_categoria ' + actividad.categoria;
    document.getElementById('tituloActividad').textContent = actividad.nombre;

    // Informacion general
    document.getElementById('valorFecha').textContent = actividad.fecha;
    document.getElementById('valorHorario').textContent = actividad.horario;
    document.getElementById('valorLugar').textContent = actividad.lugar;
    document.getElementById('valorCupoMaximo').textContent =
        actividad.cupoMaximo + ' personas';

    // Descripcion y requisitos
    document.getElementById('textoDescripcion').textContent = actividad.descripcion;
    document.getElementById('textoRequisitos').textContent = actividad.requisitos;

    // Estado del cupo
    const cuposDisponibles = actividad.cupoMaximo - actividad.inscritos;
    const porcentajeOcupado = Math.round(
        (actividad.inscritos / actividad.cupoMaximo) * 100
    );

    document.getElementById('valorInscritos').textContent =
        actividad.inscritos + '/' + actividad.cupoMaximo;
    document.getElementById('barraCupoRelleno').style.width = porcentajeOcupado + '%';

    const botonInscribirme = document.getElementById('btnInscribirme');

    if (cuposDisponibles <= 0) {
        document.getElementById('textoCuposDisponibles').textContent = 'Sin cupos disponibles';
        botonInscribirme.textContent = 'Sin cupos disponibles';
        botonInscribirme.classList.add('deshabilitado');
        botonInscribirme.removeAttribute('href');
    } else {
        document.getElementById('textoCuposDisponibles').textContent =
            cuposDisponibles + ' cupos disponibles';
    }
}

mostrarDetalleActividad();
