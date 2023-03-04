"use client";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { BsFillBasket3Fill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FaUserFriends } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

export default function NavBar() {
  const pathName = usePathname();
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className=" h-screen  overflow-auto  flex gap-1 flex-col sm:justify-between -sm:order-2 px-6 py-4 flex-shrink-0  shadow-md -sm:items-center">
      <div>
        <h1 className="text-2xl hidden lg:block  text-primary  ">
          WhyShop Admin
        </h1>
      </div>
      <div className="flex flex-col  -sm:flex-row gap-5 ">
        <Link href={"/"}>
          <div
            className={` ${
              pathName === "/" ? " text-white bg-primary" : ""
            }   flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5   shadow-md`}
          >
            <RxDashboard className=" text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">
              DashBoard
            </span>
          </div>
        </Link>
        <Link href="/products">
          <div
            className={` ${
              pathName?.startsWith("/products") && "  text-white bg-primary"
            } flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5   shadow-md`}
          >
            <BsFillBasket3Fill className="text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">
              Products
            </span>
          </div>
        </Link>
        <Link href="/orders">
          <div
            className={` ${
              pathName?.startsWith("/orders") && " text-white bg-primary"
            } flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5   shadow-md`}
          >
            <BsFillCartPlusFill className=" text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">Orders</span>
          </div>
        </Link>
        <Link href="/users">
          <div
            className={` ${
              pathName?.startsWith("/users") && " text-white bg-primary"
            } flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5   shadow-md`}
          >
            <FaUserFriends className=" text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">Users</span>
          </div>
        </Link>{" "}
      </div>{" "}
      <div className="w-full">
        <input
          type="checkbox"
          id="theme-toggle"
          onChange={changeTheme}
          className="in hidden"
        />
        <label
          htmlFor="theme-toggle"
          className="theme-toggle-label w-[4rem] h-8  rounded-3xl flex bg-white"
        >
          <BsSunFill />
        </label>
      </div>
    </div>
  );
}
