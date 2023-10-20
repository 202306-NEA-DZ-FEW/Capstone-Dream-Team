import React from "react";
import { useState } from "react";

import { UserData } from "./data";
import LineChart from "./lineChart";
import StatCard from "./statCard";

export default function Overview() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    return (
        <div>
            <StatCard />
            <div style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>
        </div>
    );
}
