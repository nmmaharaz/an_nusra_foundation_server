import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import validationRequest from "../../utils/validationRequest";
import { createCampaignUpdateZodSchema, createCampaignZodSchema, updateCampaignUpdateZodSchema, updateCampaignZodSchema } from "./campaign.validation";
import { CampaignController } from "./campaign.controller";

const router = Router()

router.post("/", multerUpload.single("file"), validationRequest(createCampaignZodSchema), CampaignController.createCampaign)

router.get("/", CampaignController.getAllCampaign)

router.get("/:id", CampaignController.getSingleCampaign)

router.patch("/:id", multerUpload.single("file"), validationRequest(updateCampaignZodSchema), CampaignController.updateCampaign)

router.delete("/:id", CampaignController.deleteCampaign)

// Campaign Updates
router.post("/:id/update", multerUpload.single("file"), validationRequest(createCampaignUpdateZodSchema), CampaignController.createCampaignUpdate)

router.get("/:id/update", CampaignController.getSingleCampaignUpdate)

router.patch("/:id/update", multerUpload.single("file"), validationRequest(updateCampaignUpdateZodSchema), CampaignController.updateCampaignUpdate)

router.delete("/:id/update", CampaignController.deleteCampaignUpdate)



export const CampaignRoute = router