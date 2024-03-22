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
  role: string;
  status: string;
}


const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
];

const index = () => {
    const teachers: Teacher[] = [
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },
      {
        id: 1,
        name: "John Doe",
        phone: "123-456-7890",
        email: "johndoe@example.com",
        role: "Mathematics Teacher",
        status: "Active",
      },

    ];
  return (

      <Box>
        <Typography className="teacher" 
      
        >List of Teachers</Typography>
        <Box
          style={{
            height: 500,
            width: "97%",
            paddingLeft: "30px",
            paddingTop: "20px",
          }}
        >
          <DataGrid
            rows={teachers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            className="teachtable"
          />
          <Button
          style={{
            borderRadius:"20px",
            width:"50px",
            height:"25px",
            padding:0,
            position:"relative",
            backgroundColor: "green", 
              content:"Inactive",
              top:'3px',
              left:'3px',
            
          }}
          >Active</Button>
        </Box>
      </Box>
   
  );
};

export default index;
