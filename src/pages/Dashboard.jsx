import React, { useEffect, useState, useMemo } from "react";
import { getTransactions } from "../utils/axiosHelper";
import { calculateTotals } from "../utils/helper";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import "../App.css"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fillDashboard = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      if (response?.status === "error") {
        setError(response.message);
        setTransactions([]);
      } else {
        setTransactions(response.data);
        setError("");
      }
    } catch (error) {
      setError("Failed to fetch transactions.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fillDashboard();
  }, []);

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Transaction Overview",
        data: [totals.totalIncome, totals.totalExpenses],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${currencyFormatter.format(context.raw)}`;
          },
        },
      },
    },
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AUD",
  });

  return (
    <>
      <h2 className="dashboard-title">Transaction Overview</h2>
      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <div className="totals-container">
            <div className="total-card income">
              Income: {currencyFormatter.format(totals.totalIncome)}
            </div>
            <div className="total-card expenses">
              Expenses: {currencyFormatter.format(totals.totalExpenses)}
            </div>
            <div className="total-card balance">
              Balance:{" "}
              {currencyFormatter.format(
                totals.totalIncome - totals.totalExpenses
              )}
            </div>
          </div>
          <div className="dashboard-container">
            <div className="chart-box">
              <Bar data={data} options={barOptions} />
            </div>

            <div className="chart-box">
              <Pie data={data} options={pieOptions} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
