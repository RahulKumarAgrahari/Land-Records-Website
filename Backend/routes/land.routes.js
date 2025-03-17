import express from "express";
import { createLandRecipt, getLandRecord, getLandRecordClerk, getLandRecordre, registerLand, updateLandRecordStatus } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/generate-recipt", createLandRecipt);
router.post("/register", registerLand);
router.post("/list", getLandRecord);
router.post("/list-clerk", getLandRecordClerk);
router.post("/list-all", getLandRecordre);
router.put("/update-status", updateLandRecordStatus);

export default router;
