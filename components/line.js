import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function Line({ withdraws, deposit }) {
  const [zarlaga, setZarlaga] = useState(withdraws);
  const [orlogo, setOrlogo] = useState(deposit);
  const [year1, setYear1] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [year2, setYear2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const canvasEl = useRef(null);
  let currentDate = new Date().getFullYear();

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    red: {
      default: "rgba(255, 0, 0, 1)",
      half: "rgba(255, 0, 0, 0.5)",
      quarter: "rgba(255, 0, 0, 0.25)",
      zero: "rgba(255, 0, 0, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };
  useEffect(() => {
    zarlaga.map((elm) => {
      let date = new Date(elm.inserted);
      if (currentDate == date.getFullYear()) {
        let a = year1;
        a[date.getMonth()] += elm.value;
        setYear1(a);
      }
    });
    orlogo.map((elm) => {
      let date = new Date(elm.inserted);
      if (currentDate == date.getFullYear()) {
        let a = year2;
        a[date.getMonth()] += elm.value;
        setYear2(a);
      }
    });
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient1 = ctx.createLinearGradient(0, 16, 0, 600);
    gradient1.addColorStop(0, colors.red.half);
    gradient1.addColorStop(0.65, colors.red.quarter);
    gradient1.addColorStop(1, colors.red.zero);

    const gradient2 = ctx.createLinearGradient(0, 16, 0, 600);
    gradient2.addColorStop(0, colors.purple.half);
    gradient2.addColorStop(0.65, colors.purple.quarter);
    gradient2.addColorStop(1, colors.purple.zero);

    const weight1 = year1;
    const weight2 = year2;

    const labels = [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient1,
          label: "Зарлага",
          data: weight1,
          fill: true,
          borderWidth: 2,
          borderColor: colors.red.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.red.default,
          pointRadius: 3,
        },
        {
          backgroundColor: gradient2,
          label: "Орлого",
          data: weight2,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });
  return (
    <div className="App">
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
