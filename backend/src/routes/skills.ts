import { Router, Request, Response, NextFunction, RequestHandler } from 'express'
import { Skill } from '../models/Skill'
import { createSkillSchema, updateSkillSchema } from '../schemas/validation'
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
  const skills = await Skill.find().sort({ category: 1, level: -1 })
  res.json({ success: true, data: skills })
}))

router.get('/category/:category', asyncHandler(async (req: Request, res: Response) => {
  const skills = await Skill.find({ category: req.params.category }).sort({ level: -1 })
  res.json({ success: true, data: skills })
}))

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findById(req.params.id)
  if (!skill) throw new NotFoundError('Skill not found')
  res.json({ success: true, data: skill })
}))

router.post('/', validate(createSkillSchema), asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.create(req.body)
  res.status(201).json({ success: true, data: skill })
}))

router.patch('/:id', validate(updateSkillSchema), asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!skill) throw new NotFoundError('Skill not found')
  res.json({ success: true, data: skill })
}))

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndDelete(req.params.id)
  if (!skill) throw new NotFoundError('Skill not found')
  res.json({ success: true, message: 'Skill deleted' })
}))

export default router