import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import taskTemplateRoutes from "./routes/taskTemplateRoutes";
import propertyRoutes from "./routes/propertyRoutes";

import { generateTaskTemplate } from "./ai/ai";
import createTasks from "./modules/taskScheduler";
import TaskTemplate from "./models/TaskTemplate";
import taskRoutes from "./routes/taskRoutes";
import logger from "./utils/logger";
import Property from "./models/Property";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Error connecting to MongoDB", err);
  });

// Use the task template routes
app.use("/api/task-templates", taskTemplateRoutes);

app.use("/api/properties/:propertyId/active-tasks", taskRoutes);
app.use("/api/properties", propertyRoutes);

app.post("/api/task-scheduler", async (req: Request, res: Response) => {
  await createTasks();
  res.json({ message: "Task scheduler started" });
});

app.post(
  "/api/generate-templates/:propertyId",
  async (req: Request, res: Response) => {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      logger.warn(`Invalid property ID: ${propertyId}`);
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      logger.warn(`Property not found with ID: ${propertyId}`);
      return res.status(404).json({ message: "Property not found" });
    }

    const property_details = `${property.address}, 
    ${property.size} sqft, ${property.type}, 
    ${property.price}, ${property.bedrooms}, ${property.bathrooms}, 
    ${property.yearBuilt}, ${property.description}, ${property.status}`;

    const templates = await generateTaskTemplate(property_details);

    const parsedTemplates = JSON.parse(templates);

    await TaskTemplate.bulkSave(
      parsedTemplates.map(
        (p: any) => new TaskTemplate({ ...p, property: propertyId })
      )
    );

    res.json(JSON.parse(templates));
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
