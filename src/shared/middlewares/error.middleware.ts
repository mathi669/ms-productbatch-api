/**
 * Error middleware
 *
 * This middleware is use to handle an HttpException and return Http Response with the error
 *
 */

import { type NextFunction, type Request, type Response } from 'express'
import type HttpException from '../exceptions/api.exception'

function ErrorMiddleware (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response<any, Record<string, any>> {
  const status = error.status != null ? error.status : 500
  const message = error.message != null ? error.message : 'Something went wrong'
  return response.status(status).send({
    status,
    message
  })
}

export default ErrorMiddleware
