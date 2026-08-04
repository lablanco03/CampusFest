// Importamos el modelo de administradores para interactuar con la base de datos
import Administrador from "../models/administrador.model.js";

// Obtenemos un administrador utilizando su correo electrónico
export async function obtenerAdministradorPorCorreo(correo) {

    // Buscamos el administrador por su correo
    return await Administrador.findOne({ correo });

}

// Obtenemos un administrador utilizando su identificador
export async function obtenerAdministradorPorId(id) {

    // Buscamos el administrador por su ID
    return await Administrador.findById(id);

}

// Obtenemos un administrador para realizar el proceso de inicio de sesión
export async function obtenerAdministradorParaLogin(correo) {

    // Buscamos el administrador incluyendo la contraseña
    return await Administrador.findOne({ correo }).select("+contrasena");

}

// Actualizamos la información de un administrador
export async function actualizarAdministrador(id, datosAdministrador) {

    // Buscamos el administrador y actualizamos su información
    return await Administrador.findByIdAndUpdate(

        id,

        {
            nombre: datosAdministrador.nombre,
            correo: datosAdministrador.correo,
            contrasena: datosAdministrador.contrasena,
            estado: datosAdministrador.estado
        },

        {
            new: true,
            runValidators: true
        }

    );

}