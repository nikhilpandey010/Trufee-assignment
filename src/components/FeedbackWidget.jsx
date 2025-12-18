import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Collapse,
  IconButton,
  Paper,
  Divider,
  Fade
} from "@mui/material";
import { STORAGE_KEY } from "../App";
import { sanitize } from "../utils/sanitize";
import { toast } from "react-toastify";
import FeedbackIcon from "@mui/icons-material/ChatBubbleOutline"; 
import CloseIcon from "@mui/icons-material/Close";

const categories = ["Bug", "Suggestion", "Compliment", "Other"];
const MAX_WORDS = 50;
const COOLDOWN_TIME = 60;

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const getWordCount = (str) => str.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    let timer;
    if (secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    if (getWordCount(newValue) <= MAX_WORDS || newValue.length < text.length) {
      setText(newValue);
    } else {
      toast.warning("Word limit reached!");
    }
  };

  const submitFeedback = () => {
    if (!rating || !text || !category) {
      toast.error("Please fill in all fields!");
      return;
    }

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const newEntry = {
      id: Math.random().toString(36).slice(2, 8).toUpperCase(),
      rating,
      text: sanitize(text),
      category,
      date: new Date()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, newEntry]));
    toast.success("Feedback submitted!");
    setSubmitted(true);
    setSecondsLeft(COOLDOWN_TIME);
    setOpen(false);
    setRating("");
    setText("");
    setCategory("");
  };

  return (
    <Box sx={{ position: "fixed", bottom: 30, right: 30, zIndex: 1200 }}>
      
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          width: 56,
          height: 56,
          bgcolor: open ? "grey.300" : "primary.main",
          color: open ? "text.primary" : "white",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: open ? "grey.400" : "primary.dark",
            transform: "scale(1.1)",
          },
        }}
      >
        {open ? <CloseIcon /> : <FeedbackIcon />}
      </IconButton>

      
      <Collapse in={open} timeout="auto" sx={{ position: "absolute", bottom: 70, right: 0 }}>
        <Paper
          elevation={6}
          sx={{
            width: 320,
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
        
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
            <Typography variant="subtitle1" fontWeight="600">
              Share your thoughts
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              We'd love to hear from you!
            </Typography>
          </Box>

          <Box sx={{ p: 2.5 }}>
            <TextField
              select
              label="How do you feel?"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              disabled={secondsLeft > 0}
            >
              {[
                { label: "Great", icon: "😊" },
                { label: "Neutral", icon: "😐" },
                { label: "Poor", icon: "☹️" },
              ].map((r) => (
                <MenuItem key={r.label} value={r.icon}>
                  <Box component="span" sx={{ mr: 1 }}>{r.icon}</Box> {r.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              disabled={secondsLeft > 0}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>

            <TextField
              label="Message"
              value={text}
              onChange={handleTextChange}
              multiline
              rows={4}
              fullWidth
              disabled={secondsLeft > 0}
              placeholder="Tell us what's on your mind..."
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                mb: 1
              }}
              helperText={
                <Box component="span" sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Max 50 words</span>
                  <span style={{ color: getWordCount(text) >= MAX_WORDS ? "red" : "inherit" }}>
                    {getWordCount(text)}/{MAX_WORDS}
                  </span>
                </Box>
              }
            />

            <Button
              variant="contained"
              fullWidth
              disableElevation
              onClick={submitFeedback}
              disabled={secondsLeft > 0}
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none"
              }}
            >
              {secondsLeft > 0 ? `Wait ${secondsLeft}s` : "Send Feedback"}
            </Button>
          </Box>
        </Paper>
      </Collapse>

      
      <Fade in={submitted && secondsLeft > 0}>
        <Paper
          sx={{
            position: "absolute",
            bottom: 70,
            right: 0,
            p: 1.5,
            bgcolor: "success.light",
            color: "success.contrastText",
            borderRadius: 2,
            width: 250,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2" textAlign="center" fontWeight="500">
            ✅ Received! You can post again in {secondsLeft}s.
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}