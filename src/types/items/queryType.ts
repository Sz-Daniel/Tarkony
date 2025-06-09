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
  sellFor:traderForType[],
  buyFor:traderForType[],
  bartersFor: requiredItemsType[],
  bartersUsing: rewardItemsType[],
  craftsFor:requiredItemsType[],
  craftsUsing: rewardItemsType[],
  receivedFromTasks: receivedFromTasksType[],
};

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