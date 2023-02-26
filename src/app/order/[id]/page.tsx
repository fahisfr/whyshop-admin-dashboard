"use client";

import { imageUrl } from "@/helper/axios";
import React, { useState } from "react";
import Image from "next/image";
import getDate from "@/helper/getDate";
import axios from "@/helper/axios";
import { useQuery, useQueryClient } from "react-query";
import { Order, Product } from "@/helper/interface";
import { BiPackage } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";
import { RiEBike2Fill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
interface PageProps {
  params: {
    id: string;
  };
}
const orderStatus = [
  {
    value: "processing",
    icon: <BiPackage />,
  },
  {
    value: "packed",
    icon: <BiPackage />,
  },
  {
    value: "out for delivery",
    icon: <RiEBike2Fill />,
  },
  {
    value: "delivered",
    icon: <BsBagCheck />,
  },
];
export default function Page({ params: { id } }: PageProps) {
  const [nextStepBtnLoading, setNextStepBtnLoading] = useState<boolean>(false);
  const [previousBtnLoading, setPreviousBtnLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
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
  const order: Order = data.order;
  const orderStatusIndex = orderStatus.findIndex(
    (status) => order.orderStatus === status.value
  );

  const chageOrderStatus = async (
    orderStatusIndex: number,
    setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (orderStatus.length > orderStatusIndex) {
      setBtnLoading(true);
      const newOrderStatus = orderStatus[orderStatusIndex].value;
      const { data } = await axios.put("/admin/order/change-order-status", {
        id: order._id,
        orderStatus: newOrderStatus,
      });
      setBtnLoading(false);
      if (data.status === "ok") {
        const updatedOrderInfo = order;
        order.orderStatus = newOrderStatus;
        queryClient.setQueryData(["order", id], {
          status: "ok",
          order: updatedOrderInfo,
        });
      } else if (data.status === "error") {
        alert("error");
      }
    }
  };

  return (
    <div className="w-ful h-full  flex gap-4 -lg:items-center -lg:justify-center  -lg:flex-col -lg:h-auto  ">
      <div className=" w-full     bg-white  overflow-auto shadow">
        <table className="table">
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
                  <td className="flex gap-1 items-center">
                    <div
                      className=" w-16 h-16 relative
                    "
                    >
                      <Image
                        fill
                        alt=""
                        objectFit="contain"
                        src={`${imageUrl}/${product.imageName}.jpg`}
                      />
                    </div>
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

      <div className="w-full  max-w-lg bg-white flex   flex-col p-4 after:w-0 gap-3  shadow ">
        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>ID</span>
          <span>{order._id}</span>
        </div>
        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>Payment Type</span>
          <span>{order.paymentType}</span>
        </div>
        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>Payment Status</span>
          <span>{order.paymentStatus}</span>
        </div>
        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>Total Price</span>
          <span>₹{order.totalPrice}</span>
        </div>

        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>Payment Id</span>
          <span>{order.paymentId}</span>
        </div>
        <div className="flex justify-between p-2 border border-gray-400  rounded">
          <span>OrderAt</span>
          <span>{getDate(order.orderAt)}</span>
        </div>

        <div className="flex ">
          {orderStatus.map((status, index) => {
            const isCompleted = orderStatusIndex >= index;
            return (
              <div
                className={`stepper-item ${isCompleted && " completed"}`}
                key={index}
              >
                <div className="step-counter text-2xl text-white  transition duration-300">
                  {isCompleted ? (
                    <FiCheck className=" text-[30px]" />
                  ) : (
                    status.icon
                  )}
                </div>
                <h4 className="step-name capitalize">{status.value}</h4>
              </div>
            );
          })}
        </div>
        <div className="flex p-2 items-center justify-center">
          <div
            className={`${
              previousBtnLoading && "btn-loading"
            } flex items-center justify-center p-3`}
          >
            <button
              disabled={orderStatusIndex <= 0}
              onClick={() =>
                chageOrderStatus(orderStatusIndex - 1, setPreviousBtnLoading)
              }
              className="btn w-[10rem] h-10  rounded-sm text-white   bg-red-500 hover:bg-red-600   transition duration-300 "
            >
              <span className="btn-text ">Previous Step</span>
            </button>
          </div>
          <div
            className={`${
              nextStepBtnLoading && "btn-loading"
            } flex items-center justify-center p-3`}
          >
            <button
              disabled={
                orderStatusIndex + 1 >= orderStatus.length || nextStepBtnLoading
              }
              onClick={() =>
                chageOrderStatus(orderStatusIndex + 1, setNextStepBtnLoading)
              }
              className="btn w-[10rem] h-10  bg-green-700  rounded-sm text-white hover:bg-green-600    transition duration-300 "
            >
              <span className="btn-text ">Next Setp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
