import express from "express";
import { registerLand } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/register", registerLand);

export default router;
