import express from "express";
import ruleController from "./controllers/rule.controller";
import { ruleMiddleware } from "./middlewares/rule.middleware";

const router = express.Router();

router.get("/", ruleController.base);
router.post("/validate-rule", ruleMiddleware, ruleController.validateRule);

export default router;
