import React from "react";

import ChartGraph from "./chartGraph";
import StatCardList from "./statCardList";

export default function Overview() {
    return (
        <div>
            <StatCardList />
            <ChartGraph />
        </div>
    );
}
