import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavTabs({ data, ...sx }) {
  const location = useLocation();
  const navigate = useNavigate();
  const value = data.findIndex((i) => i.href === location.pathname);

  return (
    <Box minWidth={"200px"} ml={5} {...sx}>
      <Tabs
        value={value === -1 ? 0 : value}
        variant="scrollable"
        scrollButtons="auto"
      >
        {data?.map((item) => (
          <Tab
            key={`key-${item.label}`}
            label={item.label}
            onClick={() => navigate(item.href)}
            sx={{ fontWeight: "bold", p: 0 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
