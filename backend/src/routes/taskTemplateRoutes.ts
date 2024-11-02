import express, { Request, Response } from "express";
import TaskTemplate from "../models/TaskTemplate";
import logger from "../utils/logger";
import { z } from "zod";

const router = express.Router({ mergeParams: true });

// Define the Zod schema for task templates
const taskTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  frequency: z.object({
    value: z.number().min(1, "Frequency value must be at least 1"),
    unit: z.enum(["days", "weeks", "months", "years"], {
      required_error: "Invalid frequency unit",
    }),
  }),
  estimatedDuration: z
    .number()
    .min(1, "Estimated duration must be at least 1 minute"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Invalid priority",
  }),
  category: z.string().min(1, "Category is required"),
});

// Create a new task template
router.post("/", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate the request body
    const validatedData = taskTemplateSchema.parse(req.body);

    const taskTemplate = new TaskTemplate({
      property: propertyId,
      ...validatedData,
    });
    const savedTaskTemplate = await taskTemplate.save();
    logger.info(`Created new task template with ID: ${savedTaskTemplate._id}`);
    res.status(201).json(savedTaskTemplate);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    logger.error("Error creating task template:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all task templates
router.get("/", async (req: Request, res: Response) => {
  try {
    const taskTemplates = await TaskTemplate.find();
    logger.info("Fetched all task templates");
    res.json(taskTemplates);
  } catch (error: any) {
    logger.error("Error fetching task templates:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single task template by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const taskTemplate = await TaskTemplate.findById(req.params.id);
    if (!taskTemplate) {
      logger.warn(`TaskTemplate not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "TaskTemplate not found" });
    }
    logger.info(`Fetched task template with ID: ${req.params.id}`);
    res.json(taskTemplate);
  } catch (error: any) {
    logger.error("Error fetching task template:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a task template by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedTaskTemplate = await TaskTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTaskTemplate) {
      logger.warn(`TaskTemplate not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "TaskTemplate not found" });
    }
    logger.info(`Updated task template with ID: ${req.params.id}`);
    res.json(updatedTaskTemplate);
  } catch (error: any) {
    logger.error("Error updating task template:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a task template by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedTaskTemplate = await TaskTemplate.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTaskTemplate) {
      logger.warn(`TaskTemplate not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "TaskTemplate not found" });
    }
    logger.info(`Deleted task template with ID: ${req.params.id}`);
    res.json({ message: "TaskTemplate deleted" });
  } catch (error: any) {
    logger.error("Error deleting task template:", error);
    res
      .status(500)
      .json({ message: error?.message ?? "Internal server error" });
  }
});

export default router;
