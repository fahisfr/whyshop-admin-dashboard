"use client";
import React from "react";
import styles from "./page.module.css";
import NavBar from "@/components/navBar/NavBar";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import LineBar from "@/components/salesChart/Chart";
import axios from "@/helper/axios";
import { useQuery } from "react-query";

const labels = ["January", "February", "March", "April", "May", "June"];

export default function Home() {
  const fetchPerformanceData = async () => {
    const { data } = await axios.get("/performance-data");
    return data;
  };

  const { isLoading, isError, data } = useQuery(
    "performanceData",
    fetchPerformanceData
  );

  return (
    <div className={styles.home_container}>
      <NavBar />
      <div className={styles.content}>
        {/* <div className={styles.mean_info}>
          <div className={styles.cp_group}>
            <FiUsers className={styles.cp_icon} />
            <span className={styles.cp_text}> Users</span>
            <span className={styles.cp_count}>34</span>
          </div>

          <div className={styles.cp_group}>
            <AiOutlineShoppingCart className={styles.cp_icon} />
            <span className={styles.cp_text}> Orders</span>
            <span className={styles.cp_count}>34</span>
          </div>

          <div className={styles.cp_group}>
            <AiOutlineShoppingCart className={styles.cp_icon} />
            <span className={styles.cp_text}>Products</span>
            <span className={styles.cp_count}>49</span>
          </div>
        </div> */}
        <LineBar />
      </div>
    </div>
  );
}
