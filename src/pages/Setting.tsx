import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import {
  delQuickNotes,
  getQuickNote,
  quickNoteSelector,
} from "../store/slices/quickNoteSlice";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import AddQuickNote from "../components/AddQuickNote";
import { quickNoteInterface } from "../utils/Interface";
import Confirm from "../components/Confirm";
import { enqueueSnackbar } from "notistack";
import Loading from "../components/Loading";

type Props = {};

const Setting = ({}: Props) => {
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const quickNoteReducer = useSelector(quickNoteSelector);
  const [openAdd, setOpenAdd] = useState(false);
  const [allItem, setAllItem] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [delText, setDelText] = useState("");
  const [delId, setDelId] = useState(0);
  useEffect(() => {
    dispatch(getQuickNote(authReducer.authData.id));
  }, []);

  const handleDelModal = (params: string, id: number) => {
    setDelText(params);
    setDelId(id);
    setDelModal(true);
  };
  const delNote = async (params: number) => {
    const del = await dispatch(delQuickNotes(params));
    if (del.payload) {
      enqueueSnackbar(`ลบข้อมูลสำเร็จ!`, {
        variant: "success",
      });
      dispatch(getQuickNote(authReducer.authData.id));
    } else {
      enqueueSnackbar(`ลบข้อมูลล้มเหลว!`, {
        variant: "error",
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        <Card
          sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
          className="max-w-md w-full"
        >
          <CardContent>
            <Typography
              textAlign="start"
              ml={2}
              mt={2}
              variant="h4"
              fontWeight="bold"
            >
              จัดการปุ่มทางลัด
            </Typography>
            <dl className="text-start p-4 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              {quickNoteReducer &&
                quickNoteReducer.quickNote
                  .slice(0, allItem ? quickNoteReducer.quickNote.length : 3)
                  .map((val: quickNoteInterface) => (
                    <div key={val.id} className="flex flex-col pb-3">
                      <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                        {val.status === "2" ? "รับ" : "จ่าย"}
                      </dt>
                      <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                      >
                        <dd className="text-lg font-semibold">
                          {val.qIcon}{" "}
                          <Box
                            component="span"
                            color={val.status == "2" ? "green" : "salmon"}
                          >
                            {val.status === "2" ? "+" : "-"}
                            {val.qPrice}
                          </Box>{" "}
                          {val.qNote}
                        </dd>
                        <dd
                          className="text-lg font-semibold text-red-500 cursor-pointer"
                          onClick={() =>
                            handleDelModal(
                              `${val.qIcon} ${val.qPrice} ${val.qNote}`,
                              val.id
                            )
                          }
                        >
                          ลบ
                        </dd>
                      </Stack>
                    </div>
                  ))}
              <Box textAlign="center">
                {quickNoteReducer.quickNote.length > 3 && !allItem && (
                  <Button  onClick={() => setAllItem(true)}>
                    ดูทั้งหมด
                  </Button>
                )}
                {allItem && (
                  <Button  onClick={() => setAllItem(false)}>
                    ซ่อน
                  </Button>
                )}
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpenAdd(true)}
                sx={{ mt: 1 }}
              >
                เพิ่มทางลัด
              </Button>
            </dl>

            <AddQuickNote open={openAdd} setOpen={setOpenAdd} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Card
          sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
          className="max-w-md w-full"
        >
          <CardContent>
            <Typography
              textAlign="start"
              ml={2}
              mt={2}
              variant="h4"
              fontWeight="bold"
            >
              รายการสิ่งที่ต้องจ่าย (dev)
            </Typography>
            <dl className="text-start p-4 text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                  บัตรเคติต
                </dt>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <dd className="text-lg font-semibold">KTC 2500</dd>
                  <dd className="text-lg font-semibold text-red-500 cursor-pointer">
                    ลบ
                  </dd>
                </Stack>
              </div>
              <Button fullWidth variant="contained">
                เพิ่มสิ่งที่ต้องจ่าย
              </Button>
            </dl>
          </CardContent>
        </Card>
      </div>
      <Confirm
        open={delModal}
        setOpen={setDelModal}
        dataId={delId}
        textBtn="ลบ"
        textHeader="ต้องการลบ ?"
        textDetail={delText}
        fncConfirm={delNote}
      />
      <Loading open={quickNoteReducer.loading} />
    </div>
  );
};

export default Setting;
