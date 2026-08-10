import { Router } from "express";
import { verificarAdministrador } from "../middlewares/auth.middleware.js";
import {
    listarActividades,
    editarActividad,
    toggleEstadoActividad,
    listarStands,
    editarStand,
    toggleEstadoStand,
    listarInscripciones,
    eliminarInscripcion,
    obtenerReportes
} from "../controllers/admin.controller.js";
 
const router = Router();
 
router.use(verificarAdministrador);
 
// Actividades
router.get("/actividades", listarActividades);
router.put("/actividades/:id", editarActividad);
router.patch("/actividades/:id/estado", toggleEstadoActividad);
 
// Stands
router.get("/stands", listarStands);
router.put("/stands/:id", editarStand);
router.patch("/stands/:id/estado", toggleEstadoStand);
 
// Inscripciones
router.get("/inscripciones", listarInscripciones);
router.delete("/inscripciones/:id", eliminarInscripcion);
 
// Reportes
router.get("/reportes", obtenerReportes);
 
export default router;
