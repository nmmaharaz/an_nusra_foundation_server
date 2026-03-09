import { Router } from "express";
import validationRequest from "../../utils/validationRequest";
import { CampaignCategoriesValidation } from "./campaign-categories.validation";
import { CampaignCategoriesController } from "./campaign-categories.controller";

const router = Router()

router.post("/", validationRequest(CampaignCategoriesValidation.createCampaignCategoriesZodSchema), CampaignCategoriesController.createCampaignCategories)

router.get("/", CampaignCategoriesController.getAllCampaignCategories)

router.get("/:id", CampaignCategoriesController.getSingleCampaignCategories)

router.patch("/:id", validationRequest(CampaignCategoriesValidation.updateCampaignCategoriesZodSchema), CampaignCategoriesController.updateCampaignCategories)

router.delete("/:id", CampaignCategoriesController.deleteCampaignCategories)

export const CampaignCategoriesRoute = router