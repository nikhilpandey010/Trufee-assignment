import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton 
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import FeedbackWidget from "./components/FeedbackWidget";
import AdminPage from "./components/AdminPage";
import AuthGate from "./components/AuthGate";
import CustomThemeProvider, { ColorModeContext } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const STORAGE_KEY = "feedback_app_data";


const Home = () => (
  <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
    <Box sx={{ p: 5, borderRadius: 4, bgcolor: "action.hover", boxShadow: 1 }}>
      <Typography variant="h2" fontWeight="800" gutterBottom color="primary">
        Welcome to FeedbackHub
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Your opinion helps us grow. Please use the widget in the bottom right 
        corner to share your thoughts, report bugs, or give us a high-five!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <img 
          src="https://illustrations.popsy.co/amber/customer-support.svg" 
          alt="Feedback Illustration" 
          style={{ width: "100%", maxWidth: "400px" }} 
        />
      </Box>
    </Box>
  </Container>
);

function AppContent() {
  const [auth, setAuth] = useState(false);
  const colorMode = useContext(ColorModeContext);

  return (
    <BrowserRouter>
    
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper", color: "text.primary" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}>
              FEEDBACK.IO
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button component={Link} to="/" startIcon={<HomeIcon />} color="inherit">
                Home
              </Button>
              <Button component={Link} to="/admin" startIcon={<AdminPanelSettingsIcon />} color="inherit">
                Admin
              </Button>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
               
                <Brightness4Icon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            auth ? (
              <AdminPage />
            ) : (
              <AuthGate onAuthSuccess={() => setAuth(true)} />
            )
          }
        />
      </Routes>

      
      <FeedbackWidget />
      
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}


const Divider = (props) => <Box component="span" {...props} sx={{ borderRight: "1px solid", borderColor: "divider", ...props.sx }} />;



