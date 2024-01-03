import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';

const port = process.env.PORT || 4000;
connectDB();

const app = express();
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
