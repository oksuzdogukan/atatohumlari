import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/dbConnection.js";
import AdminRoute from "./routes/AdminRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/api", AdminRoute);

db();

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda calisiyor`);
});
