import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { PersonOutlineOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const { fullName } = userDetails;
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const { setIsLoggedIn } = context;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogOut = () => {
    handleClose();
    localStorage.clear();
    if (setIsLoggedIn) setIsLoggedIn(false, () => navigate("/"));
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PersonOutlineOutlined sx={{ color: "black" }} />
            <ExpandMoreOutlined sx={{ color: "black" }} fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "200px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box display="flex" alignItems="center" sx={{ paddingLeft: 2 }}>
          <Avatar sx={{ width: 32, height: 32, backgroundColor: "blue" }}>
            {fullName?.slice(0, 1).toUpperCase()}
          </Avatar>{" "}
          <Box>
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="caption" sx={{ paddingTop: 0 }}>
              Online
            </Typography>
          </Box>
        </Box>
        <MenuItem onClick={onLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
