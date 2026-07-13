import { Router, Request, Response, NextFunction, RequestHandler } from 'express'
import { Project } from '../models/Project'
import { createProjectSchema, updateProjectSchema } from '../schemas/validation'
import { AppError, NotFoundError } from '../utils/AppError'

const router = Router()

const validate = (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)
  if (!result.success) throw new AppError('Validation error', 400)
  req.body = result.data
  next()
}

const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json({ success: true, data: projects })
}))

router.get('/featured', asyncHandler(async (_req: Request, res: Response) => {
  const projects = await Project.find({ featured: true }).sort({ createdAt: -1 })
  res.json({ success: true, data: projects })
}))

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id)
  if (!project) throw new NotFoundError('Project not found')
  res.json({ success: true, data: project })
}))

router.post('/', validate(createProjectSchema), asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.create(req.body)
  res.status(201).json({ success: true, data: project })
}))

router.patch('/:id', validate(updateProjectSchema), asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!project) throw new NotFoundError('Project not found')
  res.json({ success: true, data: project })
}))

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) throw new NotFoundError('Project not found')
  res.json({ success: true, message: 'Project deleted' })
}))

export default router