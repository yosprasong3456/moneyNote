// import { Paper } from "@mui/material";
// import { useState } from "react";
// import AddSharpIcon from "@mui/icons-material/AddSharp";
import BoxProgress from "../components/BoxProgress";
import BoxInCome from "../components/BoxInCome";
import UnderLine from "../components/UnderLine";
import ListNote from "../components/ListNote";
import { Typography } from "@mui/material";
// import AddForm from "../components/AddForm";
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { authSelector, mDashboard } from "../store/slices/authSlice";
import { useSelector } from "react-redux";
import { getMyNotes, noteSelector } from "../store/slices/notesSlice";
import Loading from "../components/Loading";
import QuickTab from "../components/QuickTab";
import { getQuickNote, quickNoteSelector } from "../store/slices/quickNoteSlice";
type Props = {};

function Dashboard({}: Props) {
  // const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const noteReducer = useSelector(noteSelector);
  const quickNoteReducer = useSelector(quickNoteSelector);
  useEffect(() => {
    dispatch(getMyNotes(authReducer.authData.id));
    dispatch(mDashboard(authReducer.authData.id));
    dispatch(getQuickNote(authReducer.authData.id))

  }, []);

  return (
    <div>
      <Typography
        className="text-white underline"
        variant="caption"
        fontWeight={700}
      >
        moneyNote V21
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
        value={
          authReducer.mDashboard.expenses ? authReducer.mDashboard.expenses : 0
        }
        inCome={authReducer.mDashboard ? authReducer.mDashboard.inCome : 0}
      />

      <UnderLine />
        <QuickTab quickNote={quickNoteReducer.quickNote}/>
      <ListNote
        products={noteReducer.notes.slice(0, 5)}
        // products={noteReducer.notes}
        sx={{ height: "100%", mt: -1, borderRadius: 5, boxShadow: 3 }}
      />

      <Loading open={authReducer.isLoadSum || noteReducer.loading || quickNoteReducer.loading} />
      {/* <Fab color="primary" aria-label="add" sx={fabStyle}>
          <AddSharpIcon fontSize="large" onClick={()=>setOpenAdd(true)}/>
        </Fab>
        <AddForm open={openAdd} setOpen={setOpenAdd}/> */}
    </div>
  );
}

export default Dashboard;
