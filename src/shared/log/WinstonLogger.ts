import appRoot from 'app-root-path'
import winston from 'winston'

class WinstonLogger {
  public options = {
    file: {
      level: 'info',
      filename: `${appRoot.path}/logs/app.log`,
      // Filename: 'C:/logs/app.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 3,
      colorize: false,
      options: { encoding: 'utf8', flags: 'a' }
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true
    }
  }

  public logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File(this.options.file),
      new winston.transports.Console(this.options.console)
    ],
    exitOnError: false // Do not exit on handled exceptions
  })
}

export default WinstonLogger
