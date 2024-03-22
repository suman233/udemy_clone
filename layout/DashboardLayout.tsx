import { useState } from "react";

import Box from "@mui/material/Box";
import React from 'react'
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header/Header";
import Main from "./main";

// ----------------------------------------------------------------------

 const DashboardLayout=({
  children
}: {
  children: React.ReactNode;
})=> {
  const [openNav, setOpenNav] = useState(false);

  // useUser()

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" }
        }}
      >
        <Sidebar openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}
export default DashboardLayout



