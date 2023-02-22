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
    <div className="flex  flex-col  -sm:order-2 px-6 py-4 sm:gap-40  shadow-md -sm:items-center">
      <div>
        <h1 className="text-2xl hidden lg:block  text-primary  ">WhyShop Admin</h1>
      </div>
      <div className="flex flex-col  -sm:flex-row gap-5 ">
        <Link href={"/"}>
          <div
            className={` ${
              pathName === "/" ? " text-white bg-primary" : ""
            }   flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5 shadow-md`}
          >
            <RxDashboard className=" text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">
              DashBoard
            </span>
          </div>
        </Link>
        <Link href="/products">
          <div
            className={`nb_group ${
              pathName === "/products" ? "  text-white bg-primary" : ""
            } flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5 shadow-md`}
          >
            <GrShop className="text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">
              Products
            </span>
          </div>
        </Link>
        <Link href="/orders">
          <div
            className={` ${
              pathName === "/orders" ? " text-white bg-primary" : ""
            } flex rounded-full items-center lg:rounded-lg p-3 lg:gap-5 shadow-md`}
          >
            <BsFillCartPlusFill className=" text-3xl" />
            <span className="text-lg lg:block  hidden font-medium">Orders</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
