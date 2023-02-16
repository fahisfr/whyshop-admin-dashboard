"use client";
import NavBar from "@/components/navBar/NavBar";
import { imageUrl } from "@/helper/axios";
import React from "react";
import styles from "./css.module.css";
import Image from "next/image";
import getDate from "@/helper/getDate";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import { Product } from "@/helper/interface";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: PageProps) {
  const fetchOrder = async () => {
    const { data } = await axios(`/order/${id}`);
    return data;
  };
  const { isError, isLoading, data, error } = useQuery(
    ["order", id],
    fetchOrder
  );
  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className={styles.order_container}>
      <div className={styles.right}>
        <div className={styles.products}>
          <table className={`${styles.or_table} table`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>quantity</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              {data.order.products.map((product: Product, index: number) => {
                return (
                  <tr key={index}>
                    <td className={styles.product_name_wrapper}>
                      <div className={styles.img}>
                        <Image
                          fill
                          alt=""
                          objectFit="contain"
                          src={`${imageUrl}/${product.imageName}.jpg`}
                        />
                      </div>{" "}
                      <span>{product.name}</span>
                    </td>

                    <td>
                      <span>{product.quantity}</span>
                    </td>
                    <td>
                      <span>₹{product.price}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.order_info}>
          <div className={styles.dv}>
            <span className={styles.dv1}>ID</span>
            <span className={styles.dv2}>{data.order._id}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Type</span>
            <span className={`${styles.dv2}`}>{data.order.paymentType}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Status</span>
            <span className={styles.dv2}>{data.order.paymentStatus}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Total Price</span>
            <span className={styles.dv2}>₹{data.order.totalPrice}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Id</span>
            <span className={styles.dv2}>{data.order.paymentId}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>OrderAt</span>
            <span className={styles.dv2}>{getDate(data.order.orderAt)}</span>
          </div>{" "}
          <div className={styles.order_status_wrapper}>
            <div className={styles.order_status}>
              <div></div>
              <p>
                Picking
                <span>34 minuts ago</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
