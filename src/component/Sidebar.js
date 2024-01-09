// HorizontalNav.js
import React from "react";
import { Button, Stack } from "@mui/material";

const HorizontalNav = ({ categories }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {categories.map((category, index) => (
        <Button variant="text" key={index}>
          {category}
        </Button>
      ))}
    </Stack>
  );
};

export default HorizontalNav;
