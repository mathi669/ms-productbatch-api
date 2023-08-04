import { modelOptions} from "@typegoose/typegoose";

@modelOptions({ options: { customName: "product" } })
class Product {
  public externalId: string;
  public businessId: string;
  public productType: string;
  public productCode: string;
  public externalProductCode: string;
  public productName: string;
  public productDescription: string;
  public productFamily: string;
  public active: string
  public brand: string;
  public relatedProductCode: string;
  public model: string;
  public modelFamily: string;
  public modelYear: string;
  public bodyStyle: string;
  public engineType: string;
  public transmissionType: string;
  public fuelType: string;
  public numberOfCylindres: string;
  public countryOfOrigin:string;
  public valves: string;
  public torque: string;
  public power: string;
  public displacement: string
  public pistons: string;
  public enginePosition: string;
  public maxSpeed: string;
  public traction: string;
  public steering: string;
  public frontSuspension: string;
  public rearSuspension: string;
  public frontBrakes: string;
  public rearBrakes: string;
  public equipement: string;
  public minimumDistanceToGround: string;
  public lengthWidthHeight: string;
  public modelVariantCode: string;
  public modelVariantDescription: string;
  public manufactureYear: string;



  constructor(param:{
    ExternalId?: string,
    BusinessId?: string, 
    ProductType?: string,
    ProductCode?: string,
    ExternalProductCode?: string,
    ProductName?: string,
    ProductDescription?: string,
    ProductFamily?: string,
    Active?: string,
    Brand?: string,
    RelatedProductCode?: string,
    Model?: string,
    ModelFamily?: string,
    ModelYear?: string,
    BodyStyle?: string,
    EngineType?: string,
    TransmissionType?: string,
    FuelType?: string,
    NumberOfCylindres?: string,
    CountryOfOrigin?:string,
    Valves?: string
    Torque?: string,
    Power?: string,
    Displacement?: string,
    Pistons?: string,
    EnginePosition?: string,
    MaxSpeed?: string,
    Traction?: string,
    Steering?: string,
    FrontSuspension?: string,
    RearSuspension?: string,
    FrontBrakes?: string,
    RearBrakes?: string,
    Equipement?: string,
    MinimumDistanceToGround?: string,
    LengthWidthHeight?: string,
    ModelVariantCode?: string,
    ModelVariantDescription?: string,
    ManufactureYear?: string

  }) {
    const {
      ExternalId, 
      BusinessId, 
      ProductType, 
      ProductCode, 
      ExternalProductCode, 
      ProductName, 
      ProductDescription,
      ProductFamily,
      Active,
      Brand,
      RelatedProductCode,
      Model,
      ModelFamily,
      ModelYear,
      BodyStyle,
      EngineType,
      TransmissionType,
      FuelType,
      NumberOfCylindres,
      CountryOfOrigin,
      Valves,
      Torque,
      Power,
      Displacement,
      Pistons,
      EnginePosition,
      MaxSpeed,
      Traction,
      Steering,
      FrontSuspension,
      RearSuspension,
      FrontBrakes,
      RearBrakes,
      Equipement,
      MinimumDistanceToGround,
      LengthWidthHeight,
      ModelVariantCode,
      ModelVariantDescription,
      ManufactureYear

    } = param

    this.externalId = ExternalId
    this.businessId = BusinessId
    this.productType = ProductType
    this.productCode = ProductCode
    this.externalProductCode = ExternalProductCode
    this.productName = ProductName
    this.productDescription = ProductDescription
    this.productFamily = ProductFamily
    this.active = Active
    this.brand = Brand
    this.relatedProductCode = RelatedProductCode
    this.model = Model
    this.modelFamily = ModelFamily
    this.modelYear = ModelYear
    this.bodyStyle = BodyStyle
    this.engineType = EngineType
    this.transmissionType = TransmissionType
    this.fuelType = FuelType
    this.numberOfCylindres = NumberOfCylindres
    this.countryOfOrigin = CountryOfOrigin
    this.valves = Valves
    this.torque = Torque
    this.power = Power
    this.displacement = Displacement
    this.pistons = Pistons
    this.enginePosition = EnginePosition
    this.maxSpeed = MaxSpeed
    this.traction = Traction
    this.steering = Steering
    this.frontSuspension = FrontSuspension
    this.rearSuspension = RearSuspension
    this.frontBrakes = FrontBrakes
    this.rearBrakes = RearBrakes
    this.equipement = Equipement
    this.minimumDistanceToGround = MinimumDistanceToGround
    this.lengthWidthHeight = LengthWidthHeight
    this.modelVariantCode = ModelVariantCode
    this.modelVariantDescription = ModelVariantDescription
    this.manufactureYear = ManufactureYear

  }

  public getProductSalesforce(){
    return {
      ExternalId__c: this.externalId,
      BusinessId__c: this.businessId,
      ProductType__c: this.productType,
      ProductCode__c: this.productCode,
      ExternalProductCode__c: this.externalProductCode,
      ProductName__c: this.productName,
      ProductDescription__c: this.productDescription,
      ProductFamily__c: this.productFamily,
      Active__c: this.active,
      Brand__c: this.brand,
      RelatedProductCode__c: this.relatedProductCode,
      Model__c: this.model,
      ModelFamily__c: this.modelFamily,
      ModelYear__c: this.modelFamily,
      BodyStyle__c: this.bodyStyle,
      EngineType__c: this.engineType,
      TransmissionType__c: this.transmissionType,
      FuelType__c: this.fuelType,
      NumberOfCylindres__c: this.numberOfCylindres,
      CountryOfOrigin__c: this.countryOfOrigin,
      Valves__c: this.valves,
      Torque__c: this.torque,
      Power__c: this.power,
      Displacement__c: this.displacement,
      Pistons__c: this.pistons,
      EnginePosition__c: this.enginePosition,
      MaxSpeed__c: this.maxSpeed,
      Traction__c: this.traction,
      Steering__c: this.steering,
      FrontSuspension__c: this.frontSuspension,
      RearSuspension__c: this.rearSuspension,
      FrontBrakes__c: this.frontBrakes,
      RearBrakes__c: this.rearBrakes,
      Equipement__c: this.equipement,
      MinimumDistanceToGround__c: this.minimumDistanceToGround,
      LengthWidthHeight__c: this.lengthWidthHeight,
      ModelVariantCode__c: this.modelVariantCode,
      ModelVariantDescription__c: this.modelVariantDescription,
      ManufactureYear__c: this.manufactureYear
    }
  }

}

export default Product;
