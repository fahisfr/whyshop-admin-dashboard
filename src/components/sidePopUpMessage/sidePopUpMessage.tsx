import React from "react";
import styles from "./css.module.css";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
export default function sidePopUpMessage({
  trigger = true,
  error = true,
  message = "aaaaaaaaaaaaa",
}) {
  
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
        <IoMdClose size={20} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}
