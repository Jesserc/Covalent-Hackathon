import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const [availableDexes, setAvailableDexes] = useState([]);

  // second dashboard
  fetch(
    "https://api.covalenthq.com/v1/xy=k/supported_dexes/?quote-currency=USD&format=JSON&key=ckey_ccc9ab3b73314fdb8ef18f53861"
  )
    .then((data) => data.json())
    .then((res) => {
      console.log(res.data.items);
      const results = res.data.items.map((item) => {
        return { name: item.dex_name, swap: item.swap_fee };
      });
      setAvailableDexes(results);
    });

  const data = {
    labels: availableDexes.map((dex) => dex.name).slice(0, 9),
    datasets: [
      {
        label: "# of Votes",
        data: availableDexes.map((swap) => swap.swap).slice(0, 9),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
