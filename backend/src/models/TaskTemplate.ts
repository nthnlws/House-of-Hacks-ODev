import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the TaskTemplate Document
export interface ITaskTemplate extends Document {
  name: string;
  description: string;
  frequency: {
    value: number;
    unit: "days" | "weeks" | "months" | "years";
  };
  estimatedDuration: number; // in minutes
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the TaskTemplate Schema
const TaskTemplateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    frequency: {
      value: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        enum: ["days", "weeks", "months", "years"],
        required: true,
      },
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1, // in minutes
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
  }
);

// Create and export the TaskTemplate model
const TaskTemplate: Model<ITaskTemplate> = mongoose.model<ITaskTemplate>(
  "TaskTemplate",
  TaskTemplateSchema
);

export default TaskTemplate;
