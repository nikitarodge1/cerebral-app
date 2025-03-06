import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import initializeDatabase from "../database";





const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const db = await initializeDatabase();
  
      // Fetch product data
      const productDataRes = db.exec('SELECT * FROM product_data');
      const productData = productDataRes[0].values.map(row => ({
        product: row[1],
        sold_amount: row[2],
        unit_price: row[3],
        revenue: row[4],
        rating: row[5],
        image: `https://fakeimg.pl/300/`
      }));
      setProductData(productData);
    };
  
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top Products</h2>
        <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg">
          Full results
        </button>
      </div>
      
      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">Product</th>
            <th className="py-2">Sold amount</th>
            <th className="py-2">Unit price</th>
            <th className="py-2">Revenue</th>
            <th className="py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={index} className="">
              <td className="flex items-center py-3 space-x-3">
                <img src={product.image} alt={product.name} className="w-8 h-8 rounded-full" />
                <span className="text-gray-800">{product.name}</span>
              </td>
              <td className="py-3">{product.sold_amount}</td>
              <td className="py-3">${product.unit_price}</td>
              <td className="py-3">${product.revenue.toLocaleString()}</td>
              <td className="py-3 flex items-center">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="ml-1">{product.rating}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
