import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Video {
  id: number;
  title: string;
  duration: string;
  publishedDate: string;
  views: number;
}
const videoRows: Video[] = [
  {
    id: 1,
    title: "Introduction to TypeScript",
    duration: "10:00",
    publishedDate: "2023-01-01",
    views: 1500,
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 3,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 4,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 5,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 6,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 7,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },
  {
    id: 8,
    title: "Advanced React Techniques",
    duration: "15:30",
    publishedDate: "2023-02-15",
    views: 2500,
  },

];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "duration", headerName: "Duration", width: 130 },
  { field: "publishedDate", headerName: "Published Date", width: 150 },
  { field: "views", headerName: "Views", type: "number", width: 130 },
];

const index = () => {
  return (
    <Box sx={{ height: "600px", width: "100%" }}>
      <Typography variant="h6" gutterBottom className="videohead">
        All Videos which are Available
      </Typography>
      <DataGrid
        rows={videoRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        className="videotable"
      />
    </Box>
  );
};

export default index;
