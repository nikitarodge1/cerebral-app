import React, {useEffect, useState} from "react";

const CommunityFeedback = () => {
  const [feedbackStats, setFeedbackStats] = useState({ negative: 0, positive: 0, neutral: 0 });

  useEffect(() => {
    fetch('http://3.111.196.92:8020/api/v1/sample_assignment_api_5/', {
      headers: {
      'Authorization': 'Basic ' + btoa('trial:assignment123')
      }
    })
      .then(response => response.json())
      .then(data => setFeedbackStats(data))
      .catch(error => console.error('Error fetching feedback stats:', error));
  }, []);


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full mt-4">
      <h2 className="text-sm text-gray-500">Community feedback</h2>
      <h3 className="text-lg font-semibold mt-1">Mostly positive</h3>

      {/* Progress Bar */}
        <div className="flex items-center gap-1 mt-2">
          {/* Calculate total for percentages */}
          {(() => {
            const total = feedbackStats.negative + feedbackStats.neutral + feedbackStats.positive;
            const negativePercent = (feedbackStats.negative / total) * 100;
            const neutralPercent = (feedbackStats.neutral / total) * 100;
            const positivePercent = (feedbackStats.positive / total) * 100;
            
            return (
          <>
            <div className="h-2 bg-red-300 rounded-full" style={{width: `${negativePercent}%`}}></div>
            <div className="h-2 bg-yellow-300 rounded-full" style={{width: `${neutralPercent}%`}}></div>
            <div className="h-2 bg-green-400 rounded-full" style={{width: `${positivePercent}%`}}></div>
          </>
            );
          })()}
        </div>

        {/* Feedback Stats */}
      <div className="flex justify-between mt-3 text-sm text-gray-600">
        <div className="flex flex-col items-center">
          <span className="font-semibold">Negative</span>
          <span className="font-bold text-black">{feedbackStats.negative}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">Neutral</span>
          <span className="font-bold text-black">{feedbackStats.neutral}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold">Positive</span>
          <span className="font-bold text-black">{feedbackStats.positive}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedback;
