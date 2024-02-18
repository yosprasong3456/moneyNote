import React, { useEffect } from "react";
import Login from "./pages/Login";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Grid,
  Button,
  Typography,
  Toolbar,
} from "@mui/material";
import Header from "./layouts/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import { authSelector, relogin } from "./store/slices/authSlice";
import { useAppDispatch } from "./store/store";
import { server } from "./constants";
import ProtectedRoutes from "./router/protected.routes";
import { SnackbarProvider } from "notistack";

type Props = {};

function App({}: Props) {
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);

  useEffect(() => {
    const userToken = localStorage.getItem(server.TOKEN_KEY);
    if (userToken) {
      dispatch(relogin());
    }
  }, []);

  let theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 5,
          },
        },
      },
    },
    spacing: 8,
    typography: {
      fontFamily: "Kanit",
      fontWeightLight: 300,
      fontWeightRegular: 400,
    },
    palette: {
      mode: "light",
      primary: { main: "#2196f3" },
      // !import.meta.env.DEV ? { main: "#5997b2" } : { main: "#00a152" },

      //   main: blue["A200"],

      // },
      secondary: { main: "#0F2C59" },
      // background: {
      //   default: "#EEEEEE",
      // },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={10}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        className="Snackbar"
      />
      <Box sx={{ display: { md: "flex", sx: "" } }}>
        {authReducer.isAuthented && <Header />}
        {/* <Toolbar /> */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {authReducer.isAuthented ? (
              <Route element={<ProtectedRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            ) : (
              <Route>
                <Route path="*" element={<Login />} />
              </Route>
            )}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      // align="center"
      // justify="center"
      direction="column"
      style={{
        alignContent: "center",
        justifyContent: "center",
        height: "85vh",
      }}
    >
      <Grid item>
        <Typography variant="h3">Error 404</Typography>
        <Typography variant="h4">Page not found.</Typography>
        <Button
          variant="text"
          sx={{ padding: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          กลับหน้าหลัก
        </Button>
      </Grid>
    </Grid>
  );
};

export default App;
