import mongoose, { Schema, Document, Model } from "mongoose";
import { ITaskTemplate } from "./TaskTemplate";

// Define the interface for the Task Document
export interface ITask extends Document {
  template: ITaskTemplate["_id"];
  name: string;
  description: string;
  activatedAt: Date;
  dueDate: Date;
  status: "pending" | "in_progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  estimatedDuration: number; // in minutes
  completedAt?: Date;
  notes: string[];
  createdAt: Date;
  property: string;
  updatedAt: Date;
}

// Create the Task Schema
const TaskSchema: Schema = new Schema(
  {
    template: {
      type: Schema.Types.ObjectId,
      ref: "TaskTemplate",
      required: true,
    },
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
    activatedAt: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "overdue"],
      default: "pending",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1, // in minutes
    },
    completedAt: {
      type: Date,
    },
    notes: {
      type: [String],
      default: [],
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create 'createdAt' and 'updatedAt' fields
  }
);

// Create and export the Task model
const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
