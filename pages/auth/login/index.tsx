import { userLogin } from "@/api/supabase";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from "nookies";
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
  deviceToken: yup.string().nullable(),
});

export type LoginSchemaFormData = {
  email: string;
  password: string;
  deviceToken?: string | null;
};

userLogin({email : "parijat.mi+editor@gmail.com", password : "12345678"})

const index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaFormData>();
  const onSubmit = async (data: LoginSchemaFormData) => {
    const { data: userData, error } = await userLogin({
      email: data.email,
      password: data.password,
    });
    // sessionStorage.setItem("user", JSON.stringify(data?.email));
    // sessionStorage.setItem("loginstatus", "true");
    if (!error) {
      router.push("/admin");
    } else {
      alert("Credentials are not valid");
    }
  };

  return (
    <Box className="loginbox">
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <Typography variant="h5">Login</Typography>
        <TextField
          {...register("email")}
          label="Email"
          type="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="password"
          type="password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box className="buttonlogpage">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#7a9abb" }}
          >
            Login
          </Button>
          <Button
            href={"/auth/signup"}
            variant="contained"
            color="secondary"
            style={{ backgroundColor: " #87CEEB" }}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default index;
