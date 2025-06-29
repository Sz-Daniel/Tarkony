import type {
  ItemBaseQueryType,
  ItemDetailQueryType,
  traderForType,
} from '../types/Items/queryType';
import type {
  ItemBaseResultType,
  ItemDetailResultType,
} from '../types/Items/responseType';

export function itemBaseAdapter(
  data: ItemBaseQueryType[]
): ItemBaseResultType[] {
  const bestSeller = (sellers: traderForType[]) => {
    if (!sellers || sellers.length === 0) return null;
    return sellers.reduce((best, current) =>
      current.priceRUB > best.priceRUB ? current : best
    );
  };
  return data.map((item: ItemBaseQueryType) => {
    const top = bestSeller(item.sellFor);
    return {
      id: item.id ?? null,
      name: item.name ?? '',
      iconURL: item.gridImageLink ?? '',
      bestSeller: {
        price: top?.priceRUB ?? null,
        place: top?.vendor?.name ?? null,
      },
      bestBuy: item.buyFor
        .sort((a, b) => a.priceRUB - b.priceRUB)
        .map((buy) => ({
          price: buy.priceRUB ?? null,
          place: buy.vendor.name ?? null,
        })),
      changePrice: item.changeLast48h ?? 0,
      changePercent: item.changeLast48hPercent ?? 0,
      category: item.category.normalizedName ?? '',
    };
  });
}

export function itemDetailsAdapter(
  data: ItemDetailQueryType
): ItemDetailResultType {
  //ez 1.
  console.log(data);
  return {
    //ez 2.
    id: data.id ?? null,
    name: data.name ?? '',
    normalizedName: data.normalizedName ?? '',
    wiki: data.wikiLink ?? '',
    sellTo:
      data.sellFor
        .sort((a, b) => b.priceRUB - a.priceRUB)
        .map((sell) => ({
          price: sell.price ?? null,
          priceRub: sell.priceRUB ?? null,
          priceCurrency: sell.currency ?? '',
          traderName: sell.vendor.name ?? '',
          fir: sell.vendor.foundInRaidRequired,
        })) ?? [],

    buyFrom: data.buyFor
      .sort((a, b) => a.priceRUB - b.priceRUB)
      .map((buy) => {
        const traderLevelIdx = buy.vendor.trader?.levels.findIndex(
          (level) => level.level === buy.vendor.minTraderLevel
        );
        return {
          id: '',
          price: buy.price ?? null,
          priceRub: buy.priceRUB ?? null,
          priceCurrency: buy.currency ?? '',
          limit: buy.vendor.buyLimit ?? null,
          playertoTraderRequirements: {
            traderName: buy.vendor.name ?? 'Flea Market',
            traderIcon: '',
            traderLevel:
              buy.vendor.trader?.levels[traderLevelIdx].level ?? null,
            playerLevel:
              buy.vendor.trader?.levels[traderLevelIdx].requiredPlayerLevel ??
              null,
            reputation:
              buy.vendor.trader?.levels[traderLevelIdx].requiredReputation ??
              null,
            commerce:
              buy.vendor.trader?.levels[traderLevelIdx].requiredCommerce ??
              null,
          },
          questRequirement: {
            level: buy.vendor.taskUnlock?.minPlayerLevel ?? null,
            name: buy.vendor.taskUnlock?.name ?? '',
          },
        };
      }),

    barterInput: data.bartersFor.map((input) => {
      const traderLevelIdx = input?.trader.levels.findIndex(
        (level) => level.level === input.level
      );
      return {
        id: input.id ?? '',
        limit: input.buyLimit ?? null,
        playertoTraderRequirements: {
          traderName: input.trader.name ?? '',
          traderIcon: input.trader.imageLink ?? '',
          traderLevel: input.trader.levels[traderLevelIdx].level ?? null,
          playerLevel:
            input.trader.levels[traderLevelIdx].requiredPlayerLevel ?? null,
          reputation:
            input.trader.levels[traderLevelIdx].requiredReputation ?? null,
          commerce:
            input.trader.levels[traderLevelIdx].requiredCommerce ?? null,
        },
        questRequirement: {
          level: input.taskUnlock?.minPlayerLevel ?? null,
          name: input.taskUnlock?.name ?? '',
        },
        inputItems: input.requiredItems.map((item) => ({
          count: item.count ?? null,
          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
        outputItems: input.rewardItems.map((item) => ({
          count: item.count ?? null,
          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
      };
    }),

    barterOutput: data.bartersUsing.map((output) => {
      const traderLevelIdx = output?.trader.levels.findIndex(
        (level) => level.level === output.level
      );
      return {
        id: output.id ?? '',
        limit: output.buyLimit ?? null,
        playertoTraderRequirements: {
          traderName: output.trader.name ?? '',
          traderIcon: output.trader.imageLink ?? '',
          traderLevel: output.trader.levels[traderLevelIdx].level ?? null,
          playerLevel:
            output.trader.levels[traderLevelIdx].requiredPlayerLevel ?? null,
          reputation:
            output.trader.levels[traderLevelIdx].requiredReputation ?? null,
          commerce:
            output.trader.levels[traderLevelIdx].requiredCommerce ?? null,
        },
        questRequirement: {
          level: output.taskUnlock?.minPlayerLevel ?? null,
          name: output.taskUnlock?.name ?? '',
        },
        inputItems: output.requiredItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
        outputItems: output.rewardItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
      };
    }),

    craftInput: data.craftsFor.map((input) => {
      return {
        id: input.id ?? '',
        duration: input.duration ?? null,
        stationRequirement: {
          level: input.level ?? null,
          stationName: input.station.name ?? '',
          stationIcon: input.station.imageLink ?? '',
        },
        questRequirement: {
          level: input.taskUnlock?.minPlayerLevel ?? null,
          name: input.taskUnlock?.name ?? '',
        },
        inputItems: input.requiredItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
        outputItems: input.rewardItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
      };
    }),
    craftOutput: data.craftsUsing.map((output) => {
      return {
        id: output.id ?? '',
        duration: output.duration,
        stationRequirement: {
          level: output.level,
          stationName: output.station.name,
          stationIcon: output.station.imageLink,
        },
        questRequirement: {
          level: output.taskUnlock?.minPlayerLevel ?? null,
          name: output.taskUnlock?.name ?? '',
        },
        inputItems: output.requiredItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
        outputItems: output.rewardItems.map((item) => ({
          count: item.count ?? null,

          id: item.item.id ?? '',
          img: item.item.gridImageLink ?? '',
          name: item.item.name ?? '',
        })),
      };
    }),
    taskNeed: data.usedInTasks.map((need) => {
      const tasks = need.objectives.filter((task) =>
        task.item.name.includes(data.name)
      );
      return {
        name: need.name,
        task: tasks.map((task) => ({
          description: task.description,
          name: task.item.name,
          count: task.count,
        })),
      };
    }),

    taskGive: data.receivedFromTasks.map((get) => {
      return {
        name: get.name,
        reward: get.finishRewards.items.map((rewa) => ({
          name: rewa.item.name,
          count: rewa.count,
        })),
      };
    }),
  };
}
