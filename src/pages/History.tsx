import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
import { noteSelector, getMyNotes, delMyNotes } from "../store/slices/notesSlice";
import { useAppDispatch } from "../store/store";

import dayjs from "dayjs";
import "dayjs/locale/th";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Confirm from "../components/Confirm";
import { enqueueSnackbar } from "notistack";

type Props = {};

function History({}: Props) {
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const noteReducer = useSelector(noteSelector);
  const [notes, setNotes] = useState(null);
  const [textDel, setTextDel] = useState("")
  const [openConfirm, setOpenConfirm] = useState(false)
  const [dataId, setDataId] = useState("")
  useEffect(() => {
    dispatch(getMyNotes(authReducer.authData.data.id));
  }, [dispatch]);
  useEffect(() => {
    reduceData();
  }, [noteReducer.notes]);

  const reduceData = () => {
    const objects = noteReducer.notes;
    console.log("objects", objects);
    const groupedObjects = objects.reduce((grouped: any, object) => {
      const { date }: any = object;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(object);
      return grouped;
    }, {});
    setNotes(groupedObjects);
  };

  const delItem =(params: string,id:string)=>{
    setTextDel(params)
    setDataId(id)
    setOpenConfirm(true)
  }

  const delNote =async(params:string)=>{
    const del = await dispatch(delMyNotes(params))
    if(del.payload){
      console.log('Insert')
        enqueueSnackbar(`ลบข้อมูลสำเร็จ!`, {
            variant: "success",
          });
          dispatch(getMyNotes(authReducer.authData.data.id))
    } else {
        enqueueSnackbar(`ลบข้อมูลล้มเหลว!`, {
          variant: "error",
        });
    }
  }

  return (
    <Box >
      <Typography
        className="text-white underline"
        variant="caption"
        fontWeight={700}
      >
        ประวัติ
      </Typography>

      <div className="flex justify-center">
        <Card
          sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
          className="max-w-md w-full"
        >
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack>
                <Typography color="text.secondary" variant="overline">
                  {/* {text} {monthList[d.getMonth()].display} {d.getFullYear() + 543} */}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  textAlign="start"
                  ml={1}
                ></Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "error.main",
                  height: 56,
                  width: 56,
                }}
              >
                <Typography variant="h2">{}</Typography>
              </Avatar>
            </Stack>
            <div>
              {/* {notes &&
                Object.entries(notes).map(([date, options]: any) => {
                  return (
                    <Box key={date} bgcolor="white" textAlign="start">
                      <Typography>
                        {dayjs(new Date(date))
                          .locale("th")
                          .add(543, "year")
                          .format("DD MMM YYYY")}
                      </Typography>
                      {options.map((val: any, index: number) => (
                        <Typography ml={2} key={index}>
                          <Box
                            component="span"
                            color={val.status == "2" ? "green" : "salmon"}
                            fontWeight="bold"
                          >
                            {val.status == "2" ? "+" : "-"}
                            {val.mPrice}
                          </Box>{" "}
                          {val.mType} {val.mNote}
                        </Typography>
                      ))}
                    </Box>
                  );
                })} */}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center p-2">
        <div className="bg-white rounded-xl shadow-md max-w-md w-full p-4">
          <div className="space-y-2 border-l-2 border-dashed">
            {notes &&
              Object.entries(notes).map(([date, options]: any) => {
                return (
                  <div key={date} className="relative w-full text text-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500"
                    >
                      <path
                        // fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        // clip-rule="evenodd"
                      />
                    </svg>
                    <div className="ml-6">
                      <h4 className="font-bold text-blue-500 text-xl">
                        {dayjs(new Date(date))
                          .locale("th")
                          .add(543, "year")
                          .format("DD MMM YYYY")}
                      </h4>
                      {options.map((val: any, index: number) => (
                        // <Grid>

                        //   <p>Hello</p>
                        // </Grid>
                        <Grid container mt={2} key={index}>
                          <Grid item xs={10}>
                            <p className="max-w-screen-sm text-gray-500">
                              <Box
                                component="span"
                                color={val.status == "2" ? "green" : "salmon"}
                                fontWeight="bold"
                              >
                                {val.status == "2" ? "+" : "-"}
                                {val.mPrice}
                              </Box>{" "}
                              {val.mType} {val.mNote}
                            </p>
                            <Divider />

                          </Grid>
                          <Grid item xs={2} >
                            {/* <p className="mt-2 max-w-screen-sm text-red-500 text-end"> */}
                            <Button color="error" variant="outlined" onClick={()=>delItem(`${val.status == "2" ? "+" : "-"}
                                ${val.mPrice} ${val.mType} ${val.mNote}`, val.id)}>
                              <svg className=" bi bi-trash-fill" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                              </svg>
                            </Button>
                          
                            {/* </p> */}

                          </Grid>
                        </Grid>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Confirm open={openConfirm} setOpen={setOpenConfirm} dataId={dataId} textHeader="ต้องการลบ"textBtn="ลบ" textDetail={textDel} resetText={setTextDel} fncConfirm={delNote}/>
    </Box>
  );
}

export default History;
