import type DataBaseI from '../../src/Services/Interfaces/DataBase'
import type Vehicle from '../../src/Models/Product'

class DBMock implements DataBaseI {
  public async create (_vehicle: Vehicle, _idTrace: string) {
    return {
      success: true,
      result: {
        brand: 'Mazda',
        model: 'CX-5',
        cost: '5000',
        gas: 'bencina',
        _id: '629a324e27406d99806d11b4',
        __v: 0
      }
    }
  }

  public async delete (_id: string, _idTrace: string) {
    return {
      success: true,
      result: {
        acknowledged: true,
        deletedCount: 0
      }
    }
  }

  public async update (_vehicle: Vehicle, _idTrace: string) {
    console.log(_vehicle)
    return {
      success: true,
      result: {
        brand: 'Mazda',
        model: 'CX-5',
        cost: '5000',
        gas: 'bencina',
        _id: '629a324e27406d99806d11b4',
        __v: 0
      }
    }
  }

  public async findByModel (_model: string, _idTrace: string) {
    return {
      _id: '629a324e27406d99806d11b4',
      brand: 'Mazda',
      model: 'CX-5',
      cost: '5000',
      gas: 'bencina',
      __v: 0
    }
  }

  public async findAll (_idTrace: string) {
    return {
      total: 1,
      result: [
        {
          _id: '629a324e27406d99806d11b4',
          brand: 'Mazda',
          model: 'CX-5',
          cost: '5000',
          gas: 'bencina',
          __v: 0
        }
      ]
    }
  }
}

export default DBMock
