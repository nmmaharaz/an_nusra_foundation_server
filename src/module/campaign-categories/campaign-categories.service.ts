import { Prisma } from "../../../prisma/generated/prisma/client"
import type { CampaignCategoryCreateInput } from "../../../prisma/generated/prisma/models"
import { prisma } from "../../config/prisma"
import { findQuery, formatQueryFilters } from "../../utils/formatQueryFilters"
import { campaignCategoriesFilterableFields, campaignCategoriesSearchableFields } from "./campaign-categories.constant"

const createCampaignCategories = async (payload: CampaignCategoryCreateInput) => {
    return await prisma.campaignCategory.create({
        data: payload
    })
}

const getAllCampaignCategories = async (query: Record<string, string>) => {
    const { pageNumber, limitNumber, filters, skip, searchTerm, sortBy, sortOrder } = findQuery(query, campaignCategoriesSearchableFields)

    const where: Prisma.CampaignCategoryWhereInput = formatQueryFilters({ searchTerm, searchableFields: campaignCategoriesSearchableFields, filters, exactFields: campaignCategoriesFilterableFields })

    const result = await prisma.campaignCategory.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: sortBy
            ? { [sortBy]: sortOrder === "desc" ? "desc" : "asc" }
            : [
                { createdAt: "desc" }
            ],
    })

    const total = await prisma.campaignCategory.count({ where })

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: result,
    };
}

const getSingleCampaignCategories = async (id: string) => {
    return await prisma.campaignCategory.findUnique({
        where: {
            id: id
        }
    })
}

const updateCampaignCategories = async (id: string, payload: string) => {
    return await prisma.campaignCategory.update({
        where: {
            id: id
        },
        data: payload
    })
}

const deleteCampaignCategories = async (id: string) => {
    return await prisma.campaignCategory.delete({
        where: {
            id: id
        }
    })
}

export const CampaignCategoriesService = {
    createCampaignCategories,
    getAllCampaignCategories,
    getSingleCampaignCategories,
    updateCampaignCategories,
    deleteCampaignCategories
}