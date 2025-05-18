import React, { useEffect, useState } from "react";
import { fetchGraphQL, queries } from "./graphQLClient";

export function DataShow() {
const [selectedQuery,setSelectedQuery] = useState()
const queryKeys = Object.keys(queries) as (keyof typeof queries)[];

async function getData() {
    try {
    // Válasszuk ki például a ShortItemsList query-t
    const data = await fetchGraphQL( 'ShortItemsList' );
    console.log("GraphQL data:", data);
    } catch (error) {
    console.error("GraphQL fetch error:", error);
    }
}

useEffect(() => {
    console.log(selectedQuery)
}, [selectedQuery]);

return (
<div>
    <h2>DataShow component</h2>
    <h1>Select the Query</h1>

    <select name="querySelect" onChange={()=>setSelectedQuery}> 
        {queryKeys.map((key)=>(
            <option key={key} value={key}>{key}</option>
        ))}
    </select>

    <p>Check console for the GraphQL response.</p>
</div>
);
}
