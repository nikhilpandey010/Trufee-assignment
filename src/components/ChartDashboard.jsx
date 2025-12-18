import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function ChartDashboard({ feedbacks }) {
  const ratingCounts = ["😊", "😐", "☹️"].map(
    (r) => feedbacks.filter((f) => f.rating === r).length
  );

  const categoryCounts = ["Bug", "Suggestion", "Compliment", "Other"].map(
    (c) => feedbacks.filter((f) => f.category === c).length
  );

  return (
    <Box display="flex" gap={4} mb={4}>
      <Box>
        <Typography>Ratings Distribution</Typography>
        <Doughnut
          data={{
            labels: ["😊", "😐", "☹️"],
            datasets: [
              {
                data: ratingCounts,
                backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"]
              }
            ]
          }}
        />
      </Box>

      <Box>
        <Typography>Category Count</Typography>
        <Bar
          data={{
            labels: ["Bug", "Suggestion", "Compliment", "Other"],
            datasets: [
              {
                label: "Count",
                data: categoryCounts,
                backgroundColor: "#2196f3"
              }
            ]
          }}
        />
      </Box>
    </Box>
  );
}
