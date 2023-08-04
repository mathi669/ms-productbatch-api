import { DercoHeadersMiddleware } from './middlewares/dercoHeaders.middleware'
import * as bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import {
  HealthChecker,
  HealthEndpoint,
  LivenessEndpoint,
  ReadinessEndpoint
} from '@cloudnative/health-connect'
import swaggerUi from 'swagger-ui-express'
import { v1 as uuidv1 } from 'uuid'
import LoggerApp from '../shared/log/LoggerApp'
import ProductTopics from '../Services/Product.topics'
import Environments from './environments'
import YAML from 'yamljs'
import ProductMongoDB from '../Services/Product.mongoDB'

class App {
  public app: express.Application
  public port: number

  constructor (routers, port) {
    this.app = express()
    this.app.use(helmet())
    this.port = port
    this.initializeMiddlewares()
    this.initializeRouters(routers)
    this.initializeSwagger()
  }

  private initializeSwagger (): void {
    const swaggerDocument = YAML.load('./src/shared/swagger/file.swagger.yml')
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }

  private initializeMiddlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(DercoHeadersMiddleware)
  }

  private initializeHealthCheck (): express.Router {
    const heathRouter = express.Router()

    const healthCheck = new HealthChecker()
    heathRouter.use('/live', LivenessEndpoint(healthCheck))
    heathRouter.use('/ready', ReadinessEndpoint(healthCheck))
    heathRouter.use('/health', HealthEndpoint(healthCheck))

    return heathRouter
  }

  private initializeRouters (routers): void {
    routers.forEach((router) => {
      this.app.use('', router.router)
    })
  }

  private async initializeConsumers (): Promise<void> {
    LoggerApp.logger(
      'info',
      200,
      `Initialize ${Environments.config().TOPIC} Consumer`,
      uuidv1(),
      true
    )

    const topicClient = new ProductTopics()
    await topicClient.receive()
    
  }

  private async initializeDB (): Promise<void> {
    await ProductMongoDB.initDB()
  }

  public async listen (): Promise<void> {
    console.log(`MONGO_URI_CLIENTS: ${Environments.config().MONGO_URI_CLIENTS}`)
    if (Environments.config().MONGO_URI_CLIENTS != null) {
      await this.initializeDB()
    } else {
      console.log('sin mongo')
    }
    console.log(`TOPIC: ${Environments.config().TOPIC}`)
    if (Environments.config().GOOGLE_APPLICATION_CREDENTIALS != null) {
      await this.initializeConsumers()
    } else {
      console.log('sin topico')
    }

    this.app.listen(this.port, () => {
      LoggerApp.logger(
        'info',
        200,
        `App listening on the port ${this.port}`,
        uuidv1(),
        true
      )

      this.app.use('/check', this.initializeHealthCheck())
    })
  }
}

export default App
