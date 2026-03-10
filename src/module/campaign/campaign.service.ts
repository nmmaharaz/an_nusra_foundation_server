import type { Prisma } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../config/prisma";
import { findQuery, formatQueryFilters } from "../../utils/formatQueryFilters";
import { campaignFilterableFields, campaignSearchableFields } from "./campaign.constant";

const createCampaign = async (file: string, payload: Prisma.CampaignCreateInput) => {
    return await prisma.$transaction(async (tnx) => {
        const campaign = await tnx.campaign.create({
            data: payload
        })
        console.log(campaign, "Campaing")
        const media = await tnx.campaignMedia.create({
            data: {
                fileUrl: file,
                campaignId: campaign.id
            }
        })
        const result = { ...campaign, media }
        console.log(result, "Result")
        return result
    })
}

const getAllCampaign = async (query: Record<string, string>) => {
    const { pageNumber, limitNumber, filters, skip, searchTerm, sortBy, sortOrder } = findQuery(query, campaignFilterableFields)

    const andCondition: Prisma.CampaignWhereInput[] = []

    if (campaignFilterableFields.length > 0) {
        for (const filter of campaignFilterableFields) {
            andCondition.push({
                campaignCategory: {
                    [filter]: filters[filter]
                }
            })
        }
    }

    if (searchTerm) {
        andCondition.push({
            OR: campaignSearchableFields?.map((search) => ({
                [search]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    const where: Prisma.CampaignWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const result = await prisma.campaign.findMany({
        where,
        include: {
            campaignCategory: true,
            media: true,
            impactReports: true
        },
        skip,
        take: limitNumber,
        orderBy: sortBy
            ? { [sortBy]: sortOrder === "desc" ? "desc" : "asc" }
            : [
                { createdAt: "desc" }
            ],
    })

    const total = await prisma.campaign.count({ where })

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
        },
        data: result,
    };
}

const getSingleCampaign = async (id: string) => {
    return await prisma.campaign.findUnique({
        where: {
            id: id
        },
        include: {
            campaignCategory: {
                select: {
                    name: true
                }
            },
            media: true,
            impactReports: true
        },

    })
}

const updateCampaign = async (id: string, payload: Partial<Prisma.CampaignCreateInput>, file: string) => {
    return await prisma.$transaction(async (tnx) => {
        const campaign = await tnx.campaign.update({
            where: {
                id: id
            },
            data: payload
        })

        if (file) {
            await tnx.campaignMedia.deleteMany({
                where: {
                    campaignId: id
                }
            })
            await tnx.campaignMedia.create({
                data: {
                    fileUrl: file,
                    campaignId: campaign.id
                }
            })
        }

        return await tnx.campaign.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                campaignCategory: true,
                media: true
            }
        })
    })
}

const deleteCampaign = async (id: string) => {
    return await prisma.$transaction(async (tnx) => {
        await tnx.campaignMedia.deleteMany({
            where: {
                campaignId: id
            },
        })

        return await tnx.campaign.delete({
            where: {
                id
            }
        })
    })
}


const createCampaignUpdate = async (payload: Prisma.CampaignUpdateCreateInput) => {
    return await prisma.$transaction(async (tnx) => {
        return await tnx.campaignUpdate.create({
            data: payload
        })

    })
}

const getSingleCampaignUpdate = async (id: string) => {
    return await prisma.campaignUpdate.findUnique({
        where: {
            id
        }
    })
}

const updateCampaignUpdate = async (id: string, payload: Partial<Prisma.CampaignUpdateCreateInput>) => {
    return await prisma.$transaction(async (tnx) => {
        return await tnx.campaignUpdate.update({
            where: {
                id: id
            },
            data: payload
        })
    })
}

const deleteCampaignUpdate = async (id: string) => {
    return await prisma.$transaction(async (tnx) => {
        return await tnx.campaignUpdate.delete({
            where: {
                id
            }
        })
    })
}

export const CampaignService = {
    createCampaign,
    getAllCampaign,
    getSingleCampaign,
    updateCampaign,
    deleteCampaign,
    createCampaignUpdate,
    getSingleCampaignUpdate,
    updateCampaignUpdate,
    deleteCampaignUpdate
}