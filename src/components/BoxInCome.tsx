import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  // SvgIcon,
} from "@mui/material";
import { monthList } from "../utils/MonthList";
// import React from "react";

type Props = {
  text: string;
  sx: any;
  value: number;
  icon: string;
};

function BoxInCome(props: Props) {
  const { text, sx, value, icon } = props;
  const d = new Date();
  return (
    <div className="flex justify-center">
      <Card sx={sx} className="max-w-md w-full">
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack>
              <Typography color="text.secondary" variant="overline">
                {text} {monthList[d.getMonth()].display} {d.getFullYear() + 543}
              </Typography>
              <Typography variant="h3" fontWeight="bold" textAlign="start" ml={1}>
                {new Intl.NumberFormat("th-TH").format(value)}
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
    </div>
  );
}

export default BoxInCome;
