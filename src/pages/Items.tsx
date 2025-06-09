import { useState } from "react";
import { CategoryMenu } from "../components/Items/CategoryMenu";
import { ItemList } from "../components/Items/ItemList";
import { useCategoryQuery, useItemBaseListQuery } from "../hooks/APICalls";


export function Items(){ 
  const [selectedCategory, setSelectedCategory]= useState<string[]>([""])

  useItemBaseListQuery();
  useCategoryQuery();
  
  return (
  <>
    <CategoryMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    <ItemList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  </>
  );
}
