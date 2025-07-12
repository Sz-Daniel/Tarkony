import {
  AccordionDetails,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';
import type {
  Craft,
  ItemDetailResultType,
} from '../../api/types/Items/responseType';
import { useItemDetailQuery } from '../../api/hooks/APICalls';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CustomTabPanel, TabsDisplay, useTabsLogic } from './Tabs';
import { Combination } from '../ui/Combination';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeletons/Skeleton';
import { ErrorOverlay } from '../ui/Status';

type Props = {
  itemId: string;
};

const ItemDetailDisplay = ({ itemId }: Props) => {
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  const { data, isSuccess, isLoading, isError, error } =
    useItemDetailQuery(itemId);
  const item = isSuccess && data ? (data as ItemDetailResultType) : null;

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
        <AccordionDetails>
          <Box>
            <TabsDisplay
              craft={craft}
              barter={barter}
              tasks={tasks}
              value={tabIndex}
              onChange={setTabIndex}
            />

            <CustomTabPanel value={tabIndex} index={0}>
              <Grid size={12}>
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
                            }: ${entry.price?.toLocaleString()} ${
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
                                          entry.playertoTraderRequirements
                                            .traderName
                                        }: ${entry.price?.toLocaleString()} ${
                              entry.priceCurrency
                            }
                                        `}
                            secondary={
                              entry.limit ||
                              entry.playertoTraderRequirements?.traderLevel
                                ? `${entry.limit ? `Limit: ${entry.limit}` : ''}
                                        ${
                                          entry.limit &&
                                          entry.playertoTraderRequirements
                                            ?.traderLevel
                                            ? ', '
                                            : ''
                                        }
                                        ${
                                          entry.playertoTraderRequirements
                                            ?.traderLevel
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
              </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={1}>
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
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
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={2}>
              <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
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
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={3}>
              <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Tasks
                </Typography>

                <Paper elevation={3}>
                  {item.taskNeed?.map((task, idx) => (
                    <Paper key={idx} sx={{ p: 2 }}>
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
                    <Paper key={idx} sx={{ p: 2 }}>
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
              </Box>
            </CustomTabPanel>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ flex: 2, alignSelf: 'flex-start' }}>
              <Link href={item.wiki} target="_blank" rel="noopener noreferrer">
                Wiki
              </Link>
            </Box>

            <Button
              sx={{ flex: 2, alignSelf: 'flex-start' }}
              onClick={() => {
                navigate(`/item/${item.normalizedName}`);
              }}
            >
              All data
            </Button>
          </Box>
        </AccordionDetails>
      )}
    </>
  );
};

export { ItemDetailDisplay };
