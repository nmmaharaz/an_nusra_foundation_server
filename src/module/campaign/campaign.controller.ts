import type { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { CampaignService } from "./campaign.service"

const createCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("File")
    const file = req.file?.path || ""
    const result = await CampaignService.createCampaign(file, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories created successfully",
        data: result
    })
})

const getAllCampaign = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignService.getAllCampaign(req.query as Record<string, string>)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories retrieved successfully",
        data: result
    })
})

export const CampaignController = {
    createCampaign,
    getAllCampaign
}