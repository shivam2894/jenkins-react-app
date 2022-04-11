import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getAuthenticatedRequest } from "../../redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = (text, position, display = false) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: position,
        display: display,
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

function getRandomColor() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    0.75 +
    ")"
  );
}

const arr = [
  "rgba(255, 99, 132, 0.75)",
  "rgba(255, 205, 86, 0.75)",
  "rgba(75, 192, 192, 0.75)",
  "rgba(229, 48, 24, 0.75)",
  "rgba(65, 229, 24, 0.75)",
  "rgba(54, 162, 235, 0.75)",
  "rgba(255, 159, 64, 0.75)",
  "rgba(153, 102, 255, 0.75)",
];

function StockValuationByCategory() {
  const [data, setData] = useState(null);
  const [countData, setCountData] = useState(null);
  const [stockSummary, setStockSummary] = useState(null);

  useEffect(() => {
    getAuthenticatedRequest()
      .get("/products/valuation_by_category")
      .then((res) =>
        setData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Stock Valuation by Category",
              data: res.data.data,
              backgroundColor: [
                ...arr,
                ...res.data.labels.map(() => getRandomColor()),
              ],
              borderWidth: 2,
              hoverOffset: 15,
            },
          ],
        })
      );

    getAuthenticatedRequest()
      .get("/products/countPerCat")
      .then((res) =>
        setCountData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Product count by Category",
              data: res.data.data,
              backgroundColor: "rgba(54, 162, 235, 0.3)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
            },
          ],
        })
      );

    getAuthenticatedRequest()
      .get("/products/stocksummary")
      .then((res) =>
        setStockSummary({
          labels: ["Total Products", "Low Stock Items", "Excess Stock Items"],
          datasets: [
            {
              label: "Stock Summary",
              data: [
                res.data.totalProducts,
                res.data.lowStock,
                res.data.excessStock,
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(75, 192, 192, 0.5)",
              ],
              borderWidth: 2,
            },
          ],
        })
      );
  }, []);

  return (
    <>
      {data && stockSummary && countData && (
        <>
          <div className=" flex flex-wrap mx-auto items-center shadow-md rounded-md bg-gray-50">
            <div className="w-full mx-auto lg:w-2/5">
              <Pie
                data={data}
                options={options(
                  "Stock valuation per category",
                  "bottom",
                  true
                )}
              />
            </div>

            <div className="w-full mx-auto lg:w-3/5">
              <Bar
                data={stockSummary}
                options={options("Stock Summary", "top")}
              />
            </div>
          </div>
          <div className="w-full shadow-md rounded-md bg-gray-50">
            <div className="p-2 mx-auto lg:w-5/6">
              <Bar
                data={countData}
                options={options("Product count per category", "top")}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default StockValuationByCategory;
