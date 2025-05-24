export type { GraphqlQueriesType } from "./api/query";

export type ItemsType<T> = {
  items: T[]
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
};

export type CategoryType = {
  id: number;
  name: string;
  normalizedName: string;
  children: {
    id: number
  }
  parent: {
    id: number
  }
};
  
  
  `   
    query{
      itemCategories {
        id
        name
        normalizedName
        children {
          id
        }
        parent {
          id
        }
      }
    }
  }`

export type testIdNameType = {
    id: number;
  name: string;
}































type Vendor = {
  name: string;
  normalizedName: string;
  __typename: string;
};

type CurrencyItem = {
  id: string;
  name: string;
};

type SellOrBuyFor = {
  vendor: Vendor;
  price: number;
  currency: string;
  currencyItem: CurrencyItem;
  priceRUB: number;
  __typename: string;
};

type Attributes = {
  type: string;
  name: string;
  value: string;
};

type ContainedItem = {
  item: {
    id: string;
    name: string;
  };
  count: number;
  quantity: number;
  attributes: Attributes[];
  __typename: string;
};

type Category = {
  id: string;
  name: string;
  normalizedName?: string;
  parent?: { id: string };
  children?: { id: string }[];
  __typename: string;
};

type Task = {
  id: string;
  name?: string;
  normalizedName?: string;
  trader?: { id?: string };
  map?: { id?: string };
  experience?: number;
  wikiLink?: string;
};

type HistoricalPrice = {
  price: number;
  priceMin: number;
  timestamp: string;
};

type Properties = {
  __typename: string;
  // Ide jöhetnek további properties mezők, ha ismertek
};

type ConflictingItem = {
  id: string;
  name: string;
};

export type Item = {
  id: string;
  name: string;
  normalizedName: string;
  shortName: string;
  description: string;
  basePrice: number;
  updated: string;
  width: number;
  height: number;
  backgroundColor: string;
  iconLink: string;
  gridImageLink: string;
  baseImageLink: string;
  inspectImageLink: string;
  image512pxLink: string;
  image8xLink: string;
  wikiLink: string;
  types: string[]; // pontosabb típus is lehet, ha tudod
  avg24hPrice?: number | null;
  properties: Properties;
  conflictingItems: ConflictingItem[];
  conflictingSlotIds: string[];
  accuracyModifier?: number | null;
  recoilModifier?: number | null;
  ergonomicsModifier?: number | null;
  hasGrid: boolean;
  blocksHeadphones: boolean;
  link: string;
  lastLowPrice?: number | null;
  changeLast48h?: number | null;
  changeLast48hPercent?: number | null;
  low24hPrice?: number | null;
  high24hPrice?: number | null;
  lastOfferCount?: number | null;
  sellFor: SellOrBuyFor[];
  buyFor: SellOrBuyFor[];
  containsItems: ContainedItem[];
  category: Category;
  categories: { id: string }[];
  bsgCategoryId: string;
  handbookCategories: Category[];
  weight: number;
  velocity: number;
  loudness: number;
  usedInTasks: Task[];
  receivedFromTasks: { id: string }[];
  bartersFor: { id: string }[];
  bartersUsing: { id: string }[];
  craftsFor: { id: string }[];
  craftsUsing: { id: string }[];
  historicalPrices: HistoricalPrice[];
  fleaMarketFee?: number | null;
};
