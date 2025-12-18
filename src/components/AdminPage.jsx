import React, { useState, useMemo } from "react";
import { STORAGE_KEY } from "../App";
import FilterBar from "./FilterBar";
import FeedbackList from "./FeedbackList";
import ChartDashboard from "./ChartDashboard";
import { exportCSV } from "../utils/csv";
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Stack, 
  Divider,
  Grid 
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import BarChartIcon from "@mui/icons-material/BarChart";


const ratingWeights = { "😊": 3, "😐": 2, "☹️": 1 };

export default function AdminPage() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const [ratingFilter, setRatingFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortType, setSortType] = useState("date");

  const filtered = useMemo(() => {
    return stored
      .filter((f) => (ratingFilter ? f.rating === ratingFilter : true))
      .filter((f) => (categoryFilter ? f.category === categoryFilter : true))
      .filter((f) =>
        keyword ? f.text.toLowerCase().includes(keyword.toLowerCase()) : true
      )
      .sort((a, b) => {
        if (sortType === "date")
          return new Date(b.date) - new Date(a.date);
        if (sortType === "rating")
          return (ratingWeights[b.rating] || 0) - (ratingWeights[a.rating] || 0);
        return 0;
      });
  }, [stored, ratingFilter, categoryFilter, keyword, sortType]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Heder Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="800" color="text.primary">
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and analyze incoming user feedback
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />} 
          onClick={() => exportCSV(filtered)}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Export CSV
        </Button>
      </Box>

      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <Box display="flex" alignItems="center" mb={2}>
              <BarChartIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" fontWeight="600">Analytics Overview</Typography>
            </Box>
            <ChartDashboard feedbacks={filtered} />
          </Paper>
        </Grid>

    
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
            
            <Box sx={{ p: 2, bgcolor: "action.hover" }}>
              <FilterBar
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </Box>
            
            <Divider />

        
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Showing {filtered.length} entries
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="caption" sx={{ alignSelf: "center", mr: 1, fontWeight: "bold" }}>
                  SORT BY:
                </Typography>
                <Button 
                  size="small" 
                  variant={sortType === "date" ? "soft" : "text"}
                  onClick={() => setSortType("date")}
                  startIcon={<SortIcon />}
                >
                  Date
                </Button>
                <Button 
                  size="small" 
                  variant={sortType === "rating" ? "soft" : "text"}
                  onClick={() => setSortType("rating")}
                  startIcon={<SortIcon />}
                >
                  Rating
                </Button>
              </Stack>
            </Box>

            <Divider />

            
            <Box sx={{ minHeight: "400px" }}>
              {filtered.length > 0 ? (
                <FeedbackList feedbacks={filtered} />
              ) : (
                <Box textAlign="center" py={10}>
                  <Typography color="text.secondary">No feedback found matching your criteria.</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}