import { useFetchIntoCache } from "../api/graphQLClient";
import { categoriesQuery, itemBaseAdapter, itemBaseQuery, itemDetailsAdapter, itemDetailsQuery,  singleItemQuery } from "../api/query";
import type { SingleItemQueryType } from "../types/item/queryType";
import type { CategoryType, ItemBaseQueryType, ItemDetailQueryType } from "../types/items/queryType";
import type { ItemBaseResultType, ItemDetailResultType } from "../types/items/responseType";

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
     return useFetchIntoCache<SingleItemQueryType>(singleItemQuery(normalizedNameProp));
}