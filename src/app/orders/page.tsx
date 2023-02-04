"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar/NavBar";
import styles from "./css.module.css";
import { Order } from "@/helper/interface";
import Image from "next/image";
import { baseUrl, imageUrl } from "@/helper/axios";
import getDate from "@/helper/getDate";
import productsStyles from "../products/css.module.css";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import OrdersFilterBar from "@/components/filterBar/OrdersFilterBar";
const options = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "code",
    label: "chash on delivery",
  },
  {
    value: "padi",
    label: "Padi",
  },
];

export default function Orders() {
  const [orders, setOroders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await (await fetch(`${baseUrl}/api/order/all-orders`)).json();

      setOroders(await res.orders);
    }
    fetchData();
  }, []);
  console.log(orders);

  return (
    <div className={styles.orders_container}>
      <NavBar />
      <div className={styles.os_right}>
        <OrdersFilterBar
          orders={orders}
          setFilteredOrders={setFilteredOrders}
        />
        <div className={styles.os_table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Type</th>
                <th>Peyment Status</th>
                <th>Order Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.os_products}>
                      <div className={styles.order_product_imgs}>
                        {order.products.map((product) => {
                          return (
                            <div className={styles.product_img}>
                              <Image
                                fill
                                alt=""
                                objectFit="contain"
                                src={`${imageUrl}/${product.imageName}.jpg`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <span className={styles.date}>
                        {getDate(order.orderAt)}
                      </span>
                    </td>
                    <td>
                      <span className={styles.price}>₹{order.totalPrice}</span>
                    </td>
                    <td>
                      {order.paymentType === "online" ? (
                        <span className={styles.online}>Online</span>
                      ) : (
                        <span className={styles.cod}>Cod</span>
                      )}
                    </td>
                    <td>
                      {order.paymentStatus === "paid" ? (
                        <BsFillCheckCircleFill className={styles.icon_paid} />
                      ) : (
                        <BsXCircleFill className={styles.icon_not_paid} />
                      )}
                    </td>
                    <td>
                      <span className={styles.order_status}>Picking</span>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <button className={productsStyles.btn}>
                          <AiOutlineEdit className={productsStyles.icon_edit} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
