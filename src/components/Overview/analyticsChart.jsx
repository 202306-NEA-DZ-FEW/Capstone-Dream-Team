import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { auth, db } from "@/util/firebase";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

function ChartGraph() {
    const [authUser, setAuthUser] = useState(null);
    const [chartData, setChartData] = useState(null);
    const yearlyAnalyticsChartOptions = {};
    //   legend: {
    //     show: false,
    //     position: "top",
    //     horizontalAlign: "left",
    //   },
    //   colors: ["#3C50E0", "#80CAEE"],
    //   chart: {
    //     fontFamily: "Satoshi, sans-serif",
    //     height: 335,
    //     type: "area",
    //     dropShadow: {
    //       enabled: true,
    //       color: "#623CEA14",
    //       top: 10,
    //       blur: 4,
    //       left: 0,
    //       opacity: 0.1,
    //     },
    //     toolbar: {
    //       show: true,
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       options: {
    //         chart: {
    //           height: 300,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 1366,
    //       options: {
    //         chart: {
    //           height: 350,
    //         },
    //       },
    //     },
    //   ],
    //   stroke: {
    //     width: [2, 2],
    //     curve: "straight",
    //   },
    //   grid: {
    //     xaxis: {
    //       lines: {
    //         show: true,
    //       },
    //     },
    //     yaxis: {
    //       lines: {
    //         show: true,
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   markers: {
    //     size: 4,
    //     colors: "#fff",
    //     strokeColors: ["#3056D3", "#80CAEE"],
    //     strokeWidth: 3,
    //     strokeOpacity: 0.9,
    //     strokeDashArray: 0,
    //     fillOpacity: 1,
    //     discrete: [],
    //     hover: {
    //       size: undefined,
    //       sizeOffset: 5,
    //     },
    //   },
    //   xaxis: {
    //     type: "category", // Change type to "category" for weekdays
    //     categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Weekdays as categories
    //     axisBorder: {
    //       show: false,
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //   },
    //   yaxis: {
    //     title: {
    //       style: {
    //         fontSize: "0px",
    //       },
    //     },
    //     min: 0,
    //     max: 5,
    //   },
    // };

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

                // Add a null check before mapping
                if (chartArray && chartArray.length > 0) {
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
                    setChartData(chartData);
                } else {
                    // Handle the case when chartArray is null or empty
                    setChartData(null);
                }
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
        <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-8'>
            <div className='flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap'>
                <p className='font-bold text-primary'>Donation per day </p>
                <div className='w-full'>
                    <div id='YearlyAnalyticsChart' className='-ml-5'>
                        {chartData && (
                            <ReactApexChart
                                options={yearlyAnalyticsChartOptions}
                                series={[
                                    {
                                        name: "Donation per day",
                                        data: chartData
                                            ? chartData.datasets[0].data
                                            : [],
                                    },
                                ]}
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
