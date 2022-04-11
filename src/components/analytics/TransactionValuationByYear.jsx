import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAuthenticatedRequest } from "../../redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = (text, position) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: position,
        display: false,
      },
      title: {
        display: true,
        text: text,
        font: {
          size: 24,
        },
      },
    },
  };
};

export default function BarChart() {
  const [salesData, setSalesData] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    getAuthenticatedRequest()
      .get("/transactions/type/sales")
      .then((res) =>
        setSalesData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Sales",
              data: res.data.data,
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.25,
            },
          ],
        })
      );
    getAuthenticatedRequest()
      .get("/transactions/type/purchase")
      .then((res) =>
        setPurchaseData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Purchase",
              data: res.data.data,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.25,
            },
          ],
        })
      );
  }, []);

  return (
    <>
      <div className="space-y-4 shadow-md rounded-md bg-gray-50">
        <div className="p-2 mx-auto lg:w-5/6">
          {salesData && (
            <Line data={salesData} options={options("Sales by month")} />
          )}
        </div>
      </div>
      <div className="space-y-4 shadow-md rounded-md bg-gray-50">
        <div className="p-2 mx-auto lg:w-5/6">
          {purchaseData && (
            <Line data={purchaseData} options={options("Purchase by month")} />
          )}
        </div>
      </div>
    </>
  );
}
