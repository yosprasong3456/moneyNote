import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { authSelector, login } from "../store/slices/authSlice";
// import { useAppDispatch } from "../store/store";
// import { Backdrop, CircularProgress, Popover } from "@mui/material";
// import SwitchMode from "../components/SwitchMode";
// import { sizing } from "@mui/system";
import { useSelector } from "react-redux";
import { authSelector, login } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Kim-Change-The-World-2023
      </Link>
    </Typography>
  );
}

type Props = {};

export default function Login({}: Props) {
  const dispatch = useAppDispatch();

  const authReducer = useSelector(authSelector);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataSet = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const result = await dispatch(login(dataSet));
    if (login.fulfilled.match(result)) {
      enqueueSnackbar(`เข้าสู่ระบบสำเร็จ!`, {
        variant: "success",
      });
      navigate("/dashboard");
    } else {
      enqueueSnackbar(`ผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง!`, {
        variant: "error",
      });
    }
  };

  React.useEffect(() => {
    console.log(authReducer.isAuthented);
    if (authReducer.isAuthented) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Grid
      container
      // component="main"
      sx={{ height: "100vh" }}
    >
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1794&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{
          backgroundImage: {
            xs: "url(https://images.unsplash.com/photo-1494475673543-6a6a27143fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)",
            sm: "none",
          },
          backgroundRepeat: "no-repeat",
          // backgroundColor: (t) =>
          //   t.palette.mode === "light"
          //     ? t.palette.grey[50]
          //     : t.palette.grey[900],
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // margin:{ xs : 10}
          margin: { xs: 0, sm: "auto" },
          // opacity: { xs : 0.2, sm: 1}
        }}
      >
        <Box
          sx={{
            my: { xs: "25%", sm: 0 },
            mx: { xs: 1, sm: 8 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? { xs: "white", sm: t.palette.background.default }
                : { xs: "black", sm: t.palette.background.default },
            padding: { xs: 5, sm: 0 },
            borderRadius: 2,
            // opacity: { xs: 0.9, sm: 1 },
          }}
        >
          {/* <Grid container> */}
          <Box textAlign="center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/768/768818.png"
              style={{
                maxWidth: "100%",
                height: "auto",
                padding: 0,
                marginLeft: 30,
                //   borderRadius: "100%",
              }}
              alt="logo"
            />
          </Box>
          {/* <Grid item xs={8} sx={{ margin: "auto" }}>
              <Typography>ระบบโน็ตรับรายจ่าย</Typography>
            </Grid> */}
          {/* </Grid> */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้งาน"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: (t) => t.palette.secondary.main }}
            >
              เข้าสู่ระบบ
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  href="#"
                  variant="body2"
                >
                  ลืมรหัสผ่าน
                </Link>
              </Grid>
            </Grid> */}
            {/* <SwitchMode /> */}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
        {/* <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 2 }}>No Function</Typography>
        </Popover> */}
      </Grid>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={authReducer.isAuthenticating}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Grid>
  );
}
