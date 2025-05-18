import axios from "axios";
import type { GraphqlQueriesType } from "../type";
import { queries } from "./query";
export { queries }

//Lets inicalize the Axios 
const gqlClient = axios.create({
    baseURL: 'https://api.tarkov.dev/graphql',
    headers: {
        //what we want to send
        'Content-Type': 'application/json',
        //what we want back
        Accept: 'application/json',
    },
})

//Create a controll function for calling with POST
//call queries which contains all already generated fragments
export async function fetchGraphQL<T>(queryKey: GraphqlQueriesType): Promise<T> {
    const query = queries[queryKey]
    const response = await gqlClient.post('', { query })
    return response.data
}

