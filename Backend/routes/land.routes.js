import express from "express";
import { getLandRecord, getLandRecordClerk, registerLand } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/register", registerLand);
router.post("/list", getLandRecord);
router.post("/list-clerk", getLandRecordClerk);

export default router;
