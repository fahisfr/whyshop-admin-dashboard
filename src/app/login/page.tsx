"use client";
import React, { useState } from "react";
import axios from "@/helper/axios";
import { AiOutlineEye } from "react-icons/ai";
export default function Page() {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [number, setNumber] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className=" flex justify-center  bg-theme-secondary  pt-14 p-4 items-center  rounded-lg fixed inset-0">
      <div className=" w-full  max-w-[30rem] rounded p-6  mb-auto  bg-white dark:bg-black/50  ">
        <h2 className="  text-center font-bold  text-2xl">
          Whyshop Admin-login
        </h2>

        <div className="mt-4">
          <form className="flex gap-4 flex-col ">
            <div>
              <label htmlFor="number">Phone Number</label>
              <input
                name="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full h-10 pl-3 border-gray-300  dark:bg-black/50 border rounded-sm outline-none"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="w-full h-10 rounded-sm flex pr-2  dark:bg-black/50 border-gray-300 border">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full pl-3  rounded-sm outline-none dark:bg-black/50 "
                />
                <AiOutlineEye
                  className="self-center text-xl cursor-pointer  text-gray-700 "
                  onClick={(e) => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="w-full">
              <button
                disabled={btnLoading}
                className="btn bg-primary text-white h-10 w-full  rounded "
              >
                <span className="btn-text  font-semibold text-lg">Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
