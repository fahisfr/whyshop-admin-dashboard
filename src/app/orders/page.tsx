"use client";
import React, { useState } from "react";
import { Order } from "@/helper/interface";
import Image from "next/image";
import { imageUrl } from "@/helper/axios";
import { getDate } from "@/helper/date-utils";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import TableBody from "@/components/skeleton/TableBody";
import OrdersFilterBar, {
  Skeleton as OrdersFilterBarSkeleton,
} from "@/components/filterBar/OrdersFilterBar";
import Error from "@/components/Error";
import { fetchOrders } from "@/helper/apis";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const { isError, isLoading, data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <Skeleton />;
  } else if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <OrdersFilterBar orders={data?.orders} setFilteredOrders={setOrders} />
      <div className=" overflow-auto  rounded">
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
                    <td className=" flex items-center justify-center gap-3  max-w-xs">
                      <div className=" w-full h-full px-4 flex overflow-auto">
                        {order.products.map((product) => {
                          return (
                            <div className="min-w-[4rem] min-h-[4rem] relative ">
                              <Image
                                fill
                                alt=""
                                objectFit="contain"
                                src={`${imageUrl}/${product.imageName}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      <span className="date text-sm ">
                        {getDate(order.orderAt)}
                      </span>
                    </td>
                    <td>
                      <span className="price text-sm ">
                        ₹{order.totalPrice}
                      </span>
                    </td>
                    <td>
                      {order.paymentType === "online" ? (
                        <div className=" rounded-[10px] py-1 px-2  text-white  bg-green-600/80  inline-block">
                          <span className=" text-sm ">ONLINE</span>
                        </div>
                      ) : (
                        <div className="rounded-[10px] py-1 px-2 bg-red-600/80 text-white inline-block">
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
                        <span className="capitalize">{order.orderStatus}</span>
                      </div>
                    </td>
                    <td>
                      <Link href={`/orders/${order._id}`}>
                        <button className="btn border border-green-600  text-green-600 rounded  p-2  flex items-center justify-center hover:bg-green-600 hover:text-white transition duration-300">
                          <AiOutlineEdit className=" text-sm" />
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
    </>
  );
}

export function Skeleton() {
  return (
    <>
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
    </>
  );
}
