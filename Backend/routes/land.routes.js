import express from "express";
import { createLandRecipt, getLandData, getLandRecord, getLandRecordClerk, getLandRecordReviewedBy, getRecipt, getReciptList, registerLand, updateLandReciptStatus, updateLandRecordStatus } from "../controllers/land.controller.js";

const router = express.Router();

router.post("/generate-recipt", createLandRecipt);
router.post("/get-recipt-list", getReciptList);
router.post("/get-recipt/:receiptId", getRecipt);
router.put("/update-recipt-status", updateLandReciptStatus);
router.post("/register", registerLand);
router.post("/list", getLandRecord);
router.post("/list-clerk", getLandRecordClerk);
router.post("/list-all", getLandRecordReviewedBy);
router.put("/update-status", updateLandRecordStatus);
router.get("/get-land/:id", getLandData);

export default router;
