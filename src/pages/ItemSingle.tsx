import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Paper,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useSingleItemQuery } from '../api/hooks/APICalls';
import type { SingleItemResultType } from '../api/types/ItemSingle/responseType';
import { Combination } from '../components/ui/Combination';
import { ErrorOverlay } from '../components/ui/Status';

type Params = {
  normalizeName: string;
};

export function ItemSingle() {
  const { normalizeName = '' } = useParams<Params>();
  const { data, isSuccess, isLoading, isError, error } =
    useSingleItemQuery(normalizeName);
  const item = isSuccess && data ? (data as SingleItemResultType) : null;

  // This section validates the data:
  // For crafting and barter, if there are identical items in the input and output, only one instance should be shown.
  let craft;
  let barter;
  if (item !== null) {
    const craftInputSort = item.craftInput.filter(
      (input) => !item.craftOutput.some((output) => output.id === input.id)
    );
    craft = [...craftInputSort, ...item.craftOutput];
  }
  if (item !== null) {
    const barterInputSort = item.barterInput.filter(
      (input) => !item.barterOutput.some((output) => output.id === input.id)
    );
    barter = [...barterInputSort, ...item.barterOutput];
  }
  // Helper for component rendering in ternary expressions.
  const tasks =
    item !== null && (item.taskNeed.length > 0 || item.taskGive.length > 0)
      ? true
      : false;
  return (
    <>
      {isError && <ErrorOverlay message={error.message} />}
      {isLoading && <CircularProgress />}
      {item && (
        <Box sx={{ p: 4 }}>
          <Grid container>
            {/* First section - Pic, Meta Info*/}
            <Grid size={12}>
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
                        <Chip key={idx} label={cat} sx={{ mt: 1 }} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Flea info*/}
            {item.fleaPrice && (
              <Grid size={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Market Stats
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body2">Last Price:</Typography>
                      <Typography>{item.fleaPrice.lastLowPrice}₽</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">24h Avg:</Typography>
                      <Typography>{item.fleaPrice.avg24hPrice}₽</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">High (24h):</Typography>
                      <Typography>{item.fleaPrice.high24hPrice}₽</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">Low (24h):</Typography>
                      <Typography>{item.fleaPrice.low24hPrice}₽</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">Change (48h):</Typography>
                      <Typography>
                        {item.fleaPrice.changeLast48h} (
                        {item.fleaPrice.changeLast48hPercent}%)
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2">Offers:</Typography>
                      <Typography>{item.fleaPrice.lastOfferCount}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )}

            {/* Item stats */}
            {item.stats && (
              <Grid size={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Item Stats
                  </Typography>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Velocity</TableCell>
                        <TableCell>{item.stats.velocity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Recoil Modifier</TableCell>
                        <TableCell>{item.stats.recoilModifier}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Loudness</TableCell>
                        <TableCell>{item.stats.loudness}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Accuracy Modifier</TableCell>
                        <TableCell>{item.stats.accuracyModifier}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ergonomics Modifier</TableCell>
                        <TableCell>{item.stats.ergonomicsModifier}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            )}

            {/* Description */}
            <Grid size={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography> {item.id}</Typography>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                  <a
                    href={item.wikiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Wiki
                  </a>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mt: 2 }}
                >
                  Last updated: {item.updated}
                </Typography>
              </Paper>
            </Grid>

            {/* Trades info */}
            <Grid size={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'baseline'}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Sell To
                    </Typography>
                    <List dense>
                      {item.sellTo.map((entry, i) => (
                        <ListItem key={i}>
                          <ListItemText
                            primary={`${entry.traderName}: ${entry.price} ${entry.priceCurrency}`}
                            secondary={
                              entry.traderName === 'Flea Market'
                                ? `FIR: ${entry.fir ? 'Yes' : 'No'}`
                                : ''
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box sx={{ flex: 1 }}>
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
                              entry.limit ||
                              entry.playertoTraderRequirements?.traderLevel
                                ? `${entry.limit ? `Limit: ${entry.limit}` : ''}
                          ${
                            entry.limit &&
                            entry.playertoTraderRequirements?.traderLevel
                              ? ', '
                              : ''
                          }
                          ${
                            entry.playertoTraderRequirements?.traderLevel
                              ? `Trader lvl: ${entry.playertoTraderRequirements.traderLevel}`
                              : ''
                          }
                        `
                                : undefined
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Crafting section */}
            {craft && craft.length !== 0 && (
              <Grid size={12}>
                <Paper>
                  <Typography variant="h6" gutterBottom>
                    Crafting
                  </Typography>

                  {craft.map((craft, i) => (
                    <Combination key={i} props={{ ...craft, kind: 'Craft' }} />
                  ))}
                </Paper>
              </Grid>
            )}

            {/* Barter section */}
            {barter && barter.length !== 0 && (
              <Grid size={12}>
                <Paper>
                  <Typography variant="h6" gutterBottom>
                    Barter
                  </Typography>

                  {barter.map((barter, i) => (
                    <Combination
                      key={i}
                      props={{ ...barter, kind: 'Barter' }}
                    />
                  ))}
                </Paper>
              </Grid>
            )}

            {/* Quest section */}
            {tasks && (
              <Grid size={12}>
                <Paper>
                  <Typography variant="h6" gutterBottom>
                    Tasks
                  </Typography>

                  <Paper elevation={3}>
                    {item.taskNeed.map((task, idx) => (
                      <Paper key={idx} sx={{ p: 2 }}>
                        <Typography>{task.name}:</Typography>
                        {task.task.map((items) => (
                          <Typography sx={{ p: 1 }}>
                            {items.description} - {items.count} db {items.name}
                            <br />
                          </Typography>
                        ))}
                      </Paper>
                    ))}

                    {item.taskGive.map((task, idx) => (
                      <Paper key={idx} sx={{ p: 2 }}>
                        <Typography>{task.name}:</Typography>
                        {task.reward
                          .filter((filter) => filter.name === item.name)
                          .map((items) => (
                            <Typography sx={{ p: 1 }}>
                              Get: {items.count} db {items.name}
                              <br />
                            </Typography>
                          ))}
                      </Paper>
                    ))}
                  </Paper>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
