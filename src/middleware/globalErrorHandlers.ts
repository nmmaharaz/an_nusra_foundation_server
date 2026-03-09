import type { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError.js";
import { ZodError } from "zod";
import envVars from "../config/env.js";
import { Prisma } from "../../prisma/generated/prisma/client";

export const globalError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Something went wrong";

    const stack = envVars.nodeEnv === "development" ? err.stack : null;

    /* ---------- App Error ---------- */
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    /* ---------------Zod Error -------------------- */
    else if (err instanceof ZodError) {
        statusCode = 400;
        message = err.issues
            .map(e => `${e.path.join(".")} - ${e.message}`)
            .join(", ");
    }

    /* ---------- Prisma Errors ---------- */
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = 409;
                message = `Duplicate value for ${err.meta?.target}`;
                break;

            case "P2025":
                statusCode = 404;
                message = "Requested record not found";
                break;

            case "P2003":
                statusCode = 400;
                message = "Invalid relation reference";
                break;

            default:
                statusCode = 400;
                message = "Prisma database error";
        }
    }

    /* ---------- Normal JS Error ---------- */
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack,
        err: envVars.nodeEnv === "development" ? err : null,
    });
};
