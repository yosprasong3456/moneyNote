import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  Box,
  ListItemText,
  IconButton,
  // SvgIcon,
  Divider,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
// import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/th";

type Props = {
  products: any;
  sx: any;
};

const ListNote = (props: Props) => {
  const { products = [], sx } = props;

  return (
    <div className="flex justify-center p-2">
      <Card sx={sx} className="max-w-md w-full">
        <CardHeader
          title="บันทึกรายรับ - รายจ่ายล่าสุด"
          sx={{
            textAlign: "start",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        />
        <List>
          {products.map((product: any, index: number) => {
            const hasDivider = index < products.length - 1;
            // const ago = formatDistanceToNow(product.updatedAt);

            return (
              <ListItem divider={hasDivider} key={product.id}>
                <ListItemAvatar>
                  <Box
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "warning.main",
                      textAlign: "center",
                      height: 48,
                      width: 48,
                    }}
                  >
                    <Typography variant="h2">
                      {product.status == "2" ? "💰" : "💸"}
                    </Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      noWrap
                    >{`${product.mPrice} ${product.mType} (${product.mNote})`}</Typography>
                  }
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={dayjs(product.saveDate)
                    .locale("th")
                    .add(543, "year")
                    .format("DD MMMM YYYY HH:mm")}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <IconButton edge="end">
                  <Typography color={product.status == "2" ? "red" : "green"}>
                    {product.status == "2" ? "รับ" : "จ่าย"}
                  </Typography>
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        {/* <CardActions sx={{ justifyContent: "center" }}>
          <Button
            color="inherit"
            // endIcon={(
            //   <SvgIcon fontSize="small">
            //     <ArrowRightIcon />
            //   </SvgIcon>
            // )}
            size="small"
            variant="text"
          >
            ดูทั้งหมด
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
};

export default ListNote;
