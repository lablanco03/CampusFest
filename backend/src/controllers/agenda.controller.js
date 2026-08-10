import { obtenerActividades } from "../services/actividad.service.js";

export async function listarAgenda(req, res) {
    try {
        const actividades = await obtenerActividades();
        const conCupo = actividades.map(function (actividad) {
            const obj = actividad.toObject ? actividad.toObject() : actividad;
            obj.cupoDisponible = obj.cupoMaximo - obj.cuposOcupados;
            return obj;
        });
        res.json(conCupo);
    } catch (error) {
        console.error("Error al listar agenda:", error.message);
        res.status(500).json({ error: "No fue posible obtener la agenda." });
    }
}