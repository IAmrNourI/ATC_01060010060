const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const { default: mongoose } = require("mongoose");
const http = require("http");
const path = require("path");


const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");


const PORT = process.env.PORT || 8085;

app.use(
cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"]
})
); 
 
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL) 
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT} And APIs is working` });
});

server.listen(PORT, () => {   
  console.log(`Server is running on port ${PORT}`);
});  

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploaded")));
