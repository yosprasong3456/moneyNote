import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
//   Button,
  Box,
//   Typography,
} from "@mui/material";
import { TransitionProps } from "notistack";
import React from "react";

type Props = {
  open: boolean;
  setOpen: Function;
  dataId: number;
  textBtn: string;
  textHeader: string;
  textDetail: string;
  resetText?: Function;
  fncConfirm?: Function;
};
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Confirm({ open, setOpen, dataId, textHeader, textBtn, textDetail, resetText, fncConfirm }: Props) {

  const handleClose = () => {
    setOpen(false);
    if (resetText) resetText("");
  };

  const handleConfirm = () =>{
    if(fncConfirm)fncConfirm(dataId)
    handleClose()
  }
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { borderRadius: 5 , p: 1}, }}
      >
        {textHeader && <DialogTitle fontWeight="bold">{textHeader}</DialogTitle> }
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {textDetail}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="flex shrink-0 flex-wrap items-center justify-center px-4 text-blue-gray-500">
            <Box
              data-ripple-dark="true"
              data-dialog-close="true"
              className="middle none center mr-1 rounded-lg py-3 px-6  text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => handleClose()}
              component="button"
            >
              ยกเลิก
            </Box>
            {textBtn && (
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-xl bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => handleConfirm()}
              >
                {textBtn}
              </button>
            )}
          </div>
        </DialogActions>
      </Dialog>
      {/* <div
        data-dialog-backdrop="dialog"
        data-dialog-backdrop-close="true"
        className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          data-dialog="dialog"
          className="relative m-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl"
        >
          <div className="flex shrink-0 items-center p-4 font-sans text-2xl font-semibold leading-snug text-blue-gray-900 antialiased">
            Its a simple dialog.
          </div>
          <div className="relative border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 p-4 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
            The key to more success is to have a lot of pillows. Put it this
            way, it took me twenty five years to get these plants, twenty five
            years of blood sweat and tears, and I&apos;m never giving up,
            I&apos;m just getting started. I&apos;m up to something. Fan luv.
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end p-4 text-blue-gray-500">
            <button
              data-ripple-dark="true"
              data-dialog-close="true"
              className="middle none center mr-1 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Cancel
            </button>
            <button
              data-ripple-light="true"
              data-dialog-close="true"
              className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="w-full pt-5 px-4 mb-8 mx-auto ">
        <div className="text-sm text-gray-700 py-1">
          Made with{" "}
          <a
            className="text-gray-700 font-semibold"
            href="https://www.material-tailwind.com/docs/html/dialog?ref=tailwindcomponents"
            target="_blank"
          >
            Material Tailwind
          </a>{" "}
          by{" "}
          <a
            href="https://www.creative-tim.com?ref=tailwindcomponents"
            className="text-gray-700 font-semibold"
            target="_blank"
          >
            {" "}
            Creative Tim
          </a>
          .
        </div>
      </div> */}
    </>
  );
}

export default Confirm;
