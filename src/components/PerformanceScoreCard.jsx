import React, { useEffect, useState } from "react";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const PerformanceScoreCard = () => {
  const [performanceData, setPerformanceData] = useState({ score: 0, title: '', message: '' });
  
  const [data, setData] = useState({
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#2563eb", "#e5e7eb"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  });

  useEffect(() => {
    setData({
      datasets: [
        {
          data: [performanceData.score, 100 - performanceData.score],
          backgroundColor: ["#2563eb", "#e5e7eb"],
          borderWidth: 0,
          cutout: "75%",
        },
      ],
    });
  }, [performanceData.score]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.111.196.92:8020/api/v1/sample_assignment_api_3', {
          headers: {
            'Authorization': 'Basic ' + btoa('trial:assignment123')
          }
        });
        const data = await response.json();
        setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchData();
  }, []);

    

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md w-full text-center">
      {/* Performance Chart */}
      <div className="relative w-48 h-48 mx-auto">
        <Doughnut data={data}  options={{
          rotation: -90,
          circumference: 180,
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            tooltip: {
              
              callbacks: {
                label: function (context) {
                  return context.parsed + " %";
                },
              }
            },
          }

        }}/>
       
        <div className="absolute top-15 inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{performanceData.score}</span>
          <span className="text-xs text-gray-400">of 100 points</span>
        </div>
      </div>

      {/* Performance Text */}
      <hr className="my-4" />
      <h2 className="text-lg font-semibold">{performanceData.title}</h2>
      <p className="text-gray-500 text-sm">
        {performanceData.message}
      </p>

      {/* Improve Score Button */}
      <button className="mt-4 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium">
        Improve your score
      </button>
    </div>
  );
};

export default PerformanceScoreCard;
