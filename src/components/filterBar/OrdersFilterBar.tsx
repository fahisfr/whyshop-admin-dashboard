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
  const [searchText, setSearchText] = useState<string>("");
  const [searchOrderId, setSearchOorderId] = useState<string>("");
  const [selecedPaymentType, setSelecedPaymentType] = useState<string>("all");
  const [selecedOrderType, setSelecedOrderType] = useState<string>("all");
  useEffect(() => {
    let newOrdersArry = orders;
    if (searchOrderId) {
      newOrdersArry = newOrdersArry.filter((order) =>
        order.paymentId?.includes(searchOrderId)
      );
    }
    if (selecedPaymentType !== "all") {
      newOrdersArry = newOrdersArry.filter(
        (order) => order.paymentType === selecedPaymentType
      );
    }

  

    setFilteredOrders(newOrdersArry);
  }, [searchText, selecedPaymentType, orders]);

  return (
    <div className={styles.filter}>
      <div className={styles.select_wrapper}>
        <Select options={paymentOptions} onSelect={setSelecedPaymentType} />
      </div>
 
      <div className={styles.search}>
        <input
          placeholder="Search..."
          onChange={(e) => setSearchOorderId(e.target.value)}
        />
        <AiOutlineSearch className={styles.icon_search} />
      </div>
    </div>
  );
}
