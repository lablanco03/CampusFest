import { Router } from "express";
import { listarAgenda } from "../controllers/agenda.controller.js";

const router = Router();

router.get("/", listarAgenda);

export default router;