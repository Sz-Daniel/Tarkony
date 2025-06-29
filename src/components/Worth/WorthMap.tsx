import { Box, Chip, CircularProgress, Paper, Typography } from '@mui/material';
import { useFetchIntoCache } from '../../api/graphQLClient';
import { ErrorOverlay } from '../ui/Status';
import { useEffect, useMemo, useState } from 'react';
import { SwitchOption } from './SwitchOption';
import type { WorthItemMetaQueryType } from '../../api/types/Worth/queryType';
import { worthItemMetaQuery } from '../../api/worthQuery';
import { Combination } from './Combination';

type Props = {
  selectedItem: string;
};
export function WorthMap({ selectedItem }: Props) {
  const [craftbarter, setCraftbarter] = useState(true);

  const { data, isSuccess, isLoading, isError, error } =
    useFetchIntoCache<WorthItemMetaQueryType>(worthItemMetaQuery(selectedItem));
  const item = isSuccess && data ? (data as WorthItemMetaQueryType) : null;

  return (
    <>
      {isError && <ErrorOverlay message={error.message} />}
      {isLoading && <CircularProgress />}

      {item && isSuccess && (
        <>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box
                component="img"
                src={item.inspectImageLink}
                alt={`${item.name}`}
                sx={{ flex: 1, mr: 2 }}
              />

              <Box sx={{ flex: 2, mb: 2 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.shortName}
                </Typography>
                <Chip label={`Weight: ${item.weight}kg`} sx={{ mt: 1 }} />
                <Chip
                  label={`Size: ${item.width}x${item.height}`}
                  sx={{ mt: 1 }}
                />
                <Chip
                  label={`Grid: ${item.hasGrid ? 'Yes' : 'No'}`}
                  sx={{ mt: 1 }}
                />
                <Box sx={{ m: 2 }}>
                  {item.categories.map((cat, idx) => (
                    <Chip key={idx} label={cat.name} sx={{ mt: 1 }} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
          Craft
          <SwitchOption
            craftbarter={craftbarter}
            setCraftbarter={setCraftbarter}
          />
          Barter
          {craftbarter ? (
            <Box>
              {/* BARTER */}
              <Typography variant="h6" gutterBottom>
                Barter
              </Typography>
            </Box>
          ) : (
            <Box>
              {/* CRAFTING */}
              <Typography variant="h6" gutterBottom>
                Crafting
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
}
/**
 * switch only render one type
 *
 * query BARTER + CRAFT
 *
 * Select one!
 *
 * Combination!
 *
 * CountedItem QUERY PRICE
 */
