import axios from "axios";
import type { GraphqlQueriesType } from "../type";
import { categoryListQuery, queries, shortItemsListQuery, testIdNameQuery } from "./query";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// Re-export the queries object for easier use in other components
export { queries }

//Initalize Axios client
const gqlClient = axios.create({
    baseURL: 'https://api.tarkov.dev/graphql',
    headers: {
        //what we want to send
        'Content-Type': 'application/json',
        //what we want back
        Accept: 'application/json',
    },
})

//Last version of fetch mechanism. 
//queries are stable, adapter used on them, always read into a state to longer useable lifetime.
//console log will changed later.
export function useFetchintoState<T>( 
    query:any,
    setStateVariable:  React.Dispatch<React.SetStateAction<T>>,
    adapterToState: any 
) {

    const result = useQuery({
        queryKey: [`${query.name}`],
        queryFn: () => fetchGQLwQuery(query.query),
        staleTime: 1000 * 60 * 60 * 24 // daily
    });

    useEffect(()=>{
        const { data, isLoading, isError, isSuccess } = result;
        if (isLoading) console.log("shortItemIniResult Loading");
        if (isError) console.log("shortItemIniResult Error");
        if (isSuccess && data) {
            console.log("shortItemIniResult", data);
            setStateVariable(adapterToState(data.data.items));
        }
    },[result.data])
}

export async function fetchGQLwQuery( query: string) {
    const response = await gqlClient.post('', { query: query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data
}

/* Old versions */
export async function fetchShortItems() {
    const response = await gqlClient.post('', { query: shortItemsListQuery.query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data
}

export async function fetchCategoryList() {
    const response = await gqlClient.post('', { query: categoryListQuery.query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data
}

export async function fetchTest() {
    const response = await gqlClient.post('', { query: testIdNameQuery })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data
}






















//Create a controll function for calling with POST
//calls queries that contains all already generated fragments
export async function fetchGraphQL<T>(queryKey: GraphqlQueriesType): Promise<T> {
    const query = queries[queryKey]
    const response = await gqlClient.post('', { query })
    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data
}
