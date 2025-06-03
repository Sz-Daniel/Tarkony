import { Accordion, AccordionSummary, Box, Pagination,Stack,styled,Typography } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { itemBaseQuery } from "../api/query";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ItemDetail } from "./ItemDetail";
import type { selectedCategoryType } from "../types/type";
import type { ItemBaseResultType } from "../types/responseType";
import { SearchBar } from "./SeachBar";


export function ItemList({selectedCategory, setSelectedCategory}:selectedCategoryType) {

    const [searchedName, setSearchedName] = useState<string>('')

    const [page, setPage] = useState(1);
    const [showItem,setShowItem] = useState<ItemBaseResultType[]>([]);
    const [selectedItem, setSelectedItem] = useState<string>('')
    
    const queryClient = useQueryClient();
    const itemBaseListCache: ItemBaseResultType[] = queryClient.getQueryData([itemBaseQuery.name])?? [];

    useEffect(() => {

        if (selectedCategory.length === 1 && selectedCategory.includes("item")) {
            setShowItem(itemBaseListCache);

        } else {
            setShowItem(
                itemBaseListCache.filter((item) => selectedCategory.includes(item.category))
            );
        }
        if (searchedName !== '') {
            const lowerSearch = searchedName.toLowerCase();
            setShowItem(
                showItem.filter((item) =>
                item.name.toLowerCase().includes(lowerSearch))
            );
        }

    }, [itemBaseListCache, selectedCategory,searchedName]);

    const accordionHandleChange =
        (panel: string) => async (event: React.SyntheticEvent) => {
            setSelectedItem(panel);
            console.log("all",queryClient.getQueryCache().findAll());
        };

    // Pageinated 
    const paginationHandleChange = (_: any, value: number) => {
        setPage(value);
    };

    const itemsPerPage = 10;
    const paginatedItems = showItem.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const Item = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(
    <>

        {/**searchbar input
         * selected category <- context state
         * setShowItem 
         * input text delay 1 sec -> searchedWord state -> hook with that state 
         * useEffect for hook data -> setShowItem by cache with filter (utility function?)
         * if searchedWordState cleared for 1 sec setShowItem with itemBaseListCache
         * ts file? 
         * 
         * + daily price for datashow
         */}

        <SearchBar setSearchedName={setSearchedName}/>
        {paginatedItems.map((item: any) => (

        <Accordion 
        key={item.id}
        onChange={accordionHandleChange(item.id)}>
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
                    <Item>Sell to: {item.bestPlace} </Item>
                    <Item>
                    {item.bestPrice}
                    {'Flea Market' === item.bestPlace ? (
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
        {/* AccordionDetails in ItemDetails*/}
            {selectedItem === item.id && <ItemDetail itemId={item.id} />}
        </Accordion>
        
        ))}

        <Pagination
        count={Math.ceil(showItem.length / itemsPerPage)}
        page={page}
        onChange={paginationHandleChange}
        sx={{ mt: 2 }}
        />
    </>
    )
}