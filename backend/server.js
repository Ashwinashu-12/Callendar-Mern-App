import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Event from "./models/Event.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/tasks.js"; // ✅ our new tasks route

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ Auth routes
app.use("/api/auth", authRoutes);

// ✅ Tasks routes (protected with middleware inside)
app.use("/api/tasks", taskRoutes);

// Old Events API (if you still need it)
app.get("/api/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/api/events", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  io.emit("eventAdded", event);
  res.status(201).json(event);
});

app.delete("/api/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  io.emit("eventDeleted", req.params.id);
  res.json({ message: "Event deleted" });
});

// Socket.io
io.on("connection", (socket) => {
  console.log("✅ User connected");
  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
