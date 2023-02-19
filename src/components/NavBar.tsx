"use client";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { GrShop } from "react-icons/gr";
import { BsFillCartPlusFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();

  return (
    <div className=" flex flex-col  h-screen w-86  p-10 gap-40">
      <div>
        <h1 className=" text-2xl font-bold">WhyShop Admin</h1>
      </div>
      <div className=" flex flex-col gap-5">
        <Link href={"/"}>
          <div
            className={` ${
              pathName === "/" ? " text-white bg-primary" : ""
            } flex items-center rounded-lg p-3 gap-5 shadow-md`}
          >
            <RxDashboard className=" text-3xl" />
            <span className="text-lg font-medium">DashBoard</span>
          </div>
        </Link>
        <Link href="/products">
          <div
            className={`nb_group ${
              pathName === "/products" ? "  text-white bg-primary" : ""
            } flex items-center rounded-lg p-3 gap-5 shadow-md`}
          >
            <GrShop className="text-3xl" />
            <span className="nb_text text-lg font-medium">Products</span>
          </div>
        </Link>
        <Link href="/orders">
          <div
            className={`nb_group ${
              pathName === "/orders" ? " text-white bg-primary" : ""
            } flex items-center rounded-lg p-3 gap-5 shadow-md`}
          >
            <BsFillCartPlusFill className=" text-3xl" />
            <span className=" text-lg font-medium">Orders</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
