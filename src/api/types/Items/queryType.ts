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

export type CategoryType = BaseType &{
  children: normalizedName[],
  parent: normalizedName,
  
};


export type ItemBaseQueryType = {
  id: string,
  name: string,
  gridImageLink: string,
  changeLast48h: number,
  changeLast48hPercent: number,
  sellFor: traderForType[]
  category: normalizedName,
};

export type ItemDetailQueryType = {
  id: string,
  name:string,
  normalizedName: string,
  wikiLink: string,

  sellFor: SellFor[],

  buyFor: BuyFor[],

  bartersUsing: BartersUsing[],

  bartersFor: BartersFor[],

  craftsUsing: CraftsUsing[],

  craftsFor: CraftsFor[],
};

type CraftsUsing = {
  id: string,
  duration: number,
  level: number,
  station: Station,
  taskUnlock:TaskUnlock,
  requiredItems: QueryCountedItem[],
  rewardItems: QueryCountedItem[]  
}
type CraftsFor = {
  id: string,
  duration: number,
  level: number,
  station: Station,
  taskUnlock:TaskUnlock,
  requiredItems: QueryCountedItem[],
  rewardItems: QueryCountedItem[]  
}

type Station = {
  name:string,
  imageLink:string,
}
type BartersFor = {
  id: string,
  buyLimit:number,
  level: number,
  trader: traderDetail & Trader,
  taskUnlock:TaskUnlock,
  requiredItems: QueryCountedItem[]
  rewardItems: QueryCountedItem[]
}

type BartersUsing = {
  id: string,
  buyLimit:number,
  level: number,
  trader: traderDetail & Trader,
  taskUnlock:TaskUnlock 
  requiredItems: QueryCountedItem[]
  rewardItems: QueryCountedItem[]
}
type QueryCountedItem = {
  count: number;
  item: itemIcon;
};

type traderDetail = {
  imageLink: string,
  name: string
}
type BuyFor={
  priceRUB:number,
  price: number,
  currency: string,
  vendor: Vendor,
}

type Vendor = {
  minTraderLevel: number,
  buyLimit: number,
  name: string,
  trader: Trader,
  taskUnlock: TaskUnlock,
}
type Trader ={
  levels: Levels[],
}
type Levels = {
  level: number,
  requiredPlayerLevel:number,
  requiredReputation:number,
  requiredCommerce:number,
}
type TaskUnlock= {
  name:string,
  minPlayerLevel:number,
}


type SellFor={
  priceRUB:number,
  vendor: sellforVendor,
  price: number,
  currency: string,
}

type sellforVendor = {
  name: string,
  foundInRaidRequired:Boolean,
}


type BaseType = {
  id: string,
  name: string,
  normalizedName: string,
};

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

type normalizedName = {
    normalizedName: string,
};

type name ={
  name: string
};