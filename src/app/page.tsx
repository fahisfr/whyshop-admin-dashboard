"use client";
import React from "react";
import styles from "./page.module.css";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LineBar from "@/components/salesChart/Chart";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import ProductSold from "../components/productSold/Chart";

export default function Home() {
  const fetchPerformanceData = async () => {
    const { data } = await axios.get("/admin/dashbord");
    return data;
  };

  const { isLoading, isError, data } = useQuery(
    "dashbord",
    fetchPerformanceData
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.home_container}>
      <div className={styles.content}>
        <div className={styles.mean_info}>
          <div className={styles.cp_group}>
            <FiUsers className={styles.cp_icon} />
            <span className={styles.cp_text}> Users</span>
            <span className={styles.cp_count}>{data?.usersCount}</span>
          </div>

          <div className={styles.cp_group}>
            <AiOutlineShoppingCart className={styles.cp_icon} />
            <span className={styles.cp_text}> Orders</span>
            <span className={styles.cp_count}>{data?.ordersCount}</span>
          </div>

          <div className={styles.cp_group}>
            <AiOutlineShoppingCart className={styles.cp_icon} />
            <span className={styles.cp_text}>Products</span>
            <span className={styles.cp_count}>{data?.productsCount}</span>
          </div>
        </div>
        <div className="flex">
          <LineBar ordersHistory={data.orderHistory} />
          <ProductSold products={data.soldProductDetails} />
        </div>
      </div>
    </div>
  );
}
