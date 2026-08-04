// Importamos el modelo de actividades para interactuar con la base de datos
import Actividad from "../models/actividad.model.js";

// Obtenemos todas las actividades almacenadas en la base de datos
export async function obtenerActividades() {

    // Consultamos todas las actividades ordenadas por fecha
    return await Actividad.find().sort({ fecha: 1 });

}

// Obtenemos una actividad específica utilizando su identificador
export async function obtenerActividadPorId(id) {

    // Buscamos la actividad por su ID
    return await Actividad.findById(id);

}

// Actualizamos la información completa de una actividad
export async function actualizarActividad(id, datosActividad) {

    // Buscamos la actividad y actualizamos su información
    return await Actividad.findByIdAndUpdate(

        id,

        {
            lugar: datosActividad.lugar,
            descripcion: datosActividad.descripcion,
            requisitos: datosActividad.requisitos,
            cupoMaximo: datosActividad.cupoMaximo
        },

        {
            new: true,
            runValidators: true
        }

    );

}

// Cambiamos el estado de una actividad utilizando su identificador
export async function cambiarEstadoActividad(id) {

    // Buscamos la actividad correspondiente
    const actividad = await Actividad.findById(id);

    // Verificamos que la actividad exista
    if (!actividad) {

        return null;

    }

    // Cambiamos el estado de la actividad
    actividad.estado =
        actividad.estado === "Activa"
            ? "Cancelada"
            : "Activa";

    // Guardamos los cambios realizados
    return await actividad.save();

}