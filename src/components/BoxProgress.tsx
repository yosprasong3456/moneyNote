import {
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  SvgIcon,
  Box,
  LinearProgress,
} from "@mui/material";

type Props = {
  value: number;
  inCome: number;
  sx: any;
};

const BoxProgress = (props: Props) => {
  const { value, sx, inCome } = props;
  const calPay = () => {
    let cal = (value / inCome) * 100;
    return cal.toFixed(2);
  };
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
            <Typography color="text.secondary" gutterBottom variant="overline">
              การใช้จ่ายเดือนมกราคม 2567
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {calPay()}%
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
        {calPay() > "100" ? (
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
  );
};

export default BoxProgress;
