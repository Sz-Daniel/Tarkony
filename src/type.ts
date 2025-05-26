export type QueryType = { name: string, query: string}

export type ItemsType<T> = {  items: T[] }
export type ShortItemQueryType = {
  id: number,
  name: string,
  avg24hPrice: number,
  lastLowPrice: number,
  gridImageLink: string,
  sellFor: sellForType[]
  category: normalizedName,
  wikiLink: string,
}

export type sellForType={
  priceRUB:number,
  vendor: name
}

export type ShortItemType = {
  id: number,
  name: string,
  iconURL: string,
  traderPrice: number,
  traderName: string,
  lowestPrice: number,
  lastPrice: number,
  diffPrice: number,
  category: string,
  wikiLink: string,
};

export type BaseType = {
  id: string,
  name: string,
  normalizedName: string,
};

export type ItemCategoriesType<T> = { itemCategories: T[]}
export type CategoryMapType = BaseType &{
  children: name[],
  parent: name[],
}

export type name ={
  name: string
}

export type normalizedName = {
    normalizedName: string,
}