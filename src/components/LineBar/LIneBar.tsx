import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function LineBar() {
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [187, 201, 190, 178, 241, 142],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.4",
      },
    ],
  });

  return (
    <div className="line_bar">
      <Line data={chartData} />
    </div>
  );
}
