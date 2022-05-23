import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://ahnaffg:aRnroDGoMmpKoHmP@youtube-clone-cluster.4hyn3.mongodb.net/test"

export async function connectToDatabase(){
    try {
        await mongoose.connect(DB_CONNECTION_STRING)
        logger.info("Connected to database")
    } catch (e) {
        logger.error("Failed to connect to database")
        process.exit(1)
    }
}

export async function disconnectFromDatabase(){
    await mongoose.connection.close()

    logger.info("Disconnect from database")

    return;
}