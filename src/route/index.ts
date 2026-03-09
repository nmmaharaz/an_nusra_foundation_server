import { Router } from "express";
import { CompaignCategoriesRoute } from "../module/campaign-categories/campaign-categories.route";

export const router = Router()

const moduleRoutes = [
    {
        path: "/campaign-categories",
        route: CompaignCategoriesRoute
    }
]

moduleRoutes.map((route) => {
    router.use(route.path, route.route)
})
