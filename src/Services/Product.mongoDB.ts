import { getModelForClass } from '@typegoose/typegoose'
import { connect, disconnect } from 'mongoose'
import { v1 as uuidv1 } from 'uuid'
import Product from '../Models/Product'
import Environments from '../shared/environments'
import ApiException from '../shared/exceptions/api.exception'
import Logger from '../shared/log/logger'
import type DataBaseI from './Interfaces/DataBase'

class ProductMongoDB implements DataBaseI {
  public static async initDB (): Promise<void> {
    console.log('Connecting to mongodb...')
    const uuid = uuidv1()
    await connect(Environments.config().MONGO_URI_CLIENTS)
      .then(async () => {
        console.log('Connected to MongoDB With Mongoose')
      })
      .catch((err) => {
        new Logger(
          'error',
          {
            statusCode: 500,
            message: String(err)
          },
          uuid
        ).log()
        throw new Error(err)
      })
  }

  public static async disconnectDBClients (): Promise<void> {
    await disconnect()
  }

  create = async (product: Product, idTrace: string): Promise<any> => {
    return await getModelForClass(Product).create(Product)
      .then((res) => {
        console.log(`create result: ${res.id}`)
        return res
      })
      .catch(async (err) => {
        console.log(`create error: ${err}`)
        if (err.code === '11000') {
          return await this.update(product, idTrace)
        }
        throw new ApiException(500, err, idTrace, true, 'TemplateSimpleProject', 'Vehicle')
      })
  }

  delete = async (id: string, idTrace: string): Promise<any> => {
    return await getModelForClass(Product).deleteOne({ _externalId: id })
      .then((res) => {
        console.log(`delete result: ${res.deletedCount}`)
        return res
      })
      .catch((err) => {
        console.log(`delete error: ${err}`)
        throw new ApiException(500, err, idTrace, true, 'TemplateSimpleProject', 'Vehicle')
      })
  }

  update = async (product: Product, idTrace: string): Promise<any> => {
    return await getModelForClass(Product).findOneAndUpdate({ _externalId: product.externalId }, product)
      .then((res) => {
        console.log(`update result: ${res.id}`)
        return res
      })
      .catch((err) => {
        console.log(`update error: ${err}`)
        throw new ApiException(500, err, idTrace, true, 'TemplateSimpleProject', 'Vehicle')
      })
  }

  findByModel = async (_externalId: string, idTrace: string): Promise<any> => {
    return await getModelForClass(Product).findOne({ _externalId })
      .then((res) => {
        console.log(`findByModel result: ${res.id}`)
        return res
      })
      .catch((err) => {
        console.log(`findByModel error: ${err}`)
        throw new ApiException(500, err, idTrace, true, 'TemplateSimpleProject', 'Vehicle')
      })
  }

  findAll = async (idTrace: string): Promise<any> => {
    return await getModelForClass(Product).find({})
      .then((res) => {
        console.log(`findAll result: ${res.length}`)
        return res
      })
      .catch((err) => {
        console.log(`findAll error: ${err}`)
        throw new ApiException(500, err, idTrace, true, 'TemplateSimpleProject', 'Vehicle')
      })
  }
}

export default ProductMongoDB
