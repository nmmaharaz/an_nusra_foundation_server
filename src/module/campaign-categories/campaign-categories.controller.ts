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

const getAllCampaignCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignCategoriesService.getAllCampaignCategories(req.query as Record<string, string>)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories retrieved successfully",
        data: result
    })
})

const getSingleCampaignCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignCategoriesService.getSingleCampaignCategories(req.params.id as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories retrieved successfully",
        data: result
    })
})

const updateCampaignCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignCategoriesService.updateCampaignCategories(req.params.id as string, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories updated successfully",
        data: result
    })
})

const deleteCampaignCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await CampaignCategoriesService.deleteCampaignCategories(req.params.id as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Campaign categories delete successfully",
        data: result
    })
})


export const CampaignCategoriesController = {
    createCampaignCategories,
    getAllCampaignCategories,
    getSingleCampaignCategories,
    updateCampaignCategories,
    deleteCampaignCategories
}