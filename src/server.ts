/**
 * Initial file to run api server
 *
 */
import { config } from 'dotenv'

import Environments from './shared/environments'
import App from './shared/app'

import RProduct from './Routes/Product'
config()

async function init (): Promise<void> {
  const app = new App([new RProduct()], Environments.config().PORT)
  void app.listen()
}

void init()
