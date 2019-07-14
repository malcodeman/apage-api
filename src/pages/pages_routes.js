import express from "express";

import { requireAuthentication } from "../auth/auth_middleware";
import {
  create,
  updateDomain,
  updateProfileImage,
  update,
  getPages,
  getPage
} from "./pages_controller";

const router = express.Router();

router.post("/", requireAuthentication, create);
router.post(
  "/updateSiteIdentifier/:domain",
  requireAuthentication,
  updateDomain
);
router.post(
  "/updateProfileImage/:domain",
  requireAuthentication,
  updateProfileImage
);
router.put("/:domain", requireAuthentication, update);
router.get("/", requireAuthentication, getPages);
router.get("/:domain", getPage);

export default router;
