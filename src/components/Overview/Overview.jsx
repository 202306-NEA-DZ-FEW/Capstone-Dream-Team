import React from "react";

import BarChart from "./barChart"; // Make sure to import your LineChart component correctly
import StatCardList from "./statCardList";

export default function Overview() {
    return (
        <div>
            <StatCardList />
            <BarChart />
        </div>
    );
}
