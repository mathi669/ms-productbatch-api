import Logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class LoggerApp {
  static logger (
    type: any,
    status: number,
    message: string,
    idTrace?: string,
    log?: boolean,
    businessProcess?: [any]
  ): void {
    if (log) {
      if (idTrace) {
        const logWinston = new Logger(
          type,
          {
            statusCode: status,
            message,
            businessProcess
          },
          idTrace
        )
        logWinston.log()
      }
    }
  }
}

export default LoggerApp
