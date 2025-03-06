import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import initializeDatabase from "../database";

Chart.register(...registerables);

const ComparisonChart = () => {


  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await initializeDatabase();

      // Fetch monthly data
      const monthlyDataRes = db.exec('SELECT * FROM monthly_data');
      const monthlyData = monthlyDataRes[0].values.map(row => ({
        month: row[1],
        last_year: row[2],
        this_year: row[3]
      }));
      setMonthlyData(monthlyData);

      
    };

    fetchData();
  }, []);
    // Chart Data
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "This year",
          data: monthlyData.map(data => data.this_year),
          backgroundColor: "#007BFF",
          borderRadius: 4,
        },
        {
          label: "Last year",
          data: monthlyData.map(data => data.last_year),
          backgroundColor: "#99DAFF",
          borderRadius: 4,
        },
      ],
    };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          padding: 10, // Increases spacing between legend items
          font: {
            size: 14, // Make text more readable
          },
        },
      },
    },
    
    scales: {
      x: {
        barPercentage: 0.4, // Reduce bar width for cleaner look
        categoryPercentage: 0.4, // Increase spacing between groups
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5000,
          callback: (value) => `${value / 1000}k`,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    
  };

return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Comparison</h2>
            <select className="px-3 py-1 text-sm border rounded-lg appearance-none bg-white cursor-pointer">
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="3">3 months</option>
                <option value="1">1 month</option>
            </select>
        </div>
        <div className="h-64 w-full">
            <Bar data={data} options={options} />
        </div>
    </div>
);
};

export default ComparisonChart;
