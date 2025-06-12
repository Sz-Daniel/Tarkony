export type SingleItemResultType = {
    id:string,
    name:string,
    shortName:string,

    lastLowPrice:number,
    low24hPrice:number,
    avg24hPrice:number,
    high24hPrice:number,
    changeLast48hPercent:number,
    changeLast48h:number,
    lastOfferCount:number,

    width:number,
    weight:number,
    hasGrid:number,

    inspectImageLink:string,
    backgroundColor:string,
    gridImageLink:string,

    description:string,
    wikiLink:string,

    height:number,
    velocity:number,
    recoilModifier:number,
    loudness:number,
    accuracyModifier:number,
    ergonomicsModifier:number,

    updated:string,
    
    sellTo: SellTo[],

    buyFrom: BuyFrom[],

    barterTo: BarterFrom[] 
    
}

type BarterFrom = {
    requirements: Requirements[]
}

type Requirements = {
    traderName: string,
    traderLevel: number,
}

type BarterTo ={

}

type BuyFrom = {
    priceRUB:number,
    price: number,
    currency: string,

    minTraderLevel: number,
    buyLimit: number,
    vendorname: string,
    questName: string,
    minPlayerLevel:number,

    requirement: Requirement[]
}

type Requirement = {
    requirementType: string,
    requirementValue: number,
}
type HistoricalPrices = {
    offerCount:number,
    price: number,
    priceMin: number,
    timestamp: string,
}

type SellTo = {
    priceRub: number,
    price: number,
    vendor: string,
    currency: string,
} 