export type QueryType = {
  name: string;
  query: string;
  variables?: { id: string }; // ez szigorúbb, de ha csak ez kell, működik
};

export type ItemCategoriesType<T> = { itemCategories: T[]}
export type CategoryType = BaseType &{
  children: normalizedName[],
  parent: normalizedName,
}

export type ItemsType<T> = {  items: T[] }
export type ItemBaseQueryType = {
  id: string,
  name: string,
  gridImageLink: string,
  changeLast48h: number,
  changeLast48hPercent: number,
  sellFor: traderForType[]
  category: normalizedName,
}

export type ItemDetailQueryType = {
  id: string,
  name: string,
  wikiLink: string,
  sellFor:traderForType[],
  buyFor:traderForType[],
  bartersFor: requiredItemsType[],
  bartersUsing: rewardItemsType[],
  craftsFor:requiredItemsType[],
  craftsUsing: rewardItemsType[],
  receivedFromTasks: receivedFromTasksType[],
}

//sideType
type receivedFromTasksType ={
  name:string,
  finishRewards: rewardTaskType  
}
type rewardTaskType = {
  items: items[]
}

type items = {
  count: number,
  item: item,
}

type item = {
  name: string,
}

export type requiredItemsType = {
  requiredItems: CountedItem[];
};

type rewardItemsType = {
  rewardItems: CountedItem[];
};

type CountedItem = {
  count: number;
  item: itemIcon;
};

type itemIcon = {
    name: string,
    gridImageLink: string,
}

type name ={
  name: string
}


export type traderForType={
  priceRUB:number,
  vendor: name
}

type BaseType = {
  id: string,
  name: string,
  normalizedName: string,
};

type normalizedName = {
    normalizedName: string,
}

