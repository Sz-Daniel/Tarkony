import { Box, Typography } from "@mui/material";
import type { ResponseCountedItem } from "../../api/types/ItemSingle/responseType";
import { useQueryClient } from "@tanstack/react-query";
import type { ItemBaseResultType, PriceDeal } from "../../api/types/Items/responseType";
import { itemBaseQuery } from "../../api/itemsQuery";

type Props ={
    item: ResponseCountedItem, 
    bestDeal?: PriceDeal,
}

/**
 * Helps to display the items and makes the code more readable 
 */

export function CountedItem({item, bestDeal }: Props) {
    return(<>
        
        <Box
            component="img"
            src={item.img}
            alt={item.name}
            sx={{

            mb: 1, mt: 3
        }}
        />
        <Typography variant="body2" align="center">
        {`${item.name} x${item.count}`}
        </Typography>

    {bestDeal && 
        (<>
        {item.count>1 &&
        <Typography variant="body2" align="center">
            {`${Math.floor((bestDeal?.price ?? 0 ) * item.count)} at ${bestDeal?.place}`}
        </Typography>

        }
        <Typography variant="body2" align="center">
            {`Per item: ${bestDeal?.price} at ${bestDeal?.place}`}
        </Typography>

        </>)}
    </>)
}
