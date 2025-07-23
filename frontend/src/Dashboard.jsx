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
  
  const [statistics, setStatistic] = useState(null);

  const randomTrendData = () => {
    const days    = 30;
    const result  = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      // Last 30 days
      date.setDate(date.getDate() - (days - i - 1));
      // 
      const dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      result.push({
        day:    dayStr,                           // Jul - 4
        count:  Math.floor(Math.random() * 10),   // 5
      });
    }
    return result;
  };

  // initializes statistics
  useEffect(() => {
    // Updates statistics every 5s
    // const interval = setInterval(() => {
      setStatistic({
        success:    Math.floor(Math.random() * 500),
        fail:       Math.floor(Math.random() * 50),
        cpu:        Math.floor(Math.random() * 100),
        running:    Math.random() > 0.1,                // running 90% of the time
        credits:    Math.floor(Math.random() * 50),
        trendData:  randomTrendData(),
      });
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  // Once setInterval is invoked, it begins its timer, 
  // and the first execution of the provided function occurs after the initial delay, 
  // regardless of whether a re-render has completed.

  // statistics is null at first
  if (!statistics) return <h1 className="text-center">Loading statistics...</h1>;


  const chartTrendData = {
    // x
    labels: statistics.trendData.map((d) => d.day),
    // y
    datasets: [
      {
        label:            "Requests",
        data:             statistics.trendData.map((d) => d.count),
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
          autoSkip: false,     
          maxRotation: 45,     
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
      <h1 className="text-center"> statistics </h1>

      {/* trend */}
      <div
        box-      ="square"
        className ="w-full h-[500px]"
      >
        <Line
          data    ={chartTrendData}
          options ={chartOptions("Requests Per Day", "Day", "Requests")}
        />
      </div>

      {/* statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          label       ="Successful Requests"
          value       ={statistics.success}
          colorClass  ="text-slate-200"
        />
        <StatusCard
          label       ="Failed Requests"
          value       ={statistics.fail}
          colorClass  ="text-slate-200"
        />
        <StatusCard
          label       ="CPU Utilization (%)"
          value       ={`${statistics.cpu}`}
          colorClass  ="text-slate-200"
        />
        <StatusCard
          label       ="Host Running"
          value       ={statistics.running ? "Running" : "Down"}
          colorClass  ="text-slate-200"
        />
        <StatusCard
          label       ="OpenAI Credits Left"
          value       ={`${statistics.credits}`}
          colorClass  ="text-slate-200"
        />
      </div>

    </div> 
  );
}

export default Dashboard;
