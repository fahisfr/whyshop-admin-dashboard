import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import styles from "./css.module.css";
interface DataSets {
  label: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

export default function ProductsSold({ products }) {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Sold",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const productsName = products.map(
      (product: { name: string }) => product.name
    );

    const data = products.map((product: any) => product.quantitySold);

    setChartData({
      labels: productsName,
      datasets: [
        {
          label: "Sold",
          data,
        },
      ],
    });
  }, []);
  const options = {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className={styles.chart_container}>
      <div className={styles.top}>
        <span className={styles.title}> Products Soild</span>
        <div className={styles.select_wrapper}>
          {/* <Select
            options={options}
            defaultOptionIndex={0}
            onSelect={(value) => setDays(value)}
          /> */}
        </div>
      </div>
      <div className="sales-chart-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
