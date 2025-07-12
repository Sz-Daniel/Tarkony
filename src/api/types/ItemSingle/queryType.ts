/** Query type for API GraphQL calls -> api \ query.ts
 * name: key name for cache
 * key: Type key which indicate what kinda data result obj will get and helps to give back only the array
 * query: containts query string
 */
export type QueryType = {
  name: string;
  key: string;
  query: string;
};

export type SingleItemPricesQueryType = {
  id: string;

  sellFor: SellFor[];

  buyFor: BuyFor[];
};

export type SingleItemQueryType = {
  id: string;
  name: string;
  shortName: string;
  categories: name[];

  lastLowPrice: number;
  low24hPrice: number;
  avg24hPrice: number;
  high24hPrice: number;
  changeLast48hPercent: number;
  changeLast48h: number;
  lastOfferCount: number;

  width: number;
  weight: number;
  hasGrid: number;

  inspectImageLink: string;
  backgroundColor: string;
  gridImageLink: string;

  description: string;
  wikiLink: string;

  height: number;
  velocity: number;
  recoilModifier: number;
  loudness: number;
  accuracyModifier: number;
  ergonomicsModifier: number;

  updated: string;

  sellFor: SellFor[];

  buyFor: BuyFor[];

  bartersUsing: BartersUsing[];

  bartersFor: BartersFor[];

  craftsUsing: CraftsUsing[];

  craftsFor: CraftsFor[];

  usedInTasks: UsedInTask[];

  receivedFromTasks: ReceivedFromTask[];
};

export type ReceivedFromTask = {
  name: string;
  finishRewards: FinishRewards;
};

type FinishRewards = {
  items: RewardItem[];
};

export type RewardItem = {
  count: number;
  item: name;
};

export type UsedInTask = {
  name: string;
  objectives: TaskObjectiveItem[];
};

export type TaskObjectiveItem = {
  description: string;
  count: number;
  item: name;
};

export type CraftsUsing = {
  id: string;
  duration: number;
  level: number;
  station: Station;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};
export type CraftsFor = {
  id: string;
  duration: number;
  level: number;
  station: Station;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};

export type Station = {
  name: string;
  imageLink: string;
};
export type BartersFor = {
  id: string;
  buyLimit: number;
  level: number;
  trader: traderDetail & Trader;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};

export type BartersUsing = {
  id: string;
  buyLimit: number;
  level: number;
  trader: traderDetail & Trader;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};
export type QueryCountedItem = {
  count: number;
  item: itemIcon;
};

type traderDetail = {
  imageLink: string;
  name: string;
};
export type BuyFor = {
  priceRUB: number;
  price: number;
  currency: string;
  vendor: Vendor;
};

type Vendor = {
  minTraderLevel: number;
  buyLimit: number;
  trader: Trader;
  taskUnlock: TaskUnlock;
};

export type Trader = traderDetail & {
  levels: Levels[];
};
type Levels = {
  level: number;
  requiredPlayerLevel: number;
  requiredReputation: number;
  requiredCommerce: number;
};
export type TaskUnlock = {
  name: string;
  minPlayerLevel: number;
};

export type SellFor = {
  priceRUB: number;
  vendor: sellforVendor;
  price: number;
  currency: string;
};

type sellforVendor = {
  name: string;
  foundInRaidRequired: Boolean;
};

type BaseType = {
  id: string;
  name: string;
  normalizedName: string;
};

export type traderForType = {
  priceRUB: number;
  vendor: name;
};

type itemIcon = {
  id: string;
  name: string;
  gridImageLink: string;
};

type normalizedName = {
  normalizedName: string;
};

type name = {
  name: string;
};
