import express from "express";
import ruleController from "./controllers/rule.controller";

const router = express.Router();

router.get("/", ruleController.base);

export default router;
