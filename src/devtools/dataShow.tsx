import { useEffect, useState } from "react";
import { useFetchIntoCache} from "../api/graphQLClient";
import { categoriesQuery, itemBaseQuery, itemBaseQueryAdapter, TESTQuery} from "../api/query";
import { CategoryMenu } from "../components/CategoryMenu";
import { ItemList } from "../components/ItemList";
import type { TESTQueryType, TESTResultType } from "../types/type";

// Next:
// Category select - next: levels show
// Item details: Tasks and Hovering the counters 
// Daily price update
// Routing - "All detail" single item page
// Searchbar - Autocomplete?

export function DataShow() { 
  const [selectedCategory, setSelectedCategory]= useState<string[]>(["item"])

/**
 *   //category refactoring
  const test = useFetchIntoCache<TESTQueryType[]>(TESTQuery)
  useEffect(()=>{
    const srcCategories = test.data
    const idMap = new Map<string,TESTQueryType>()
    srcCategories?.forEach((cat)=>{
      idMap.set(cat.id,{
        ...cat,
        children: [],
        parent: undefined
      });
    })
    console.log("idMap",idMap)
  },[test.isSuccess && test.data])
 */

  // Fetching the items list, and categories

  useFetchIntoCache(itemBaseQuery,itemBaseQueryAdapter);

  useFetchIntoCache(categoriesQuery)

  //const queryClient = useQueryClient();
  //const shortItemsListCache: ShortItemType[] = queryClient.getQueryData([itemBaseQuery.name])?? [];
  //const categoriesCache: CategoryMapType[] = queryClient.getQueryData([categoriesQuery.name])?? [];

  return (
  <>
    <CategoryMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

    <ItemList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  </>
  );
}