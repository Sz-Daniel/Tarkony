import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type{ QueryType } from "../types/items/queryType";
import { Logger } from "../devtools/Logger";

const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;

/**  
 * @param query which contains a name for cache name, query key (desc in return) and the query call string
 * @param adapter optional for formatting the query response data for convertible to usable data
 * @returns with the query key data objects will sorted out and return only the array, opcionally it can reformat the data structure for easier usage with adapter
 */

 export function useFetchIntoCache<TQuery, TAdapter = TQuery>(
    query: QueryType,
    adapter?: (data: TQuery ) => TAdapter,
    refreshTime = STALE_TIME_WEEKLY
) {
    return useQuery({
        queryKey: [query.name],
        queryFn: async() => {
            const raw = await fetchGQLwQuery(query.query);
             console.log("singleItemAdapter raw",raw)
            const useableField = raw.data[query.key] as TQuery; 
            const result = adapter ? adapter(useableField) : useableField
            Logger.add(query.name+" useFetchIntoCache", result)
            return result
        },
        staleTime: refreshTime,
    });
}


export async function fetchGQLwQuery( query: string) {
    try {
        const response = await gqlClient.post('', { query });
        if (response.data.errors) {
            Logger.add('GraphQL Error', response.data.errors);
            throw new Error(JSON.stringify(response.data.errors));
        }
        return response.data;
    } catch (error) {
        Logger.add('Network or Axios Error', error);
        throw error;
    }
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

