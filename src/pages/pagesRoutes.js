import express from "express";

import { requireAuthentication } from "../auth/authMiddleware";
import {
  create,
  updateDomain,
  updateMainImage,
  updateProfileImage,
  addSocialLink,
  removeSocialLink,
  update,
  getPages,
  getPage
} from "./pagesController";

const router = express.Router();

router.post("/", requireAuthentication, create);
router.post(
  "/updateSiteIdentifier/:domain",
  requireAuthentication,
  updateDomain
);
router.post("/updateMainImage/:domain", requireAuthentication, updateMainImage);
router.post(
  "/updateProfileImage/:domain",
  requireAuthentication,
  updateProfileImage
);
router.post("/addSocialLink/:domain", requireAuthentication, addSocialLink);
router.delete(
  "/removeSocialLink/:domain/:linkId",
  requireAuthentication,
  removeSocialLink
);
router.put("/:domain", requireAuthentication, update);
router.get("/", requireAuthentication, getPages);
router.get("/:domain", getPage);

export default router;
