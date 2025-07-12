import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { useMemo } from 'react';
import type {
  Barter,
  Craft,
  TaskGive,
  TaskNeed,
} from '../../api/types/Items/responseType';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabsDisplayProps {
  craft: Craft[];
  barter: Barter[];
  tasks: boolean;
  value: number;
  onChange: (value: number) => void;
}

export function TabsDisplay({
  craft,
  barter,
  tasks,
  value,
  onChange,
}: TabsDisplayProps) {
  // Controlled component: value and onChange come from parent
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Trader" {...a11yProps(0)} />
        <Tab
          label="Craft"
          {...a11yProps(1)}
          sx={{ display: craft.length > 0 ? 'block' : 'none' }}
        />
        <Tab
          label="Barter"
          {...a11yProps(2)}
          sx={{ display: barter.length > 0 ? 'block' : 'none' }}
        />
        <Tab
          label="Tasks"
          {...a11yProps(3)}
          sx={{ display: tasks ? 'block' : 'none' }}
        />
      </Tabs>
    </Box>
  );
}

interface useTabsLogicProps {
  craftInput: Craft[];
  craftOutput: Craft[];
  barterInput: Barter[];
  barterOutput: Barter[];
  taskNeed: TaskNeed[];
  taskGive: TaskGive[];
}

export function useTabsLogic({
  craftInput,
  craftOutput,
  barterInput,
  barterOutput,
  taskNeed,
  taskGive,
}: useTabsLogicProps) {
  const craft = useMemo(() => {
    const safeCraftInput = craftInput ?? [];
    const safeCraftOutput = craftOutput ?? [];
    if (safeCraftInput.length === 0 && safeCraftOutput.length === 0) return [];
    const filtered = safeCraftInput.filter(
      (input) => !safeCraftOutput.some((output) => output.id === input.id)
    );
    return [...filtered, ...safeCraftOutput];
  }, [craftInput, craftOutput]);

  const barter = useMemo(() => {
    const safeBarterInput = barterInput ?? [];
    const safeBarterOutput = barterOutput ?? [];
    if (safeBarterInput.length === 0 && safeBarterOutput.length === 0)
      return [];
    const filtered = safeBarterInput.filter(
      (input) => !safeBarterOutput.some((output) => output.id === input.id)
    );
    return [...filtered, ...safeBarterOutput];
  }, [barterInput, barterOutput]);

  const tasks = useMemo(
    () => taskGive.length !== 0 && taskNeed.length !== 0,
    [taskGive, taskNeed]
  );
  return { craft, barter, tasks };
}
