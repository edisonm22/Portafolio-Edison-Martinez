import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(1000),
  technologies: z.array(z.string().trim()).optional(),
  featured: z.boolean().default(false),
  demoUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  image: z.string().url().optional().or(z.literal('')),
})

export const updateProjectSchema = createProjectSchema.partial()

export const createSkillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  category: z.enum(['frontend', 'backend', 'database', 'devops', 'tools', 'other']),
  level: z.number().int().min(0).max(100),
  icon: z.string().url().optional().or(z.literal('')),
})

export const updateSkillSchema = createSkillSchema.partial()

export const createMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
})

export const messageQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
  status: z.enum(['pending', 'read', 'replied']).optional(),
})

export const updateMessageStatusSchema = z.object({
  status: z.enum(['pending', 'read', 'replied']),
})