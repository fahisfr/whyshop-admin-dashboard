import styles from "./css.module.css";
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

interface Data {
  dateIndex: number;
  label: string;
  orders: number;
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
    
    const currentDate: Date = new Date();
    let data: Data[] = [];

    if (days <= 7) {
      for (let i = 7; 0 < i; i--) {
        const dayIndex = new Date(
          new Date().setDate(currentDate.getDate() - i)
        ).getDay();
        data.push({
          dateIndex: dayIndex,
          label: weekDays[dayIndex],
          orders: 0,
        });
      }

      res.orders.forEach((arg) => {
        const dayIndex = new Date(arg._id).getDay();
        const index = data.findIndex((item) => item.dateIndex === dayIndex);
        if (index !== -1) {
          data[index].orders = arg.totalOrders;
        }
      });
    } else if (days <= 30) {
      for (let i = 30; 0 < i; i--) {
        const date = new Date(new Date().setDate(currentDate.getDate() - i));
        const dayIndex = date.getDate();
        const monthIndex = date.getMonth();
        data.push({
          dateIndex: dayIndex,
          orders: 0,
          label: `${dayIndex}.${months[monthIndex]}`,
        });
      }

      res.orders.forEach((arg) => {
        const dateIndex = new Date(arg._id).getDate();
        const index = data.findIndex((item) => item.dateIndex === dateIndex);
        if (index !== -1) {
          data[index].orders = arg.totalOrders;
        }
      });
    } else if (days <= 365) {
      for (let i = Math.floor(days / 30); 0 < i; i--) {

        const dateIndex = new Date(
          new Date().setMonth(currentDate.getMonth() - i)
        ).getMonth();

        data.push({
          dateIndex: dateIndex,
          label: months[dateIndex],
          orders: 0,
        });
      }

      res.orders.forEach((arg) => {
        const dateIndex = new Date(arg._id).getMonth();
        const index = data.findIndex((item) => item.dateIndex === dateIndex);
        if (index !== -1) {
          data[index].orders = arg.totalOrders;
        }
      });
    }
    

    setChartData({
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: "Sales",
          data: data.map((item) => item.orders),
          // borderColor: "#61e761",
          // tension: 0.1,
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
    <div className={styles.chart_container}>
      <div className={styles.top}>
        <span className={styles.title}>Orders</span>
        <div className={styles.select_wrapper}>
          <Select
            options={options}
            defaultOptionIndex={0}
            onSelect={(value) => setDays(value)}
          />
        </div>
      </div>
      <div className="sales-chart-body">
        <Line data={chartData} />
      </div>
    </div>
  );
}
