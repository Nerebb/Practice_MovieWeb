import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import BasicModal from "../components/BasicModal";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh"}}>
      <ScrollToTop />
      <BasicModal />
      <AlertMsg />
      <Header />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <Footer />
    </Stack>
  );
}

export default MainLayout;
