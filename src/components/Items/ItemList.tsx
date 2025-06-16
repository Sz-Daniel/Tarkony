import { Accordion, AccordionSummary, Box, Pagination,Stack,styled,Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { itemBaseQuery } from "../../api/itemsQuery";
import { ItemDetail } from "./ItemDetail";
import { SearchBar } from "../ui/SeachBar";
import type { ItemBaseResultType } from "../../api/types/Items/responseType";

type Props ={
    selectedCategory: string[],
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>
}

export function ItemList({selectedCategory, setSelectedCategory}:Props) {

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
        //console.log("Search", itemBaseListCache, selectedCategory, searchedName)
        if (itemBaseListCache.length !== 0) {
        setShowItem(itemBaseListCache.filter((list)=> selectedCategory.includes(list.category)))
            if (searchedName !== '') {
                const lowerSearch = searchedName.toLowerCase();
                setShowItem(itemBaseListCache.filter((list)=> list.name.toLowerCase().includes(lowerSearch)))
            }
        }
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
    </>)
}