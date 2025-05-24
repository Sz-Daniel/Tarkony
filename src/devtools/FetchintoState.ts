import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchGQLwQuery } from "../api/graphQLClient";

export function useFetchintoState<T>( 
    stateVariable: T, 
    setStateVariable:  React.Dispatch<React.SetStateAction<T>>,  
    query:string
) {

    const result = useQuery({
        queryKey: [`${query}`],
        queryFn: () => fetchGQLwQuery(query),
        staleTime: 1000 * 60 * 60 * 24 // daily
    });

    useEffect(()=>{
        const { data, isLoading, isError, isSuccess } = result;
        if (isLoading) console.log("shortItemIniResult Loading");
        if (isError) console.log("shortItemIniResult Error");
        if (isSuccess && data) {
            console.log("shortItemIniResult", data);
            setStateVariable(data);
        }
    },[result])
}