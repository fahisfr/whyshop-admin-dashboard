"use client";
import React from "react";

import axios from "@/helper/axios";
import { useQuery } from "react-query";
import ProductSold from "../components/charts/ProductsSoild";
import CountsSummary, {
  CountsSummarySkeleton,
} from "@/components/countsSummary/CountsSummary";
import OrdersChart, {
  OrdersChartSkeleton,
} from "@/components/charts/OrdersChart";

export default function Home() {
  const fetchPerformanceData = async () => {
    const { data } = await axios.get("/admin/dashbord");
    return data;
  };

  const { isLoading, isError, data } = useQuery(
    "dashbord",
    fetchPerformanceData
  );


  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <CountsSummarySkeleton />
        <OrdersChartSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CountsSummary data={data} />
      <OrdersChart />
    </div>
  );
}
