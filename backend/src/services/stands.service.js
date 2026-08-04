// Importamos el modelo de stands para interactuar con la base de datos
import Stand from "../models/stand.model.js";

// Obtenemos todos los stands almacenados en la base de datos
export async function obtenerStands() {

    // Consultamos todos los stands
    return await Stand.find();

}

// Obtenemos un stand específico utilizando su identificador
export async function obtenerStandPorId(id) {

    // Buscamos el stand por su ID
    return await Stand.findById(id);

}

// Actualizamos la información completa de un stand
export async function actualizarStand(id, datosStand) {

    // Buscamos el stand y actualizamos su información
    return await Stand.findByIdAndUpdate(

        id,

        {
            responsable: datosStand.responsable,
            ubicacion: datosStand.ubicacion,
            descripcion: datosStand.descripcion
        },

        {
            new: true,
            runValidators: true
        }

    );

}

// Cambiamos el estado de un stand utilizando su identificador
export async function cambiarEstadoStand(id) {

    // Buscamos el stand correspondiente
    const stand = await Stand.findById(id);

    // Verificamos que el stand exista
    if (!stand) {

        return null;

    }

    // Cambiamos el estado del stand
    stand.estado =
        stand.estado === "Activo"
            ? "Cancelado"
            : "Activo";

    // Guardamos los cambios realizados
    return await stand.save();

}