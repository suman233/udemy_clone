import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

// Mock data structure for video history items
interface VideoItem {
  id: string;
  title: string;
  channel: string;
  watchedOn: string;
  thumbnail: string;
}

const videoHistory: VideoItem[] = [
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://media.istockphoto.com/id/1465875926/photo/close-up-woman-using-smartphone-chatting-with-ai-chatbot.jpg?s=1024x1024&w=is&k=20&c=hR2MkFKXPUXex79Zigld-T8VaY_ncWVGBvhZMyJVqQM=",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://media.istockphoto.com/id/1389648332/photo/red-at-symbol-sitting-amid-white-at-symbols-on-white-reflective-background.jpg?s=1024x1024&w=is&k=20&c=6cXC_DrMh4LMOZnQhhEbkr3PAAnZjG8eZq-jZR4H0nk=",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://media.istockphoto.com/id/514521332/photo/pixelated-react.jpg?s=1024x1024&w=is&k=20&c=j5VuVfaEveS2ItV18ndOC-iwHQKy4I5nZJZQYpRbuG0=",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=1461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://images.unsplash.com/photo-1592609931041-40265b692757?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:
      "https://images.unsplash.com/photo-1592609930961-219235eded71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "1",
    title: "Understanding React Context API",
    channel: "React University",
    watchedOn: "2023-03-20",
    thumbnail:"https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
  ];

const HistoryPage = () => {
  return (
    <Box style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom className="historyhead">
        Watch History
      </Typography>
      <Grid container spacing={2}>
        {videoHistory.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
            <Card className="">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.channel} - Watched on {video.watchedOn}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HistoryPage;
