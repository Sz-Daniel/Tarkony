import { Box, TextField } from "@mui/material";

export function SearchBar({ setSearchedName }: { setSearchedName: React.Dispatch<React.SetStateAction<string>> }) {
    
    return(
        <>
            <Box>
                <TextField id="searchBar" label="Item name" variant="filled" onChange={(e)=>{
                    setTimeout(()=>{
                        setSearchedName(e.target.value)
                    },1000);
                }}/>
            </Box>
        </>
    )
}