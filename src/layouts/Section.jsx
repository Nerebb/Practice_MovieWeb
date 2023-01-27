import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SliderContainer from "../components/SliderContainer";

function Section({ title, category, type, ...others }) {
  return (
    <Stack spacing={2} mt={10} width={1} px={2} {...others}>
      <Typography variant="h4">{title}</Typography>
      <Box>
        <SliderContainer category={category} type={type} />
      </Box>
    </Stack>
  );
}

export default Section;
