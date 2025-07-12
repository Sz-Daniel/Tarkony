/** Query type for API GraphQL calls -> api\query.ts
 * name: key name for cache
 * key: type key indicating the kind of data the result object will contain, enabling extraction of only the array
 * query: contains the query string
 */
export type QueryType = {
  name: string;
  key: string;
  query: string;
};

export type CategoryType = BaseType & {
  children: normalizedName[];
  parent: normalizedName;
};

export type ItemBaseQueryType = {
  id: string;

  name: string;

  gridImageLink: string;

  changeLast48h: number;

  changeLast48hPercent: number;

  sellFor: traderForType[];

  buyFor: traderForType[];

  category: normalizedName;
};

export type ItemDetailQueryType = {
  id: string;

  name: string;

  normalizedName: string;

  wikiLink: string;

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
