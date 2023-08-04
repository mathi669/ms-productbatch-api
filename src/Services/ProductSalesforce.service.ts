import axios from "axios";
import Environments from "shared/environments";
import LoggerApp from "shared/log/LoggerApp";

export default class ProductToSalesforceService {
    public axios: any;

    constructor(){
        this.axios = axios.create();
    }

    notifySalesForce = async(json: any, idTrace: string):Promise<{status: any, data: any}> => {
        const config = {
            method: 'post',
            url: Environments.config().SUBSCRIPTION,
            headers:{
                "Content-Type": 'application/json'
            },
            data: json
        }

        // if(config.url === Environments.config().SUBSCRIPTION){
        //     return config.url
        // } else {
            
        // }

        return this.notify(config, 'product', idTrace)
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