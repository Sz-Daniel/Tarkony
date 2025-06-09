import { useQueryClient } from "@tanstack/react-query";
import { categoriesQuery } from "../../api/query";
import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import type { CategoryType } from "../../types/items/queryType";

type Props ={
    selectedCategory: string[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>
}

export function CategoryMenu({selectedCategory, setSelectedCategory}:Props) {

    //selected ONE category directly from categ list
    const [selected,setSelected] = useState<string>("")

    //collected the selected category normalizedname and childs normalized names
    const [collectorCategNormalizedNames,setCollectorCategNormalizedNames] = useState<string[]>([])

    //Get categories from source
    const queryClient = useQueryClient();
    const categoriesCache: CategoryType[] = queryClient.getQueryData([categoriesQuery.name])?? [];

    //set the selected caategory
    const categHandler = (onClickNormalizedName: string)=>{
        setSelected(onClickNormalizedName)
    }

    useEffect(()=>{
        //null the prev categ
        setCollectorCategNormalizedNames([]);
        //search and list the selected category and all of childs
        deepSearch(selected)
    },[selected])

    const deepSearch= (normalized:string) =>{
        //find the categ node by normalisedName and push the name to the Categ name collector (setCollectorCategNormalizedNames)
        const foundNode = categoriesCache.find((cat)=>cat.normalizedName=== normalized)
        const foundName = foundNode?.normalizedName ?? ""
        setCollectorCategNormalizedNames(prev=> [...prev, foundName])
        //then go into his childs
        foundNode?.children.forEach((cat)=> deepSearch(cat.normalizedName))
    }

    useEffect(()=>{
        console.log("collectorCategNormalizedNames",collectorCategNormalizedNames)
        setSelectedCategory(collectorCategNormalizedNames)
    },[collectorCategNormalizedNames])

    //Next part, level based categories show
    return(
    <>
        {categoriesCache.sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
                <Chip key={cat.id} label={cat.name} onClick={()=>categHandler(cat.normalizedName)} />
        ))}
    </>
    )
}