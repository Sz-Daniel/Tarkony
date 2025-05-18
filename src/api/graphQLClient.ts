import axios from "axios";
import type { GraphqlQueriesType } from "../type";
import { queries } from "./query";
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

