import { Router } from "express";
import { CampaignCategoriesRoute } from "../module/campaign-categories/campaign-categories.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/campaign-categories",
        route: CampaignCategoriesRoute
    }
]

moduleRoutes.map((route) => {
    router.use(route.path, route.route)
})
