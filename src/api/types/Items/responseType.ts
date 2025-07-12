export type ItemBaseResultType = {
  id: string;
  name: string;
  iconURL: string;
  bestSeller: PriceDeal | null;
  bestBuy: PriceDeal | null;
  changePrice: number;
  changePercent: number;
  category: string;
};

export type ItemDetailResultType = {
  id: string | null;

  name: string;

  normalizedName: string;

  wiki: string;

  sellTo: SellTo[];

  buyFrom: BuyFrom[];

  barterInput: Barter[];

  barterOutput: Barter[];

  craftInput: Craft[];

  craftOutput: Craft[];

  taskNeed: TaskNeed[] | null;

  taskGive: TaskGive[] | null;
};
export type TaskGive = {
  name: string;
  reward: TaskItem[] | null;
};
export type TaskNeed = {
  name: string;
  task: Task[] | null;
};

type Task = Description & TaskItem;
type Description = {
  description: string;
};
type TaskItem = {
  name: string;
  count: number;
};

export type PriceDeal = {
  price: number;
  place: string;
};

export type Craft = CraftRequirement & {
  inputItems: ResponseCountedItem[];
  outputItems: ResponseCountedItem[];
};

type CraftRequirement = {
  id: string;
  duration: number;
  stationRequirement: StationRequirement | null;
  questRequirement: QuestRequirement | null;
};

type StationRequirement = {
  level: number;
  stationName: string;
  stationIcon: string;
};

export type Barter = (PurchaseRequirement | null) & {
  inputItems: ResponseCountedItem[];
  outputItems: ResponseCountedItem[];
};

export type ResponseCountedItem = {
  count: number;
  id: string;
  img: string;
  name: string;
};

type SellTo = PriceInfo & {
  fir: Boolean;
  traderName: string;
};

export type BuyFrom = PriceInfo & (PurchaseRequirement | null);

type PriceInfo = {
  priceRub: number;
  price: number;
  priceCurrency: string;
};

type PurchaseRequirement = {
  id: string;
  limit: number;
  playertoTraderRequirements: PlayertoTraderRequirements;
  questRequirement: QuestRequirement;
};
type QuestRequirement = {
  level: number;
  name: string;
};

export type PlayertoTraderRequirements = {
  traderName: string;
  traderIcon: string;
  traderLevel: number;
  playerLevel: number;
  reputation: number;
  commerce: number;
};
