import mongoose, { ConnectionOptions } from "mongoose"
import * as config from "../config/configApp"

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("Database Connected");
    } catch (error) {
        console.log(config.MONGO_DB_URI)
        console.log("Error ============");
        console.log(error);
    }
};