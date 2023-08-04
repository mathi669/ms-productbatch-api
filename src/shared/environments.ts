import * as dotenv from 'dotenv'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Environments {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config (): any {
    dotenv.config()
    const MONGO_URI_CLIENTS = process.env.MONGO_URI_CLIENTS
    const PORT = process.env.PORT
    const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS
    const TOPIC = process.env.TOPIC
    const SUBSCRIPTION = process.env.SUBSCRIPTION
    const RETRY_DELAY_IN_MS = process.env.RETRY_DELAY_IN_MS
    const APPLICATION_GROUP = process.env.APPLICATION_GROUP
    const APPLICATION = process.env.APPLICATION
    const DOMAIN = process.env.DOMAIN
    const SUB_DOMAIN = process.env.SUB_DOMAIN
    const COUNTRY = process.env.COUNTRY
    const ENVIRONMENT = process.env.ENVIRONMENT

    return {
      ENVIRONMENT,
      APPLICATION_GROUP,
      APPLICATION,
      DOMAIN,
      SUB_DOMAIN,
      COUNTRY,
      MONGO_URI_CLIENTS,
      PORT,
      GOOGLE_APPLICATION_CREDENTIALS,
      TOPIC,
      SUBSCRIPTION,
      RETRY_DELAY_IN_MS
    }
  }
}

export default Environments
