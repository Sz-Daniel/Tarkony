import { useEffect, useState } from "react"
import type { CategoryType } from "../../types/items/queryType"

type Props ={
    selected: string,
    categoriesCache: CategoryType[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>
}

export const selectedBulkCategoryLogic = ({selected, categoriesCache, setSelectedCategory} :Props) => {

    //collected the selected category normalizedname and childs normalized names
    const [collectorCategNormalizedNames,setCollectorCategNormalizedNames] = useState<string[]>([])

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
        setSelectedCategory(collectorCategNormalizedNames)
    },[collectorCategNormalizedNames])
}