import React from "react";
import styles from "./css.module.css";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CountsSummary({ data }) {
  return (
    <div className="w-full flex gap-5 ">
      <div className="w-36  h-20  grid grid-rows-2 grid-flow-col bg-primary text-white p-4 rounded-lg shadow-md items-center gap-1">
        <FiUsers className="text-3xl row-span-2" />
        <span className="  text-lg font-medium row-start-1">Users</span>
        <span className="text-2xl font-semibold row-start-2">
          {data?.usersCount}
        </span>
      </div>

      <div className="w-36 h-20 grid grid-rows-2 grid-flow-col bg-primary text-white p-4 rounded-lg shadow-md items-center gap-1">
        <AiOutlineShoppingCart className="text-3xl row-span-2" />
        <span className="text-lg font-medium row-start-1">Orders</span>
        <span className="text-2xl font-semibold row-start-2">
          {data?.ordersCount}
        </span>
      </div>

      <div className="w-36 h-20 grid grid-rows-2 grid-flow-col bg-primary text-white p-4 rounded-lg shadow-md items-center gap-1">
        <AiOutlineShoppingCart className="text-3xl row-span-2" />
        <span className="text-lg font-medium row-start-1">Products</span>
        <span className="text-2xl font-semibold row-start-2">
          {data?.productsCount}
        </span>
      </div>
    </div>
  );
}

export function CountsSummarySkeleton() {
  return (
    <div className="w-full flex gap-5 ">
      {new Array(3).fill(0).map((item: number, index: number) => {
        return (
          <div className="w-36  h-20  grid grid-rows-2 grid-flow-col  animate-pulse bg-primary p-4 rounded-lg  items-center gap-1"></div>
        );
      })}
    </div>
  );
}
