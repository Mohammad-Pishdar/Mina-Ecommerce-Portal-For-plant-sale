import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  //getting user information from redux store
  const userInformation = useSelector((state) => state.signIn);
  const { userInfo } = userInformation;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetails(userInfo._id));
  }, [dispatch, userInfo]);
  return <div></div>;
}
