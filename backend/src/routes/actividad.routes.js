import { Router } from "express";
import {
    listarActividades,
    obtenerActividad
} from "../controllers/actividad.controller.js";

const router = Router();

router.get("/", listarActividades);
router.get("/:id", obtenerActividad);

export default router;