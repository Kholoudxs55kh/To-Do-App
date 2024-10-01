import { NextFunction, Request, Response } from 'express'
import NextCors from 'nextjs-cors'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function nextCorsHandler(req: Request, res: Response, next: NextFunction) {
  await NextCors(req as unknown as NextApiRequest, res as unknown as NextApiResponse, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  next()
}
