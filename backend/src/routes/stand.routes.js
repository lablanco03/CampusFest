import { Router } from "express";
import {
    listarStands,
    obtenerStand
} from "../controllers/stand.controller.js";

const router = Router();

router.get("/", listarStands);
router.get("/:id", obtenerStand);

export default router;