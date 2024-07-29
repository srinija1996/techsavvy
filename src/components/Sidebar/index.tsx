import { Box, Divider, Drawer, Paper } from "@mui/material";
import { DonutSmallOutlined } from "@mui/icons-material";
import { useContext, useState } from "react";
import DrawerList from "../DrawerList";
import { AppContext } from "../../App";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(AppContext);
  const { isLoggedIn, mainContentHeight } = context;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return isLoggedIn ? (
    <Box sx={{ height: { mainContentHeight }, minHeight: "100vh" }}>
      <Paper
        sx={{
          minHeight: "100vh",
          height: "100%",
          borderRadius: 0,
        }}
        onMouseEnter={toggleDrawer(true)}
        elevation={1}
      >
        <Box>
          <img
            src="https://techsavvy.ai/assets/images/common/favicon/favicon.ico"
            alt="logo"
            style={{ height: "40px", width: "40px", padding: "10px" }}
            loading="lazy"
          />
          <Divider sx={{ mb: 2 }} />
        </Box>
        <Box sx={{ px: 1 }}>
          <Box
            sx={{
              padding: "10px",
              bgcolor: "indigo",
              borderRadius: "8px",
              p: 1,
            }}
          >
            <DonutSmallOutlined sx={{ color: "white" }} />
          </Box>
        </Box>
      </Paper>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>
  ) : null;
};

export default Sidebar;
