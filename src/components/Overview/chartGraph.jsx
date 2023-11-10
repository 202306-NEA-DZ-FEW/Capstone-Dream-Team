import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from "chart.js";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { auth, db } from "@/util/firebase";

function ChartGraph() {
    const [authUser, setAuthUser] = useState(null);
    const [chartData, setChartData] = useState(null); // Changed variable name
    // const options = {
    //     responsive: true,
    //     plugins: {
    //         legend: {
    //             position: "top",
    //         },
    //         title: {
    //             display: true,
    //             text: "Chart.js Line Chart",
    //         },
    //     },
    //     scales: {
    //         x: {
    //             beginAtZero: true,
    //         },
    //         y: {
    //             beginAtZero: true,
    //             ticks: {
    //                 // Your custom Y-axis values here
    //                 stepSize: 5, // You can set the step size
    //                 min: 0, // Minimum value
    //                 max: 20, // Maximum value
    //             },
    //         },
    //     },
    // };
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: "red",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "green",
                },
            },
            y: {
                ticks: {
                    color: "black",
                },
            },
        },
    };
    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        TimeScale,
        BarElement
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });

        const fetchInformation = async () => {
            if (authUser) {
                const userId = authUser.uid;
                const q = query(
                    collection(db, "donors"),
                    where("restaurantId", "==", userId)
                );

                const querySnapshot = await getDocs(q);
                const chart = {};

                querySnapshot.forEach((doc) => {
                    const meal = doc.data();
                    const date = meal.date;

                    if (chart[date]) {
                        chart[date]++;
                    } else {
                        chart[date] = 1;
                    }
                });

                const chartArray = Object.keys(chart).map((date) => ({
                    date: date,
                    count: chart[date],
                }));
                const chartData = {
                    labels: chartArray.map((data) => data.date),
                    datasets: [
                        {
                            label: "Donation per day",
                            data: chartArray.map((data) => data.count),
                            borderColor: "rgb(255, 99, 132)",
                            backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                    ],
                };
                setChartData(chartData); // Corrected variable name
            }
        };

        const unsubscribe = onSnapshot(collection(db, "donors"), () => {
            fetchInformation();
        });

        return () => {
            unsubscribe();
        };
    }, [authUser]);

    return (
        <div className='h-2/3 max-w-full bg-white'>
            hey
            {chartData && (
                <Line className='border' data={chartData} options={options} />
            )}
        </div>
    );
}

export default ChartGraph;
