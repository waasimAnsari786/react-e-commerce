import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { FaCheckCircle, FaClock, FaBox } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function AdminStats() {
  const [dailySales, setDailySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [happyClients, setHappyClients] = useState([]);
  const [unHappyClients, setUnHappyClients] = useState([]);

  const { productsArr } = useSelector((state) => state.product);
  const { orders, pendingOrders, completedOrders, canceledOrders } =
    useSelector((state) => state.orders);
  const { userData } = useSelector((state) => state.auth);

  // Filter products by admin ID
  const filteredProducts = useMemo(() => {
    return productsArr.filter((product) => product.adminId === userData.$id);
  }, [productsArr, userData]);

  // Calculate dynamic sales
  useEffect(() => {
    const now = new Date();

    // Helper function to calculate sales for a time range
    const calculateSales = (startDate) => {
      return completedOrders
        .filter(
          (order) =>
            new Date(order.completionDate) >= startDate &&
            new Date(order.completionDate) <= now
        )
        .reduce((total, order) => {
          const orderValue = order.pSalePrice
            ? order.pSalePrice * order.pQty
            : order.pPrice * order.pQty;

          return total + orderValue;
        }, 0);
    };

    // Daily sales: Orders completed today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    setDailySales(calculateSales(todayStart));

    // Weekly sales: Orders completed in the last 7 days
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    setWeeklySales(calculateSales(weekStart));

    // Monthly sales: Orders completed in the last 30 days
    const monthStart = new Date();
    monthStart.setDate(monthStart.getDate() - 30);
    setMonthlySales(calculateSales(monthStart));
  }, [completedOrders, pendingOrders, orders]);

  useEffect(() => {
    const happyClientsNames = completedOrders.map((order) => order.userName);
    const unHappyClientsNames = canceledOrders.map((order) => order.userName);

    setHappyClients(new Set(happyClientsNames).size);
    setUnHappyClients(new Set(unHappyClientsNames).size);
  }, [completedOrders, pendingOrders, orders, canceledOrders]);

  // Data array for cards
  const cardData = [
    {
      title: "Completed Orders",
      value: completedOrders.length,
      icon: <FaCheckCircle className="text-3xl mb-2" />,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: <FaClock className="text-3xl mb-2" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      title: "Canceled Orders",
      value: canceledOrders.length,
      icon: <FaClock className="text-3xl mb-2" />,
      bgColor: "bg-red-100",
      textColor: "text-red-800",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaBox className="text-3xl mb-2" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Daily Sales",
      value: `Rs.${dailySales}`,
      icon: <FaCheckCircle className="text-3xl mb-2" />,
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Weekly Sales",
      value: `Rs.${weeklySales}`,
      icon: <FaClock className="text-3xl mb-2" />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      title: "Monthly Sales",
      value: `Rs.${monthlySales}`,
      icon: <FaBox className="text-3xl mb-2" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Products Added",
      value: `${productsArr.length}`,
      icon: <FaBox className="text-3xl mb-2" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Happy Clients",
      value: `${happyClients}`,
      icon: <FaBox className="text-3xl mb-2" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      title: "Unhappy Clients",
      value: `${unHappyClients}`,
      icon: <FaBox className="text-3xl mb-2" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
  ];

  // Data for order chart
  const orderChartData = {
    labels: ["Completed Orders", "Pending Orders", "Total Orders"],
    datasets: [
      {
        label: "Order Status",
        data: [completedOrders.length, pendingOrders.length, orders.length],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  // Data for sales chart
  const salesChartData = {
    labels: ["Daily Sales", "Weekly Sales", "Monthly Sales"],
    datasets: [
      {
        label: "Sales Data",
        data: [dailySales, weeklySales, monthlySales],
        backgroundColor: ["#8BC34A", "#FFC107", "#03A9F4"],
      },
    ],
  };

  return (
    <div className="p-3">
      {/* Dynamic Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} ${card.textColor} card shadow-md p-4`}
          >
            {card.icon}
            <h2 className="text-lg font-bold">{card.title}</h2>
            <p className="text-2xl">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Chart */}
      <div className="my-6 bg-gray-500 p-4 w-[50vw] rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Orders Overview</h2>
        <div className="w-full">
          <Doughnut
            data={orderChartData}
            options={{ maintainAspectRatio: false, responsive: true }}
          />
        </div>
      </div>

      {/* Sales Chart */}
      <div className="my-6 bg-gray-500 p-4 w-[50vw] rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
        <div className="w-full ">
          <Bar
            data={salesChartData}
            options={{ maintainAspectRatio: false, responsive: true }}
          />
        </div>
      </div>
    </div>
  );
}
