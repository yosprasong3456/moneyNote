import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  // SvgIcon,
  Box,
  LinearProgress,
} from "@mui/material";
import { monthList } from "../utils/MonthList";

type Props = {
  value: any;
  inCome: any;
  sx: any;
};

const BoxProgress = (props: Props) => {
  const d = new Date()
  const { value, sx, inCome } = props;
  // const calPay = () => {
  //   let cal = (value / inCome) * 100;
  //   return cal.toFixed(2);
  // };
  console.log(Math.floor((value / inCome) * 100));
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
                gutterBottom
                variant="overline"
                textAlign="start"
              >
                การใช้จ่าย {monthList[d.getMonth()].display} {d.getFullYear() + 543}

              </Typography>
              <Typography variant="h3" fontWeight="bold" textAlign="start" ml={1}>
                เหลือ {new Intl.NumberFormat("th-TH").format(inCome - value)}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <Typography variant="h2">🛍️</Typography>
            </Avatar>
          </Stack>
          {Math.floor((value / inCome) * 100) > 100 ? (
            "ติดลบแล้ว 😰"
          ) : (
            <Box sx={{ mt: 3 }}>
              <LinearProgress
                value={(value / inCome) * 100}
                variant="determinate"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BoxProgress;
