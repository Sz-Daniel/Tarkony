import { useState } from "react";
import { CategoryMenu } from "../components/CategoryMenu";
import { ItemList } from "../components/ItemList";
import { useCategoryQuery, useItemBaseListQuery } from "../api/graphQLClient";

export function DataShow() { 
  const [selectedCategory, setSelectedCategory]= useState<string[]>(["item"])

  useItemBaseListQuery();
  useCategoryQuery();

  return (
  <>
    <CategoryMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

    <ItemList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  </>
  );
}