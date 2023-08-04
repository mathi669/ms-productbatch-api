import { Router, type Response } from 'express'
import { type DercoRequest } from '../shared/middlewares/dercoHeaders.middleware'
import CProduct from '../Controllers/Product'
import ProductTopics from '../Services/Product.topics'

class Product {
  router: Router
  cProduct: CProduct
  topicClient: ProductTopics

  constructor () {
    this.router = Router()
    this.topicClient = new ProductTopics()
    this.cProduct = new CProduct()
    this.router.post('/product', this.create)
  }

  create = async (request: DercoRequest, response: Response) => {
    const body = request.body
    let idTrace = request.headers.idtrace ? request.headers.idtrace.toString() : request["dercoHeaders"]["x-derco-idtrace"];
    try{
      const result = await this.cProduct.create(body, idTrace)

      return response.status(201).send({ success: true, result })
    } catch {
      return response.status(500).send({ success: false })
    }
  }
}

export default Product
