import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { authSelector, logout } from "../store/slices/authSlice";
// import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import "../App.css";
// import SwitchMode from "../components/SwitchMode";
// import {
//   // Badge,
//   // BadgeProps,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   // styled,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import TuneIcon from "@mui/icons-material/Tune";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
// import FlagCircleOutlinedIcon from "@mui/icons-material/FlagCircleOutlined";
// import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
// import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
// import EmojiPeopleRoundedIcon from "@mui/icons-material/EmojiPeopleRounded";
import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
// import { useAppDispatch } from "../store/store";
import BottomBar from "../components/BottomBar";

function Header() {
  let location = useLocation();
  // const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  // const [selectedNav, setSelectedNav] = React.useState("");

  // const [navDraw, setNavDraw] = React.useState(true);
  // const [appBar, setAppBar] = React.useState(false);
  // const navigate = useNavigate();
  const [windowSize, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    // console.log(location);
    // let st = "item";
    // if (location.pathname.indexOf(st) > -1) {
    //   setSelectedNav("/items");
    // } else {
    //   setSelectedNav(location.pathname);
    // }
    // const size = window.innerWidth;
    // if (size < 600) {
    //   setNavDraw(false);
    //   setAppBar(true);
    // }
  }, [location]);

  useEffect(() => {
    console.log(authReducer.authData);
    const handleWindowResize = () => {
      // if (windowSize[0] < 600) {
      //   setNavDraw(false);
      //   setAppBar(true);
      // } else {
      //   setNavDraw(true);
      //   setAppBar(false);
      // }
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const onLogout = async () => {
  //   // dispatch(onLogout());
  //   navigate("/login");
  // };

  // const changePage = (params: string) => {
  //   console.log(location.pathname);
  //   navigate(params);
  // };
  // ["Dashboard", "รายการสินค้า", "รายการจ่าย", "รายงาน"]

  // const DrawerList = [
  //   {
  //     name: "รายรับ-รายจ่าย",
  //     navigate: "/dashboard",
  //     icon: "📝",
  //   },
  //   // {
  //   //   name: "รายรับ",
  //   //   navigate: "/items",
  //   //   icon: <SavingsOutlinedIcon fontSize="large" />,
  //   // },
  //   {
  //     name: "Todo List",
  //     navigate: "/payment",
  //     icon: "🏖️",
  //   },
  //   // {
  //   //   name: authReducer.authData.data.fullName,
  //   //   navigate: "/report",
  //   //   icon: <EmojiPeopleRoundedIcon fontSize="large" />,
  //   // },
  // ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: 1,
          //   display: { md: "block", xs: "none" },
        }}
        // sx={{ top: "auto", bottom: 0 }}
      >

        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

          <Box
            sx={{
              flexGrow: 1,
              display: { sm: "flex", md: "flex" },
              // width: { xs: 50, sm: 50, md: 80 },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: { sm: "flex", md: "flex" },
              }}
            >
              <Box px={1} textAlign="start">

                <Tooltip title="">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="avatar" src="" />
                    <Typography textAlign="center" pl={1} color="white">
                      {authReducer.authData.data.fullName}
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Box p={2}>

              <Tooltip title="Open Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <TuneIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              sx={{ mt: "25px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => console.log("logout")}>
                <ManageAccountsIcon fontSize="small" />
                <Typography textAlign="center" ml={1}>
                  ตั้งค่าระบบ
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => console.log("logout")}>
                <PowerSettingsNewIcon fontSize="small" color="error" />
                <Typography textAlign="center" ml={1}>
                  ออกจากระบบ
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>

      </AppBar> */}
      {/* {navDraw && (
        <Drawer
          // variant="permanent"
          sx={{
            // justifyContent: "space-around",
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[100]
                  : t.palette.grey[900],
            },
          }}
          variant="persistent"
          anchor="left"
          open={navDraw}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", m: 1 }}>
            <List>
              {DrawerList.map((val, index) => (
                <ListItem
                  sx={{
                    backgroundColor: (t) =>
                      selectedNav === val.navigate
                        ? t.palette.primary.main
                        : "",
                    borderRadius: 1,
                  }}
                  key={index}
                  disablePadding
                  onClick={() => changePage(val.navigate)}
                >
                  <ListItemButton>
                    <ListItemIcon>{val.icon}</ListItemIcon>
                    <ListItemText primary={val.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="ออกจากระบบ" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )} */}
      {/* {appBar && ( */}
      {/* <AppBar
        position="fixed"
        // color="primary"
        elevation={4}
        sx={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          top: "auto",
          bottom: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          px: 1,
          display: { sm: "flex" },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-around" }}>
          {DrawerList.map((val, index) => (
            <Box
              // component="div"
              className={selectedNav === val.navigate ? "slideNavbar" : ""}
              key={index}
              // p={1}
              width={calWidth(90) / 2}
              textAlign="center"
              sx={{
                // m: 0.2,
                backgroundColor: (t) =>
                  selectedNav === val.navigate
                    ? t.palette.mode === "dark"
                      ? "#272727"
                      : t.palette.primary.main
                    : "",
                opacity: selectedNav === val.navigate ? 1 : 0.5,
                // borderRadius: 2,
                // boxShadow: selectedNav === val.navigate ? 10 : 0,
                // color: (t) =>
                //   selectedNav === val.navigate
                //     ? t.palette.secondary.main
                //     : "#393E46",
                // mt: selectedNav === val.navigate ? -2 : -1.7,
              }}
              onClick={() => changePage(val.navigate)}
            >
              <Typography >
                {val.icon}
              </Typography>
              <Typography
                sx={{
                  // fontSize: (t) => (selectedNav === val.navigate ? 10 : 8),
                  mt: -1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {val.name}
              </Typography>
            </Box>
          ))}
        </Toolbar>
      </AppBar> */}
      <BottomBar />
      {/* )} */}
    </Box>
  );
}

// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -10,
//     top: 5,
//     // border: `2px solid ${theme.palette.background.paper}`,
//     padding: "0 4px",
//   },
// }));
export default Header;
