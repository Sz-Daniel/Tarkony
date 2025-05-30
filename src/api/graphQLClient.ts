import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { QueryType } from "../type";

//param for weekly-daily etc 
const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;
const STALE_TIME_DAILY = 1000 * 60 * 60 * 24;

/** Custom hook for "easy" API calls.
 *  
 * @param query which include a name for cache name, and the quary description
 * @param adapter optional in case we need to polish the data before using it 
 * @returns with the @path which skip the data.data.queryType objects and store just the dataArray
 */
export function useFetchIntoCache<Q, A = Q >(
    query: QueryType,
    adapter?: (data: Q ) => A,
) {
    return useQuery({
        queryKey: [query.name],
        queryFn: async() => {
            const raw = await fetchGQLwQuery(query.query);
            //console.log('raw', raw)
            const path = Object.values(raw.data)[0] as Q; //
            //console.log(`Path ${query.name}`, path)
            if (adapter) {              
                //console.log(`adapter ${query.name}`, adapter(path))
                return adapter(path)
            } else {
                //console.log(`return ${query.name}`, path)
                return path
            }
        },
        staleTime: 1000 * 60 * 60 * 24, // daily
    });
}

//Initalize Axios client
const gqlClient = axios.create({
    baseURL: 'https://api.tarkov.dev/graphql',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export async function fetchGQLwQuery( query: string) {
    const response = await gqlClient.post('', { query: query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return await response.data
}














