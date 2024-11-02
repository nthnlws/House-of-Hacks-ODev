import express, { Request, Response } from "express";
import { z } from "zod";
import Property from "../models/Property";

const router = express.Router();

// Define the Zod schema within the routes file
const propertyZodSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  address: z.string().optional(),
  size: z.number().optional(),
  type: z.string().optional(),
  price: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  yearBuilt: z.number().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  has_pool: z.boolean().optional(),
  ac_type: z.string().optional(),
  floor_type: z.string().optional(),
  roofing_type: z.string().optional(),
});

// Create a new property with Zod validation
router.post("/", async (req: Request, res: Response) => {
  try {
    // Validate the request body using Zod
    const validatedData = propertyZodSchema.parse(req.body);

    const property = new Property(validatedData);
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error creating property:", error);
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
