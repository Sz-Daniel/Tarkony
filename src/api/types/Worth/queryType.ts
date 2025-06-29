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

export type WorthNameListQueryType = {
  id: string;
  name: string;
};

export type WorthItemMetaQueryType = {
  id: string;
  name: string;
  shortName: string;
  categories: name[];
  height: number;
  width: number;
  weight: number;
  hasGrid: number;

  inspectImageLink: string;
  wikiLink: string;

  updated: string;

  sellFor: SellFor[];

  buyFor: BuyFor[];

  bartersUsing: BartersUsing[];

  bartersFor: BartersFor[];

  craftsUsing: CraftsUsing[];

  craftsFor: CraftsFor[];
};

export type all = {
  id: string;
  name: string;

  gridImageLink: string;

  wikiLink: string;

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

type ReceivedFromTask = {
  name: string;
  finishRewards: FinishRewards;
};

type FinishRewards = {
  items: RewardItem[];
};

type RewardItem = {
  count: number;
  item: name;
};

type UsedInTask = {
  name: string;
  objectives: TaskObjectiveItem[];
};

type TaskObjectiveItem = {
  description: string;
  count: number;
  item: name;
};

type CraftsUsing = {
  id: string;
  duration: number;
  level: number;
  station: Station;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};
type CraftsFor = {
  id: string;
  duration: number;
  level: number;
  station: Station;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};

type BartersFor = {
  id: string;
  buyLimit: number;
  level: number;
  trader: traderDetail & Trader;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};

type BartersUsing = {
  id: string;
  buyLimit: number;
  level: number;
  trader: traderDetail & Trader;
  taskUnlock: TaskUnlock;
  requiredItems: QueryCountedItem[];
  rewardItems: QueryCountedItem[];
};

type BuyFor = {
  priceRUB: number;
  price: number;
  currency: string;
  vendor: Vendor;
};
type Station = {
  name: string;
  imageLink: string;
};
type Vendor = {
  minTraderLevel: number;
  buyLimit: number;
  name: string;
  trader: Trader;
  taskUnlock: TaskUnlock;
};

type Trader = {
  levels: Levels[];
};

type Levels = {
  level: number;
  requiredPlayerLevel: number;
  requiredReputation: number;
  requiredCommerce: number;
};

type TaskUnlock = {
  name: string;
  minPlayerLevel: number;
};

type SellFor = {
  priceRUB: number;
  vendor: sellforVendor;
  price: number;
  currency: string;
};

type sellforVendor = {
  name: string;
  foundInRaidRequired: Boolean;
};

//SubTypes
type QueryCountedItem = {
  count: number;
  item: itemIcon;
};

type itemIcon = {
  id: string;
  name: string;
  gridImageLink: string;
};
type traderDetail = {
  imageLink: string;
  name: string;
};
type name = {
  name: string;
};
