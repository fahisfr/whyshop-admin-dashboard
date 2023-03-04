import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Product } from "@/helper/interface";
interface DataSets {
  label: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

interface Props {
  products: Product[];
}

export default function ProductsSold({ products }: Props) {
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
    <div className="  bg-theme-primary rounded-lg p-4 w-full max-w-65 shadow-sm">
      <div className=" border-gray-300 pb-1 flex justify-between">
        <span className="text-lg  font-semibold align-middle">
          Products Sold
        </span>
      </div>
      <div className="sales-chart-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
