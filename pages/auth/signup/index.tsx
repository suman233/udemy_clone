import { useUserSignup } from "@/api/supabase";
import { SupabaseSignup } from "@/api/supabase/supabaseInterface";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, color, Container } from "@mui/system";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const index = () => {
  const { userSignup , addImageToStorage} = useUserSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SupabaseSignup>();
  const [file, setFile] = useState<File>();
  const onSubmit = async (data: SupabaseSignup) => {
    console.log(data);
    
    const x = await userSignup({ ...data, profileImage : file});
    if(file){
      await addImageToStorage("shdfh", "sdjkh", file)
    }
  };

  const fileData = (e: any) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    // if (file && file.type !== "a") {

    //   alert("The document must be a file of type: application/pdf.");
    // } else {
    //   // If file is a PDF, proceed to update the form value

    // }
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          InputProps={{ style: { color: 'black' } }}
          {...register("fullname", { required: true })}
          fullWidth
          margin="normal"
          error={!!errors.fullname}
          helperText={errors.fullname ? "Name is required" : ""}
        />

        <Controller
          name="role"
          control={control}
          defaultValue="student"
          render={({ field }) => (
            <Select
            placeholder="Set Role"
              style={{
                width: "42vw",
                backgroundColor: "white",
                color: "black",
                
              }}
              inputProps={{ "aria-label": "Without label" }}
              {...field}
              {...register("role",{required:true})}
            >
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          )}
        />
        <TextField
          label="Phone No"
          InputProps={{ style: { color: 'black' } }}
          {...register("phone", { required: true })}
          fullWidth
          margin="normal"
          error={!!errors.phone}
          helperText={errors.phone ? "phone No is required" : ""}
        />
        <TextField
          label="Email"
          InputProps={{ style: { color: 'black' } }}
          {...register("email", { required: true })}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email ? "Email is required" : ""}
        />

        <TextField
          label="Password"
          InputProps={{ style: { color: 'black' } }} 
          {...register("password", { required: true })}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password ? "password is required" : ""}
        />
        <TextField
          onChange={fileData}
          InputProps={{ style: { color: 'black' } }} 
          // {
          //   required: 'This field is required',
          //   validate: {
          //     isPdf: value => value[0]?.type === 'application/pdf' || 'The document must be a file of type: application/pdf.'
          //   }
          // })}
          
          type="file"
          inputProps={{ accept: ".jpg,.jpeg,.png" }}
          fullWidth
          variant="outlined"
          error={!!errors.profileImage}
          helperText={errors.profileImage ? "Upload your image" : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default index;
