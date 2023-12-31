import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { auth, db } from "@/util/firebase";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

function ChartGraph() {
    const [authUser, setAuthUser] = useState(null);
    const [chartData, setChartData] = useState({
        series: [
            {
                name: "Donation per day",
                data: [],
            },
        ],
        options: {
            stroke: {
                curve: "smooth",
            },

            xaxis: {
                type: "category",
                categories: [],
            },
            yaxis: {
                type: "numeric",
                min: 0,
                labels: {
                    style: {
                        colors: "#575757",
                        fontSize: "14px",
                    },
                },
                forceNiceScale: true,
            },
        },
    });
    const { t } = useTranslation("common");

    const fetchInformation = async () => {
        if (authUser) {
            const userId = authUser.uid;
            const q = query(
                collection(db, "donors"),
                where("restaurantId", "==", userId)
            );

            const querySnapshot = await getDocs(q);
            let chart = {};

            querySnapshot.forEach((doc) => {
                const meal = doc.data();
                const date = meal.date;
                if (chart[date]) {
                    chart[date]++;
                } else {
                    chart[date] = 1;
                }
            });

            const chartArray = Object.keys(chart)
                .map((date) => {
                    const dateParts = date.split("/");
                    const formattedDate = new Date(
                        dateParts[2],
                        dateParts[1] - 1,
                        dateParts[0]
                    );

                    return {
                        day: t(
                            "overview.chartGraph.weekdays." +
                                formattedDate.getDay()
                        ),
                        date: date,
                        count: chart[date],
                        formattedDate: formattedDate,
                    };
                })
                .sort((a, b) => a.formattedDate - b.formattedDate);

            if (chartArray && chartArray.length > 0) {
                const chartData = {
                    series: [
                        {
                            name: "Donation per day",
                            data: chartArray.map((data) => data.count),
                        },
                    ],
                    options: {
                        stroke: {
                            curve: "smooth",
                        },

                        xaxis: {
                            type: "category",
                            categories: chartArray.map((data) => data.day),
                        },
                        yaxis: {
                            type: "numeric",
                            min: 0,
                            labels: {
                                style: {
                                    colors: "#575757",
                                    fontSize: "14px",
                                },
                            },
                            forceNiceScale: true,
                        },
                        tooltip: {
                            custom: function ({ dataPointIndex }) {
                                const data = chartArray[dataPointIndex];
                                return (
                                    `<div style="background-color: #ffffff; padding: 10px; border: 1px solid #cccccc; border-radius: 5px;">` +
                                    `<strong>${t(
                                        "overview.chartGraph.date"
                                    )}:</strong> ${data.formattedDate.toLocaleDateString()}<br>` +
                                    `<strong>${t(
                                        "overview.chartGraph.day"
                                    )}:</strong> ${data.day}<br>` +
                                    `<strong>${t(
                                        "overview.chartGraph.count"
                                    )}:</strong> ${data.count}</div>`
                                );
                            },
                        },
                    },
                };
                setChartData(chartData);
            }
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
    }, []);

    useEffect(() => {
        fetchInformation();

        const intervalId = setInterval(() => {
            fetchInformation();
        }, 60000); // Refresh every 1 minute, adjust as needed

        return () => clearInterval(intervalId);
    }, [authUser]);

    return (
        <div className='mx-6 col-span-12 rounded-md border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-8'>
            <div className='flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap'>
                <p className='font-bold text-primary'>
                    {t("overview.chartGraph.donationPerDay")}
                </p>
                <div className='w-full'>
                    <div className='-ml-5'>
                        {chartData && (
                            <ReactApexChart
                                options={chartData.options}
                                series={chartData.series}
                                type='area'
                                height={350}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartGraph;
