import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import validationRequest from "../../utils/validationRequest";
import { createCampaignZodSchema } from "./campaign.validation";
import { CampaignController } from "./campaign.controller";

const router = Router()

router.post("/", multerUpload.single("file"), validationRequest(createCampaignZodSchema), CampaignController.createCampaign)

router.get("/", CampaignController.getAllCampaign)


export const CampaignRoute = router