/** Query type for API GraphQL calls -> api \ query.ts
 * name: key name for cache
 * key: Type key which indicate what kinda data result obj will get and helps to give back only the array
 * query: containts query string
 */
export type QueryType = {
  name: string,
  key: string,
  query: string,
};

export type SingleItemQueryType = {
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

  sellFor: SellFor[],

  buyFor: BuyFor[],

  bartersUsing: BartersUsing[],

  
  
  
}
type BartersUsing = {
  buyLimit:number,
  trader: name
  taskUnlock:TaskUnlock 
  requiredItems: CountedItem[]
  rewardItems: CountedItem[]
  requirements: Requirements[],
}

/**  
  historicalPrices: HistoricalPrices[],
  //Fragments Types
type HistoricalPrices = {
  offerCount:number,
  price: number,
  priceMin: number,
  timestamp: string,
}


  sellFor:traderForType[],
  buyFor:traderForType[],

  craftsFor:requiredItemsType[],
  craftsUsing: rewardItemsType[],
  receivedFromTasks: receivedFromTasksType[],
 */


type BuyFor={
  priceRUB:number,
  price: number,
  currency: string,

  vendor: Vendor,

  requirements: Requirements[],
}
type Requirements = {
  type:string,
  value:number
}

type Vendor ={
  minTraderLevel: number,
  buyLimit: number,
  name: string,
  taskUnlock: TaskUnlock,
}

type TaskUnlock= {
  name:string,
  minPlayerLevel:number,
}

type SellFor={
  priceRUB:number,
  vendor: name,
  price: number,
  currency: string,
}

type requiredItemsType = {
  requiredItems: CountedItem[];
};

type rewardItemsType = {
  rewardItems: CountedItem[];
};

type receivedFromTasksType ={
  name:string,
  finishRewards: rewardTaskType  
};

type CountedItem = {
  count: number;
  item: itemIcon;
};

type rewardTaskType = {
  items: items[]
};

type itemIcon = {
    name: string,
    gridImageLink: string,
};

type items = {
  count: number,
  item: item,
};

type item = {
  name: string,
};

type name ={
  name: string
};