import express from "express";
import { createOfficial, loginOfficial } from "../controllers/official.controller.js";

const router = express.Router();

router.post("/login", loginOfficial);
router.post("/create", createOfficial);

export default router;
