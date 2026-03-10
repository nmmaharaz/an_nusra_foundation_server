import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import validationRequest from "../../utils/validationRequest";
import { createCampaignZodSchema, updateCampaignZodSchema } from "./campaign.validation";
import { CampaignController } from "./campaign.controller";

const router = Router()

router.post("/", multerUpload.single("file"), validationRequest(createCampaignZodSchema), CampaignController.createCampaign)

router.get("/", CampaignController.getAllCampaign)

router.get("/:id", CampaignController.getSingleCampaign)

router.patch("/:id", multerUpload.single("file"), validationRequest(updateCampaignZodSchema), CampaignController.updateCampaign)

router.delete("/:id", CampaignController.deleteCampaign)


export const CampaignRoute = router