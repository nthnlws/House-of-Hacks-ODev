import express, { Request, Response } from "express";
import TaskTemplate from "../models/TaskTemplate";

const router = express.Router();

// Create a new task template
router.post("/", async (req, res) => {
  try {
    const taskTemplate = new TaskTemplate(req.body);
    const savedTaskTemplate = await taskTemplate.save();
    res.status(201).json(savedTaskTemplate);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all task templates
router.get("/", async (req, res) => {
  try {
    const taskTemplates = await TaskTemplate.find();
    res.json(taskTemplates);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single task template by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const taskTemplate = await TaskTemplate.findById(req.params.id);
    if (!taskTemplate)
      return res.status(404).json({ message: "TaskTemplate not found" });
    res.json(taskTemplate);
  } catch (error: any) {
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
    if (!updatedTaskTemplate)
      return res.status(404).json({ message: "TaskTemplate not found" });
    res.json(updatedTaskTemplate);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task template by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedTaskTemplate = await TaskTemplate.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTaskTemplate)
      return res.status(404).json({ message: "TaskTemplate not found" });
    res.json({ message: "TaskTemplate deleted" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error?.message ?? "Internal server error" });
  }
});

export default router;
