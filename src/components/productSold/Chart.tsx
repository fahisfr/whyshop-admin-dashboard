import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useQuery } from "react-query";

interface DataSets {
  label: string;
  data: number[];
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

export default function Chart({ products }) {
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

  return (
    <div className="salesChart">
      <Bar data={chartData} />
    </div>
  );
}
