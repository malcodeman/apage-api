import express from "express";

import { requireAuthentication } from "../auth/auth_middleware";
import { create, getPages, getPage } from "./pages_controller";

const router = express.Router();

router.post("/", requireAuthentication, create);
router.get("/", requireAuthentication, getPages);
router.get("/:domain", getPage);

export default router;
