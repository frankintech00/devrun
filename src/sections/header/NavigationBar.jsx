// src/sections/header/NavigationBar.jsx

import { Box, Typography } from "@mui/material";

function NavigationBar() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        height: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
      }}
    >
      <Typography>Menu</Typography>
      <Typography>Search</Typography>
      <Typography>Basket</Typography>
    </Box>
  );
}

export default NavigationBar;
