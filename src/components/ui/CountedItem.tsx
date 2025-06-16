import { Box, Typography } from "@mui/material";
import type { ResponseCountedItem } from "../../types/ItemSingle/responseType";

/**
 * Helps to display the items and makes the code more readable 
 */

export function CountedItem({item}: {item: ResponseCountedItem}) {
    return(<>
        <Box >

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

        </Box>   
    </>)
}