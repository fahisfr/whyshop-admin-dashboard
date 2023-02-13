import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "react-query";
import axios from "../../helper/axios";
import { Option } from "@/helper/interface";
import Select from "../select/Select";
import { days as weekDays, months } from "@/helper/daysAndMonths";
import { setDate } from "date-fns";

interface DataSets {
  label: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
  borderColor?: string;
  tension?: number;
}

const options: Option[] = [
  {
    value: 7,
    label: "Last week",
  },
  {
    value: 30,
    label: "Last 30 days",
  },
  {
    value: 90,
    label: "Last 3 months",
  },
  {
    value: 182,
    label: "Last 6 months",
  },
  {
    value: 270,
    label: "Last 9 months",
  },
  {
    value: 365,
    label: "Last year",
  },
];

export default function LineBar() {
  const [days, setDays] = useState<number>(7);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
      },
    ],
  });

  const fetchSales = async () => {
    const { data } = await axios.get(`/order/orders-history?days=${days}`);
    return data;
  };

  const { isLoading, isError, data } = useQuery(
    ["OrdersHistory", days],
    fetchSales,
    {
      onSuccess: handleOnSuccess,
    }
  );

  function handleOnSuccess(res: any) {
    const currentDate: Date = new Date(new Date());
    const currentDayIndex: number = currentDate.getDay();
    let labels: string[] = [];
    let data = [];

    let checkData = new Array(30).fill(0);

    if (days <= 7) {
      for (let i = 7; i > 0; i--) {
        // const date = new Date(new Date().setDate(-i)).getDay();
        // console.log(date);

        // data.push({
        //   date,
        //   label: weekDays[i + (currentDayIndex % 7)],
        //   totalOrders: 0,
        // });
      }

      res.orders.forEach((arg) => {});
    } else if (days <= 30) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(new Date().setDate(currentDate.getDate() - i));
        const dayIndex = date.getDate();
        const monthIndex = date.getMonth();
        labels.push(`${dayIndex}.${months[monthIndex]}`);
      }
      data = new Array(30).fill(0);

      res.orders.forEach((arg) => {
        const dayIndex = new Date(arg._id).getDate();
        console.log(dayIndex % 30);

        data[dayIndex % 30] = arg.totalOrders;
        checkData[dayIndex] = arg.totalOrders;
      });
    } else if (days <= 365) {
      for (let i = 0; i < Math.floor(days / 30); i++) {
        const date = new Date(
          new Date().setMonth(currentDate.getMonth() - i)
        ).getMonth();
        labels.push(`${months[date]}`);
      }
      data = new Array(Math.floor(days / 30)).fill(0);
      res.orders.forEach((arg) => {
        const monthIndex = labels.indexOf(
          `${months[new Date(arg._id).getMonth()]}`
        );
        if (monthIndex !== -1) {
          data[monthIndex] = arg.totalOrders;
        }
      });
    }

    setChartData({
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: "Sales",
          data: data.map((item) => item.totalOrders),
          borderColor: "#61e761",
          tension: 0.1,
        },
      ],
    });
  }

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>error </div>;
  }

  return (
    <div className="salesChart">
      <span>Orders</span>
      <Select
        options={options}
        defaultOptionIndex={0}
        onSelect={(value) => setDays(value)}
      />
      <div className="sales-chart-body">
        <Line data={chartData} />
      </div>
    </div>
  );
}
