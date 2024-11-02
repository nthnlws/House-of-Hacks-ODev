import TaskTemplate from "../models/TaskTemplate";
import Task from "../models/Task";
import logger from "../utils/logger";

const convertFrequencyToMilliseconds = (
  value: number,
  unit: string
): number => {
  const unitToMilliseconds = {
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
    months: 30 * 24 * 60 * 60 * 1000, // Approximation
    years: 365 * 24 * 60 * 60 * 1000, // Approximation
  };
  return (
    value * (unitToMilliseconds[unit as keyof typeof unitToMilliseconds] || 0)
  );
};

const createTasks = async () => {
  try {
    const taskTemplates = await TaskTemplate.find();

    for (const template of taskTemplates) {
      const lastTask = await Task.findOne({
        template: template._id,
      }).sort({ completedAt: -1 });

      const now = new Date();
      const lastCompletedAt = lastTask?.completedAt || new Date(0);
      const frequencyInMs = convertFrequencyToMilliseconds(
        template.frequency.value,
        template.frequency.unit
      );

      if (now.getTime() - lastCompletedAt.getTime() >= frequencyInMs) {
        const newTask = new Task({
          template: template._id,
          name: template.name,
          description: template.description,
          activatedAt: now,
          dueDate: new Date(now.getTime() + frequencyInMs),
          status: "pending",
          priority: template.priority,
          estimatedDuration: template.estimatedDuration,
          notes: [],
          property: template.property,
        });

        await newTask.save();
        logger.info(`Created active task for template: ${template.name}`);
      }
    }
  } catch (error) {
    logger.error("Error creating active tasks:", error);
  }
};

export default createTasks;
