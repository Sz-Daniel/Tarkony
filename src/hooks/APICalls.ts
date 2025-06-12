import { useFetchIntoCache } from "../api/graphQLClient";
import { singleItemAdapter, singleItemQuery } from "../api/itemSingleQuery";
import { categoriesQuery, itemBaseAdapter, itemBaseQuery, itemDetailsAdapter, itemDetailsQuery } from "../api/itemsQuery";
import type { CategoryType, ItemBaseQueryType, ItemDetailQueryType } from "../types/Items/queryType";
import type { ItemBaseResultType, ItemDetailResultType } from "../types/Items/responseType";
import type { SingleItemQueryType } from "../types/ItemSingle/queryType";
import type { SingleItemResultType } from "../types/ItemSingle/responseType";


//param for weekly-daily etc 
const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME_DAILY = 1000 * 60 * 60 * 24;

//use this pattern to data for destructed data 
//const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;

export function useCategoryQuery(){
    return useFetchIntoCache<CategoryType[]>(categoriesQuery);
}

export function useItemDetailQuery(itemId:string){
    return useFetchIntoCache<ItemDetailQueryType[],ItemDetailResultType[]>(itemDetailsQuery(itemId),itemDetailsAdapter);
}

export function useItemBaseListQuery(){
    return useFetchIntoCache<ItemBaseQueryType[],ItemBaseResultType[]>(itemBaseQuery,itemBaseAdapter);
}

export function useSingleItemQuery(normalizedNameProp:string){
     return useFetchIntoCache<SingleItemQueryType,SingleItemResultType>(singleItemQuery(normalizedNameProp),singleItemAdapter);
}
