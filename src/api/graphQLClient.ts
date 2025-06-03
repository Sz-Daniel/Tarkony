import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery, itemBaseQuery, itemBaseQueryAdapter, itemDetailsQuery, itemDetailsQueryAdapter } from "./query";
import type{ ItemBaseQueryType,  CategoryType, ItemDetailQueryType,  QueryType } from "../types/queryType";
import type { ItemBaseResultType,  ItemDetailResultType } from "../types/responseType";


//param for weekly-daily etc 
const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME_DAILY = 1000 * 60 * 60 * 24;

//use this pattern to data for destructed data 
//const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;
/**
 * Singletons from useFetchIntoCache to direct use.
 */
export function useCategoryQuery(){
    return useFetchIntoCache<CategoryType[]>(categoriesQuery);
}

export function useItemDetailQuery(itemId:string){
    return useFetchIntoCache<ItemDetailQueryType[],ItemDetailResultType[]>(itemDetailsQuery(itemId),itemDetailsQueryAdapter);
}

export function useItemBaseListQuery(){
    return useFetchIntoCache<ItemBaseQueryType[],ItemBaseResultType[]>(itemBaseQuery,itemBaseQueryAdapter);
}

/** Custom hooks for "easy" factory API calls.
 *  
 * @param query which include a name for cache name, and the quary description
 * @param adapter optional in case we need to polish the data before using it 
 * @returns with the @path which skip the data.data.queryType objects and store just the dataArray
 */

 export function useFetchIntoCache<Q, A = Q>(
    query: QueryType,
    adapter?: (data: Q ) => A,
    refreshTime = STALE_TIME_WEEKLY
) {
    return useQuery({
        queryKey: [query.name],
        queryFn: async() => {
            const raw = await fetchGQLwQuery(query.query);
            const useableField = Object.values(raw.data)[0] as Q; 
            if (adapter) {
                return adapter(useableField);        
            } 
            return useableField
        },
        staleTime: refreshTime,
    });
}

//APIQuery ini
export async function fetchGQLwQuery( query: string) {
    const response = await gqlClient.post('', { query: query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return await response.data
}

//Initalize Axios client
const gqlClient = axios.create({
    baseURL: 'https://api.tarkov.dev/graphql',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})



/***I tried so hard and gets so far ...
 * 
 * 
 * export const fetchIntoCache = async () => {
    const user = await queryClient.fetchQuery({
        queryKey: ['test'],
        queryFn: ()=>fetchGQLwQuery(` query test{
    items(ids: "5447a9cd4bdc2dbd208b4567") {
      id
       name
      normalizedName
      }
    }`),
    staleTime: 1000 * 60 * 60 * 24, // daily
    })
    return user
}



 * export const fetchIntoCache = async<Q, A = Q> (
    query: QueryType,
    adapter?: (data: Q ) => A,
    refreshTime:number =  STALE_TIME_DAILY 
) =>{
     return await queryClient.fetchQuery({
        queryKey: [query.name],
        queryFn: async() => {
            const raw = await fetchGQLwQuery(query.query);
            //console.log('raw', raw)
            const useableField = Object.values(raw.data)[0] as Q; //
            //console.log(`useableField ${query.name}`, useableField)
            if (adapter) {              
                //console.log(`adapter ${query.name}`, adapter(useableField))
                return adapter(useableField)
            } else {
                //console.log(`return ${query.name}`, useableField)
                return useableField
            }
        },
        staleTime: refreshTime,
    });
}

 */

