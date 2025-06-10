import { useEffect, useState } from "react";
import { CategoryMenu } from "../components/Items/CategoryMenu";
import { ItemList } from "../components/Items/ItemList";
import { useCategoryQuery, useItemBaseListQuery } from "../hooks/APICalls";


export function Items(){ 
  const [selectedCategory, setSelectedCategory]= useState<string[]>([])

  const itemBaseFetch = useItemBaseListQuery();
  const categoryFetch = useCategoryQuery();
 
  return (
  <>
    { categoryFetch.data && <CategoryMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}
    { itemBaseFetch.data &&<ItemList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
  </>
  );
}
