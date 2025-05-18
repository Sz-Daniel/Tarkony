import React, { useEffect, useState } from "react";
import { fetchGraphQL, queries } from "../api/graphQLClient";
import { useQuery } from "@tanstack/react-query";
import type { GraphqlQueriesType } from "../type";

export function DataShow() {
  const [selectedQuery,setSelectedQuery] = useState<GraphqlQueriesType>()

  const queryKeys = Object.keys(queries) as (keyof typeof queries)[];

  const { data, isLoading, isError, isSuccess} = useQuery(
  {
    queryKey: ['Items', selectedQuery],
    queryFn: () => fetchGraphQL(selectedQuery!),
    staleTime: 1000 * 60 * 5,
    enabled: !!selectedQuery,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log('Success:', data);
    }
  }, [isSuccess, data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;
  if (data) return <p>Data received successfully.</p>;

  return (
    <div>
        <h2>DataShow component</h2>
        <h1>Select the Query</h1>

        <select name="querySelect" onChange={(e)=>setSelectedQuery(e.target.value as GraphqlQueriesType)}> 
            {queryKeys.map((key)=>(
                <option key={key} value={key}>{key}</option>
            ))}
        </select>

        <p>Check console for the GraphQL response.</p>
    </div>
  );
}
