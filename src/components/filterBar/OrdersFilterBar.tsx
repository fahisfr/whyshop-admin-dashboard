import React, { useEffect, useState } from "react";
import { Order } from "@/helper/interface";
import Select from "@/components/Select";
import { AiOutlineSearch } from "react-icons/ai";
import { paymentTypes } from "@/helper/selectOptions";

interface FilterBarProps {
  orders: Order[];
  setFilteredOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function ProductsFilterBar({
  orders,
  setFilteredOrders,
}: FilterBarProps) {
  const [searchOrderId, setSearchOorderId] = useState<string>("");
  const [selecedPaymentType, setSelecedPaymentType] = useState<string>("all");

  useEffect(() => {
    let filterdOrders = orders;
    if (searchOrderId) {
      filterdOrders = filterdOrders.filter((order) =>
        order._id?.includes(searchOrderId)
      );
    }
    if (selecedPaymentType !== "all") {
      filterdOrders = filterdOrders.filter(
        (order) => order.paymentType === selecedPaymentType
      );
    }

    setFilteredOrders(filterdOrders);
  }, [searchOrderId, selecedPaymentType, orders]);

  return (
    <div className="w-full p-3 flex gap-3 rounded bg-theme-primary  justify-evenly   shadow">
      <div className=" max-w-xl ">
        <Select options={paymentTypes} onSelect={setSelecedPaymentType} />
      </div>
      <div className=" flex flex-grow  bg-theme-primary items-center  rounded-lg border border-gray-300 pr-2">
        <input
          className="w-full h-full pl-2  bg-theme-primary rounded-lg  outline-none "
          placeholder="Search order id ..."
          onChange={(e) => setSearchOorderId(e.target.value)}
        />
        <AiOutlineSearch className=" text-2xl" />
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="w-full bg-theme-primary p-3 flex gap-3justify-evenly   gap-3 ">
      <div className=" w-40 rounded-lg skeleton skeleton h-10 "></div>
      <div className=" w-full rounded-lg  skeleton h-10"></div>
    </div>
  );
}
