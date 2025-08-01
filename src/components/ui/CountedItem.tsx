import { Box, Typography } from '@mui/material';
import type { ResponseCountedItem } from '../../api/types/ItemSingle/responseType';
import type { PriceDeal } from '../../api/types/Items/responseType';

type Props = {
  item: ResponseCountedItem;
  bestDeal?: PriceDeal | null;
};

/**
 * Facilitates item display and improves code readability.
 * @param item The item to display, including its name, quantity, icon, and ID.
 * @param bestDeal The pre-calculated best price and its associated vendor.
 */
export function CountedItem({ item, bestDeal }: Props) {
  return (
    <>
      {/* ICON */}
      <Box
        component="img"
        src={item.img}
        alt={item.name}
        sx={{
          mb: 1,
          mt: 3,
        }}
      />
      {/* NAME x QUANTITY*/}
      <Typography variant="body2" align="center">
        {`${item.name} x${item.count}`}
      </Typography>

      {bestDeal && (
        <>
          {item.count > 1 && (
            <Typography variant="body2" align="center">
              {`${Math.floor(
                (bestDeal?.price ?? 0) * item.count
              ).toLocaleString()} at ${bestDeal?.place}`}
            </Typography>
          )}
          <Typography align="center" color="text.secondary">
            {`Per item: ${bestDeal?.price?.toLocaleString()} at ${
              bestDeal?.place
            }`}
          </Typography>
        </>
      )}
    </>
  );
}
