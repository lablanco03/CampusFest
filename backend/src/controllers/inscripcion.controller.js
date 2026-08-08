import { registrarInscripcion } from "../services/inscripcion.service.js";

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarTelefono(telefono) {
    return /^[0-9]{4}-[0-9]{4}$/.test(telefono);
}

function validarCamposInscripcion(datos) {
    if (!datos.nombreCompleto || datos.nombreCompleto.trim() === "") {
        return "El nombre completo es obligatorio.";
    }
    if (!datos.identificacion || datos.identificacion.trim() === "") {
        return "La identificación es obligatoria.";
    }
    if (!datos.correoElectronico || !validarCorreo(datos.correoElectronico)) {
        return "El correo electrónico no es válido.";
    }
    if (!datos.telefono || !validarTelefono(datos.telefono)) {
        return "El teléfono debe tener el formato 0000-0000.";
    }
    if (!datos.carreraGrupo || datos.carreraGrupo.trim() === "") {
        return "La carrera o grupo es obligatoria.";
    }
    if (!datos.actividad || datos.actividad.trim() === "") {
        return "Debe seleccionar una actividad.";
    }
    return null;
}

export async function crearInscripcion(req, res) {
    try {
        const errorValidacion = validarCamposInscripcion(req.body);

        if (errorValidacion) {
            return res.status(400).json({ error: errorValidacion });
        }

        const inscripcion = await registrarInscripcion(req.body);

        if (!inscripcion) {
            return res.status(400).json({
                error: "No fue posible completar la inscripción. Verifica que la actividad exista, esté activa y tenga cupo disponible."
            });
        }

        res.status(201).json(inscripcion);
    } catch (error) {
        console.error("Error al crear inscripción:", error.message);
        res.status(500).json({ error: "No fue posible procesar la inscripción." });
    }
}