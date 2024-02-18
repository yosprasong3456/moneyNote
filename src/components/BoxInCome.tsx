import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  SvgIcon,
} from "@mui/material";
import React from "react";

type Props = {
  text: string;
  sx: any;
  value: string;
  icon: string;
};

function BoxInCome(props: Props) {
  const { text, sx, value, icon } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack>
            <Typography color="text.secondary" variant="overline">
              {text} มกราคม 2567
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <Typography variant="h2">{icon}</Typography>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default BoxInCome;
