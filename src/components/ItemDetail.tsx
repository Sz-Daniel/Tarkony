
import { AccordionDetails, Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useFetchIntoCache } from "../api/graphQLClient"
import { itemDetailsQuery, itemDetailsQueryAdapter, TESTQuery } from "../api/query";
import { useEffect } from "react";
import type { ItemDetailPropsType } from "../types/type";
import type { ItemDetailQueryType } from "../types/queryType";
import type { ItemDetailResultType } from "../types/responseType";
import { MUIHover } from "./MUIHover";

export function ItemDetail({itemId}:ItemDetailPropsType) {

const { data, isSuccess, isLoading, status } = useFetchIntoCache<ItemDetailQueryType[],ItemDetailResultType[]>(itemDetailsQuery(itemId),itemDetailsQueryAdapter);

useEffect(()=>{
    console.log("details",data, status)
},[isSuccess, data]);

const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;
    return(
    <>
        {isLoading && <Typography>Isloading</Typography>}
        {item && 
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell>{item.id}</TableCell>
                            <TableCell><Link href={item.wiki}>Wiki</Link></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>sellFor</Typography></TableCell>
                            {item.sellOffer.map((trader,idx)=>(
                            <TableCell key={idx}>{trader.vendor} - {trader.price}</TableCell>   
                            ))}             
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>buyFor</Typography></TableCell>
                            {item.buyOffer.map((trader,idx)=>(
                            <TableCell key={idx}>{trader.vendor} - {trader.price}</TableCell>   
                            ))}
                        </TableRow>
                        <TableRow>
                           <TableCell><Typography>bartersFor</Typography></TableCell>
                            {item.bartersNeeds.map((bartel,idx)=>( 
                                <TableCell key={idx}>Count:{bartel.count}  name:{bartel.name} 
                                <img src={bartel.icon} alt={bartel.name} loading="lazy" style={{ maxWidth: '100%' }} /></TableCell>     
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>bartersUsing</Typography></TableCell>
                           {item.bartersGive.map((bartel,idx)=>( 
                                <TableCell key={idx}>Count:{bartel.count}  name:{bartel.name} 
                                <img src={bartel.icon} alt={bartel.name} loading="lazy" style={{ maxWidth: '100%' }} /></TableCell>     
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>craftsFor</Typography></TableCell>
                           {item.craftsNeeds.map((craft,idx)=>( 
                                <TableCell key={idx}>Count:{craft.count}  name:{craft.name} 
                                <img src={craft.icon} alt={craft.name} loading="lazy" style={{ maxWidth: '100%' }} /></TableCell>     
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>craftsUsing</Typography></TableCell>
                           {item.craftsGive.map((craft,idx)=>( 
                                <TableCell key={idx}>Count:{craft.count}  name:{craft.name} 
                                <img src={craft.icon} alt={craft.name} loading="lazy" style={{ maxWidth: '100%' }} /></TableCell>     
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography>tasksRewards</Typography></TableCell>
                           {item.tasksRewards.map((task,idx)=>( 
                                <TableCell key={idx}>Count:{task.count}  name:{task.name}</TableCell>     
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell><Typography></Typography></TableCell>
                            <TableCell>
                                <MUIHover title={`Output items number:${item.craftsGive.length}`}>
                                {item.craftsGive.map((craft,idx)=>( 
                                    <TableCell key={idx}><img src={craft.icon} alt={craft.name} loading="lazy" style={{ maxWidth: '100%' }} /></TableCell>     
                                ))}   
                                </MUIHover>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        }
    </>
    )
}