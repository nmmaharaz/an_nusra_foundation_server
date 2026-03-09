import type { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { CampaignCategoriesService } from "./campaign-categories.service"

const createCampaignCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignCategoriesService.createCampaignCategories(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories created successfully",
        data: result
    })
})


export const CampaignCategoriesController = {
    createCampaignCategories
}