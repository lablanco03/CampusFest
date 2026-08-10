import mongoose from "mongoose";
import config from "./config/env.js";
import Actividad from "./models/actividad.model.js";
import Stand from "./models/stand.model.js";

async function seed() {
    await mongoose.connect(config.mongoURI);

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
            descripcion: "Compite en equipos de 3 a 5 personas.",
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
            descripcion: "Torneo entre facultades.",
            requisitos: "Inscripción por equipo.",
            cupoMaximo: 200,
            cuposOcupados: 200,
            imagen: "img/actividades/futbol.jpg",
            estado: "Activa"
        }
    ]);

    await Stand.insertMany([
        {
            nombre: "Ingeniería de Sistemas",
            categoria: "Tecnológico",
            ubicacion: "Pabellón A - Stand 3",
            horario: "9:00 am - 4:00 pm",
            responsable: "Ing. Sergio Celaya",
            descripcion: "Presentación de proyectos de software.",
            imagen: "img/stands/ingenieria.jpg",
            estado: "Activo"
        },
        {
            nombre: "Gastronomía Fusión",
            categoria: "Gastronómico",
            ubicacion: "Plaza Central",
            horario: "11:30 am - 6:00 pm",
            responsable: "Chef Ana Torres",
            descripcion: "Degustaciones y cocina internacional.",
            imagen: "img/stands/gastronomia.jpg",
            estado: "Activo"
        }
    ]);

    console.log("Datos de prueba insertados.");
    await mongoose.disconnect();
    process.exit(0);
}

seed();