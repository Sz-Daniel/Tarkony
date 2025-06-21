import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorOverlayProps {
  message: string;
}

export function ErrorOverlay({ message }:ErrorOverlayProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,        left: 0,
        zIndex: 1300, 
        width: '100vw',        height: '100vh',
        bgcolor: 'rgba(255, 0, 0, 0.2)', 
        display: 'flex',        justifyContent: 'center',        alignItems: 'center',
        pointerEvents: 'none', 
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',          color: 'error.main',
          border: '1px solid',          borderColor: 'error.main',
          p: 3,
          borderRadius: 2,          boxShadow: 3,
          pointerEvents: 'auto',
        }}
      >
        <Typography variant="h6">
          {message || 'Ismeretlen hiba történt.'}
        </Typography>
      </Box>
    </Box>
  );
};

