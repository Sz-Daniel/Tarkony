import * as React from 'react';
import Switch from '@mui/material/Switch';

type Props = {
  craftbarter: boolean;
  setCraftbarter: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SwitchOption({ craftbarter, setCraftbarter }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCraftbarter(event.target.checked);
  };

  return (
    <Switch checked={craftbarter} onChange={handleChange} color="default" />
  );
}
