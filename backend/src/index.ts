import express from "express";
import mongoose from "mongoose";
import taskTemplateRoutes from "./routes/taskTemplateRoutes";

const app = express();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/home_tasks")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Use the task template routes
app.use("/api/task-templates", taskTemplateRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
