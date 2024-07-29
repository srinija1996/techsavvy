import { Box, Button, Paper, Typography } from "@mui/material";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  eightDaysAgo,
  fourteenDays,
  sevenDaysAgo,
  today,
} from "../../utils/dates";
import AccountMenu from "../AccountMenu";
import { useContext } from "react";
import { AppContext } from "../../App";

const Navbar = () => {
  const context = useContext(AppContext);
  const { isLoggedIn, appRef, darkMode, setDarkMode } = context;

  const enterFullscreen = () => {
    if (appRef.current) {
      if (appRef.current.requestFullscreen) {
        appRef.current.requestFullscreen();
      } else if (appRef.current.webkitRequestFullscreen) {
        appRef.current.webkitRequestFullscreen();
      } else if (appRef.current.msRequestFullscreen) {
        appRef.current.msRequestFullscreen();
      }
    }
  };

  return isLoggedIn ? (
    <Paper elevation={1} sx={{ padding: "5px", borderRadius: 0 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h5">Dashboard</Typography>
        <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
          <Paper elevation={1}>
            <Box display="flex" alignItems="center">
              <TodayOutlinedIcon
                fontSize="small"
                sx={{ color: "gray", padding: "10px" }}
              />
              <Box sx={{ paddingRight: "10px" }}>
                <Typography variant="body2">
                  Last 7 days: {`${sevenDaysAgo} - ${today}`}
                </Typography>
                <Typography variant="caption" style={{ color: "gray" }}>
                  Compared: {`${fourteenDays} - ${eightDaysAgo}`}{" "}
                </Typography>
              </Box>
              <ExpandMoreOutlinedIcon sx={{ color: "gray" }} />
            </Box>
          </Paper>
          <Button sx={{ color: "black" }} onClick={enterFullscreen}>
            <CropFreeOutlinedIcon />
          </Button>
          <Button
            style={{ color: "black" }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {!darkMode ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
          </Button>
          <AccountMenu />
        </Box>
      </Box>
    </Paper>
  ) : null;
};

export default Navbar;
