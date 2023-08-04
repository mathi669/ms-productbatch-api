import WinstonLogger from './WinstonLogger'
import Environments from '../environments'

enum TypeCountry {
  PER = 'pe',
  CHL = 'cl',
  COL = 'co',
  BOL = 'bo',
}

export default class Logger {
  category = 'internos'
  applicationGroup = Environments.config().APPLICATION_GROUP
  application = Environments.config().APPLICATION
  country = Environments.config().COUNTRY
  environment = Environments.config().ENVIRONMENT
  stackTrace: string
  statusCode: string
  idTrace: string
  message: string
  domain = Environments.config().DOMAIN
  subDomain = Environments.config().SUB_DOMAIN
  businessProcess: [any]
  source: string
  destiny: string
  responseTime: string
  optional1: string
  optional2: string
  optional3: string
  optional4: string

  private readonly level: any

  constructor (
    level: any,
    log: any,
    idTrace: string,
    countryString?: string
  ) {
    this.stackTrace = log.stackTrace
    this.statusCode = log.statusCode
    this.idTrace = idTrace
    this.message = log.message
    this.businessProcess = log.businessProcess
    this.source = log.source
    this.destiny = log.destiny
    this.responseTime = log.responseTime
    this.optional1 = log.optional1
    this.optional2 = log.optional2
    this.optional3 = log.optional3
    this.optional4 = log.optional4
    this.level = level
    this.country = this.getCountry(countryString)
  }

  public log (): void {
    new WinstonLogger().logger.log(this.level, this)
  }

  private getCountry (value: string): string {
    const pais: string =
      TypeCountry[value?.toUpperCase()] ?? 0
        ? TypeCountry[value?.toUpperCase()]
        : 'corp'
    return pais
  }
}
