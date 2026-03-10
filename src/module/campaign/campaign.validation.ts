import { z } from "zod";

export const createCampaignZodSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title too long"),

    description: z
        .string()
        .max(5000)
        .optional(),

    goalAmount: z
        .number({
            error: "Goal amount must be number",
        })
        .positive("Goal must be positive")
        .optional(),

    raisedAmount: z
        .number()
        .min(0)
        .optional(),

    startDate: z.coerce.date({
        error: "Invalid start date"
    }),

    endDate: z.coerce.date({
        error: "Invalid end date"
    }).optional(),

    categoryId: z.string().optional(),
})

export const updateCampaignZodSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(200, "Title too long").optional(),

    description: z
        .string()
        .max(5000)
        .optional(),

    goalAmount: z
        .number({
            error: "Goal amount must be number",
        })
        .positive("Goal must be positive")
        .optional(),

    raisedAmount: z
        .number()
        .min(0)
        .optional(),

    startDate: z.coerce.date({
        error: "Invalid start date"
    }).optional(),

    endDate: z.coerce.date({
        error: "Invalid end date"
    }).optional(),

    categoryId: z.string().optional(),
})
