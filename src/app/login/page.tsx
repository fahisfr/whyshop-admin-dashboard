"use client";
import React, { useState } from "react";
import axios from "@/helper/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setCookies } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import { useAppContext } from "@/helper/context";
export default function Page() {
  const { showSuccessMessage } = useAppContext();
  const [number, setNumber] = useState<number>(1111111111);
  const [password, setPassword] = useState<string>("fahis123");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const login = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/admin/login", { password, number });
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.accessToken);
      setCookies("auth_token", data.refreshToken);
      showSuccessMessage(data.message);
    },
  });
  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    login.mutate();
  };

  return (
    <div className=" flex justify-center   text-red-700  bg-theme-secondary  pt-14 p-4 items-center  rounded-lg fixed inset-0">
      <div className=" w-full  shadow-lg    max-w-lg rounded-lg  px-6 py-10   mb-auto  bg-white dark:bg-black/50  ">
        <h2 className="  text-center font-bold  text-2xl">
          Whyshop Admin-login
        </h2>
        <div className="mt-4 ">
          <form className="flex gap-4 flex-col " onSubmit={onSubmit}>
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
                <div
                  className=" self-center text-xl cursor-pointer  text-gray-700"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <div className="w-full mt-3">
              <button
                disabled={login.isLoading}
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
