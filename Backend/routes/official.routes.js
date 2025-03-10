import express from "express";
import { createOfficial } from "../controllers/official.controller.js";

const router = express.Router();

router.post("/create", createOfficial);

export default router;
