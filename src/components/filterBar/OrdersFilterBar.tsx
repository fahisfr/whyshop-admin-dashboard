import styles from "./css.module.css";
import React, { useEffect, useState } from "react";
import { Order } from "@/helper/interface";
import Select from "@/components/select/Select";
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
    <div className={styles.filter}>
      <div className={styles.select_wrapper}>
        <Select options={paymentOptions} onSelect={setSelecedPaymentType} />
      </div>

      <div className={styles.search}>
        <input
          placeholder="Search order id ..."
          onChange={(e) => setSearchOorderId(e.target.value)}
        />
        <AiOutlineSearch className={styles.icon_search} />
      </div>
    </div>
  );
}
