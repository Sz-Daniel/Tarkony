import { AccordionDetails, Box, Button, CircularProgress, Link, Typography } from "@mui/material"
import {  useEffect } from "react";
import { MUIHover } from "../ui/MUIHover";
import { styled } from "@mui/system";
import type { ItemDetailPropsType } from "../../types/type";
import type { ItemDetailResultType } from "../../types/Items/responseType";
import { useItemDetailQuery } from "../../hooks/APICalls";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";

export const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
}));


export function ItemDetail({itemId}:ItemDetailPropsType) {

    const navigate = useNavigate();

    const { data, isSuccess, isLoading } = useItemDetailQuery(itemId);
    const item = isSuccess && data && data.length > 0 ? data[0] as ItemDetailResultType : null;
   
    return(
    <>
        {isLoading && <CircularProgress />}
        {item && 

        <AccordionDetails >
            <Box sx={{ display: 'flex', gap: 1}}>
                <Box sx={{ flex: 1, alignSelf: 'flex-start'}}>
                    <Typography> Trader: </Typography>
                </Box>                
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Can be sold: ${item.sellOffer.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.sellOffer.map((trader, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <Typography>{trader.vendor}</Typography>
                                <Typography>{trader.price}</Typography>
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>

                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Offer: ${item.buyOffer.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.buyOffer.map((trader, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <Typography>{trader.vendor}</Typography>
                                <Typography>{trader.price}</Typography>
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1}}>
                    <Typography> Barter: </Typography>
                </Box>   
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Needs for the offer: ${item.bartersNeeds.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.bartersNeeds.map((barter, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <img
                                src={barter.icon}
                                alt={barter.name}
                                loading="lazy"
                                style={{ maxWidth: '100%' }}
                                />
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>

                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Offer gives: ${item.bartersGive.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.bartersGive.map((barter, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <img
                                src={barter.icon}
                                alt={barter.name}
                                loading="lazy"
                                style={{ maxWidth: '100%' }}
                                />
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>

            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>

                <Box sx={{ flex: 1}}>
                    <Typography> Crafting:  </Typography>
                </Box>   
                
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Needs for the craft: ${item.craftsNeeds.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.craftsNeeds.map((craft, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <img
                                src={craft.icon}
                                alt={craft.name}
                                loading="lazy"
                                style={{ maxWidth: '100%' }}
                                />
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Crafting gives: ${item.craftsGive.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.craftsGive.map((craft, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <img
                                src={craft.icon}
                                alt={craft.name}
                                loading="lazy"
                                style={{ maxWidth: '100%' }}
                                />
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1}}>
                    <Typography> Task: </Typography>
                </Box>   
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Task need: ${item.tasksRewards.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.tasksRewards.map((task, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                             <Typography>{task.name}</Typography>
                      
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>
                <Box sx={{ flex: 1}}>
                    <MUIHover title={`Task gives: ${item.craftsGive.length}`}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {item.craftsGive.map((craft, idx) => (
                            <Item key={idx} sx={{ flex: 1 }}>
                                <img
                                src={craft.icon}
                                alt={craft.name}
                                loading="lazy"
                                style={{ maxWidth: '100%' }}
                                />
                            </Item>
                            ))}
                        </Box>
                    </MUIHover>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1}}>
                
                <Box sx={{ flex: 2, alignSelf: 'flex-start'}}>
                    <Link href={item.wiki}>Wiki</Link>
                </Box>

                    <Button sx={{ flex: 2, alignSelf: 'flex-start'}}
                    onClick={()=>{navigate(`/items/${item.normalizedName}`)}}
                    >
                        <Typography>All data</Typography>
                    </Button>   

            </Box>
            </AccordionDetails>
        }
    </>
    )
}