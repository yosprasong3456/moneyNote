import { Paper } from "@mui/material";
// import { useState } from "react";
// import AddSharpIcon from "@mui/icons-material/AddSharp";
import BoxProgress from "../components/BoxProgress";
import BoxInCome from "../components/BoxInCome";
import UnderLine from "../components/UnderLine";
import ListNote from "../components/ListNote";
// import AddForm from "../components/AddForm";


type Props = {}

function Dashboard({}: Props) {
  // const [openAdd, setOpenAdd] = useState(false)
    return (
      <div style={{ paddingBottom: 100 }}>
        

        <BoxInCome
          text="รายรับ"
          sx={{ height: "100%", mx: 3, mt: 3, borderRadius: 5, boxShadow: 3 }}
          value="20,000"
          icon="💰"
        />
        <BoxInCome
          text="รายจ่าย"
          sx={{ height: "100%", mx: 3, mt: 1, borderRadius: 5, boxShadow: 3 }}
          value="15,000"
          icon="💸"
        />

        <BoxProgress
          sx={{ height: "100%", mx: 3, mt: 1, borderRadius: 5, boxShadow: 3 }}
          value={18900}
          inCome={20000}
        />

        <UnderLine />

        <ListNote
          products={[
            {
              id: "5ece2c077e39da27658aa8a9",
              image: "/assets/products/product-1.png",
              name: "200 ค่าข้าวเที่ยง",
              // updatedAt: subHours(now, 6).getTime(),
            },
            {
              id: "5ece2c0d16f70bff2cf86cd8",
              image: "/assets/products/product-2.png",
              name: "1500 ค่า shopee",
              // updatedAt: subDays(subHours(now, 8), 2).getTime(),
            },
            {
              id: "b393ce1b09c1254c3a92c827",
              image: "/assets/products/product-5.png",
              name: "399 ชาบู",
              // updatedAt: subDays(subHours(now, 1), 1).getTime(),
            },
            {
              id: "a6ede15670da63f49f752c89",
              image: "/assets/products/product-6.png",
              name: "100 เซเว่น",
              // updatedAt: subDays(subHours(now, 3), 3).getTime(),
            },
            {
              id: "bcad5524fe3a2f8f8620ceda",
              image: "/assets/products/product-7.png",
              name: "50 ข้าวเย็น",
              // updatedAt: subDays(subHours(now, 5), 6).getTime(),
            },
          ]}
          sx={{ height: "100%", mx: 3, mt: 1, borderRadius: 5, boxShadow: 3 }}
        />
        {/* <Fab color="primary" aria-label="add" sx={fabStyle}>
          <AddSharpIcon fontSize="large" onClick={()=>setOpenAdd(true)}/>
        </Fab>
        <AddForm open={openAdd} setOpen={setOpenAdd}/> */}
      </div>
    );
}


export default Dashboard;
