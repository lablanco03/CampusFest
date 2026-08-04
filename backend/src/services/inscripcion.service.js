// Importamos el modelo de inscripciones para interactuar con la base de datos
import Inscripcion from "../models/inscripcion.model.js";

// Importamos el modelo de actividades para actualizar los cupos
import Actividad from "../models/actividad.model.js";

// Obtenemos todas las inscripciones almacenadas en la base de datos
export async function obtenerInscripciones() {

    // Consultamos todas las inscripciones junto con la información de la actividad
    return await Inscripcion.find().populate("actividad");

}

// Obtenemos una inscripción específica utilizando su identificador
export async function obtenerInscripcionPorId(id) {

    // Buscamos la inscripción por su ID junto con la información de la actividad
    return await Inscripcion.findById(id).populate("actividad");

}

// Registramos una nueva inscripción en la base de datos
export async function registrarInscripcion(datosInscripcion) {

    // Buscamos la actividad seleccionada por el estudiante
    const actividad = await Actividad.findById(datosInscripcion.actividad);

    // Verificamos que la actividad exista
    if (!actividad) {

        return null;

    }

    // Verificamos que la actividad se encuentre activa
    if (actividad.estado === "Cancelada") {

        return null;

    }

    // Verificamos que todavía existan cupos disponibles
    if (actividad.cuposOcupados >= actividad.cupoMaximo) {

        return null;

    }

    // Creamos una nueva inscripción utilizando los datos recibidos
    const nuevaInscripcion = new Inscripcion({

        nombreCompleto: datosInscripcion.nombreCompleto,
        identificacion: datosInscripcion.identificacion,
        correoElectronico: datosInscripcion.correoElectronico,
        telefono: datosInscripcion.telefono,
        carreraGrupo: datosInscripcion.carreraGrupo,
        actividad: datosInscripcion.actividad,
        comentarios: datosInscripcion.comentarios

    });

    // Aumentamos la cantidad de personas inscritas en la actividad
    actividad.cuposOcupados++;

    // Guardamos los cambios de la actividad
    await actividad.save();

    // Guardamos la inscripción en la base de datos
    return await nuevaInscripcion.save();

}

// Actualizamos la información de una inscripción
export async function actualizarInscripcion(id, datosInscripcion) {

    // Buscamos la inscripción correspondiente
    const inscripcion = await Inscripcion.findById(id);

    // Verificamos que la inscripción exista
    if (!inscripcion) {

        return null;

    }

    // Verificamos si la actividad cambió
    if (inscripcion.actividad.toString() !== datosInscripcion.actividad) {

        // Buscamos la actividad anterior
        const actividadAnterior = await Actividad.findById(inscripcion.actividad);

        // Buscamos la nueva actividad
        const nuevaActividad = await Actividad.findById(datosInscripcion.actividad);

        // Verificamos que la nueva actividad exista
        if (!nuevaActividad) {

            return null;

        }

        // Verificamos que la nueva actividad esté activa
        if (nuevaActividad.estado === "Cancelada") {

            return null;

        }

        // Verificamos que la nueva actividad tenga cupos disponibles
        if (nuevaActividad.cuposOcupados >= nuevaActividad.cupoMaximo) {

            return null;

        }

        // Liberamos un cupo de la actividad anterior
        if (actividadAnterior) {

            actividadAnterior.cuposOcupados--;

            if (actividadAnterior.cuposOcupados < 0) {

                actividadAnterior.cuposOcupados = 0;

            }

            await actividadAnterior.save();

        }

        // Ocupamos un cupo en la nueva actividad
        nuevaActividad.cuposOcupados++;

        await nuevaActividad.save();

    }

    // Actualizamos la información de la inscripción
    return await Inscripcion.findByIdAndUpdate(

        id,

        {
            nombreCompleto: datosInscripcion.nombreCompleto,
            identificacion: datosInscripcion.identificacion,
            correoElectronico: datosInscripcion.correoElectronico,
            telefono: datosInscripcion.telefono,
            carreraGrupo: datosInscripcion.carreraGrupo,
            actividad: datosInscripcion.actividad,
            comentarios: datosInscripcion.comentarios
        },

        {
            new: true,
            runValidators: true
        }

    );

}

// Eliminamos una inscripción utilizando su identificador
export async function eliminarInscripcion(id) {

    // Buscamos la inscripción correspondiente
    const inscripcion = await Inscripcion.findById(id);

    // Verificamos que la inscripción exista
    if (!inscripcion) {

        return null;

    }

    // Buscamos la actividad asociada
    const actividad = await Actividad.findById(inscripcion.actividad);

    // Verificamos que la actividad exista
    if (actividad) {

        // Disminuimos la cantidad de personas inscritas
        actividad.cuposOcupados--;

        // Evitamos que el valor sea negativo
        if (actividad.cuposOcupados < 0) {

            actividad.cuposOcupados = 0;

        }

        // Guardamos los cambios
        await actividad.save();

    }

    // Eliminamos la inscripción
    return await Inscripcion.findByIdAndDelete(id);

}