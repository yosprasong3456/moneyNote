import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
//   DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TransitionProps } from "notistack";
import React from "react";
import UnderLine from "./UnderLine";

type Props = {
  open: boolean;
  setOpen: any;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AddForm({ open, setOpen }: Props) {
  const [age, setAge] = React.useState("1");
  const [mType, setMType] = React.useState("2");
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMType((event.target as HTMLInputElement).value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        //   PaperProps={{
        //     component: 'form',
        //     onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //       event.preventDefault();
        //       const formData = new FormData(event.currentTarget);
        //       const formJson = Object.fromEntries((formData as any).entries());
        //       const email = formJson.email;
        //       console.log(email);
        //       handleClose();
        //     },
        //   }}
      >
        <DialogTitle>
          📝 บันทึก{" "}
          <Button
            onClick={handleClose}
            color="error"
            sx={{
              position: "absolute",
              right: 8,
              top: 14,
            }}
          >
            ปิด
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
              will send updates occasionally. */}
          </DialogContentText>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center" }}
            value={mType}
            onChange={handleChangeRadio}
          >
            <FormControlLabel value="1" control={<Radio />} label="💰 รายรับ" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="💸 รายจ่าย"
            />
          </RadioGroup>
          <UnderLine />
          <Stack spacing={1}>
          <TextField
              fullWidth
              label="จำนวนเงิน"
              variant="outlined"
              type="number"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="ประเภท"
                onChange={handleChange}
              >
                <MenuItem value="1">ค่ากาแฟ</MenuItem>
                <MenuItem value="2">ค่าข้าวเที่ยง</MenuItem>
                <MenuItem value="3">ค่าข้าวเย็น</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="บันทึกข้อความ"
              variant="outlined"
              type="text"
            />
            <Button variant="contained" onClick={handleClose}>
              บันทึก
            </Button>
          </Stack>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}

export default AddForm;
