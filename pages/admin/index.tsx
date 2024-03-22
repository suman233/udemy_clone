import AppWidgetSummaryCard from "@/components/cards/AppWidgetSummaryCard";
import DashboardLayout from "@/layout/DashboardLayout";
import CustomInput from "@/ui/Inputs/CustomInput";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import dynamic from "next/dynamic";

const AppWebsiteVisitsChart = dynamic(
  () => import("@/components/chart/AppWebsiteVisitsChart"),
  { ssr: false }
);

const index = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          sx={{ mb: 15 }}
          style={{ marginLeft: "450px", marginTop: "200px" }}
        ></Typography>
      </Container>
    </DashboardLayout>
  );
};

export default index;
