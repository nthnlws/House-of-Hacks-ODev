import express, { Request, Response } from "express";
import TaskTemplate from "../models/TaskTemplate";
import logger from "../utils/logger";

const router = express.Router({ mergeParams: true });

// Create a new task template
router.post("/", async (req, res) => {
  try {
    const taskTemplate = new TaskTemplate(req.body);
    const savedTaskTemplate = await taskTemplate.save();
    logger.info(`Created new task template with ID: ${savedTaskTemplate._id}`);
    res.status(201).json(savedTaskTemplate);
  } catch (error: any) {
    logger.error("Error creating task template:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all task templates
router.get("/", async (req, res) => {
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
