import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { getTransactions } from "../utils/axiosHelper";
import { calculateTotals } from "../utils/helper";
import { Bar,Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement);


const Dashboard = () => {

  const totals = calculateTotals();
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Transaction Overview",
        data: [totals.totalIncome, totals.totalExpenses],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'category', 
      },
      y: {
        beginAtZero: true, 
      },
    },
  };
  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };
  return (
    <>
      <h2>Transaction Overview</h2>
      <Bar data={data} options={options} />
      <Pie data={data} options={pieOptions}/>
    </>
  );
};

export default Dashboard;
