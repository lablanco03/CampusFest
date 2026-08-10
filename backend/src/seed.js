import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Administrador from "./models/administrador.model.js";
import Actividad from "./models/actividad.model.js";
import Stand from "./models/stand.model.js";
import config from "./config/env.js";

async function seedAdministrador() {
    const correo = "admin@campusfest.edu.cr";
    const contrasenaPlano = "admin123";

    const yaExiste = await Administrador.findOne({ correo });

    if (yaExiste) {
        console.log("Ya existe un administrador con ese correo:", correo);
        return;
    }

    const contrasenaHash = await bcrypt.hash(contrasenaPlano, 10);

    await Administrador.create({
        nombre: "Administrador CampusFest",
        correo,
        contrasena: contrasenaHash,
        estado: true
    });

    console.log("Administrador creado con éxito:", correo);
}

async function seedActividadesYStands() {
    await Actividad.deleteMany({});
    await Stand.deleteMany({});

    await Actividad.insertMany([
        {
            nombre: "Hackathon Universitario",
            categoria: "Tecnológico",
            fecha: new Date("2026-06-14"),
            horaInicio: "08:00",
            horaFin: "20:00",
            lugar: "Auditorio Principal",
            descripcion: "Compite en equipos de 3 a 5 personas desarrollando una solución de software en 12 horas continuas.",
            requisitos: "Laptop propia, equipo de 3 a 5 personas.",
            cupoMaximo: 120,
            cuposOcupados: 98,
            imagen: "img/actividades/hackathon.jpg",
            estado: "Activa"
        },
        {
            nombre: "Torneo de Fútbol Interfacultades",
            categoria: "Deportivo",
            fecha: new Date("2026-06-15"),
            horaInicio: "09:00",
            horaFin: "18:00",
            lugar: "Canchas Deportivas Norte",
            descripcion: "Torneo eliminatorio entre las facultades de la universidad.",
            requisitos: "Inscripción por equipo, mínimo 11 jugadores, uniforme propio.",
            cupoMaximo: 200,
            cuposOcupados: 200,
            imagen: "img/actividades/futbol.jpg",
            estado: "Activa"
        },
        {
            nombre: "Exposición de Arte Contemporáneo",
            categoria: "Artístico",
            fecha: new Date("2026-06-14"),
            horaInicio: "10:00",
            horaFin: "17:00",
            lugar: "Galería Central",
            descripcion: "Muestra de obras de estudiantes de artes plásticas y diseño gráfico.",
            requisitos: "Entrada libre, no se requiere inscripción previa.",
            cupoMaximo: 300,
            cuposOcupados: 145,
            imagen: "img/actividades/arte.jpg",
            estado: "Activa"
        },
        {
            nombre: "Festival Gastronómico",
            categoria: "Gastronómico",
            fecha: new Date("2026-06-15"),
            horaInicio: "11:00",
            horaFin: "20:00",
            lugar: "Plaza Central",
            descripcion: "Degustaciones y venta de comida preparada por estudiantes de gastronomía.",
            requisitos: "Entrada libre, consumo no incluido.",
            cupoMaximo: 500,
            cuposOcupados: 312,
            imagen: "img/actividades/gastronomico.jpg",
            estado: "Activa"
        },
        {
            nombre: "Concierto de Bandas Universitarias",
            categoria: "Cultural",
            fecha: new Date("2026-06-15"),
            horaInicio: "19:00",
            horaFin: "23:00",
            lugar: "Auditorio Principal",
            descripcion: "Presentación de bandas estudiantiles de distintos géneros musicales.",
            requisitos: "Entrada libre, cupo limitado por aforo.",
            cupoMaximo: 800,
            cuposOcupados: 650,
            imagen: "img/actividades/concierto.jpg",
            estado: "Activa"
        },
        {
            nombre: "Taller de Robótica e IA",
            categoria: "Tecnológico",
            fecha: new Date("2026-06-14"),
            horaInicio: "14:00",
            horaFin: "17:00",
            lugar: "Laboratorio Ingeniería B5",
            descripcion: "Taller práctico de introducción a robótica e inteligencia artificial.",
            requisitos: "Traer laptop, conocimientos básicos de programación.",
            cupoMaximo: 40,
            cuposOcupados: 38,
            imagen: "img/actividades/robotica.jpg",
            estado: "Activa"
        }
    ]);

    await Stand.insertMany([
        {
            nombre: "Ingeniería de Sistemas",
            categoria: "Tecnológico",
            ubicacion: "Pabellón A - Stand 3",
            horario: "9:00 am - 4:00 pm",
            responsable: "Ing. Carlos Mendoza",
            descripcion: "Presentación de proyectos de software desarrollados por estudiantes.",
            imagen: "img/stands/ingenieria.jpg",
            estado: "Activo"
        },
        {
            nombre: "Gastronomía Fusión",
            categoria: "Gastronómico",
            ubicacion: "Plaza Central",
            horario: "11:30 am - 6:00 pm",
            responsable: "Chef Ana Torres",
            descripcion: "Degustaciones y cocina internacional preparada por estudiantes.",
            imagen: "img/stands/gastronomia.jpg",
            estado: "Activo"
        },
        {
            nombre: "Arte y Diseño Gráfico",
            categoria: "Artístico",
            ubicacion: "Galería Central",
            horario: "10:00 am - 5:00 pm",
            responsable: "Dra. Lucía Ramírez",
            descripcion: "Muestra de ilustración, diseño gráfico y arte digital estudiantil.",
            imagen: "img/stands/arte_diseno.jpg",
            estado: "Activo"
        },
        {
            nombre: "Emprendimiento Universitario",
            categoria: "Cultural",
            ubicacion: "Pabellón B",
            horario: "9:00 am - 4:00 pm",
            responsable: "Diego Vásquez",
            descripcion: "Espacio para proyectos y startups creadas por estudiantes.",
            imagen: "img/stands/emprendimiento.jpg",
            estado: "Activo"
        },
        {
            nombre: "Deporte y Bienestar",
            categoria: "Deportivo",
            ubicacion: "Canchas Norte",
            horario: "8:00 am - 3:00 pm",
            responsable: "María González",
            descripcion: "Actividades de acondicionamiento físico y asesoría deportiva.",
            imagen: "img/stands/deporte.jpg",
            estado: "Activo"
        },
        {
            nombre: "Ciberseguridad",
            categoria: "Tecnológico",
            ubicacion: "Pabellón A - Stand 5",
            horario: "9:00 am - 4:00 pm",
            responsable: "Ing. Roberto Salas",
            descripcion: "Demostraciones de pruebas de penetración y seguridad informática.",
            imagen: "img/stands/ciberseguridad.jpg",
            estado: "Activo"
        },
        {
            nombre: "Café y Repostería",
            categoria: "Gastronómico",
            ubicacion: "Plaza Central - Stand 2",
            horario: "8:00 am - 5:00 pm",
            responsable: "Marcela Jiménez",
            descripcion: "Venta de café artesanal y repostería elaborada por estudiantes.",
            imagen: "img/stands/cafe_resposteria.jpg",
            estado: "Activo"
        },
        {
            nombre: "Historia y Patrimonio",
            categoria: "Cultural",
            ubicacion: "Pabellón C",
            horario: "10:00 am - 4:00 pm",
            responsable: "Prof. Fernando Alvarado",
            descripcion: "Exhibición sobre historia institucional y patrimonio cultural.",
            imagen: "img/stands/historia.jpg",
            estado: "Activo"
        },
        {
            nombre: "Idiomas",
            categoria: "Cultural",
            ubicacion: "Pabellón B - Stand 4",
            horario: "9:00 am - 3:00 pm",
            responsable: "Prof. Karen Solano",
            descripcion: "Actividades de intercambio de idiomas y muestra cultural internacional.",
            imagen: "img/stands/idiomas.jpg",
            estado: "Activo"
        },
        {
            nombre: "Movimiento Humano",
            categoria: "Deportivo",
            ubicacion: "Canchas Norte - Stand 2",
            horario: "8:00 am - 2:00 pm",
            responsable: "Lic. Pablo Rojas",
            descripcion: "Charlas y demostraciones sobre fisioterapia y ciencias del movimiento.",
            imagen: "img/stands/movimento_humano.jpg",
            estado: "Activo"
        },
        {
            nombre: "Música",
            categoria: "Artístico",
            ubicacion: "Auditorio - Vestíbulo",
            horario: "10:00 am - 6:00 pm",
            responsable: "Prof. Gabriela Núñez",
            descripcion: "Muestra de instrumentos y presentaciones de la escuela de música.",
            imagen: "img/stands/musica.jpg",
            estado: "Activo"
        },
        {
            nombre: "Robótica Estudiantil",
            categoria: "Tecnológico",
            ubicacion: "Pabellón A - Stand 7",
            horario: "9:00 am - 4:00 pm",
            responsable: "Ing. Daniel Chaves",
            descripcion: "Exhibición de prototipos de robótica desarrollados por estudiantes.",
            imagen: "img/stands/robotica.jpg",
            estado: "Activo"
        }
    ]);

    console.log("Actividades y stands de prueba insertados.");
}

async function seed() {
    await mongoose.connect(config.mongoURI);

    await seedAdministrador();
    await seedActividadesYStands();

    console.log("Seed completo.");
    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error("Error ejecutando el seed:", error);
    mongoose.disconnect();
});
