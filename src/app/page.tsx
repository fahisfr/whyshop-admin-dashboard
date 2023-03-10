"use client";
import React from "react";
import axios from "@/helper/axios";
import { useQuery } from "@tanstack/react-query";
import ProductSold from "../components/charts/ProductsSoild";
import CountsSummary, {
  CountsSummarySkeleton,
} from "@/components/CountsSummary";
import OrdersChart, {
  OrdersChartSkeleton,
} from "@/components/charts/OrdersChart";
import Error from "@/components/Error";


export default function Home() {
  const fetchPerformanceData = async () => {
    const { data } = await axios.get("/admin/dashbord");
    return data;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["dashbord"],
    queryFn: fetchPerformanceData,
  });

  if (isLoading) {
    return (
      <>
        <CountsSummarySkeleton />
        <OrdersChartSkeleton />
        <OrdersChartSkeleton />
      </>
    );
  } else if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <CountsSummary data={data} />
      <OrdersChart />
      <ProductSold products={data.soldProductDetails} />
    </>
  );
}
