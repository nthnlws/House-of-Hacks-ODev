import express, { Request, Response } from "express";
import Task from "../models/Task";
import logger from "../utils/logger";

const router = express.Router({ mergeParams: true });

// List all active tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { status = "pending" } = req.query;
    const Tasks = await Task.find({
      status: { $eq: status },
      property: {
        $eq: propertyId,
      },
    });
    logger.info(
      `Fetched tasks with status: ${status} and propertyId: ${propertyId}`
    );
    res.json(Tasks);
  } catch (error: any) {
    logger.error("Error fetching tasks:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add a note to an active task
router.post("/:id/notes", async (req: Request, res: Response) => {
  try {
    const { note } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`Task not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Task not found" });
    }

    task.notes.push(note);
    await task.save();
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Mark an active task as completed
router.patch("/:id/complete", async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`Task not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "completed";
    task.completedAt = new Date();
    await task.save();
    logger.info(`Marked task as completed with ID: ${req.params.id}`);
    res.json(task);
  } catch (error: any) {
    logger.error("Error marking task as completed:", error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
