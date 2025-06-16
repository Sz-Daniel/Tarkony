import { AccordionDetails, Box, Button, CircularProgress, Link, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { Grid, styled } from "@mui/system";
import type { ItemDetailPropsType } from "../../types/type";
import type { ItemDetailResultType } from "../../types/Items/responseType";
import { useItemDetailQuery } from "../../hooks/APICalls";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { a11yProps, CustomTabPanel } from "../ui/Tabs";
import { Combination } from "../ui/Combination";
import { useState } from "react";

export const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));


export function ItemDetail({itemId}:ItemDetailPropsType) {

    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    const tabsHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { data, isSuccess, isLoading } = useItemDetailQuery(itemId);
    const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;

    let craft
    let barter
    if (item !== null) {
      const craftInputSort = item.craftInput.filter(
        (input) => !item.craftOutput.some((output) => output.id === input.id)
      );
      craft = [...craftInputSort, ...item.craftOutput]
    }
        if (item !== null) {
      const barterInputSort = item.barterInput.filter(
        (input) => !item.barterOutput.some((output) => output.id === input.id)
      );
      barter = [...barterInputSort, ...item.barterOutput]
    }
   
    return(
    <>
        {isLoading && <CircularProgress />}
        {item && 

        <AccordionDetails>

            <Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={tabsHandleChange} aria-label="basic tabs example">
                    <Tab label="Trader" {...a11yProps(0)} />
                    <Tab label="Craft" {...a11yProps(1)} />
                    <Tab label="Barter" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Grid size={12}>
                    
                        <Box display={"flex"} flexDirection={"row"} alignItems={"baseline"}>

                            <Box sx={{flex: 1}}>
                                <Typography variant="h6" gutterBottom>
                                Sell To
                                </Typography>
                                <List dense>
                                {item.sellTo.map((entry, i) => (
                                    <ListItem key={i}>
                                    <ListItemText
                                    primary={`${entry.traderName}: ${entry.price} ${entry.priceCurrency}`}
                                    secondary={entry.traderName === "Flea Market" ? `FIR: ${entry.fir ? "Yes" : "No"}`: ""}
                                    />
                                    </ListItem>
                                ))}
                                </List>
                            </Box>

                            <Box sx={{ flex: 1}}>
                                <Typography variant="h6" gutterBottom>
                                Buy From
                                </Typography>
                                <List dense>
                                {item.buyFrom.map((entry, i) => (
                                    <ListItem key={i}>
                                    <ListItemText
                                        primary={`
                                        ${entry.playertoTraderRequirements.traderName}: ${entry.price} ${entry.priceCurrency}
                                        `}
                                        secondary={
                                        (entry.limit || entry.playertoTraderRequirements?.traderLevel) 
                                        ? `${entry.limit ? `Limit: ${entry.limit}` : ''}
                                        ${entry.limit && entry.playertoTraderRequirements?.traderLevel ? ', ' : ''}
                                        ${entry.playertoTraderRequirements?.traderLevel ? `Trader lvl: ${entry.playertoTraderRequirements.traderLevel}` : ''}
                                        `: undefined
                                        }
                                    />
                                    </ListItem>
                                ))}
                                </List> 
                            </Box>

                        </Box>
                   
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box sx={{maxHeight:400, overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                        Crafting
                        </Typography>

                        {craft && craft.map((craft, i) => (
                            <Combination key={i} props={{ ...craft, kind: "Craft" }}/>
                        ))}
                    </Box>      
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                     <Box sx={{maxHeight:500, overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                        Barter
                        </Typography>


                        {barter && barter.map((barter, i) => (
                            <Combination key={i} props={{ ...barter, kind: "Barter" }}/>
                        ))}
                    </Box>
                </CustomTabPanel>
            </Box>
            <Box sx={{ display: 'flex', gap: 1}}>

                <Box sx={{ flex: 2, alignSelf: 'flex-start'}}>
                    <Link href={item.wiki}>Wiki</Link>
                </Box>

                <Button sx={{ flex: 2, alignSelf: 'flex-start'}}
                    onClick={()=>{navigate(`/item/${item.normalizedName}`)}}
                    >
                    <Typography>All data</Typography>
                </Button>   

            </Box>
            </AccordionDetails>
        }
    </>
    )
}
