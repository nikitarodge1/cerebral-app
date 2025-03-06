import { useState } from "react";

const DashboardHeader = () => {
  const [selected, setSelected] = useState("Last year");

  return (
    <div className="col-span-3 flex justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-2 text-gray-500">
        <span className="font-semibold">Compare to</span>
        <select className="flex items-center space-x-1 bg-gray-100 border-r-6 border-gray-100 px-4 py-1.5 rounded-full">
          <option value="">Last Year</option>
          <option value="">This Month</option>
        </select>
      </div>
    </div>
  );
};

export default DashboardHeader;