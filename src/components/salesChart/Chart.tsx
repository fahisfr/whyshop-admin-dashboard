import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "react-query";
import axios from "../../helper/axios";

interface DataSets {
  label: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

export default function LineBar() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });
  const getSales = async () => {
    const { data } = await axios.get("/order/sales?day=7");
    return data;
  };
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { isLoading, data } = useQuery("sales", getSales, {
    onSuccess: (result) => {
      const currentDate: Date = new Date();
      const currentDayIndex: number = currentDate.getDay();

      let labels: string[] = [];
      for (let i = currentDayIndex; i < currentDayIndex + 7; i++) {
        console.log(daysOfWeek[i]);
        labels.push(daysOfWeek[i % 7]);
      }

      const data: number[] = new Array(7).fill(0);
      result.sales.forEach((arg) => {
        const dayIndex = new Date(arg._id).getDay();
        data[dayIndex % 7] = arg.totalOrders;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Sales",
            data,
          },
        ],
      });
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="">
      <Line data={chartData} />
    </div>
  );
}
