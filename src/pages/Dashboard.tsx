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
type Props = {};

function Dashboard({}: Props) {
  // const [openAdd, setOpenAdd] = useState(false)
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);
  const noteReducer = useSelector(noteSelector);
  useEffect(() => {
    dispatch(getMyNotes(authReducer.authData.data.id));
    dispatch(mDashboard(authReducer.authData.data.id));
  }, []);

  return (
    <div>
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
        value={
          authReducer.mDashboard.expenses ? authReducer.mDashboard.expenses : 0
        }
        inCome={authReducer.mDashboard ? authReducer.mDashboard.inCome : 0}
      />

      <UnderLine />

      <div className="flex flex-col m-auto p-auto max-w-md w-full">
        <h1 className="flex mx-4 font-bold text-xl text-gray-800">ทางลัด</h1>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-2">
          <div className="flex flex-nowrap">
            <div className="inline-block px-2">
              <div className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Typography variant="h1">➕</Typography>
                <Typography variant="h5" noWrap>
                  เพิ่มทางลัด
                </Typography>
              </div>
            </div>
            {/* --------------------- */}
            <div className="inline-block px-2">
              <div className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Typography variant="h1">🍔</Typography>
                <Typography variant="h5" noWrap>
                  ข้าวเที่ยง
                </Typography>
              </div>
            </div>
            {/* --------------------- */}
            <div className="inline-block px-2">
              <div className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Typography variant="h1">🧋</Typography>
                <Typography variant="h5" noWrap>
                  ชานม
                </Typography>
              </div>
            </div>
            {/* --------------------- */}
            <div className="inline-block px-2">
              <div className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Typography variant="h1">🍺</Typography>
                <Typography variant="h5" noWrap>
                  เบียร์ 1 ขวด
                </Typography>
              </div>
            </div>
            {/* --------------------- */}
          </div>
        </div>
      </div>
      <ListNote
        products={noteReducer.notes.slice(0, 5)}
        // products={noteReducer.notes}
        sx={{ height: "100%", mt: -1, borderRadius: 5, boxShadow: 3 }}
      />

      <Loading open={authReducer.isLoadSum || noteReducer.loading} />
      {/* <Fab color="primary" aria-label="add" sx={fabStyle}>
          <AddSharpIcon fontSize="large" onClick={()=>setOpenAdd(true)}/>
        </Fab>
        <AddForm open={openAdd} setOpen={setOpenAdd}/> */}
    </div>
  );
}

export default Dashboard;
