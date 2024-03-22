import Sidebar from "@/layout/sidebar/Sidebar";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

interface Teacher {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 250 },
  { field: "phone", headerName: "Phone", width: 250 },
  { field: "email", headerName: "Email", width: 350 },
  { field: "status", headerName: "Status", width: 220 },
];

const index = () => {
  const students: Teacher[] = [
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "johndoe@example.com",
      status: "Active",
    },
  ];
  return (
    <Box>
      <Typography className="teacher">List of Students</Typography>
      <Box
        style={{
          height: 500,
          width: "97%",
          paddingLeft: "30px",
          paddingTop: "20px",
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <Button
          style={{
            borderRadius: "20px",
            width: "50px",
            height: "25px",
            padding: 0,
            position: "relative",
            backgroundColor: "green",
            content: "Inactive",
            top: "3px",
            left: "3px",
          }}
        >
          Active
        </Button>
      </Box>
    </Box>
  );
};

export default index;
