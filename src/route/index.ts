import { Router } from "express";
import { CampaignCategoriesRoute } from "../module/campaign-categories/campaign-categories.route";
import { CampaignRoute } from "../module/campaign/campaign.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/campaign-categories",
        route: CampaignCategoriesRoute
    },
    {
        path: "/campaign",
        route: CampaignRoute
    }
]

moduleRoutes.map((route) => {
    router.use(route.path, route.route)
})
