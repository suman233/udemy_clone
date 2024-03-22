import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { getVideoDetails } from "@/api/supabase";
import { string } from "yup";
import Dashboard from "@mui/icons-material/Dashboard";
import Wrapper from "@/layout/wrapper/Wrapper";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import CustomInput from "@/ui/Inputs/CustomInput";
import { useDebounce } from "@/hooks/utils/useDebounce";

interface Data {
  url: string;
}
interface Note {
  time: number;
  note: string;
}
const VideoPlayer: React.FC<Data> = ({ url }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [result, setResult] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        try {
          const videoDetails = await getVideoDetails(slug as string);
          setResult(videoDetails);
        } catch (error) {
          console.error("Error fetching video details:", error);
        }
      }
    };

    fetchData();
  }, [slug]);

  console.log("result", result?.data?.video_url);

  const [text, setText] = useState("");
  let nextId = 0;
  const [textArr, setTextArr] = useState<Array<string>>([]);
  const [open, setOpen] = useState(false); 
  const [paused, setPause] = useState(true);
  const textDebounced = useDebounce(text, 2000);
  console.log("text", textArr);

  const handleComment = () => {
    setOpen(true);
    setPause(false);
  };
  const onClose = () => {
    setOpen((prev) => !prev);
    setPause(true);
  };

  return (
    <Wrapper>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columns={{ xs: 4, md: 12 }}
        >
          <Grid item xs={12} md={8} sm={12} lg={8}>
            <ReactPlayer
              style={{ margin: "auto" }}
              height={"30rem"}
              width={"50rem"}
              url={result?.data?.video_url}
              playing={paused}
              //   onPause={()=>setPause(prev)}
              controls={true}
              light={false}
              pip={true}
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12} lg={4}>
            <Card
              style={{
                color: "black",
                backgroundColor: "green",
                height: "30rem",
                margin: "0.5rem",
              }}
            >
              <Typography
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                Your Comments Here
              </Typography>
              {/* <TextField
                style={{
                  width: "95%",
                  margin: "0.5em",
                }}
                value={textDebounced}
              /> */}
              {
                textArr?.map((item)=>{
                    return (
                        <>
                            <Typography>{item}</Typography>
                        </>
                    )
                })
              }
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleComment}>
          Add Comment
        </Button>
        <Typography style={{ color: "black", margin: "auto" }}>
          A YouTube video description is the text below your videos. It helps
          viewers find your content, know what your video is about, and explain
          why they should view it. The main goal of the description is to get
          visitors to watch more of your video content and become your
          subscribers and customers. But YouTube also crawls your descriptions
          and uses that information to rank your video in search results. That’s
          why, when done right, YouTube descriptions can also help improve your
          YouTube SEO! Not sure how to write an effective YouTube description?
          No worries, we’ve got you covered. Here are some of our favorite
          strategies for crafting a well-optimized YouTube video description:
          Let’s get started!
        </Typography>
      </div>
      <MuiModalWrapper
        title="Enter Your Comment: "
        open={open}
        onClose={onClose}
      >
        <TextField
          placeholder="Enter Comment"
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={()=>setTextArr([...textArr, text ])}>
          Save Comment
        </Button>
      </MuiModalWrapper>
    </Wrapper>
  );
};

export default VideoPlayer;
