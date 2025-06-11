import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 4,
          minWidth: 350,
          maxWidth: 420,
          textAlign: "center",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <BookIcon sx={{ fontSize: 60, color: "#fda085" }} />
          <Typography variant="h3" fontWeight={700} color="#333">
            Tienda Libros
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Your favorite place to buy and manage books online.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/login"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: "1.1rem",
              background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
              color: "#fff",
              boxShadow: 2,
              transition: "0.2s",
              "&:hover": {
                background: "linear-gradient(90deg, #fda085 0%, #f6d365 100%)",
                color: "#333",
              },
            }}
          >
            Start Shopping
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}