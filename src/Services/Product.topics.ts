import { PubSub } from '@google-cloud/pubsub'
import {
  isServiceBusError,
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusMessageBatch,
  ServiceBusReceivedMessage
} from "@azure/service-bus";
import moment from 'moment'
import { v1 as uuidv1 } from 'uuid'
import LoggerApp from '../shared/log/LoggerApp'
import Environments from '../shared/environments'
import CProduct from '../Controllers/Product'
import type TopicI from './Interfaces/Topic'

class ProductTopics implements TopicI {
  private readonly cProduct: CProduct
  private readonly pubSubClient: PubSub

  constructor () {
    this.pubSubClient = new PubSub()
  }

  /**
   * Metodo para publicar la data como un evento en una cola
   * @param data parametro recibido para agregarlo como informacion al evento que se encolara,
   *  debe ser un json
   * @example data: { "message":"hola mundo"}
   */
  public async publish (data: any, dercoHeaders: any): Promise<void> {

    const sbClient = new ServiceBusClient(Environments.config().SERVICE_BUS_CONNECTION)

    const sender = sbClient.createSender(Environments.config().TOPIC);

    const id = uuidv1()
    const idTrace = dercoHeaders['x-derco-idtrace']
    const message = {
      id,
      eventType: 'ms.peduct.batch',
      data,
      dataVersion: '1',
      metadataVersion: '1',
      meta: {
        ...dercoHeaders,
        type: '',
        publisher: 'ProductBatch',
        retries: 0,
        data: {}
      },
      eventTime: moment().format()
    }

    message.meta.type = 'ProductBacth'
    message.meta.publisher = 'ProductBacth'
    message.meta.retries = 0

    let batch: ServiceBusMessageBatch = await sender.createMessageBatch();
    batch.tryAddMessage({ body: message });

    await sender.sendMessages(batch)
    // se publica un mensaje, este debe ir como string
    const dataBuffer = Buffer.from(JSON.stringify(message))
    let messageId = 'err'
    try {
      messageId = await this.pubSubClient
        .topic(Environments.config().TOPIC)
        .publishMessage({ data: dataBuffer })
      LoggerApp.logger(
        'info',
        null,
                  `Event FILE with id ${messageId} has PUBLISHED`,
                  idTrace,
                  true
      )
    } catch (err) {
      LoggerApp.logger(
        'error',
        999,
                `${Environments.config().TOPIC} - ${err}`,
                dercoHeaders['x-derco-idtrace'],
                true
      )
    }
  }
  receive = async () => {

    const sbClient = new ServiceBusClient(Environments.config().SERVICE_BUS_CONNECTION);

    const receiver = sbClient.createReceiver(
        Environments.config().TOPIC,
        Environments.config().SUBSCRIPTION,
        //@maxAutoLockRenewalDurationInMs este parametro agrega un triempo de bloqueo adicional al que esta configurado en el topico
        //si se requiere agregar mas tiempo para no procesar tan rapido el evento en caso de error, este valor se debe modificar
        { receiveMode: "peekLock", maxAutoLockRenewalDurationInMs: 0 }
    );

    LoggerApp.logger(
        "info",
        200,
        `Staring consume event: ${Environments.config().TOPIC}`,
        uuidv1(),
        true
    );

    try {
        receiver.subscribe({
            processMessage: async (message: ServiceBusReceivedMessage) => {
                if (!message.body.data) {
                    LoggerApp.logger(
                        "info",
                        null,
                        `No data in Message `,
                        uuidv1(),
                        true
                    );
                    return;
                }

                const idTrace: string = message.body.meta["x-derco-idtrace"];

                try {

                    const id: string = message.body.id;
                    LoggerApp.logger(
                        "info",
                        null,
                        `Received event ${id} from ${message.body.meta.publisher}`,
                        idTrace,
                        true
                    );

                    

                    await this.cProduct.create(message.body, idTrace);

                    receiver.completeMessage(message);

                } catch (err) {
                    LoggerApp.logger(
                        "error",
                        999,
                        `Person , retries ${message.deliveryCount}, because ${err.stack}`,
                        idTrace,
                        true
                    );
                }
            },
            processError: async (args: ProcessErrorArgs) => {
                const trace = uuidv1();
                if (isServiceBusError(args.error)) {
                    args.error.code !== "MessageLockLost" &&
                        LoggerApp.logger(
                            "error",
                            null,
                            `Error Vehicle from source ${args.errorSource} occurred: ${args.error} `,
                            trace,
                            true
                        );

                    args.error.code === "MessageLockLost" &&
                        LoggerApp.logger(
                            "info",
                            null,
                            `Message has been consumming from Vehicle`,
                            trace,
                            true
                        );
                }
            },
        }, { autoCompleteMessages: false });

    } catch (err) {
        LoggerApp.logger("Exception Person Consumer", null, err, uuidv1(), true);
    }
};
}

export default ProductTopics
