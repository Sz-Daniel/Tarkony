import {
  AccordionDetails,
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';
import type { ItemDetailResultType } from '../../api/types/Items/responseType';
import { useItemDetailQuery } from '../../api/hooks/APICalls';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { a11yProps, CustomTabPanel } from '../ui/Tabs';
import { Combination } from '../ui/Combination';
import { useState } from 'react';
import { Skeleton } from '../ui/skeletons/Skeleton';
import { ErrorOverlay } from '../ui/Status';

type Props = {
  itemId: string;
};

const ItemDetailDisplay = ({ itemId }: Props) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const tabsHandleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data, isSuccess, isLoading, isError, error } =
    useItemDetailQuery(itemId);
  const item = isSuccess && data ? (data as ItemDetailResultType) : null;

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
  const tasks = () => {
    if (item?.taskGive.length === 0 && item?.taskNeed.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {isError && <ErrorOverlay message={error.message} />}
      {isLoading && <Skeleton component="ItemDetail" />}
      {item && (
        <AccordionDetails>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={tabsHandleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Trader" {...a11yProps(0)} />
                <Tab
                  label="Craft"
                  {...a11yProps(1)}
                  sx={{
                    display: craft && craft.length === 0 ? 'none' : 'block',
                  }}
                />
                <Tab
                  label="Barter"
                  {...a11yProps(2)}
                  sx={{
                    display: barter && barter.length === 0 ? 'none' : 'block',
                  }}
                />
                <Tab
                  label="Tasks"
                  {...a11yProps(3)}
                  sx={{ display: tasks() ? 'none' : 'block' }}
                />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
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

            <CustomTabPanel value={value} index={1}>
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Crafting
                </Typography>

                {craft &&
                  craft.map((craft, i) => {
                    return (
                      <Combination
                        key={i}
                        props={{ ...craft, kind: 'Craft' }}
                      />
                    );
                  })}
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Barter
                </Typography>

                {barter &&
                  barter.map((barter, i) => (
                    <Combination
                      key={i}
                      props={{ ...barter, kind: 'Barter' }}
                    />
                  ))}
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
              <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Tasks
                </Typography>

                <Paper elevation={3}>
                  {item.taskNeed.map((task, idx) => (
                    <Paper key={idx} sx={{ p: 2 }}>
                      <Typography>{task.name}:</Typography>
                      {task.task.map((items, idx) => (
                        <Typography key={idx} sx={{ p: 1 }}>
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
                        .map((items, idx) => (
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
