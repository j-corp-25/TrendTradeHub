import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 4000;
import userRoutes from "./routes/userRoutes.js";
const app = express();
connectDB();

app.use("/api/users", userRoutes);

app.use(helmet());
app.use(express.json());
app.use(notFound);
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Server started on port ${port}`));
