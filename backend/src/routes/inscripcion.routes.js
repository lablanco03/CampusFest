import { Router } from "express";
import { crearInscripcion } from "../controllers/inscripcion.controller.js";

const router = Router();

router.post("/", crearInscripcion);

export default router;