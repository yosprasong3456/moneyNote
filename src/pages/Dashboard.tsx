// import { Paper } from "@mui/material";
// import { useState } from "react";
// import AddSharpIcon from "@mui/icons-material/AddSharp";
import BoxProgress from "../components/BoxProgress";
import BoxInCome from "../components/BoxInCome";
import UnderLine from "../components/UnderLine";
import ListNote from "../components/ListNote";
import { Box, Typography } from "@mui/material";
// import AddForm from "../components/AddForm";
import { useAppDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { authSelector, mDashboard } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { getMyNotes, noteSelector } from "../store/slices/notesSlice";
import Loading from "../components/Loading";
type Props = {};

function Dashboard({}: Props) {
  // const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const noteReducer = useSelector(noteSelector);
  const [money, setMoney]: any = useState("");
  useEffect(() => {
    sumMoney();
    dispatch(getMyNotes(authReducer.authData.data.id));
    console.log("noteReducer", noteReducer.notes);
  }, []);

  const sumMoney = async () => {
    const sum = await dispatch(mDashboard(authReducer.authData.data.id));
    if (sum.payload) {
      setMoney(sum.payload.data);
    }
  };
  return (
    <div style={{ paddingBottom: 100 }}>
      <Typography
          className="text-white underline"
          variant="caption"
          fontWeight={700}
        >
          moneyNote
        </Typography>
      <BoxInCome
        text="รายรับ"
        sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
        value={authReducer.mDashboard ? authReducer.mDashboard.inCome : 0}
        icon="💰"
      />
      <BoxInCome
        text="รายจ่าย"
        sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
        value={authReducer.mDashboard ? authReducer.mDashboard.expenses : 0}
        icon="💸"
      />

      <BoxProgress
        sx={{ height: "100%", mx: 1, mt: 1, borderRadius: 5, boxShadow: 3 }}
        value={money ? money.expenses : 0}
        inCome={money ? money.inCome : 0}
      />

      <UnderLine />

        <ListNote
          // products={noteReducer.notes.slice(0, 5)}
          products={noteReducer.notes}
          sx={{ height: "100%", mt: -1, borderRadius: 5, boxShadow: 3 }}
        />

      <Loading open={authReducer.isLoadSum || noteReducer.loading}/>
      {/* <Fab color="primary" aria-label="add" sx={fabStyle}>
          <AddSharpIcon fontSize="large" onClick={()=>setOpenAdd(true)}/>
        </Fab>
        <AddForm open={openAdd} setOpen={setOpenAdd}/> */}
    </div>
  );
}

export default Dashboard;
