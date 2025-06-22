import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { QueryType } from './types/Items/queryType';

const STALE_TIME_WEEKLY = 1000 * 60 * 60 * 24 * 7;

/** useFetchIntoCache
 * @param query Object containing:
 * name: cache key name
 * key: query key (described in return)
 * query: the GraphQL query string
 * @param adapter Optional function to format the query response data into a usable structure
 * @returns The data corresponding to the query key, filtered to return only the array; optionally reformats the data structure via the adapter for easier use
 */

export function useFetchIntoCache<TQuery, TAdapter = TQuery>(
  query: QueryType,
  adapter?: (data: TQuery) => TAdapter,
  refreshTime = STALE_TIME_WEEKLY
) {
  return useQuery({
    queryKey: [query.name],
    queryFn: async () => {
      const raw = await fetchGraphQLwQuery(query.query);
      console.log('Raw: ' + query.name + ' useFetchIntoCache', raw);
      const useableField = raw.data[query.key] as TQuery;
      const result = adapter ? adapter(useableField) : useableField;
      console.log('Result: ' + query.name + ' useFetchIntoCache', result);
      return result;
    },
    throwOnError: (error, query) => {
      console.log('Error: ' + query.options.queryKey, { error, query });
      return false;
    },
    staleTime: refreshTime,
  });
}

//Axios setup for POST, only-one type what we need
export async function fetchGraphQLwQuery(query: string) {
  try {
    const response = await gqlClient.post('', { query });
    if (response.data.errors) {
      console.log('GraphQL Error', response.data.errors);
      throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data;
  } catch (error) {
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
});

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
