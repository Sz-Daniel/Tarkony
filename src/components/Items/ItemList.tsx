import { Accordion, AccordionSummary, Box, Pagination,Stack,styled,Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQueryClient } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import { itemBaseQuery } from "../../api/itemsQuery";
import { ItemDetailDisplay } from "./ItemDetail";
import { SearchBar } from "../ui/SeachBar";
import type { ItemBaseResultType } from "../../api/types/Items/responseType";

type ItemListProps ={
    selectedCategory: string[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>
}

export function ItemList({selectedCategory, setSelectedCategory}:ItemListProps) {

    const [expanded, setExpanded] = useState<string | false>(false);
    //paginator
    const [page, setPage] = useState(1);
    //full item list which will filtered in useeffect -> selectedCategory -> searchedName
    const [showItem,setShowItem] = useState<ItemBaseResultType[]>([]);
    //setSearchedName -> SearchBar
    const [searchedName, setSearchedName] = useState<string>('')
    //itemDetails - accordionHandleChange
    const [selectedItem, setSelectedItem] = useState<string>('')
    
    //get the useCategoryQuery() cached data
    const queryClient = useQueryClient();
    const itemBaseListCache: ItemBaseResultType[] = queryClient.getQueryData([itemBaseQuery.name])?? [];

    //Filter showItem list -> category -> searchedName
    useEffect(() => {
        const categoryFiltered = itemBaseListCache
        .filter(item => selectedCategory.includes(item.category));

        const finalFiltered = !searchedName
        ? categoryFiltered
        : categoryFiltered.filter(item => item.name.toLowerCase().includes(searchedName.toLowerCase()));

        setShowItem(finalFiltered);
    }, [itemBaseListCache, selectedCategory, searchedName]);

    //Accordion
    const accordionHandleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        setSelectedItem(panel);
    };

    //Pageinated 
    const paginationHandleChange = (_: any, value: number) => {
        setPage(value);
    };
    const itemsPerPage = 10;
    const paginatedItems = showItem.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    //MUI
    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(<>
        <Box sx={{padding: 4}}>
            <SearchBar setSearchedName={setSearchedName}/>
        </Box>
        {paginatedItems.map((item: any) => (

            <Accordion 
            key={item.id}
            expanded={selectedItem === item.id}
            onChange={accordionHandleChange(item.id)}>
           

                {/* TSX component is in the end of this file with memo with AccordionSummary*/}
                <ItemBaseDisplay item={item}/>
            
                {/* TSX component is in ItemDetail with AccordionDetails*/}
                {selectedItem === item.id && <ItemDetailDisplay itemId={item.id} />}
             
            </Accordion>
        
        ))}

        <Pagination
        count={Math.ceil(showItem.length / itemsPerPage)}
        page={page}
        onChange={paginationHandleChange}
        sx={{ mt: 2 }}
        />
    </>)
}

/**
 * Using React.memo on this one, props doesnt changing, 
 * but with filtering and/or searchingName it can be re-rendering 
 * ItemDetailDisplay - doesn't need
 */
type ItemBaseDisplayProps = {
    item: ItemBaseResultType
}
const ItemBaseDisplay = memo(
    ( {item} : ItemBaseDisplayProps) => {

    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(<>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}
    sx={{
    '& .MuiAccordionSummary-content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // vagy 'center' ha kell
        gap: 2,
    },
    }}>
        <Box sx={{ flex: 1, alignSelf: 'flex-start' }}>
            <Item>
                <img
                src={item.iconURL}
                alt={item.name}
                loading='lazy'
                style={{ maxWidth: '100%' }}
                />
            </Item>
        </Box>
        
        <Box sx={{ flex: 2 }}>
            <Item>
                <Typography variant='body1'>{item.name}</Typography>
            </Item>
        </Box>

        <Box sx={{ flex: 1, alignSelf: 'flex-end' }}>
            <Stack spacing={0}>
                <Item>Sell to: {item.bestSeller.place} </Item>
                <Item>
                {item.bestSeller.price}
                {'Flea Market' === item.bestSeller.place ? (
                    <Typography
                    component='span'
                    color={item.changePercent > 0 ? 'red' : 'green'}
                    >
                    <sup>
                        {item.changePercent}% {item.changePrice}
                    </sup>
                    </Typography>
                ) : (
                    ''
                )}
                </Item>
            </Stack>
        </Box>
    </AccordionSummary>
    </>)
});