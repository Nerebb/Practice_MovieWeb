import { CssBaseline } from "@mui/material";
import { common } from "@mui/material/colors";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      mode: "dark",
      background: {
        default: "#0f0f0f",
        darkGrey: "#3b3b3b",
        darkGrey90:"#3b3b3b90"
      },
      blue: {
        main: "#91b2cc",
        lighter: "#d5e4f0",
        darker: "#6d8aa1",
      },
      contrast: {
        main: "#a3a3a3",
        lighter: common.white,
        darker: common.dark,
      },
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
