import type { SingleItemQueryType } from '../types/ItemSingle/queryType';
import type { SingleItemResultType } from '../types/ItemSingle/responseType';

export function singleItemAdapter(
  data: SingleItemQueryType
): SingleItemResultType {
  const stats = {
    velocity: data.velocity ?? null,
    recoilModifier: data.recoilModifier ?? null,
    loudness: data.loudness ?? null,
    accuracyModifier: data.accuracyModifier ?? null,
    ergonomicsModifier: data.ergonomicsModifier ?? null,
  };
  const statsNull = Object.values(stats).every((value) => value === null);
  const fleaPrice = {
    lastLowPrice: data.lastLowPrice ?? null,
    low24hPrice: data.low24hPrice ?? null,
    avg24hPrice: data.avg24hPrice ?? null,
    high24hPrice: data.high24hPrice ?? null,
    changeLast48hPercent: data.changeLast48hPercent ?? null,
    changeLast48h: data.changeLast48h ?? null,
    lastOfferCount: data.lastOfferCount ?? null,
  };
  const fleaPriceNull = Object.values(fleaPrice).every(
    (value) => value === null
  );
  return {
    id: data.id ?? '',
    name: data.name ?? '',
    shortName: data.shortName ?? '',
    categories: data.categories.map((cat) => cat.name) ?? '',

    width: data.width ?? null,
    height: data.height ?? null,
    weight: data.weight ?? null,
    hasGrid: data.hasGrid ?? null,

    inspectImageLink: data.inspectImageLink ?? '',
    backgroundColor: data.backgroundColor ?? '',
    gridImageLink: data.gridImageLink ?? '',

    description: data.description ?? '',
    wikiLink: data.wikiLink ?? '',
    updated: data.updated ?? '',
    fleaPrice: fleaPriceNull ? null : fleaPrice,
    stats: statsNull ? null : stats,
    sellTo: data.sellFor
      .sort((a, b) => b.priceRUB - a.priceRUB)
      .map((sell) => ({
        price: sell.price ?? null,
        priceRub: sell.priceRUB ?? null,
        priceCurrency: sell.currency ?? '',
        traderName: sell.vendor.name ?? '',
        fir: sell.vendor.foundInRaidRequired,
      })),

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

/**  

    
    }),
  historicalPrices: HistoricalPrices[],
  //Fragments Types
type HistoricalPrices = {
  offerCount:number,
  price: number,
  priceMin: number,
  timestamp: string,
}



  receivedFromTasks: receivedFromTasksType[],
 */

/**
 
    historicalPrices: data.historicalPrices.map((history)=>({
        offerCount: history.offerCount,
        price: history.price,
        priceMin: history.priceMin,
        timestamp:unixtimeToDate(history.timestamp),
    }))

 */
