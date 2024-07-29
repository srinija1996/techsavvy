import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DonutSmallOutlined, SettingsOutlined } from "@mui/icons-material";
import { DrawerListProps } from "../../interfaces";

const DrawerList = ({ toggleDrawer }: DrawerListProps) => {
  return (
    <Box
      sx={{ width: 250, height: "100%" }}
      role="presentation"
      onMouseLeave={toggleDrawer(false)}
    >
      <Box display="flex" alignItems="center">
        <img
          src="https://techsavvy.ai/assets/images/common/logo/logo.svg"
          alt="logo"
          style={{ height: "55px", padding: "10px 0" }}
          loading="lazy"
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "92%",
        }}
      >
        <List>
          <ListItem
            sx={{
              backgroundColor: "#ede8fc",
              color: "#5208a5",
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <DonutSmallOutlined sx={{ color: "#5208a5" }} />
              </ListItemIcon>
              <ListItemText sx={{ fontWeight: "bold" }} primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsOutlined sx={{ color: "gray" }} />
                </ListItemIcon>
                <ListItemText sx={{ fontWeight: "bold" }} primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default DrawerList;
