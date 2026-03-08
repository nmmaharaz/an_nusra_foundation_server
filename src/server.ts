import { app } from "./app"
import envVars from "./config/env"
import { prisma } from "./config/prisma"
import http, { Server } from "http"

let server: Server

async function connectToDatabase() {
    try {
        await prisma.$connect()
        console.log("** DB Connection Successfully🥰")
    } catch (error) {
        console.log("** DB Connection Failed 😔")
    }
}

async function startServer() {
    try {
        await connectToDatabase()
        server = http.createServer(app)
        server.listen(Number(envVars.port), ()=>{
            console.log(`** Server is running on port ${envVars.port} 🚀`)
        })
        handleProcessEvents()
    } catch (error) {
        console.log("** Server Failed to Start 😔", error)
        process.exit(1)

    }
}

async function gracefulShutdown(signal: string) {
    console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

    if (server) {
        server.close(async () => {
            console.log("✅ HTTP server closed.");

            try {
                console.log("Server shutdown complete.");
            } catch (error) {
                console.error("❌ Error during shutdown:", error);
            }

            process.exit(0);
        });
    } else {
        process.exit(0);
    }
}

startServer()


function handleProcessEvents() {
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("uncaughtException", (error) => {
        console.error("💥 Uncaught Exception:", error);
        gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
        console.error("💥 Unhandled Rejection:", reason);
        gracefulShutdown("unhandledRejection");
    });
}



