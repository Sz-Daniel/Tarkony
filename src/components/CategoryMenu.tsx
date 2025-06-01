import { useQueryClient } from "@tanstack/react-query";
import { categoriesQuery, itemBaseQuery } from "../api/query";
import { useEffect } from "react";
import { Chip } from "@mui/material";
import type { CategoryType } from "../types/queryType";
import type { selectedCategoryType } from "../types/type";
import type { ItemBaseResultType } from "../types/responseType";

export function CategoryMenu({selectedCategory, setSelectedCategory}:selectedCategoryType) {

    const queryClient = useQueryClient();
    const categoriesCache: CategoryType[] = queryClient.getQueryData([categoriesQuery.name])?? [];
    const shortItemsListCache: ItemBaseResultType[] = queryClient.getQueryData([itemBaseQuery.name])?? [];

    const categHandler = (categNormalizedName: string[])=>{
        let categFound =  categNormalizedName;
        let categCollector:string[] =[...categNormalizedName];
        do {
            categFound = categoriesCache?.find(elem => categFound.includes(elem.normalizedName))
            ?.children.flatMap(child => child.normalizedName) ?? [];
            categCollector = [ ...categCollector,...categFound]
        } while (categFound.length !== 0);
        const uniqueCollector = [...new Set(categCollector)];

        // Itt logolj, ez biztosan aktuális
        console.log("👈 ez a gyűjtött kategória lista", uniqueCollector);
        setSelectedCategory(uniqueCollector); // ezt majd useEffect figyeli
    }

    useEffect(() => {
    /**
        // keressük meg a gyökér kategóriákat
        const rootCategories = categoriesCache.filter(
        cat => !cat.parent || cat.parent.normalizedName === ""
        );

        // végigmegyünk minden root kategórián
        for (const root of rootCategories) {
        printCategoryTree(categoriesCache, root.normalizedName);
        }     
    */
        console.log('selectedCategory updated:', selectedCategory);

        const selectedItems = shortItemsListCache.filter(item =>
            selectedCategory.includes(item.category)
        );
        console.log("selected items", selectedItems);
    }, [selectedCategory]);

    return(
    <>
        {categoriesCache.filter((cit)=>selectedCategory.includes(cit.normalizedName))?.sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
                <Chip key={cat.id} label={cat.name} onClick={()=>categHandler([cat.normalizedName])} />
        ))}
    </>
    )
}