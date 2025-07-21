import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StatusCard({ label, value, colorClass}){
  return (
    <div
      box-="square"
      className="text-center"
    >
      <div  className="text-xl uppercase">
        {label}
      </div>
      <div className={`text-xl font-bold ${colorClass}`}>
        {value}
      </div>
    </div>
  )
};

function Dashboard() {
  
  const [stats, setStats] = useState(null);

  const randomData = () => {
    const days    = 30;
    const result  = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      const dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      result.push({
        day:    dayStr,
        count:  Math.floor(Math.random() * 100),
      });
    }
    return result;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        success:    Math.floor(Math.random() * 500),
        fail:       Math.floor(Math.random() * 50),
        cpu:        Math.floor(Math.random() * 100),
        running:    Math.random() > 0.1,
        credits:    Math.floor(Math.random() * 50),
        trendData:  randomData(),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <h1>Loading stats...</h1>;

  const trendChartData = {
    labels: stats.trendData.map((d) => d.day),
    datasets: [
      {
        label:            "Requests",
        data:             stats.trendData.map((d) => d.count),
        borderColor:      "rgba(75, 192, 192, 1)",
        backgroundColor:  "rgba(75, 192, 192, 0.2)",
        fill:             true,
        tension:          0.3,
        pointRadius:      3,
      },
    ],
  };

  const chartOptions = (title, xLabel, yLabel) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: {
          family: "'Roboto Mono', monospace",
          size: 18,
        },
        color: '#94a3b8',
        padding: { top: 10, bottom: 20 },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,     // Show all labels (optional — disable for long lists)
          maxRotation: 45,     // Rotate to vertical
          minRotation: 0,
          font: {
            family: "'Roboto Mono', monospace",
            size: 10,
          },
          
        },
        title: {
          display: true,
          text: xLabel,
          font: { 
            family: "'Roboto Mono', monospace",
            size: 18, 
          },
          color: '#94a3b8',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yLabel,
          font: { 
            family: "'Roboto Mono', monospace",
            size: 18,
          },
          color: '#94a3b8',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  });

  return (
    <div>
      <h1> stats </h1>

      <div
        box-="square"
        className="w-full h-[500px]"
      >
        <Line
          data    ={trendChartData}
          options ={chartOptions("Requests Per Day", "Day", "Requests")}
        />
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          label="Successful Requests"
          value={stats.success}
          colorClass="text-green-600"
        />
        <StatusCard
          label="Failed Requests"
          value={stats.fail}
          colorClass="text-red-500"
        />
        <StatusCard
          label="CPU Utilization (%)"
          value={`${stats.cpu}`}
          colorClass={
            stats.cpu > 80
              ? "text-red-600"
              : stats.cpu > 50
              ? "text-yellow-500"
              : "text-green-600"
          }
        />
        <StatusCard
          label="Host Running"
          value={stats.running ? "Running" : "Down"}
          colorClass={stats.running ? "text-green-600" : "text-red-500"}
        />
        <StatusCard
          label="OpenAI Credits Left"
          value={`${stats.credits}`}
          colorClass="text-green-600"
        />
      </div>

    </div>
      
  );
}

export default Dashboard;
