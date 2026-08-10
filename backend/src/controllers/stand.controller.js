import {
    obtenerStands,
    obtenerStandPorId
} from "../services/stands.service.js";

export async function listarStands(req, res) {
    try {
        const stands = await obtenerStands();
        res.json(stands);
    } catch (error) {
        console.error("Error al listar stands:", error.message);
        res.status(500).json({ error: "No fue posible obtener los stands." });
    }
}

export async function obtenerStand(req, res) {
    try {
        const stand = await obtenerStandPorId(req.params.id);

        if (!stand) {
            return res.status(404).json({ error: "Stand no encontrado." });
        }

        res.json(stand);
    } catch (error) {
        console.error("Error al obtener stand:", error.message);
        res.status(500).json({ error: "No fue posible obtener el stand." });
    }
}