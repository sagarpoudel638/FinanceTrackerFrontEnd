import React, { useEffect, useState, useMemo } from "react";
import { getTransactions, getSuggestions } from "../utils/axiosHelper";
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
  const [suggestions, setSuggestions] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionsFetched, setSuggestionsFetched] = useState(false);

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
        setSuggestionsFetched(false); // reset cache when transactions reload
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
  const fetchSuggestions = async (forceRefresh = false) => {
    // Use cached result if available and not forcing a refresh
    if (suggestionsFetched && !forceRefresh) {
      setShowModal(true);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const response = await getSuggestions();
      const text = response?.suggestion || "Could not generate suggestions. Please try again.";
      setSuggestions(text);
      // Only cache if it's a real suggestion, not an error message
      if (response?.suggestion && !response?.message) {
        setSuggestionsFetched(true);
      }
    } catch (error) {
      setSuggestions("Error retrieving AI suggestions. Please try again.");
    } finally {
      setLoadingSuggestions(false);
      setShowModal(true);
    }
  };

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

          <button
            onClick={fetchSuggestions}
            className="suggestion-button"
            disabled={loadingSuggestions}
          >
            {loadingSuggestions ? "Generating..." : "💡 AI Suggestion"}
          </button>

          {showModal && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <button
                  className="close-button"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
                <div className="modal-header">💡 AI Financial Suggestions</div>
                <div className="modal-body" style={{ whiteSpace: "pre-line" }}>
                  {suggestions}
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                  <button
                    className="suggestion-button"
                    onClick={() => fetchSuggestions(true)}
                    disabled={loadingSuggestions}
                    style={{ backgroundColor: "#636e72" }}
                  >
                    {loadingSuggestions ? "Refreshing..." : "Refresh"}
                  </button>
                  <button
                    className="suggestion-button"
                    onClick={() => setShowModal(false)}
                  >
                    Got It!
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
