import { useParams } from "react-router-dom";
import { useSingleItemQuery } from "../hooks/APICalls";


type Params = {
    normalizeName: string 
}

export function ItemSingle() {

    const { normalizeName } = useParams<Params>();
    const temp = "colt-m4a1-556x45-assault-rifle";
    const {data}= useSingleItemQuery(temp)

    return(<>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    </>)
    }


/**
 * {item &&     
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
            <Item>
            {item.historicalPrices.map((hisPrice,idx)=>(
                <Box key={idx}>
                    <Typography>{hisPrice.timestamp} - {hisPrice.priceMin} - {hisPrice.price} - {hisPrice.offerCount}</Typography>
                </Box>
            ))}
            </Item>


        </div>
        }
 */