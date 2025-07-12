//This cointains all those data-adaper-blocks which előfordult több oldalon használt adaoknál is
// Extended function only if it contins logic
// func Typo: responseTypeVariablename[List If Arrow][Nothing if obj]Calc
//generator: responseTypeVariablename[List If Arrow][Nothing if obj]

import type {
  BartersFor,
  BartersUsing,
  BuyFor,
  CraftsFor,
  CraftsUsing,
  QueryCountedItem,
  ReceivedFromTask,
  RewardItem,
  SellFor,
  Station,
  TaskObjectiveItem,
  TaskUnlock,
  Trader,
  traderForType,
  UsedInTask,
} from '../types/Items/queryType';

export const taskNeedCalc = (tasks: UsedInTask[], itemName: string) => {
  return tasks
    .filter((task) =>
      task.objectives.some((obi) => {
        return Object.keys(obi).length !== 0;
      })
    )
    .map((need) => {
      const taskList = taskInnerCalc(need.objectives, itemName);
      return {
        name: need.name ?? '',
        task: taskList ?? null,
      };
    });
};

const taskInnerCalc = (tasks: TaskObjectiveItem[], itemName: string) =>
  tasks
    .filter((task) => task.item?.name === itemName)
    .map((task) => {
      return {
        description: task.description ?? 0,
        name: task.item?.name ?? '',
        count: task.count ?? 0,
      };
    });

export const taskGiveCalc = (task: ReceivedFromTask[], itemName: string) => {
  return task
    .filter((get) =>
      get.finishRewards.items.some((obi) => obi.item.name.includes(itemName))
    )
    .map((get) => {
      const reward = rewardCalc(get.finishRewards.items, itemName);
      return {
        name: get.name ?? '',
        reward: reward ?? null,
      };
    });
};

export const rewardCalc = (array: RewardItem[], itemName: string) => {
  return array
    .filter((reward) => reward.item?.name.includes(itemName))
    .map((reward) => ({
      name: reward.item?.name ?? '',
      count: reward.count ?? 0,
    }));
};

export const bestSellerCalc = (sellers: traderForType[]) => {
  if (!sellers || sellers.length === 0) return null;
  const returnSeller = sellers.reduce((best, current) =>
    current.priceRUB > best.priceRUB ? current : best
  );
  return {
    price: returnSeller?.priceRUB ?? null,
    place: returnSeller?.vendor?.name ?? null,
  };
};

export const bestBuyCalc = (buyers: traderForType[]) => {
  if (!buyers || buyers.length === 0) return null;
  const returnBuyer = buyers.reduce((best, current) =>
    current.priceRUB < best.priceRUB ? current : best
  );
  return {
    price: returnBuyer?.priceRUB ?? null,
    place: returnBuyer?.vendor?.name ?? null,
  };
};

export const sellToListCalc = (seller: SellFor[]) => {
  if (!seller || seller.length === 0) return null;
  return seller
    .sort((a, b) => b.priceRUB - a.priceRUB)
    .map((sell) => ({
      price: sell.price ?? null,
      priceRub: sell.priceRUB ?? null,
      priceCurrency: sell.currency ?? '',
      traderName: sell.vendor.name ?? (sell.priceRUB && 'Flea Market') ?? '',
      fir: sell.vendor.foundInRaidRequired,
    }));
};

export const buyFromListCalc = (BuyFor: BuyFor[]) => {
  return BuyFor.sort((a, b) => a.priceRUB - b.priceRUB).map((buy) => {
    const playertoTraderRequirementsObj = playertoTraderRequirementsCalc(
      buy.vendor.trader,
      buy.vendor.minTraderLevel
    );
    const questRequirementObj = questRequirementCalc(buy.vendor.taskUnlock);
    return {
      id: crypto.randomUUID(),
      price: buy.price ?? null,
      priceRub: buy.priceRUB ?? null,
      priceCurrency: buy.currency ?? '',
      limit: buy.vendor.buyLimit ?? null,
      playertoTraderRequirements: playertoTraderRequirementsObj ?? null,
      questRequirement: questRequirementObj ?? null,
    };
  });
};

export const IOCraftListCalc = (crafts: CraftsFor[] | CraftsUsing[]) => {
  return crafts.map((craft) => {
    const inputItemList = IOItemsCalc(craft.requiredItems);
    const outputItemList = IOItemsCalc(craft.rewardItems);
    const questRequirementObj = questRequirementCalc(craft.taskUnlock);
    const stationRequirementObj = stationRequirementCalc(
      craft.station,
      craft.level
    );
    return {
      id: craft.id ?? '',
      duration: craft.duration ?? null,
      stationRequirement: stationRequirementObj ?? null,
      questRequirement: questRequirementObj ?? null,
      inputItems: inputItemList ?? [],
      outputItems: outputItemList ?? [],
    };
  });
};

export const IOBarterListCalc = (barters: BartersFor[] | BartersUsing[]) => {
  return barters.map((barter) => {
    const playertoTraderRequirementsObj = playertoTraderRequirementsCalc(
      barter.trader,
      barter.level
    );
    const inputItemList = IOItemsCalc(barter.requiredItems);
    const outputItemList = IOItemsCalc(barter.rewardItems);
    const questRequirementObj = questRequirementCalc(barter.taskUnlock);
    return {
      id: barter.id ?? '',
      limit: barter.buyLimit ?? null,
      playertoTraderRequirements: playertoTraderRequirementsObj ?? null,
      questRequirement: questRequirementObj ?? null,
      inputItems: inputItemList ?? [],
      outputItems: outputItemList ?? [],
    };
  });
};

export const IOItemsCalc = (IO: QueryCountedItem[]) => {
  return IO.map((item) => ({
    count: item.count ?? null,
    id: item.item.id ?? '',
    img: item.item.gridImageLink ?? '',
    name: item.item.name ?? '',
  }));
};
export const stationRequirementCalc = (station: Station, level: number) => {
  return {
    level: level ?? null,
    stationName: station.name ?? '',
    stationIcon: station.imageLink ?? '',
  };
};
export const playertoTraderRequirementsCalc = (
  trader: Trader,
  minLevel: number
) => {
  const traderLevelIdx = trader?.levels.findIndex(
    (traderLevel) => traderLevel.level === minLevel
  );
  return {
    traderName: trader?.name ?? 'Flea Market',
    traderIcon: trader?.imageLink ?? '',
    traderLevel: trader?.levels[traderLevelIdx].level ?? null,
    playerLevel: trader?.levels[traderLevelIdx].requiredPlayerLevel ?? null,
    reputation: trader?.levels[traderLevelIdx].requiredReputation ?? null,
    commerce: trader?.levels[traderLevelIdx].requiredCommerce ?? null,
  };
};

export const questRequirementCalc = (task: TaskUnlock | null) => {
  return {
    level: task?.minPlayerLevel ?? 0,
    name: task?.name ?? '',
  };
};
