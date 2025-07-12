import type {
  SingleItemPricesQueryType,
  SingleItemQueryType,
} from '../types/ItemSingle/queryType';
import type {
  FleaPrice,
  SingleItemPricesResultType,
  SingleItemResultType,
  Stats,
} from '../types/ItemSingle/responseType';
import {
  buyFromListCalc,
  IOBarterListCalc,
  IOCraftListCalc,
  sellToListCalc,
  taskGiveCalc,
  taskNeedCalc,
} from './adapters';
export function singleItemPricesAdapter(
  data: SingleItemPricesQueryType
): SingleItemPricesResultType {
  const sellToList = sellToListCalc(data.sellFor);
  const buyFromList = buyFromListCalc(data.buyFor);
  return {
    id: data.id ?? '',
    sellTo: sellToList ?? [],
    buyFrom: buyFromList ?? [],
  };
}
export function singleItemAdapter(
  data: SingleItemQueryType
): SingleItemResultType {
  const stats = statCalc(data);
  const statsNull = Object.values(stats).every((value) => value === null);
  const fleaPrice = fleaPriceCalc(data);
  const fleaPriceNull = Object.values(fleaPrice).every(
    (value) => value === null
  );
  const sellToList = sellToListCalc(data.sellFor);
  const buyFromList = buyFromListCalc(data.buyFor);
  const barterInputList = IOBarterListCalc(data.bartersFor);
  const barterOutputList = IOBarterListCalc(data.bartersUsing);
  const craftInputList = IOCraftListCalc(data.craftsFor);
  const craftOutputList = IOCraftListCalc(data.craftsUsing);
  const taskGiveList = taskGiveCalc(data.receivedFromTasks, data.name);
  const taskNeedList = taskNeedCalc(data.usedInTasks, data.name);
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
    sellTo: sellToList ?? [],
    buyFrom: buyFromList ?? [],
    barterInput: barterInputList ?? [],
    barterOutput: barterOutputList ?? [],
    craftInput: craftInputList ?? [],
    craftOutput: craftOutputList ?? [],
    taskNeed: taskNeedList ?? [],
    taskGive: taskGiveList ?? [],
  };
}
const fleaPriceCalc = (data: FleaPrice) => {
  return {
    lastLowPrice: data.lastLowPrice ?? null,
    low24hPrice: data.low24hPrice ?? null,
    avg24hPrice: data.avg24hPrice ?? null,
    high24hPrice: data.high24hPrice ?? null,
    changeLast48hPercent: data.changeLast48hPercent ?? null,
    changeLast48h: data.changeLast48h ?? null,
    lastOfferCount: data.lastOfferCount ?? null,
  };
};
const statCalc = (data: Stats) => {
  return {
    velocity: data.velocity ?? null,
    recoilModifier: data.recoilModifier ?? null,
    loudness: data.loudness ?? null,
    accuracyModifier: data.accuracyModifier ?? null,
    ergonomicsModifier: data.ergonomicsModifier ?? null,
  };
};
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
