import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function FeedbackList({ feedbacks }) {
  if (!feedbacks.length)
    return <Typography>No feedback yet.</Typography>;

  return (
    <Box>
      {feedbacks.map((f) => (
        <Paper key={f.id} sx={{ p: 2, mb: 1 }}>
          <Typography>
            <strong>{f.rating}</strong> — {f.category}
          </Typography>
          <Typography>{f.text}</Typography>
          <Typography variant="caption">
            {new Date(f.date).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}


