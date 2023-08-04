import Logger from '../log/logger'

/**
 * Api Exception
 *
 *
 * Exception class with Code status and Message error
 *
 */
class ApiException extends Error {
  status: number
  message: string
  constructor (
    status: number,
    message: string,
    idTrace?: string,
    log?: boolean,
    domain?: string,
    subDomain?: string,
    businessProcess?: [any]
  ) {
    super(message)
    this.status = status
    this.message = message
    if (log) {
      if (domain?.length && subDomain && subDomain.length && idTrace) {
        new Logger(
          'error',
          {
            statusCode: status,
            message,
            domain,
            subDomain,
            businessProcess
          },
          idTrace
        ).log()
      }
    }
  }
}

export default ApiException
