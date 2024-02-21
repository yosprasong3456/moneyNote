// import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../store/slices/authSlice";
import BoxProfile from "../components/BoxProfile";
import TimeLineFull from "../components/TimeLineFull";

type Props = {};

function Profile({}: Props) {
  const authReducer = useSelector(authSelector);
  return (
    <>
      <BoxProfile fullName={authReducer.authData.data.fullName} />
      <TimeLineFull />
    </>
  );
}

export default Profile;
