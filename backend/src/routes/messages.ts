import { Router, Request, Response, NextFunction, RequestHandler } from 'express'
import { Message } from '../models/Message'
import { createMessageSchema, messageQuerySchema, updateMessageStatusSchema } from '../schemas/validation'
import { AppError, NotFoundError } from '../utils/AppError'

const router = Router()

const validate = (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)
  if (!result.success) throw new AppError('Validation error', 400)
  req.body = result.data
  next()
}

const validateQuery = (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.query)
  if (!result.success) throw new AppError('Invalid query', 400)
  req.query = result.data
  next()
}

const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.post('/', validate(createMessageSchema), asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.create(req.body)
  res.status(201).json({ success: true, data: message })
}))

router.get('/', validateQuery(messageQuerySchema), asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, status } = req.query as any
  const skip = (page - 1) * limit
  const query = status ? { status } : {}
  const [messages, total] = await Promise.all([
    Message.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Message.countDocuments(query),
  ])
  res.json({ success: true, data: messages, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
}))

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.findById(req.params.id)
  if (!message) throw new NotFoundError('Message not found')
  res.json({ success: true, data: message })
}))

router.patch('/:id/status', validate(updateMessageStatusSchema), asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
  if (!message) throw new NotFoundError('Message not found')
  res.json({ success: true, data: message })
}))

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const message = await Message.findByIdAndDelete(req.params.id)
  if (!message) throw new NotFoundError('Message not found')
  res.json({ success: true, message: 'Message deleted' })
}))

export default router