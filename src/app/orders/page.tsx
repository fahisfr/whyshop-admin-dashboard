"use client";
import React, { useState } from "react";
import { Order } from "@/helper/interface";
import Image from "next/image";
import { imageUrl } from "@/helper/axios";
import getDate from "@/helper/getDate";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import axios from "@/helper/axios";
import { useQuery } from "react-query";
import TableBody from "@/components/skeleton/TableBody";
import OrdersFilterBar, {
  Skeleton as OrdersFilterBarSkeleton,
} from "@/components/filterBar/OrdersFilterBar";

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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <OrdersFilterBar orders={data?.orders} setFilteredOrders={setOrders} />
      <div className="w-full h-full bg-theme-primary  overflow-auto ">
        <table className="table">
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
                    className=" shadow-md rounded-lg cursor-pointer overflow-scroll"
                  >
                    <td className="os_products flex items-center justify-center gap-3  max-w-xs">
                      <div className=" w-full h-full px-4 flex overflow-auto">
                        {order.products.map((product) => {
                          return (
                            <div className=" w-16 h-16 relative ">
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
                        <div className=" rounded-[10px] py-1 px-2  text-white  bg-green-500/70  inline-block">
                          <span className=" text-sm ">ONLINE</span>
                        </div>
                      ) : (
                        <div className="rounded-[10px] py-1 px-2 bg-red-400/70 text-white inline-block">
                          <span className=" text-sm text-3  ">COD</span>
                        </div>
                      )}
                    </td>
                    <td className="  text-center">
                      {order.paymentStatus === "paid" ? (
                        <BsFillCheckCircleFill className="  text-primary text-center text-xl" />
                      ) : (
                        <BsXCircleFill className=" text-red-600 text-center  text-xl" />
                      )}
                    </td>
                    <td>
                      <div className="px-2 py-1 inline-block rounded-[6px] text-white   bg-green-500">
                        <span className=" ">{order.orderStatus}</span>
                      </div>
                    </td>
                    <td>
                      <Link href={`/orders/${order._id}`}>
                        <button className="btn  text-gray-800 border border-gray-400 rounded-md  p-2 flex items-center justify-center hover:bg-gray-200">
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
    </>
  );
}

export function Skeleton() {
  return (
    <div className="h-full flex flex-col gap-4   bg-theme-primary">
      <OrdersFilterBarSkeleton />
      <div className="w-full h-full overflow-scroll ">
        <table className="table">
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
            <TableBody colCount={7} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
