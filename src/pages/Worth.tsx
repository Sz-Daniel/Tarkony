import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ListSearchBar } from '../components/Worth/ListSearchBar';
import { WorthMap } from '../components/Worth/WorthMap';

export function Worth() {
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    console.log('selectedItem', selectedItem);
  }, [selectedItem]);

  return (
    <>
      <Box>
        <ListSearchBar setSelectedItem={setSelectedItem} />
      </Box>

      {selectedItem !== '' && selectedItem && (
        <Box>
          <WorthMap selectedItem={selectedItem} />
        </Box>
      )}
    </>
  );
}
