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

type Props = {
  products: any;
  sx: any;
};

const ListNote = (props: Props) => {
  const { products = [], sx } = props;

  return (
    <Card sx={sx}>
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
                  <Typography variant="h2">💸</Typography>
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`วันที่บันทึก 20 มกราคม 2567`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                {/* <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon> */}
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "center" }}>
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
      </CardActions>
    </Card>
  );
};

export default ListNote;
