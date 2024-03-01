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
  // Divider,
  Box,
} from "@mui/material";
import { TransitionProps, enqueueSnackbar } from "notistack";
import React from "react";
import UnderLine from "./UnderLine";
import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import { noteSelector } from "../store/slices/notesSlice";
import { mTypeList } from "../constants";
import { addQuickNotes, getQuickNote } from "../store/slices/quickNoteSlice";

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

const AddQuickNote = ({ open, setOpen }: Props) => {
  const [mKind, setMKind] = React.useState(mTypeList[0]);
  const [mType, setMType] = React.useState("1");
  const [comment, setComment] = React.useState("");
  const [mPrice, setMPrice] = React.useState(0);
  const [priceNull, setPriceNull] = React.useState(false);
  const [mIcon, setMIcon] = React.useState("");
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const noteReducer = useSelector(noteSelector);

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMType((event.target as HTMLInputElement).value);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setMKind(event.target.value as string);
  };
  const handleClose = () => {
    setMPrice(0);
    setComment(""), setMKind(mTypeList[0]);
    setMType("1");
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!mPrice) {
      setPriceNull(true);
      return;
    }
    let data = {
      id: 0,
      qType: mKind,
      qIcon: mIcon,
      qPrice: mPrice,
      qNote: comment,
      status: mType,
      userId: authReducer.authData.id,
    };
    const insert = await dispatch(addQuickNotes(data));
    if (insert.payload) {
      console.log("Insert");
      enqueueSnackbar(`บันทึกข้อสำเร็จ!`, {
        variant: "success",
      });
      dispatch(getQuickNote(authReducer.authData.id));
      handleClose();
    } else {
      enqueueSnackbar(`บันทึกข้อมูลล้มเหลว!`, {
        variant: "error",
      });
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{ sx: { borderRadius: 5 } }}
      >
        <DialogTitle>
          📝 เพิ่มทางลัด{" "}
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
            <FormControlLabel value="2" control={<Radio />} label="💰 รายรับ" />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="💸 รายจ่าย"
            />
          </RadioGroup>
          <UnderLine />
          <Stack spacing={1}>
            <TextField
              fullWidth
              label="ใส่ Emoji 🥹"
              variant="outlined"
              type="text"
              value={mIcon}
              onChange={(e: any) => setMIcon(e.target.value)}
            />
            <TextField
              fullWidth
              label="จำนวนเงิน"
              variant="outlined"
              type="number"
              value={mPrice === 0 ? "" : mPrice}
              error={priceNull}
              onChange={(e: any) => setMPrice(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mKind}
                label="ประเภท"
                onChange={handleChange}
              >
                {mTypeList.map((val: string, index: number) => (
                  <MenuItem key={index} value={val}>
                    {val}
                  </MenuItem>
                ))}
                {/* <MenuItem value="ค่าข้าว">ค่าข้าว</MenuItem>
                <MenuItem value="จ่ายบิล">จ่ายบิล</MenuItem>
                <MenuItem value="ช็อปปิ้ง">ช็อปปิ้ง</MenuItem>
                <MenuItem value="อื่นๆ">อื่นๆ</MenuItem> */}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="บันทึกข้อความ"
              variant="outlined"
              type="text"
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
            />
            <Box p={1} />
            <Button
              variant="contained"
              disabled={noteReducer.loading}
              onClick={() => handleSubmit()}
            >
              {noteReducer.loading ? "loading..." : "บันทึก"}
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
};

export default AddQuickNote;
