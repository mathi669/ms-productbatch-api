import chai from 'chai'
import 'mocha'
import { v1 as uuidv1 } from 'uuid'
import CVehicle from '../../src/Controllers/Product'
import MVehicle from '../../src/Models/Product'
import DBMock from '../Mocks/DBMock'

const { expect } = chai

const startTest = () => {
  describe('Vehicle - create Vehicle', () => {
    let mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      mongoDBMock = new DBMock()
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call Create', async function () {
      const vehicle: MVehicle = new MVehicle('Mazda', 'CX-5', '5000', 'bencina')

      const dercoHeaders: string = uuidv1()
      const results = await VehicleInstance.createVehicle(vehicle, dercoHeaders)

      expect(results.success).to.be.equal(true)
    })
  })

  describe('Vehicle - create Vehicle fail', () => {
    const mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call Create fail', async function () {
      const vehicle: MVehicle = new MVehicle('Mazda', 'CX-5', '5000', 'bencina')

      const dercoHeaders: string = uuidv1()
      let results: any
      try {
        results = await VehicleInstance.createVehicle(vehicle, dercoHeaders)
      } catch (error) {
        expect(results).to.be.equal(undefined)
      }
    })
  })

  describe('Vehicle - delete Vehicle', () => {
    let mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      mongoDBMock = new DBMock()
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call delete', async function () {
      const dercoHeaders: string = uuidv1()
      const _id: string = 'uuidv1()'
      const results = await VehicleInstance.deleteVehicle(_id, dercoHeaders)

      expect(results.success).to.be.equal(true)
    })
  })

  describe('Vehicle - delete Vehicle fail', () => {
    const mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call delete fail', async function () {
      const dercoHeaders: string = uuidv1()
      const _id: string = uuidv1()
      let results: any
      try {
        results = await VehicleInstance.deleteVehicle(_id, dercoHeaders)
      } catch (error) {
        expect(results).to.be.equal(undefined)
      }
    })
  })

  describe('Vehicle - findVehicle Vehicle', () => {
    let mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      mongoDBMock = new DBMock()
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call findVehicle', async function () {
      const dercoHeaders: string = uuidv1()
      const modelo: string = 'CX-5'
      const results = await VehicleInstance.findVehicle(modelo, dercoHeaders)

      expect(results.brand).to.be.equal('Mazda')
    })
  })

  describe('Vehicle - findVehicle Vehicle fail', () => {
    const mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call findVehicle fail', async function () {
      const dercoHeaders: string = uuidv1()
      const modelo: string = 'Mazda'
      let results: any
      try {
        results = await VehicleInstance.findVehicle(modelo, dercoHeaders)
      } catch (error) {
        expect(results).to.be.equal(undefined)
      }
    })
  })

  describe('Vehicle - findAll Vehicle', () => {
    let mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      mongoDBMock = new DBMock()
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call findAll', async function () {
      const dercoHeaders: string = uuidv1()
      const results = await VehicleInstance.findVehicles(dercoHeaders)

      expect(results.total).to.be.equal(1)
    })
  })

  describe('Vehicle - findAll Vehicle fail', () => {
    const mongoDBMock: DBMock = null
    let VehicleInstance: CVehicle = null

    beforeEach(() => {
      VehicleInstance = new CVehicle(mongoDBMock)
    })

    it('Success call findAll fail', async function () {
      const dercoHeaders: string = uuidv1()
      let results: any
      try {
        results = await VehicleInstance.findVehicles(dercoHeaders)
      } catch (error) {
        expect(results).to.be.equal(undefined)
      }
    })
  })

  describe('Vehicle - test Vehicle model', () => {
    let vehicle: MVehicle = null
    beforeEach(() => {
      vehicle = new MVehicle('Mazda', 'CX-5', '5000', 'bencina')
    })

    it('Success test Vehicle model', async function () {
      vehicle.setVehicle(vehicle)

      const getBrand = vehicle.getBrand()
      const getCost = vehicle.getCost()
      const getGas = vehicle.getGas()
      const getModel = vehicle.getModel()

      expect(getBrand).to.be.equal('Mazda')
      expect(getCost).to.be.equal('5000')
      expect(getGas).to.be.equal('bencina')
      expect(getModel).to.be.equal('CX-5')
    })
  })
}
export default { startTest }
