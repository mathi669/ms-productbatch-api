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
