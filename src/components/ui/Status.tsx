import { Box, Typography } from '@mui/material';

type Props = {
  message: string;
};

export function ErrorOverlay({ message }: Props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1300,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(255, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          color: 'error.main',
          border: '1px solid',
          borderColor: 'error.main',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          pointerEvents: 'auto',
        }}
      >
        <Typography variant="h6">{message || 'Unknown error.'}</Typography>
      </Box>
    </Box>
  );
}
