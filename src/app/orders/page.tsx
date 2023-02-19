"use client";
import React, { useState } from "react";
import styles from "./css.module.css";
import { Order } from "@/helper/interface";
import Image from "next/image";
import { imageUrl } from "@/helper/axios";
import getDate from "@/helper/getDate";
import productsStyles from "../products/css.module.css";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import OrdersFilterBar from "@/components/filterBar/OrdersFilterBar";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import TableBody from "@/components/skeleton/TableBody";
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
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const { data } = await axios("/order/all-orders");
    return data;
  };

  const { isError, isLoading, data } = useQuery("orders", fetchOrders, {
    onSuccess: (result) => {
      if (result.status === "ok") {
        setOrders(result.orders);
      }
    },
  });

  return (
    <div className="h-full flex flex-col gap-4  bg-gray-100">
      <OrdersFilterBar orders={data?.orders} setFilteredOrders={setOrders} />
      <div className="w-full h-full overflow-scroll bg-white">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Type</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableBody colCount={6} />
            ) : (
              orders.map((order: Order, index: number) => {
                return (
                  <tr
                    key={index}
                    className="bg-white shadow-md rounded-lg cursor-pointer overflow-scroll"
                  >
                    <td className="os_products flex items-center justify-center gap-3  max-w-xs">
                      <div className=" w-full h-full px-4 flex overflow-auto">
                        {order.products.map((product) => {
                          return (
                            <div className=" w-16 h-16 relative">
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
                      <span className="date text-sm text-gray-700">
                        {getDate(order.orderAt)}
                      </span>
                    </td>
                    <td>
                      <span className="price text-sm text-gray-700">
                        ₹{order.totalPrice}
                      </span>
                    </td>
                    <td>
                      {order.paymentType === "online" ? (
                        <span className="online py-1 px-3 text-xs text-green-600 font-medium rounded-full">
                          Online
                        </span>
                      ) : (
                        <span className="cod py-1 px-3 text-xs font-medium rounded-full">
                          Cod
                        </span>
                      )}
                    </td>
                    <td>
                      {order.paymentStatus === "paid" ? (
                        <BsFillCheckCircleFill className=" text-primary text-center text-xl" />
                      ) : (
                        <BsXCircleFill className=" text-red-600 text-center  text-xl" />
                      )}
                    </td>
                    <td>
                      <span
                        className="order_status py-1 px-2 rounded text-white text-xs font-medium"
                        style={{
                          backgroundImage:
                            "linear-gradient(to left, rgba(0, 128, 0, 0.849), #29c029)",
                        }}
                      >
                        Picking
                      </span>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <button className="btn bg-white text-gray-800 border border-gray-400 rounded-md py-1 px-3 flex items-center justify-center hover:bg-gray-200">
                          <AiOutlineEdit className="icon_edit text-gray-700 text-sm" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>{" "}
        </table>
      </div>
    </div>
  );

  return (
    <div className={styles.orders_container}>
      <div className={styles.os_right}>
        <OrdersFilterBar orders={data?.orders} setFilteredOrders={setOrders} />
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
              {isLoading ? (
                <TableBody colCount={6} />
              ) : (
                orders.map((order: Order, index: number) => {
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
                        <span className={styles.price}>
                          ₹{order.totalPrice}
                        </span>
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
                            <AiOutlineEdit
                              className={productsStyles.icon_edit}
                            />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
