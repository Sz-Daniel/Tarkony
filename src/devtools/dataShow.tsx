import { useState } from "react";
import { useFetchintoState} from "../api/graphQLClient";
import type {  ItemsType, ShortItemType } from "../type";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { shortItemsListQuery, shortItemsListAdapter } from "../api/query";


export function DataShow() { 

  const[shortItemsList,setShortItemList] = useState<ItemsType<ShortItemType>[]>([])
  
  useFetchintoState<ItemsType<ShortItemType>[]>(
    shortItemsListQuery, 
    setShortItemList, 
    shortItemsListAdapter);
    console.log("shortItemsList", shortItemsList);

  return (
    <div>
        <h2>DataShow component</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {shortItemsList.map((item: any) => (
                <TableRow key={item.id}>
                    <TableCell sx={{ p: 0, width: 'auto' }}>
                      <img
                        src={item.iconURL}
                        alt={item.name}
                        loading="lazy"
                        style={{ width: 'auto', height: 'auto', maxWidth: '100%', display: 'block' }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>

                    {item.lowestPrice > item.traderPrice ? (
                      <TableCell>Best to sell: Flea {item.lowestPrice} </TableCell>
                      ) : (
                      <TableCell>Best to sell: {item.traderName} {item.traderPrice}</TableCell>
                      ) }
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        <p>Check console for the GraphQL response.</p>
    </div>
  );
}


/**
 *  First version:
 * 
   const [categoryList, setCategoryList] = useState<CategoryType[]>([])
    const [shortItemsList,setShortItemsList] = useState<ShortItemType[]>([])
    const shortItemIniResult = useQuery({
      queryKey: ['shortItemIni'],
      queryFn: () => fetchShortItems(),
      staleTime: 1000 * 60 * 60* 24, // daily
    });

    useEffect(()=>{
      if (shortItemIniResult.isLoading) console.log("shortItemIniResult Loading");
      if (shortItemIniResult.isError) console.log("shortItemIniResult Error");
      if (shortItemIniResult.isSuccess && shortItemIniResult.data) {
        console.log("shortItemIniResult", shortItemIniResult.data);
        setShortItemsList(shortItemIniResult.data);
      }
    },[shortItemsList]);

    const categoryIniResult = useQuery({
      queryKey: ['categoryIni'],
      queryFn: () => fetchCategoryList(),
      staleTime: 1000 * 60 * 60* 24, // daily
    });
  
    useEffect(()=>{
    if (categoryIniResult.isLoading) console.log("categoryIniResult Loading");
    if (categoryIniResult.isError) console.log("categoryIniResult Error");
    if (categoryIniResult.isSuccess && categoryIniResult.data) {
      console.log("categoryIniResult", categoryIniResult.data);     
    }
  },[categoryIniResult])
 */