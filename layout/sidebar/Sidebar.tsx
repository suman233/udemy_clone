
import Scrollbar from "@/ui/scrollbar/scrollbar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import navConfig from "../config-navigation";
import SidebarItem from "./SidebarItem";
import { useResponsive } from "@/hooks/utils/use-responsive";

interface SidebarProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function Sidebar({ openNav, onCloseNav }: SidebarProps) {
  const pathname = usePathname();
  const upLg = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, openNav, onCloseNav]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
      }}
    >
      <Avatar src="" alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">Super Admin</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          role
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <SidebarItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column"
        }
      }}
    >


      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },

      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",

            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{

          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
