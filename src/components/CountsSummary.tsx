import React from "react";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsFillBasket3Fill } from "react-icons/bs";
export default function CountsSummary({ data }) {
  return (
    <div className="w-full flex   flex-wrap gap-4  rounded-lg">
      <div className="  flex-1  h-20    grid grid-rows-2 grid-flow-col bg-primary text-white  p-4  rounded  shadow-md items-center gap-1">
        <FiUsers className="text-3xl row-span-2" />
        <span className="  text-lg font-medium row-start-1">Users</span>
        <span className=" text-lg font-semibold row-start-2">
          {data?.usersCount}
        </span>
      </div>
      <div className=" h-20 flex-1 grid grid-rows-2 grid-flow-col bg-primary text-white p-4  rounded shadow-md items-center gap-1">
        <BsFillBasket3Fill className="text-3xl row-span-2" />
        <span className="text-lg font-medium row-start-1">Products</span>
        <span className="text-lg  font-semibold row-start-2">
          {data?.productsCount}
        </span>
      </div>
      <div className=" flex-1 h-20 grid grid-rows-2 grid-flow-col bg-primary text-white p-4  rounded shadow-md items-center gap-1">
        <AiOutlineShoppingCart className="text-3xl row-span-2" />
        <span className="text-lg font-medium row-start-1">Orders</span>
        <span className="text-lg font-semibold row-start-2">
          {data?.ordersCount}
        </span>
      </div>
      <div className=" flex-1 h-20 grid grid-rows-2 grid-flow-col bg-primary text-white p-4  rounded shadow-md items-center gap-1">
        <MdAttachMoney className="text-3xl row-span-2" />
        <span className="text-lg font-medium row-start-1">Totle Revenu</span>
        <span className="text-lg  font-semibold row-start-2">
          {data.totalRevenue}
        </span>
      </div>
    </div>
  );
}

export function CountsSummarySkeleton() {
  return (
    <div className="w-full flex gap-5 ">
      {new Array(4).fill(0).map((item: number, index: number) => {
        return (
          <div
            key={index}
            className="w-36  flex-1 h-20  grid grid-rows-2 grid-flow-col  animate-pulse bg-primary p-4 rounded  items-center gap-1"
          ></div>
        );
      })}
    </div>
  );
}
