import { Box, List, Paper, Typography } from "@mui/material";
import type { Barter, Craft, ResponseCountedItem } from "../../types/ItemSingle/responseType";
import { CountedItem } from "./CountedItem";

/**
 * Using type discrimination so I could make template for both of them
 * Counted Item it generate the items under each other
 */

type CombinationCraft = Craft & {
    kind: "Craft"
}
type CombinationBarter = Barter & {
    kind: "Barter"
}
type Props = {props: CombinationBarter | CombinationCraft } 

export function Combination({ props } : Props) {
    return(<>

    <Paper elevation={3} sx={{ p:2 }}>

        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} sx={{ mb: 2 }}>

            <Box sx={{flex: 1, m: 2}}>
                <Box>
                {props.inputItems.map((inItem: ResponseCountedItem, j) => (
                    <CountedItem key={j} item={inItem}/>
                ))}
                </Box>
            </Box>


            { props.kind === "Craft" &&  
                ( <Box sx={{flex: 1}}> 
                    <Box component="img"   
                        src={props.stationRequirement.stationIcon} 
                        alt={props.stationRequirement.stationName} 
                        sx={{ flex: 1, mr: 2 }}
                    />
                    <Typography variant="body2">{props.duration/60} mins</Typography>
                    <Typography variant="body2">{props.stationRequirement.stationName} (Lvl {props.stationRequirement.level})</Typography>
                    {props.questRequirement.name && <Typography variant="body2">Quest: {props.questRequirement.name} (Lvl {props.questRequirement.level})</Typography> }
                </Box>)
            }

            { props.kind === "Barter" &&  
                ( <Box sx={{flex: 1}}> 
                    <Box component="img"   
                    src={props.playertoTraderRequirements.traderIcon} 
                    alt={props.playertoTraderRequirements.traderName} 
                    sx={{ flex: 1, mr: 2 }}
                    />
                    <Typography variant="body2">{props.playertoTraderRequirements.traderName} {props.playertoTraderRequirements.traderLevel} LVL</Typography>
                    {props.questRequirement.name && <Typography variant="body2">Quest: {props.questRequirement.name} (Lvl {props.questRequirement.level})</Typography> }
                </Box>)
            }

            <Box sx={{flex: 1}}>
                <List dense>
                    {props.outputItems.map((outItem: ResponseCountedItem, j) => (
                    <CountedItem key={j} item={outItem}/>
                    ))}
                </List>
            </Box>

        </Box>
    </Paper> 
    </>)
}