
import { useResponsive } from "@/hooks/utils/use-responsive";
import Box from "@mui/material/Box";
import React from "react";

interface MainProps {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  other?: any; // Adjust the type according to your needs
}

const SPACING = 8;

const Main: React.FC<MainProps> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive("up", "lg") as boolean; // Adjust the type according to your needs

  return (
    <Box
      component="main"

      {...other}
    >
      {children}
    </Box>
  );
};

export default Main;
