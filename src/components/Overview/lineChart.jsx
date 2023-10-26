import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

function LineChart({ chartData }) {
    return <Bar data={chartData} />;
}

export default LineChart;
