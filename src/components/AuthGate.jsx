import React, { useState } from "react";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Avatar,
  InputAdornment
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";

export default function AuthGate({ onAuthSuccess }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (password === "admin") {
      onAuthSuccess();
      toast.success("Access Granted");
    } else {
      toast.error("Invalid Admin Password");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            width: "100%",
            border: "1px solid",
            borderColor: "divider"
          }}
        >
          
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          
          <Typography component="h1" variant="h5" fontWeight="bold">
            Admin Portal
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your credentials to continue
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ 
              py: 1.5, 
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem"
            }}
          >
            Unlock Dashboard
          </Button>

          <Typography variant="caption" sx={{ mt: 2, color: "text.disabled" }}>
            Default access: "admin"
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
