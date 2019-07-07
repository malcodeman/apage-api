import express from "express";

import { requireAuthentication } from "../auth/auth_middleware";
import { get, create } from "./pages_controller";

const router = express.Router();

router.use(requireAuthentication);
router.get("/", get);
router.post("/", create);

export default router;
