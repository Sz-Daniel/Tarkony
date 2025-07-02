import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import { useFetchIntoCache } from '../../api/apiClient';
import type { WorthNameListQueryType } from '../../api/types/Worth/queryType';
import { worthNameListQuery } from '../../api/queries/worthQuery';
import { ErrorOverlay } from '../ui/Status';
import { useMemo, useState } from 'react';

type Props = {
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
};

export function ListSearchBar(props: Props) {
  const { setSelectedItem } = props;
  const [searched, setSearched] = useState('');

  const { data, isError, error, isSuccess, isLoading } =
    useFetchIntoCache<WorthNameListQueryType[]>(worthNameListQuery);

  const filtered = useMemo(() => {
    const lower = searched.trim().toLowerCase();
    if (!lower) return [];

    const regex = buildSearchRegex(lower);

    return data?.filter((item) => regex.test(item.name.toLowerCase())) ?? [];
  }, [searched, data]);

  return (
    <>
      {isError && <ErrorOverlay message={error.message} />}
      {isLoading && <CircularProgress />}

      {isSuccess && data && (
        <Box>
          <TextField
            id="ListSearchBar"
            label="Item name"
            variant="filled"
            onChange={(e) => {
              setTimeout(() => {
                setSearched(e.target.value);
              }, 1000);
            }}
          />

          {filtered?.length !== 0 && (
            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
              <List>
                {filtered?.map((filteredItem) => (
                  <ListItem key={filteredItem.id}>
                    <ListItemButton
                      onClick={() => setSelectedItem(filteredItem.id)}
                    >
                      <ListItemText primary={filteredItem.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>{' '}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

//
function buildSearchRegex(query: string) {
  const parts = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // escape speciális regex karaktereket

  const pattern = parts.join('.*?'); // a szavak közé tetszőleges karakterek jöhetnek

  return new RegExp(pattern, 'i'); // kis/nagybetűtől független keresés
}
