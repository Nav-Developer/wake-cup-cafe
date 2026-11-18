import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#C8281E", dark: "#9C1C14", contrastText: "#FFFFFF" },
    secondary: { main: "#F4B83A", dark: "#C78F12", contrastText: "#2A1410" },
    background: { default: "#FFFAF2", paper: "#FFFFFF" },
    text: { primary: "#2A1410", secondary: "#6B4A44" },
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h2: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h3: { fontFamily: "var(--font-bodoni), serif", fontWeight: 500 },
    h4: { fontFamily: "var(--font-bodoni), serif", fontWeight: 500 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          letterSpacing: "0.01em",
          fontWeight: 700,
          borderRadius: 999,
          paddingInline: 24,
        },
      },
    },
  },
});

export default theme;
