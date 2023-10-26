import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsPersonFillUp } from "react-icons/bs";
import { GiForkKnifeSpoon } from "react-icons/gi";

import { db } from "@/util/firebase";

import statCard from "./statCard";
import StatCard from "./statCard";

const StatCardList = () => {
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [totalActiveMeals, setTotalActiveMeals] = useState(0);
    const [totalDonation, setTotalDonation] = useState(0);

    const fetchData = async () => {
        const restaurantDocRef = doc(
            db,
            "restaurant",
            "0D43G8mVTQbqJ407d4i446L09k"
        );
        const restaurantDoc = await getDoc(restaurantDoc);

        if (restaurantDoc.exists()) {
            const mealsArray = restaurantDoc.data().meals.map((e) => e.meal);
            mealsArray.forEach((meal) => {});
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='m-6'>
            <div className='flex flex-wrap -mx-6'>
                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 '>
                    <StatCard
                        icon={<GiForkKnifeSpoon />}
                        title='Total Meals'
                        number={1000}
                    />
                </div>

                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/4 '>
                    <StatCard
                        icon={<BsPersonFillUp />}
                        title='Total Active Meals'
                        number={1000}
                    />
                </div>
                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/4'>
                    <StatCard
                        icon={<BsPersonFillUp />}
                        title='Total Donors'
                        number={1000}
                    />
                </div>
                <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/4'>
                    <StatCard
                        icon={<BsPersonFillUp />}
                        title='Total Donation'
                        number={1000}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatCardList;
