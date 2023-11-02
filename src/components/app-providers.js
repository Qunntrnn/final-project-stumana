"use client";

import { Provider } from "react-redux";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { store } from "@app/store/store";
import { AppFirebase } from "./app-firebase";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    node: "light",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        style: {
          textTransform: "none",
          borderRadius: 9999,
        },
      },
    },
  },
});

export const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <AppFirebase>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
      </AppFirebase>
    </Provider>
  );
};
