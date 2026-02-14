import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import Configuration from "./Configuration";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {

    const [data, setData] = useState(null);
    const [insights, setInsights] = useState(null);
    const [activeTab, setActiveTab] = useState("dashboard");

    useEffect(() => {

        const fetchData = async () => {

            // Fetch Dashboard Summary
            const res = await fetch("http://localhost:8000/api/dashboard/summary", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            const result = await res.json();
            setData(result);

            // Fetch AI Insights
            const insightsRes = await fetch("http://localhost:8000/api/ai-insights", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            const insightsData = await insightsRes.json();
            setInsights(insightsData);
        };

        fetchData();

    }, []);

    if (!data) return <h3 style={{ padding: "40px" }}>Loading...</h3>;

    const chartData = {
        labels: ["Food", "Taste", "Hygiene", "Portion"],
        datasets: [
            {
                label: "Average Ratings",
                data: [
                    data.avg_food_quality,
                    data.avg_taste,
                    data.avg_hygiene,
                    data.avg_portion_size
                ],
                backgroundColor: "#ff9800"
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                labels: { color: "white" }
            }
        },
        scales: {
            x: { ticks: { color: "white" } },
            y: { ticks: { color: "white" } }
        }
    };

    return (
        <div style={{ padding: "40px", color: "white" }}>

            <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

            {/* 🔹 TAB BUTTONS */}
            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={() => setActiveTab("dashboard")}
                    style={{ marginRight: "10px" }}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => setActiveTab("config")}
                >
                    Configuration
                </button>
            </div>

            {/* 🔹 LOGOUT BUTTON */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                style={{
                    marginBottom: "30px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#ff4d4d",
                    color: "white"
                }}
            >
                Logout
            </button>

            {/* ================= DASHBOARD TAB ================= */}
            {activeTab === "dashboard" && (
                <>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "20px"
                    }}>
                        <div className="card">Total Feedback: {data.total_feedback}</div>
                        <div className="card">Avg Food Quality: {data.avg_food_quality}</div>
                        <div className="card">Avg Taste: {data.avg_taste}</div>
                        <div className="card">Avg Hygiene: {data.avg_hygiene}</div>
                        <div className="card">Avg Portion Size: {data.avg_portion_size}</div>
                    </div>

                    <div style={{
                        marginTop: "50px",
                        background: "#1e1e1e",
                        padding: "20px",
                        borderRadius: "12px"
                    }}>
                        <Bar data={chartData} options={options} />
                    </div>

                    {insights && (
                        <div style={{
                            marginTop: "40px",
                            background: "#222",
                            padding: "20px",
                            borderRadius: "12px"
                        }}>
                            <h2>AI Insights</h2>
                            <p>Total Analyzed: {insights.total_feedback_analyzed}</p>
                            <p>Average Hygiene: {insights.average_hygiene}</p>

                            {insights.recommendations?.map((rec, index) => (
                                <p key={index}>• {rec}</p>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* ================= CONFIGURATION TAB ================= */}
            {activeTab === "config" && (
                <Configuration />
            )}

        </div>
    );
}
