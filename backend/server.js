import express from "express";
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import {upload} from "./middleware/multer.js"

const port = process.env.PORT || 4000;
connectDB();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors({
    origin: "http://localhost:3000"
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.get('/api/test', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log('Message received:', message);
        socket.broadcast.emit('message',message);
    });
});



app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);


app.use(notFound);
app.use(errorHandler);

// Use server.listen instead of app.listen
server.listen(port, () => console.log(`Server started on port ${port}`));
