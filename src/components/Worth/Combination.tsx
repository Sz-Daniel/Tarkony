import { Box, List, Paper, Typography } from '@mui/material';
import type {
  Barter,
  Craft,
  ResponseCountedItem,
} from '../../api/types/ItemSingle/responseType';
import { CountedItem } from './CountedItem';
import { useQueryClient } from '@tanstack/react-query';
import type { ItemBaseResultType } from '../../api/types/Items/responseType';
import { itemBaseQuery } from '../../api/queries/itemsQuery';

/**
 * Utilizes type discrimination to create a template compatible with both types.
 * CountedItem component renders items stacked vertically.
 */

type CombinationCraft = Craft & {
  kind: 'Craft';
};
type CombinationBarter = Barter & {
  kind: 'Barter';
};
type Props = { props: CombinationBarter | CombinationCraft };

export function Combination({ props }: Props) {
  const queryClient = useQueryClient();
  const itemBaseListCache: ItemBaseResultType[] =
    queryClient.getQueryData([itemBaseQuery.name]) ?? [];

  // Find the best purchase price
  const getBestPrice = (itemId: string, sell: boolean = false) => {
    const found = itemBaseListCache.find((entry) => entry.id === itemId);
    if (!sell) {
      return found?.bestBuy?.sort((a, b) => a.price! - b.price!)[0];
    } else {
      return found?.bestSeller;
    }
  };

  // This price summarizes the total complete cost
  let buyout: number | null = 0;

  // Prepare the input section before rendering to minimize calculations during render
  const inputElemts = props.inputItems.map((inItem: ResponseCountedItem, j) => {
    const bestDeal = getBestPrice(inItem.id);
    if (bestDeal?.price && typeof buyout === 'number') {
      buyout = buyout + bestDeal?.price * inItem.count;
    } else {
      buyout = null;
    }
    return <CountedItem key={j} item={inItem} bestDeal={bestDeal} />;
  });

  // Determine the item's value
  const buyoutPerItem = Math.floor(
    buyout /
      props.outputItems.reduce(
        (quantity, item) => (quantity = quantity + item.count),
        0
      )
  );

  // Prepare the input section before rendering
  const outputElements = props.outputItems.map(
    (outItems: ResponseCountedItem, j) => {
      const bestDeal = getBestPrice(outItems.id, true);
      return <CountedItem key={j} item={outItems} bestDeal={bestDeal} />;
    }
  );

  return (
    <>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          sx={{ mb: 2 }}
        >
          <Box sx={{ flex: 1, m: 2 }}>
            <Box>{inputElemts}</Box>
          </Box>

          {props.kind === 'Craft' && (
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src={props.stationRequirement.stationIcon}
                alt={props.stationRequirement.stationName}
                sx={{ flex: 1, mr: 2 }}
              />
              <Typography variant="body2">
                {Math.floor(props.duration / 60)} mins
              </Typography>
              <Typography variant="body2">
                {props.stationRequirement.stationName} (Lvl{' '}
                {props.stationRequirement.level})
              </Typography>
              {props.questRequirement.name && (
                <Typography variant="body2">
                  Quest: {props.questRequirement.name} (Lvl{' '}
                  {props.questRequirement.level})
                </Typography>
              )}
            </Box>
          )}

          {props.kind === 'Barter' && (
            <Box sx={{ flex: 1 }}>
              <Box
                component="img"
                src={props.playertoTraderRequirements.traderIcon}
                alt={props.playertoTraderRequirements.traderName}
                sx={{ flex: 1, mr: 2 }}
              />
              <Typography variant="body2">
                {props.playertoTraderRequirements.traderName}{' '}
                {props.playertoTraderRequirements.traderLevel} LVL
              </Typography>
              {props.questRequirement.name && (
                <Typography variant="body2">
                  Quest: {props.questRequirement.name} (Lvl{' '}
                  {props.questRequirement.level})
                </Typography>
              )}
            </Box>
          )}

          <Box sx={{ flex: 1 }}>
            <List dense>{outputElements}</List>
          </Box>
        </Box>
        {buyout && (
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            sx={{ mb: 2 }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography gutterBottom>
                {' '}
                Buyout Prices:
                <br /> {buyout.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ flex: 1 }}>
              {buyout && (
                <Typography gutterBottom>
                  {' '}
                  Value Per Item:
                  <br /> {buyoutPerItem.toLocaleString()}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
}
