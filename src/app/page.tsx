"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import NavBar from "@/components/navBar/NavBar";
import { FiUsers } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};
export default function Home() {
  const [orders, setOrders] = useState([]);

  return (
    <div className={styles.home_container}>
      <NavBar />
      <div className={styles.content}>
        <div className={styles.mean_info}>
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
        </div>
      </div>{" "}
     
    </div>
  );
}
