import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Button,
} from '@mui/material';
import { useSingleItemQuery } from '../api/hooks/APICalls';
import type {
  FleaPrice,
  SingleItemResultType,
  Stats,
} from '../api/types/ItemSingle/responseType';
import { Combination } from '../components/ui/Combination';
import { ErrorOverlay } from '../components/ui/Status';
import { useMemo } from 'react';
import { useTabsLogic } from '../components/Items/Tabs';
import { Skeleton } from '../components/ui/skeletons/Skeleton';

type Params = {
  normalizeName: string;
};

export function ItemSingle() {
  const navigate = useNavigate();

  const { normalizeName = '' } = useParams<Params>();
  const { data, isSuccess, isLoading, isError, error } =
    useSingleItemQuery(normalizeName);
  const item = isSuccess && data ? (data as SingleItemResultType) : null;

  // This section validates the data:
  // For crafting and barter, if there are identical items in the input and output, only one instance should be shown.
  {
    isError && <ErrorOverlay message={error.message} />;
  }
  {
    isLoading && <Skeleton component="ItemDetail" />;
  }

  const { craft, barter, tasks } = useTabsLogic({
    craftInput: item?.craftInput ?? [],
    craftOutput: item?.craftOutput ?? [],
    barterInput: item?.barterInput ?? [],
    barterOutput: item?.barterOutput ?? [],
    taskNeed: item?.taskNeed ?? [],
    taskGive: item?.taskGive ?? [],
  });

  return (
    <>
      {item && (
        <Box sx={{ p: 4 }}>
          <Box sx={{ p: 2 }}>
            <Button
              sx={{ flex: 2, alignSelf: 'flex-start' }}
              onClick={() => {
                navigate('/');
              }}
            >
              Back
            </Button>
          </Box>
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
            {item.fleaPrice && <FleaInfoComponent flea={item.fleaPrice} />}

            {/* Item stats */}
            {item.stats && <StatsComponent stats={item.stats} />}

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
                    Wiki
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
                            primary={`${
                              entry.traderName
                            }: ${entry.price.toLocaleString()} ${
                              entry.priceCurrency
                            }`}
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
                          ${
                            entry.playertoTraderRequirements.traderName
                          }: ${entry.price.toLocaleString()} ${
                              entry.priceCurrency
                            }
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
                <Paper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Crafting
                  </Typography>

                  {craft !== null &&
                    craft
                      .filter(
                        (c) =>
                          c.stationRequirement !== null &&
                          c.questRequirement !== null
                      )
                      .map((craft, i) => {
                        return (
                          <Combination
                            key={i}
                            props={{
                              ...craft,
                              kind: 'Craft',
                              stationRequirement: craft.stationRequirement!,
                              questRequirement: craft.questRequirement!,
                            }}
                          />
                        );
                      })}
                </Paper>
              </Grid>
            )}

            {/* Barter section */}
            {barter && barter.length !== 0 && (
              <Grid size={12}>
                <Paper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Barter
                  </Typography>

                  {barter &&
                    barter.map((barter, i) => (
                      <Combination
                        key={i}
                        props={{
                          ...barter,
                          kind: 'Barter',
                          questRequirement: barter.questRequirement!,
                        }}
                      />
                    ))}
                </Paper>
              </Grid>
            )}

            {/* Quest section */}
            {tasks && (
              <Grid size={12}>
                <Paper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Tasks
                  </Typography>

                  {item.taskNeed?.map((task, idx) => (
                    <Paper key={idx} sx={{ p: 2 }} elevation={3}>
                      <Typography>{task.name}:</Typography>
                      {task.task &&
                        task.task.map((items, idx) => (
                          <Typography key={idx} sx={{ p: 1 }}>
                            {items.description} - {items.count} db {items.name}
                            <br />
                          </Typography>
                        ))}
                    </Paper>
                  ))}

                  {item.taskGive?.map((task, idx) => (
                    <Paper key={idx} sx={{ p: 2 }} elevation={3}>
                      <Typography>{task.name}:</Typography>
                      {task.reward &&
                        task.reward.map((items, idx) => (
                          <Typography key={idx} sx={{ p: 1 }}>
                            Get: {items.count} db {items.name}
                            <br />
                          </Typography>
                        ))}
                    </Paper>
                  ))}
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
type FleaInfoComponentProps = {
  flea: FleaPrice;
};
const FleaInfoComponent = ({ flea }: FleaInfoComponentProps) => {
  return (
    <Grid size={12}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Market Stats
        </Typography>

        <Grid container spacing={2}>
          {!!flea.lastLowPrice && (
            <Grid size={6}>
              <Typography variant="body2">Last Price:</Typography>
              <Typography>{flea.lastLowPrice.toLocaleString()}₽</Typography>
            </Grid>
          )}

          {!!flea.avg24hPrice && (
            <Grid size={6}>
              <Typography variant="body2">24h Avg:</Typography>
              <Typography>{flea.avg24hPrice.toLocaleString()}₽</Typography>
            </Grid>
          )}

          {!!flea.high24hPrice && (
            <Grid size={6}>
              <Typography variant="body2">High (24h):</Typography>
              <Typography>{flea.high24hPrice.toLocaleString()}₽</Typography>
            </Grid>
          )}

          {!!flea.low24hPrice && (
            <Grid size={6}>
              <Typography variant="body2">Low (24h):</Typography>
              <Typography>{flea.low24hPrice.toLocaleString()}₽</Typography>
            </Grid>
          )}

          {!!flea.changeLast48h && flea.changeLast48h > 0 && (
            <Grid size={6}>
              <Typography variant="body2">Change (48h):</Typography>
              <Typography>
                {flea.changeLast48h.toLocaleString()} (
                {flea.changeLast48hPercent}%)
              </Typography>
            </Grid>
          )}

          {!!flea.lastOfferCount && (
            <Grid size={6}>
              <Typography variant="body2">Offers:</Typography>
              <Typography>{flea.lastOfferCount}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

type StatsComponentProps = {
  stats: Stats;
};
const StatsComponent = ({ stats }: StatsComponentProps) => {
  return (
    <Grid size={12}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Item Stats
        </Typography>
        <Table size="small">
          <TableBody>
            {!!stats.velocity && stats.velocity > 0 && (
              <TableRow>
                <TableCell>Velocity</TableCell>
                <TableCell>{stats.velocity}</TableCell>
              </TableRow>
            )}
            {!!stats.recoilModifier && stats.recoilModifier > 0 && (
              <TableRow>
                <TableCell>Recoil Modifier</TableCell>
                <TableCell>{stats.recoilModifier}</TableCell>
              </TableRow>
            )}
            {!!stats.loudness && stats.loudness > 0 && (
              <TableRow>
                <TableCell>Loudness</TableCell>
                <TableCell>{stats.loudness}</TableCell>
              </TableRow>
            )}
            {!!stats.accuracyModifier && stats.accuracyModifier > 0 && (
              <TableRow>
                <TableCell>Accuracy Modifier</TableCell>
                <TableCell>{stats.accuracyModifier}</TableCell>
              </TableRow>
            )}
            {!!stats.ergonomicsModifier && stats.ergonomicsModifier > 0 && (
              <TableRow>
                <TableCell>Ergonomics Modifier</TableCell>
                <TableCell>{stats.ergonomicsModifier}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
};
