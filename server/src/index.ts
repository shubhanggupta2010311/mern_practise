// shubhanggupta = user1234

import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string =
  "mongodb+srv://shubhanggupta:user1234@personalfinancetracker.tp0ht.mongodb.net/";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/financial-records", financialRecordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
