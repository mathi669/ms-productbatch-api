/**
 * DercoHeaders middleware
 *
 * This middleware is use to handle
 *
 */

import { type NextFunction, type Request, type Response } from 'express'
import { v1 as uuidv1 } from 'uuid'

export interface DercoRequest extends Request {
  dercoHeaders: Record<string, any>
}

export function DercoHeadersMiddleware (
  request: DercoRequest,
  response: Response,
  next: NextFunction
): any {
  const { headers } = request

  const dercoHeaders = {}
  Object.keys(headers).forEach(function (headerKey) {
    if (headerKey.toLocaleLowerCase().startsWith('x-derco')) {
      dercoHeaders[headerKey] = headers[headerKey]
    }
  })
  dercoHeaders['x-derco-idtrace'] = dercoHeaders['x-derco-idtrace'] || uuidv1()
  request.dercoHeaders = dercoHeaders

  response.setHeader('x-derco-dominio', 'Personas')
  response.setHeader('x-derco-sub-dominio', 'Empleados')
  response.setHeader('x-derco-capacidad', 'Gestion de empleados')
  response.setHeader('x-derco-idtrace', dercoHeaders['x-derco-idtrace'])

  next()
}
