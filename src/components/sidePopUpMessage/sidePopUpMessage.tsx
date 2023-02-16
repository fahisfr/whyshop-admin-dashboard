"use client";
import React from "react";
import styles from "./css.module.css";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { getContext } from "@/helper/context";
export default function sidePopUpMessage() {
  const { state, dispatch, reducerActionTypes } = getContext();
  const { trigger, error, message } = state.sidePopUpMessage;
  const close = () => {
    dispatch({ type: reducerActionTypes.CLOSE_SIDE_POPUP_MESSAGE });
  };
  return (
    <div
      className={`${styles.side_popup_container} ${
        trigger ? styles.sb_mount : styles.sb_unmount
      } `}
      style={{
        backgroundColor: `${error ? "red" : "green"} `,
      }}
    >
      <div className={styles.sp_body}>
        {error ? (
          <BiError className={styles.sp_icon_error} />
        ) : (
          <BsCheckCircle className={styles.sp_icon_success} />
        )}

        <span className={styles.sp_message}>{message}</span>
        <IoMdClose onClick={close} size={20} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}
