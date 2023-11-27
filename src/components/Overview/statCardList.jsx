import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { BsPersonFillUp } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { GiForkKnifeSpoon } from "react-icons/gi";

import { auth, db } from "@/util/firebase";

import StatCard from "./statCard";

const StatCardList = () => {
    const [authUser, setAuthUser] = useState(null);
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [totalActiveMeals, setTotalActiveMeals] = useState(0);
    const [totalDonation, setTotalDonation] = useState(0);
    const { t } = useTranslation("common");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
    }, []);

    useEffect(() => {
        const fetchInformation = async () => {
            if (authUser) {
                const userId = authUser.uid;
                const q = query(
                    collection(db, "donors"),
                    where("restaurantId", "==", userId)
                );
                const querySnapshot = await getDocs(q);

                setTotalDonors(querySnapshot.size);

                let totalMeals = 0;
                let totalActiveMeals = 0;
                let totalDonation = 0;

                querySnapshot.forEach((doc) => {
                    const meal = doc.data();
                    totalMeals += meal.quantity;
                    totalActiveMeals += meal.active_meal;
                    totalDonation += meal.quantity * meal.price;
                });

                setTotalMeals(totalMeals);
                setTotalActiveMeals(totalActiveMeals);
                setTotalDonation(totalDonation.toFixed(2));
            }
        };

        fetchInformation(); // Fetch initial data

        const intervalId = setInterval(() => {
            fetchInformation(); // Fetch periodic updates
        }, 60000); // Refresh every 1 minute, adjust as needed

        return () => clearInterval(intervalId);
    }, [authUser]);

    return (
        <div className='mx-6 mb-6'>
            <div className='flex flex-wrap -mx-6'>
                <div className='w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 '>
                    <StatCard
                        icon={<GiForkKnifeSpoon />}
                        title={t("overview.statCard.totalMeals")}
                        number={totalMeals}
                    />
                </div>

                <div className='w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 '>
                    <StatCard
                        icon={<FaCheck />}
                        title={t("overview.statCard.totalActiveMeals")}
                        number={totalActiveMeals}
                    />
                </div>
                <div className='w-full mt-6 px-2 sm:w-1/2 xl:w-1/4'>
                    <StatCard
                        icon={<BsPersonFillUp />}
                        title={t("overview.statCard.totalDonors")}
                        number={totalDonors}
                    />
                </div>
                <div className='w-full mt-6 px-2 sm:w-1/2 xl:w-1/4'>
                    <StatCard
                        icon={<BsCurrencyDollar />}
                        title={t("overview.statCard.totalDonation")}
                        number={totalDonation}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatCardList;
