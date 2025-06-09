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
 

  historicalPrices: HistoricalPrices[],

  sellFor:traderForType[],
  buyFor:traderForType[],
  bartersFor: requiredItemsType[],
  bartersUsing: rewardItemsType[],
  craftsFor:requiredItemsType[],
  craftsUsing: rewardItemsType[],
  receivedFromTasks: receivedFromTasksType[],

}

//Fragments Types
type HistoricalPrices = {
  offerCount:number,
  price: number,
  priceMin: number,
  timestamp: string,
}



export type traderForType={
  priceRUB:number,
  vendor: name
};

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