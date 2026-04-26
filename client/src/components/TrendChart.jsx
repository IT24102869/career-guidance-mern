import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function TrendChart({ cutoffs = [], studentZScore, programName }) {
  // Defensive sorting to ensure chronological order
  const sortedCutoffs = [...cutoffs].sort((a, b) => a.year - b.year);
  
  const labels = sortedCutoffs.map((c) => String(c.year));
  const cutoffValues = sortedCutoffs.map((c) => c.cutoffZScore);

  const data = {
    labels,
    datasets: [
      {
        label: "University Cutoff",
        data: cutoffValues,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.35,
        fill: true,
        spanGaps: true,
      },
      ...(studentZScore != null
        ? [
            {
              label: "Your Z-Score",
              data: labels.map(() => studentZScore),
              borderColor: "#f59e0b",
              backgroundColor: "transparent",
              borderWidth: 2,
              borderDash: [10, 5],
              pointRadius: 0,
              tension: 0,
              fill: false,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow container to control height
    plugins: {
      legend: { 
        position: "bottom", 
        labels: { usePointStyle: true, padding: 20, font: { size: 12, family: "'Inter', sans-serif" } } 
      },
      title: {
        display: !!programName,
        text: programName ? `${programName} — 6-Year Cutoff Trend` : "",
        font: { size: 16, weight: "700", family: "'Inter', sans-serif" },
        padding: { bottom: 20 },
        color: "#1e293b"
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    layout: {
      padding: { left: 10, right: 10, top: 0, bottom: 0 }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Z-Score Value", font: { size: 13, weight: "600" } },
        ticks: { font: { size: 11 }, stepSize: 0.2 },
        grid: { color: "#f1f5f9" },
      },
      x: {
        title: { display: true, text: "Admission Year", font: { size: 13, weight: "600" } },
        ticks: { font: { size: 12, weight: "500" } },
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ height: "320px", width: "100%", padding: "10px 0" }}>
      <Line data={data} options={options} />
    </div>
  );
}
