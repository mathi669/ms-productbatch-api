import type Vehicle from '../../Models/Product'

interface DataBaseI {
  create: (vehicle: Vehicle, idTrace: string) => Promise<any>
  delete: (id: string, idTrace: string) => Promise<any>
  update: (vehicle: Vehicle, idTrace: string) => Promise<any>
  findByModel: (model: string, idTrace: string) => Promise<any>
  findAll: (idTrace: string) => Promise<any>
}

export default DataBaseI
