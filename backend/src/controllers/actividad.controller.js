import {
    obtenerActividades,
    obtenerActividadPorId
} from "../services/actividad.service.js";

function agregarCupoDisponible(actividad) {
    const obj = actividad.toObject ? actividad.toObject() : actividad;
    obj.cupoDisponible = obj.cupoMaximo - obj.cuposOcupados;
    return obj;
}

export async function listarActividades(req, res) {
    try {
        const actividades = await obtenerActividades();
        res.json(actividades.map(agregarCupoDisponible));
    } catch (error) {
        console.error("Error al listar actividades:", error.message);
        res.status(500).json({ error: "No fue posible obtener las actividades." });
    }
}

export async function obtenerActividad(req, res) {
    try {
        const actividad = await obtenerActividadPorId(req.params.id);

        if (!actividad) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }

        res.json(agregarCupoDisponible(actividad));
    } catch (error) {
        console.error("Error al obtener actividad:", error.message);
        res.status(500).json({ error: "No fue posible obtener la actividad." });
    }
}