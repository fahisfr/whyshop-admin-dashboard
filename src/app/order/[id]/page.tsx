"use client";

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
    <div className="h-screen w-screen flex ">
      <div className="h-full w-min-[30rem] rounded-lg flex flex-col overflow-auto ">
        {data.order.products.map((product: Product, index: number) => {
          return (
            <div
              key={index}
              className="p-2 w-full flex justify-between items-center"
            >
              <div className="w-[4.5rem] h-[4.5rem] relative">
                <Image
                  className="object-contain"
                  alt=""
                  fill
                  objectFit="contain"
                  src={`${imageUrl}/${product.imageName}.jpg`}
                />
              </div>
              <span>{product.name}</span>
              <span>{product.quantity}</span>
              <span>₹{product.price}</span>
            </div>
          );
        })}
      </div>
      <div className="h-full w-min-[30rem] flex flex-col p-4 bg-primary">
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">ID</span>
          <span className="">{data.order._id}</span>
        </div>
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">Payment Type</span>
          <span className="">{data.order.paymentType}</span>
        </div>
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">Payment Status</span>
          <span className="">{data.order.paymentStatus}</span>
        </div>
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">Total Price</span>
          <span className="">₹{data.order.totalPrice}</span>
        </div>
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">Payment Id</span>
          <span className="">{data.order.paymentId}</span>
        </div>
        <div className="p-2 border rounded-md">
          <span className="text-gray-500 text-sm">OrderAt</span>
          <span className="">{getDate(data.order.orderAt)}</span>
        </div>
        <div className="flex-grow flex justify-end">
          <div className="border rounded-md p-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="ml-2">
              Picking
              <span className="ml-1 text-gray-500 text-sm">34 minutes ago</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
