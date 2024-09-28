import { z } from 'zod';

const TaskBaseSchema = z.object({
  name: z.string().max(1000, { message: "Task can't be more than 1000 characters" }),
  isDone: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export const TaskCreateValidation = TaskBaseSchema;

export const TaskUpdateValidation = TaskBaseSchema.extend({
  id: z.string().uuid({ message: "Invalid task id" }),
}).partial();
