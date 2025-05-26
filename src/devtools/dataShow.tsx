import { useEffect, useState } from "react";
import { useFetchIntoCache} from "../api/graphQLClient";
import type {  CategoryMapType, ShortItemType } from "../type";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { shortItemsListQuery, shortItemsListAdapter, categoriesQuery } from "../api/query";
import { useQueryClient } from "@tanstack/react-query";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Next:
// Item details: Barter, Task, craft needs show - noumber -> Icons only show as hover
// Searchbar - works same as category
// Daily price update
// Routing - "All detail" single item page

export function DataShow() { 
  //const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showItem,setShowItem] = useState<ShortItemType[]>([]);
  const [selectedCategory, setSelectedCategory]= useState<string>('')
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetching the items list, and categories
  const queryClient = useQueryClient();

  useFetchIntoCache(shortItemsListQuery,shortItemsListAdapter);
  const shortItemsListCache: ShortItemType[] = queryClient.getQueryData([shortItemsListQuery.name])?? [];

  useFetchIntoCache(categoriesQuery)
  const categoriesCache: CategoryMapType[] = queryClient.getQueryData([categoriesQuery.name])?? [];
 
  //using the cache set the categories instand of State everything
  //I know the console is flooded - needs to be optimalised 
  // but later, now it's works hurray!
  useEffect(()=>{
    console.log("categoriesCache",categoriesCache)
  },[categoriesCache])

  //showItem contains always just those items what a user need
  useEffect(() => {
    if (selectedCategory === "") {
      setShowItem(shortItemsListCache);
    } else {
      setShowItem(
        shortItemsListCache.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, shortItemsListCache]);

 // Pageinated 
  const handleChange = (_: any, value: number) => {
    setPage(value);
  };

  const paginatedItems = showItem.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
  <>
    <select onChange={(e) =>setSelectedCategory(e.target.value)}>
      <option value="">-- Select Category --</option>
      {categoriesCache?.sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
        <option key={cat.id} value={cat.normalizedName}>
          {cat.name}
        </option>
      ))}
    </select>

    {paginatedItems.map((item: any) => (
      <Accordion key={item.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 2 }}>
              <img src={item.iconURL} alt={item.name} loading="lazy" style={{ maxWidth: '100%' }} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body1">{item.name}</Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography variant="body2">
                Sell to:
                <strong>
                  {item.lowestPrice > item.traderPrice
                    ? ` Flea (${item.lowestPrice}₽)`
                    : ` ${item.traderName} (${item.traderPrice}₽)`}
                </strong>
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Last price</TableCell>
                  <TableCell>{item.lastPrice}₽</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lowest price ever</TableCell>
                  <TableCell>{item.lowestPrice}₽</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Vendor</TableCell>
                  <TableCell>{item.traderName} ({item.traderPrice})</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Difference %</TableCell>
                  <TableCell>{item.diffPrice * 100}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Link href={`${item.wiki}`}>Wiki</Link></TableCell>
                  <TableCell>All detail</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    ))}

    <Pagination
      count={Math.ceil(showItem.length / itemsPerPage)}
      page={page}
      onChange={handleChange}
      sx={{ mt: 2 }}
    />
  </>
  );
}