import mongoose from "mongoose";
import configKeys from "../../config";

const connectDB = async () => {
  try {
    const dbOptions = {
      dbName: configKeys.DB_NAME, 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb+srv://juny76:tuan762003@cluster0.q4mt3pd.mongodb.net/?retryWrites=true&w=majority", dbOptions);

    console.log("Database connected...");
  } catch (error) {
    console.error("Database connection error", error);
    // Exiting the process or handle the error later
    process.exit(1);
  }
};

export default connectDB;
 