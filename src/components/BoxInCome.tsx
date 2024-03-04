import {
  Card,
  CardContent,
  Stack,
  Typography,
  // SvgIcon,
} from "@mui/material";
import { currentMonth, monthList } from "../utils/MonthList";
import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
// import React from "react";

type Props = {
  text: string;
  sx: any;
  value: any;
};

function BoxInCome(props: Props) {
  const { text, sx, value } = props;
  const authReducer = useSelector(authSelector);

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
              <Typography
                color="text.secondary"
                variant="overline"
                textAlign="start"
              >
                {text}{" "}
                {
                  monthList[
                    currentMonth(
                      authReducer.authData.dateStartNote
                        ? authReducer.authData.dateStartNote
                        : ""
                    ) - 1
                  ].display
                }
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                textAlign="start"
                ml={1}
              >
                {new Intl.NumberFormat("th-TH").format(value)}
              </Typography>
            </Stack>
            {/* <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <Typography variant="h2">{icon}</Typography>
            </Avatar> */}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoxInCome;
