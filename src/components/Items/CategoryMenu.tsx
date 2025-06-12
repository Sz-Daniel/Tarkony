import { useQueryClient } from "@tanstack/react-query";
import { categoriesQuery } from "../../api/itemsQuery";
import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import type { CategoryType } from "../../types/Items/queryType";
import { selectedBulkCategoryLogic } from "./categoryLogic";

type Props ={
    selectedCategory: string[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>
}

export function CategoryMenu({selectedCategory, setSelectedCategory}:Props) {

    //selected ONE category directly from categ list
    const [selected,setSelected] = useState<string>("item")

    //This whill show the category map only plus 1 node level by previous level selected categ
    const [categoryListShow,setCategoryListShow] = useState<Map<string,string[]>>(new Map());

    //helper to update the map
    const updateCategoryListShow = (key:string, value:string[]) => {
        setCategoryListShow(map => new Map(map.set(key, value)));
    }

    //set the selected caategory
    const categHandler = (onClickNormalizedName: string)=>{
        setSelected(onClickNormalizedName)
    }

    //Get categories from source
    const queryClient = useQueryClient();
    const categoriesCache: CategoryType[] = queryClient.getQueryData([categoriesQuery.name])?? [];

    //This generate the bulk category array about which items should shown (from categoryLogic)
    selectedBulkCategoryLogic({selected, categoriesCache, setSelectedCategory});

    useEffect(()=>{
        
        //if the user want to jump upper categrory then need to delete everything in the middle, by index
        //need to check if the selected(not in the map yet) is in one of the array yet? [for] [check these]
        const iterValues = Array.from(categoryListShow.values())
        
        for (let index = 0; index < iterValues.length; index++) {
            //Selected Is it in ? 
            const selectedCheck = Array.from(iterValues[index]).includes(selected)
            if (selectedCheck) {
                //in this level the user selected a new category so it needed to slice them down
                const slicedMap =  new Map( 
                    Array.from(categoryListShow.entries())
                    .slice(0,index+1)
                )
                setCategoryListShow(slicedMap);
            }
        }
 
        const categoryChilds = categoriesCache.find((cat)=>cat.normalizedName=== selected)?.children.flatMap((child)=>child.normalizedName) ?? []
        updateCategoryListShow(selected,categoryChilds)
    },[selected])

    //Chip disabled={ map Key always the selected category, in every rerender, if in the previous array found the selected categ, let that disabled. }

    return(
    <>  
        {Array.from(categoryListShow.entries()).map(([Mapkey, value])=> (
            <div key={Mapkey}>
            {value.map((cat,idx)=>(
                <Chip key={idx} 
                label={categoriesCache.find((cached)=>(cached.normalizedName === cat))?.name} 
                disabled={(categoryListShow.has(Mapkey) && Array.from(categoryListShow.keys()).includes(cat))}
                onClick={()=>categHandler(cat)}
            />
            ))}
            </div>  
        ))}
    </>
    )
}
