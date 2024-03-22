import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { Box, Card, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import assest from "@/json/assest";

import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { getTeacherVideos, videoUpload } from "@/api/supabase";
import {  videoDetailsInterface } from "@/interface/common.interface";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  border: "2px solid #d24dff",
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function teacher() {
  const router = useRouter();
  const [file, setFile] = React.useState<File>();
  const [addedVideo, setAddedVideo] = React.useState<any>([]);
  const [dependan, setDependan] = React.useState<number>(0);
  const handleSubmit = () => {
    if (file) videoUpload(file);
    setDependan(dependan + 1);
  };

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  React.useEffect(() => {
    const videos = async () => {
      const { videosData, error } = await getTeacherVideos();
      if (!error) {
        setAddedVideo(videosData);
      }
    };
    videos();
  }, [dependan]);
  console.log(addedVideo, "addedvideo");
 
  return (
    <>
      <Box
        sx={{
          height: "1rem",
          fontSize: "3rem",
          textAlign: "center",
          color: "black",
          marginTop: "2rem",
        }}
      >
        Your Videos
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          columns={{ xs: 4, md: 12 }}
        >
          {addedVideo?.map((item: videoDetailsInterface) => (
            <Grid item xs={4}>
              <Item>
                <ReactPlayer
                  height={"10rem"}
                  width={"20"}
                  url={item.video_url} // Use the imported video file path directly
                  controls={false}
                  light={false}
                  pip={true}
                />
                <Typography
                  style={{ color: "black" }}
                  onClick={() => router.push(`/VideoPlayer/${item.id}`)}
                >
                  video
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography style={{ color: "Green", fontSize: "3rem" }}>
          Upload Video
        </Typography>
        <TextField
          style={{
            color: "black",
            width: "30vw",
            marginBottom: "2rem",
            border: "1px solid green",
          }}
          type="file"
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button style={{ backgroundColor: "green", color: "white", margin: 4 }}>
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}