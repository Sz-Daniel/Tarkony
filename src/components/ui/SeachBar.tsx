import { Box, TextField } from '@mui/material';

type Props = {
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
};
export function SearchBar({ setSearchedName }: Props) {
  return (
    <>
      <Box>
        <TextField
          id="searchBar"
          label="Item name"
          variant="filled"
          onChange={(e) => {
            setTimeout(() => {
              setSearchedName(e.target.value);
            }, 1000);
          }}
        />
      </Box>
    </>
  );
}
