

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

/* ================= LOAD ENV ================= */
dotenv.config();

/* ================= IMPORTS ================= */
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRouter");
const recruiterRoutes = require("./routes/recruiterRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const clerkWebhookRoutes = require("./routes/clerkWebhook");
/* ================= APP ================= */
const app = express();
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webhookRoutes
  
);
app.use("/api/webhook", clerkWebhookRoutes);
/* ================= CORS ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local
      "https://hire-x.vercel.app" // 🔥 change later to your frontend URL
    ],
    credentials: true,
  })
);
app.use("/api/clerk", clerkWebhookRoutes);
/* ================= BODY PARSER ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("HireX API Running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", chatRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* ================= START SERVER (RENDER FIX) ================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server start failed:", error);
    process.exit(1);
  }
};

startServer();

/* DEBUG ENV */
console.log("Cloudinary:", process.env.CLOUDINARY_CLOUD_NAME);