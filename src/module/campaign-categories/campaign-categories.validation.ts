import z from "zod";

const createCampaignCategoriesZodSchema = z.object({
    name: z.string({
        error: "Name is required"
    }).min(3, "Name must be at least 3 characters long"),
})

const updateCampaignCategoriesZodSchema = z.object({
    name: z.string({
        error: "Name is required"
    }).min(3, "Name must be at least 3 characters long").optional(),
})



export const CampaignCategoriesValidation = {
    createCampaignCategoriesZodSchema,
    updateCampaignCategoriesZodSchema
}