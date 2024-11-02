import express, { Request, Response } from "express";
import Property from "../models/Property";
import logger from "../utils/logger";

const router = express.Router({ mergeParams: true });

// Create a new property
router.post("/", async (req: Request, res: Response) => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error: any) {
    logger.error("Error creating property:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all properties
router.get("/", async (req: Request, res: Response) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single property by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Update a property by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.json(updatedProperty);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a property by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
