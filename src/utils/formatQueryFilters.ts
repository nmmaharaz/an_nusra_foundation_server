import type { Prisma } from "../../prisma/generated/prisma/client";
import type { FilterOptions } from "../types";

export function findQuery(query: Record<string, any>, filterableFields: string[]) {
    const {
        page,
        limit,
        sortBy,
        sortOrder,
        searchTerm,
        ...rest
    } = query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const filters: Record<string, any> = {};
    filterableFields.forEach(field => {
        if (rest[field]) {
            filters[field] = rest[field];
        }
    });

    return { pageNumber, limitNumber, skip, rest, searchTerm, filters, sortBy, sortOrder }
}


export const formatQueryFilters = ({ searchTerm, filters, searchableFields, exactFields, multiSelectFields }: FilterOptions) => {
    const andConditions = [];

    if (exactFields!?.length > 0) {
        for (const field of exactFields!) {
            let value: any = filters[field];

            if (value === "true") value = true;
            if (value === "false") value = false;

            andConditions.push({
                [field]: value
            });
        }
    }

    if (multiSelectFields!?.length > 0) {
        for (const field of multiSelectFields!) {
            if (filters[field]) {
                const values = filters[field].split(",");
                andConditions.push({
                    [field]: {
                        in: values
                    }
                });
            }
        }
    }

    if (searchTerm) {
        andConditions.push({
            OR: searchableFields?.map((field: string) => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : {}

    return where
}

