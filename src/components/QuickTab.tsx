import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, mDashboard } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import { enqueueSnackbar } from "notistack";
import { addMyNotes, getMyNotes } from "../store/slices/notesSlice";
import { quickNoteInterface } from "../utils/Interface";

type Props = {
  quickNote: quickNoteInterface[];
};

const QuickTab = ({ quickNote }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authReducer = useSelector(authSelector);

  const handleInsert = async(params: quickNoteInterface)=>{
    let data = {
        mType: params.qType,
        mPrice: params.qPrice,
        mNote: params.qNote,
        status: params.status,
        userId: authReducer.authData.id,
    }
    const insert = await dispatch(addMyNotes(data))
    if(insert.payload){
        console.log('Insert')
        enqueueSnackbar(`บันทึกข้อสำเร็จ!`, {
            variant: "success",
          });
          dispatch(getMyNotes(authReducer.authData.id))
          dispatch(mDashboard(authReducer.authData.id))
        
    } else {
        enqueueSnackbar(`บันทึกข้อมูลล้มเหลว!`, {
          variant: "error",
        });
    }
  }
  return (
    <div className="flex flex-col m-auto p-auto max-w-md w-full">
      <h1 className="flex mx-4 font-bold text-xl text-gray-800">ทางลัด</h1>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-2">
        <div className="flex flex-nowrap">
          {quickNote &&
            quickNote.map((val: quickNoteInterface) => (
              <div key={val.id} onClick={()=>handleInsert(val)} className="inline-block px-2 cursor-pointer">
                <div className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <p className="text-7xl">{val.qIcon}</p>
                  <p className="text-xl text-nowrap font-medium">{val.qNote}</p>
                </div>
              </div>
            ))}
          <div className="inline-block px-2 cursor-pointer">
            <div
              onClick={() => navigate("/setting")}
              className="h-32 w-32 p-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <p className="text-7xl">➕</p>
              <p className="text-xl text-nowrap font-medium">เพิ่มทางลัด</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTab;
