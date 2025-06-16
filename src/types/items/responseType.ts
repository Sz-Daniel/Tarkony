export type ItemBaseResultType = {
  id: string | null,
  name: string,
  iconURL: string,
  bestPrice: number | null,
  bestPlace: string | null,
  changePrice: number,
  changePercent: number,
  category: string,
};

export type ItemDetailResultType = {
  id: string | null,
  normalizedName: string,
  wiki: string,
  sellTo: SellTo[],
 
  buyFrom: BuyFrom[],

  barterInput: Barter[],

  barterOutput: Barter[],

  craftInput: Craft[],

  craftOutput: Craft[],
};

type TaskReward = {
  name: string,
  count: number,
}
type CountedItemMicro = {
  count: number,
  name: string,
  icon: string,
};

type VendorOffer = {
  price: number,
  vendor: string,
};
  

export type Craft =  CraftRequirement &{
    inputItems: ResponseCountedItem[],
    outputItems: ResponseCountedItem[],
}

type CraftRequirement = {
    id: string,
    duration: number,
    stationRequirement: StationRequirement,
    questRequirement: QuestRequirement,
}

type StationRequirement =  {
    level:number,
    stationName: string,
    stationIcon: string,
}


export type Barter = PurchaseRequirement &{
    inputItems: ResponseCountedItem[],
    outputItems: ResponseCountedItem[],
}

export type ResponseCountedItem ={
    count: number;
    id: string,
    img: string;
    name: string;
}

type SellTo = PriceInfo & {
    fir: Boolean,
    traderName: string,
}

type BuyFrom = 
    PriceInfo &
    PurchaseRequirement

type PriceInfo = {
    priceRub: number,
    price: number,
    priceCurrency: string,
}

type PurchaseRequirement = {
    id: string,
    limit: number,
    playertoTraderRequirements: PlayertoTraderRequirements,
    questRequirement: QuestRequirement,
}
type QuestRequirement ={
    level: number,
    name: string,
}

type PlayertoTraderRequirements = {
    traderName: string,
    traderIcon: string,
    traderLevel:number,
    playerLevel:number,
    reputation:number,
    commerce:number,
}
