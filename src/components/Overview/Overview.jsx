import React from "react";

import ChartGraph from "./analyticsChart";
import StatCardList from "./statCardList";

export default function Overview() {
    const date = new Date(2023, 10, 11); // Month is zero-based, so 10 represents November
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    }).format(date);

    console.log("formattedDate", formattedDate);
    // Now 'formattedDate' contains the full name of the day (e.g., "Monday")

    // Push 'formattedDate' to Firebase along with other data
    // firebase.database().ref('yourPath').push({ date: formattedDate, otherData: yourOtherData });

    return (
        <div className=''>
            <StatCardList />
            <ChartGraph />
        </div>
    );
}
