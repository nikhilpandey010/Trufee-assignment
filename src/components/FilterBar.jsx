import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export default function FilterBar({
  ratingFilter,
  setRatingFilter,
  categoryFilter,
  setCategoryFilter,
  keyword,
  setKeyword
}) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        select
        label="Rating"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="😊">😊</MenuItem>
        <MenuItem value="😐">😐</MenuItem>
        <MenuItem value="☹️">☹️</MenuItem>
      </TextField>

      <TextField
        select
        label="Category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        {["Bug", "Suggestion", "Compliment", "Other"].map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </Box>
  );
}


