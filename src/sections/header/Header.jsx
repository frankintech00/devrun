import { Box } from "@mui/material";
import PromotionalSlider from "./PromotionalSlider";
import NavigationBar from "./NavigationBar";

function Header() {
  return (
    <Box
      sx={{
        bgcolor: "white",

        width: "full",
        position: "sticky",
        margin: "0",
        top: "0",
        zIndex: "50",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <PromotionalSlider />
      <NavigationBar />
    </Box>
  );
}

export default Header;
