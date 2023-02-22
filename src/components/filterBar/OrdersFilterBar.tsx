import React, { useEffect, useState } from "react";
import { Order } from "@/helper/interface";
import Select from "@/components/Select";
import { AiOutlineSearch } from "react-icons/ai";

const paymentOptions = [
  { value: "all", label: "All Payment Types" },
  { value: "cod", label: "Cash on Delivery" },
  { value: "online", label: "Online Payment" },
];

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
    <div className="w-full p-3 flex gap-3  justify-evenly  bg-white">
      <div className=" max-w-xl">
        <Select options={paymentOptions} onSelect={setSelecedPaymentType} />
      </div>
      <div className=" flex flex-grow  items-center  rounded-lg border border-gray-300 pr-2">
        <input
          className="w-full h-full pl-2  rounded-lg  outline-none "
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
    <div className="w-full p-3 flex gap-3  justify-evenly  bg-white">
      <div className=" max-w-xl"></div>
      <div className=" flex flex-grow  items-center  rounded-lg border border-gray-300 pr-2">
     
      </div>
    </div>
  );
}
