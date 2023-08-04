import axios from "axios";
import { config } from "dotenv";
import Environments from "shared/environments";
import LoggerApp from "shared/log/LoggerApp";

export default class ProductToSalesforceService {
    public axios: any;

    constructor(){
        this.axios = axios.create();
    }

    notifySalesForce = async(data: any, idTrace: string) => {
        const config = {
            method: 'post',
            url: Environments.config().SUBSCRIPTION
        }
    }

    private notify = async(config: any, useCase: string, idTrace: string) => {
        try {
            const response = await axios(config);
            return { status: response.status, data: response.data }
        } catch (error) {
            LoggerApp.logger(
                'error',
                500,
                `${useCase} error response: ${JSON.stringify(error)}`,
                idTrace,
                true
            )
            throw error;
        }
    }
}