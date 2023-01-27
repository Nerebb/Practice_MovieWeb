import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

function Footer() {
  const { id } = useParams();
  return (
    <Typography
      width={1}
      textAlign="center"
      height={20}
      sx={id ? { position: "absolute", bottom: 0 } : { position: "relative" }}
    >
      Copyright © <span>Nereb</span> 2023
    </Typography>
  );
}

export default Footer;
