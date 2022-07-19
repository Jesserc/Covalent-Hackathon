import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const [info, setInfo] = useState([]);

  fetch(
    "https://api.covalenthq.com/v1/1/xy=k/uniswap_v2/tokens/?quote-currency=USD&format=JSON&page-size=10&page-number=&key=ckey_c9ceec82b70743a0b334b50ec49"
  )
    .then((data) => data.json())
    .then((res) => {
      // console.log(res.data.items);
      const getInfo = res.data.items.map((item) => {
        return { name: item.contract_name, swap: item.swap_count_24h };
      });

      setInfo(getInfo);
    });

  

  const data = {
    labels: info.map((l) => l.name).slice(0, 3), //labels must be a text value
    datasets: [
      {
        label: "# of Votes",
        // data: [12, 19, 3, 5, 2, 3],
        //data: myarr(),
        data: info.map((l) => l.swap).slice(0, 3),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(50, 211, 158, 0.8)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

// const tokenForNetwork = async () => {
//   const response = await fetch(
//     "https://api.covalenthq.com/v1/1/xy=k/uniswap_v2/tokens/?quote-currency=USD&format=JSON&page-size=10&page-number=&key=ckey_c9ceec82b70743a0b334b50ec49"
//   );

//   const data = await response.json();
//   const dataItems = data.data.items;
//   console.log(dataItems);

//   const chainNames = data.data.items.for((name) => {
//     return name.contract_ticker_symbol;
//   });
//   console.log(chainNames);

//   const swapCount = data.data.items.for((swap) => {
//     return swap.swap_count_24h;
//   });
//   console.log(swapCount);
// };
