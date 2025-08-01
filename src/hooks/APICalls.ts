import {
  itemBaseAdapter,
  itemDetailsAdapter,
} from '../api/adapters/itemsAdapter';
import {
  singleItemAdapter,
  singleItemPricesAdapter,
} from '../api/adapters/itemSingleAdapter';
import { useFetchIntoCache } from '../api/apiClient';
import {
  singleItemPricesQuery,
  singleItemQuery,
} from '../api/queries/itemSingleQuery';
import {
  categoriesQuery,
  itemBaseQuery,
  itemDetailsQuery,
} from '../api/queries/itemsQuery';
import type {
  CategoryType,
  ItemBaseQueryType,
  ItemDetailQueryType,
} from '../api/types/Items/queryType';
import type {
  ItemBaseResultType,
  ItemDetailResultType,
} from '../api/types/Items/responseType';
import type {
  SingleItemPricesQueryType,
  SingleItemQueryType,
} from '../api/types/ItemSingle/queryType';
import type {
  SingleItemPricesResultType,
  SingleItemResultType,
} from '../api/types/ItemSingle/responseType';

//param for weekly-daily etc
const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME_DAILY = 1000 * 60 * 60 * 24;

//use this pattern to data for destructed data
//const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;

export function useCategoryQuery() {
  return useFetchIntoCache<CategoryType[]>(categoriesQuery);
}

export function useItemDetailQuery(itemId: string) {
  return useFetchIntoCache<ItemDetailQueryType, ItemDetailResultType>(
    itemDetailsQuery(itemId),
    itemDetailsAdapter
  );
}

export function useItemBaseListQuery() {
  return useFetchIntoCache<ItemBaseQueryType[], ItemBaseResultType[]>(
    itemBaseQuery,
    itemBaseAdapter
  );
}

export function useSingleItemQuery(normalizedNameProp: string) {
  return useFetchIntoCache<SingleItemQueryType, SingleItemResultType>(
    singleItemQuery(normalizedNameProp),
    singleItemAdapter
  );
}

export function useSingleItemPricesQuery(itemId: string) {
  return useFetchIntoCache<
    SingleItemPricesQueryType,
    SingleItemPricesResultType
  >(itemDetailsQuery(itemId), singleItemPricesAdapter);
}
