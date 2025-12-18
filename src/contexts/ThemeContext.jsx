import React, { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = {
    toggleColorMode: () => {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
