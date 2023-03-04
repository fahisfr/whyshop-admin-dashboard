"use client";
import React from "react";
import styles from "./css.module.css";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/helper/context";
export default function sidePopUpMessage() {
  const { state, dispatch, reducerActionTypes } = useAppContext();
  const { trigger, error, message } = state.sidePopUpMessage;
  const close = () => {
    dispatch({ type: reducerActionTypes.CLOSE_SIDE_POPUP_MESSAGE });
  };
  return (
    <div
      className={`fixed  right-0  top-3 max-w-sm rounded-lg z-[999] transition-all duration-300 ${
        trigger ? " translate-x-0" : "translate-x-full "
      } ${error ? "bg-red-500" : "bg-green-500"}`}
    >
      <div className="flex items-center justify-center px-4 py-3 space-x-2 text-white">
        {error ? (
          <BiError className="text-2xl" />
        ) : (
          <BsCheckCircle className="text-2xl" />
        )}

        <span className="text-base font-medium">{message}</span>
        <IoMdClose onClick={close} size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}
