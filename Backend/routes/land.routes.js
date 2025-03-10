import express from "express";
import { getLandRecord, registerLand } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/register", registerLand);
router.get("/list", getLandRecord);

export default router;
