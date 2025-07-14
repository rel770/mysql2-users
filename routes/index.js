import express from "express";
import { healthCheck, getApiInfo } from "../controllers/appController.js";

const router = express.Router();

// Health check endpoint
router.get("/", healthCheck);

// API info endpoint
router.get("/info", getApiInfo);

export default router;
