import NavBar from "@/components/navBar/NavBar";
import { baseUrl, imageUrl } from "@/helper/axios";
import { Order } from "@/helper/interface";
import React from "react";
import styles from "./css.module.css";
import Image from "next/image";
import getDate from "@/helper/getDate";
async function getOrder() {
  const res = await (
    await fetch(`${baseUrl}/api/order/63d7672de1fcb4b064f801ea`)
  ).json();

  return res.order;
}

export default async function Page() {
  const order: Order = await getOrder();
  return (
    <div className={styles.order_container}>
      <NavBar />
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
              {order.products.map((product, index) => {
                return (
                  <tr>
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
            <span className={styles.dv2}>{order._id}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Type</span>
            <span className={`${styles.dv2}`}>
              {order.paymentType}
            </span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Status</span>
            <span className={styles.dv2}>{order.paymentStatus}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Total Price</span>
            <span className={styles.dv2}>₹{order.totalPrice}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>Payment Id</span>
            <span className={styles.dv2}>{order.paymentId}</span>
          </div>
          <div className={styles.dv}>
            <span className={styles.dv1}>OrderAt</span>
            <span className={styles.dv2}>{getDate(order.orderAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
