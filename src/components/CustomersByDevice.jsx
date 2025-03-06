import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);





const CustomersByDevice = () => {

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.111.196.92:8020/api/v1/sample_assignment_api_4/', {
          headers: {
            'Authorization': 'Basic ' + btoa('trial:assignment123')
          }
        });
        const data = await response.json();
        
        // Process the data for the chart
        const formattedData = data.map(item => ({
          date: new Date(item.date2).toLocaleTimeString(),
          uniqueCount: item.unique_count,
          cumulativeTweets: item.cumulative_tweets
        }));
        
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // {
    //   "date2": "2020-02-04 07:13:00",
    //   "unique_count": 2,
    //   "cumulative_tweets": 2
    // },
  }, []);


  const data = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: "Web Sales",
        data: chartData.map(item => item.uniqueCount),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        borderWidth: 0.5,
        tension: 0.4,
      },
      {
        label: "Offline Sales",
        data: chartData.map(item => item.cumulativeTweets),
        borderColor: "#93c5fd",
        backgroundColor: "rgba(147, 197, 253, 0.5)",
        borderWidth: 0.5,
        tension: 0.4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: false,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            const total = datasets.reduce((sum, dataset) => 
              sum + dataset.data.reduce((a, b) => a + b, 0), 0);
            
            return chart.data.datasets.map((dataset, i) => ({
              text: `${dataset.label} (Total: ${total}%)`,
              fillStyle: dataset.backgroundColor,
              strokeStyle: dataset.borderColor,
              lineWidth: dataset.borderWidth,
              hidden: !chart.isDatasetVisible(i),
              index: i
            }));
          }
        },
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: true,
        ticks: {
          callback: (value) => value + '%',
          stepSize: 100,
          max: 2000,
          min: 0
        }
      },
    },
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full mt-4">
      <h2 className="text-lg font-semibold">Customers by device</h2>
      <div className="h-44">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomersByDevice;
