import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

function BlankLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
