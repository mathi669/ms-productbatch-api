

export default class Price{
    public externalId: string
    public businessId: string
    public priceBookName: string
    public sellingPrice: string
    public active: string
    public taxScheme: string

    constructor(param: {ExternalId: string, BusinessId: string, PriceBookName: string, SellingPrice: string, Active:string, TaxScheme: string}){

        const {ExternalId, BusinessId, PriceBookName, SellingPrice, Active, TaxScheme} = param

        this.externalId = ExternalId
        this.businessId = BusinessId
        this.priceBookName = PriceBookName
        this.sellingPrice = SellingPrice
        this.active = Active
        this.taxScheme = TaxScheme
    }

    getPriceSalesforce(){
        return {
            ExternalId__c: this.externalId,
            BusinessId__c: this.businessId,
            PriceBookName__c: this.priceBookName,
            SellingPrice__c: this.sellingPrice,
            Active__c: this.active,
            TaxScheme__c: this.taxScheme
        }
    }
}