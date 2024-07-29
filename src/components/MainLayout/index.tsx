import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useContext } from "react";
import { AppContext } from "../../App";

const MainLayout = (props: any) => {
  const context = useContext(AppContext);
  const { mainContentRef } = context;

  return (
    <Box
      display="flex"
      sx={{
        backgroundColor: "#f1f1f1",
        height: "100%",
      }}
    >
      <Sidebar />
      <Box ref={mainContentRef} width={`calc(100% - 60px)`}>
        <Navbar />
        <Box width="100%">{props?.children}</Box>
      </Box>
    </Box>
  );
};
export default MainLayout;
