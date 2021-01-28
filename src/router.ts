import express from "express";
import ruleController from "./controllers/rule.controller";

const router = express.Router();

router.get("/", ruleController.base);
router.post("/validate-rule", ruleController.validateRule);

export default router;
