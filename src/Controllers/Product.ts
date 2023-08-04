
import ProductTopics from '../Services/Product.topics'
import ProductM from '../Models/Product'
import PriceM from '../Models/Price'
import ProductToSalesforceService from '../Services/ProductSalesforce.service'

class Product {
  topicClient: ProductTopics

  public async create (body,_idTrace): Promise<any> {
    
    try {
      const product: ProductM = new ProductM(body.product)
      const price: PriceM = new PriceM(body.price)

      const RequestSalesforce = {
        product: [
          product
        ],
        price:[
          price
        ]
      }
      
      return RequestSalesforce

    } catch (err) {
      return err
    }
  }

}

export default Product
