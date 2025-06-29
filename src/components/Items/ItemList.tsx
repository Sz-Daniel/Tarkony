import {
  Accordion,
  AccordionSummary,
  Box,
  Pagination,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useEffect, useMemo, useState } from 'react';
import { itemBaseQuery } from '../../api/itemsQuery';
import { ItemDetailDisplay } from './ItemDetail';
import { SearchBar } from '../ui/SeachBar';
import type { ItemBaseResultType } from '../../api/types/Items/responseType';

type ItemListProps = {
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
};

export function ItemList({
  selectedCategory,
  setSelectedCategory,
}: ItemListProps) {
  const [expanded, setExpanded] = useState<string | false>(false);
  //paginator
  const [page, setPage] = useState(1);
  // Full item list that will be filtered in useEffect based on selectedCategory and searchedName
  const [showItem, setShowItem] = useState<ItemBaseResultType[]>([]);
  // setSearchedName is updated via SearchBar
  const [searchedName, setSearchedName] = useState<string>('');
  // itemDetails - accordionHandleChange
  const [selectedItem, setSelectedItem] = useState<string>('');

  // Retrieves cached data using useCategoryQuery()
  const queryClient = useQueryClient();
  const itemBaseListCache: ItemBaseResultType[] =
    queryClient.getQueryData([itemBaseQuery.name]) ?? [];

  // Filters the displayed item list by category and searchedName
  const filteredItems = useMemo(() => {
    let list = itemBaseListCache;
    if (selectedCategory.length) {
      list = list.filter((item) => selectedCategory.includes(item.category));
    }
    if (searchedName) {
      const lower = searchedName.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(lower));
    }
    return list;
  }, [itemBaseListCache, selectedCategory, searchedName]);

  useEffect(() => {
    setShowItem(filteredItems);
    setPage(1);
  }, [filteredItems]);

  //Accordion
  const accordionHandleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setSelectedItem(isExpanded ? panel : ''); // csak nyitáskor állítjuk be
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

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <SearchBar setSearchedName={setSearchedName} />
      </Box>
      {paginatedItems.map((item: ItemBaseResultType) => (
        <Accordion
          key={item.id}
          expanded={selectedItem === item.id}
          onChange={accordionHandleChange(item.id)}
        >
          {/* The TSX component using React.memo is located at the end of this file, wrapping AccordionSummary.*/}
          <ItemBaseDisplay item={item} />

          {/*The related TSX component for AccordionDetails can be found in ItemDetail.*/}
          {selectedItem === item.id && <ItemDetailDisplay itemId={item.id} />}
        </Accordion>
      ))}

      <Pagination
        count={Math.max(1, Math.ceil(showItem.length / itemsPerPage))}
        page={page}
        onChange={paginationHandleChange}
        sx={{ mt: 2 }}
      />
    </>
  );
}

/**
 * React.memo is applied here since props do not change frequently.
 * However, filtering and/or searching by name can trigger re-rendering.
 * ItemDetailDisplay itself does not require memoization.
 */
type ItemBaseDisplayProps = {
  item: ItemBaseResultType;
};
const ItemBaseDisplay = memo(({ item }: ItemBaseDisplayProps) => {
  const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          },
        }}
      >
        {/* ICON */}
        <Box sx={{ flex: 1, alignSelf: 'flex-start' }}>
          <Item>
            <img
              src={item.iconURL}
              alt={item.name}
              loading="lazy"
              style={{ maxWidth: '100%' }}
            />
          </Item>
        </Box>

        {/* NAME */}
        <Box sx={{ flex: 2 }}>
          <Item>
            <Typography variant="body1">{item.name}</Typography>
          </Item>
        </Box>

        {/* BEST SELLER PRICE*/}
        <Box sx={{ flex: 1, alignSelf: 'flex-end' }}>
          <Stack spacing={0}>
            <Item>Sell to: {item.bestSeller.place} </Item>
            <Item>
              {item.bestSeller.price?.toLocaleString()}
              {'Flea Market' === item.bestSeller.place ? (
                <Typography
                  component="span"
                  color={item.changePercent > 0 ? 'red' : 'green'}
                >
                  <sup>
                    {item.changePercent}% {item.changePrice.toLocaleString()}
                  </sup>
                </Typography>
              ) : (
                ''
              )}
            </Item>
          </Stack>
        </Box>
      </AccordionSummary>
    </>
  );
});
