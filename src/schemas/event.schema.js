import {z} from 'zod';

export const createEventSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }).min(3, {
    message: 'Title must be at least 3 characters long',
  }),
  description: z.string({
    required_error: 'Description is required',
  }).min(10, {
    message: 'Description must be at least 10 characters long',
  }),
  location: z.string({
    required_error: 'Location is required',
  }).min(3, {
    message: 'Location must be at least 3 characters long',
  }),
})

export const updateEventSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }).min(3, {
    message: 'Title must be at least 3 characters long',
  }).optional(),
  description: z.string({
    required_error: 'Description is required',
  }).min(3, {
    message: 'Description must be at least 10 characters long',
  }).optional(),
  location: z.string({
    required_error: 'Location is required',
  }).min(3, {
    message: 'Location must be at least 3 characters long',
  }).optional()
})
