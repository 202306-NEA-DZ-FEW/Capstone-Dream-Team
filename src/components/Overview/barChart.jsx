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
import { Bar } from "react-chartjs-2";

import { auth, db } from "@/util/firebase";

function BarChart() {
    const [authUser, setAuthUser] = useState(null);
    const [chartData, setChartData] = useState(null); // Changed variable name

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
                            backgroundColor: "rgba(75,192,192,1)",
                            borderColor: "rgba(0,0,0,1)",
                            borderWidth: 2,
                        },
                    ],
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                            },
                        },
                    },
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
        <div className='w-full h-full'>
            {chartData && <Bar data={chartData} />}
        </div>
    );
}

export default BarChart;
