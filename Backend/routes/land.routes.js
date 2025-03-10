import express from "express";
import { getLandRecord, registerLand } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/register", registerLand);
router.post("/list", getLandRecord);

export default router;
