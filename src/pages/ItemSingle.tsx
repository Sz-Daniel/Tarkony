import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { Item } from "../components/Items/ItemDetail";
import { useSingleItemQuery } from "../hooks/APICalls";
import type { SingleItemResultType } from "../types/ItemSingle/responseType";

type Params = {
    normalizeName: string 
}

export function ItemSingle() {

    const { normalizeName = "" } = useParams<Params>();
    const { data, isSuccess, isLoading, isError, error}= useSingleItemQuery(normalizeName)
    const item = isSuccess && data ? data as SingleItemResultType : null;
    return(<>
        {isError && error.message}
        {isLoading && <CircularProgress />}
        {item &&     
        <div>
            <Item>
                <Typography>id: {item.id}</Typography>
            </Item>
            <Item>
                <Typography>{item.name} short :{item?.shortName}</Typography>
            </Item>
            <Item>
                <Typography>Last Lowest Price: {item.lastLowPrice}</Typography>
            </Item>
            <Item>
                <Typography>24h: Low {item.low24hPrice} - avg: {item.avg24hPrice} - highest: {item.high24hPrice}</Typography>
            </Item>
            <Item>
                <Typography>48h change: {item.changeLast48h} <sub>{item.changeLast48hPercent}</sub></Typography>
            </Item>
            <Item>
                <Typography>Grid: {item.width}x{item.weight} Grid? {item.hasGrid}</Typography>
            </Item>
            <Item>
                <Typography>img big: {item.inspectImageLink}</Typography>
            </Item>
            <Item>
                <Typography>img icon: {item.gridImageLink} color:  {item.backgroundColor}</Typography>
            </Item>
            <Item>
                <Typography>desc: {item.description}</Typography>
            </Item>
            <Item>
                <Typography>wiki: {item.wikiLink}</Typography>
            </Item>

            <Item>
                <Typography>Stats 
                    height: {item.height} 
                    velocity:{item.velocity}  
                    recoilModifier{item.recoilModifier}    
                    loudness{item.loudness}    
                    accuracyModifier{item.accuracyModifier}
                    ergonomicsModifier{item.ergonomicsModifier}
                </Typography>
            </Item>

            <Item>Updated: {item.updated}</Item>

           <Item>
            {item.sellTo.map((sell,idx)=>(
                <Typography key={idx}> {sell.vendor}: {sell.price} {sell.currency} {sell.currency !=="RUB" ? sell.priceRub + " RUB" : ""} </Typography>
            ))}
            </Item>

        </div>
        }

    </>)
    
    }



 
     
