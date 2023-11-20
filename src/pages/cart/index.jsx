import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import Card from "@/components/Cart/card";
import Checkout from "@/components/Cart/checkout";

import Layout from "@/layout/Layout";
import { db } from "@/util/firebase";
import Link from "next/link";

function Cart() {
    const { t } = useTranslation("common");
    const [meals, setMeals] = useState([]);
    const [hoverOver, setHoverOver] = useState(false);

    const [visitorID, setVisitorID] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            //Function to retrieve the unique identifier from the cookie
            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(";").shift();
            }

            //Retrieve the unique identifier from the cookie
            const visitorID = getCookie("visitorID");
            setVisitorID(visitorID);

            if (visitorID) {
                const cartCollection = collection(db, "cart");
                const q = query(
                    cartCollection,
                    where("donorId", "==", visitorID)
                );
                const querySnapshot = await getDocs(q);
                const mealsData = [];
                querySnapshot.forEach((doc) => {
                    const mealData = doc.data();
                    mealsData.push({
                        ...mealData,
                        //quantity: 1,
                    });
                });

                setMeals(mealsData);
            } else {
                setMeals([]);
            }
        };

        fetchMeals();

        // Add a real-time listener to update the cart when changes occur
        const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
            fetchMeals(); // Refetch products when a change occurs
        });

        return () => {
            // Clean up the listener when the component unmounts

            unsubscribe();
        };
    }, []);

    const removeFromCart = (mealToRemove) => {
        // Filter out the product to be removed from the products state
        const updatedMeals = meals.filter((meal) => meal !== mealToRemove);
        setMeals(updatedMeals);
    };

    // Functions to update quantity
    const updateQuantity = (mealToUpdate, newQuantity) => {
        const updatedMeals = meals.map((meal) => {
            if (meal.name === mealToUpdate.name) {
                return { ...meal, quantity: newQuantity };
            }
            return meal;
        });

        setMeals(updatedMeals);
    };

    // Function to calculate total price to donate
    const totalCartPrice = meals.reduce((total, meal) => {
        return total + meal.price * meal.quantity;
    }, 0);

    // Function to calculate the number of meals that are going to be donated
    const totalMeals = meals.reduce((total, meal) => {
        return total + meal.quantity;
    }, 0);

    return (
        <Layout>
            {visitorID && meals.length !== 0 ? (
                <div className='flex flex-col xl2:flex-row w-screen h-full  py-7 pl-2 pr-2'>
                    {/* Header Section */}
                    <div className='w-full flex flex-col h-fit gap-4 p-4'>
                        <div className='flex flex-col md:flex-row gap-3 justify-between pl-4 pr-4 h-14 border-b-2'>
                            <div className='  gap-6'>
                                <p className='text-blue-900 text-xl font-semibold md2:w-[376px]'>
                                    {t("cartPage.cart.meal")}
                                </p>
                            </div>
                            <p className='text-blue-900 text-xl font-semibold hidden md2:block w-[100px] text-center'>
                                {t("cartPage.cart.price")}
                            </p>
                            <p className='text-blue-900 text-xl font-semibold hidden md2:block w-[100px] text-center'>
                                {t("cartPage.cart.quantity")}
                            </p>
                            <p className='text-blue-900 text-xl font-semibold hidden md2:block w-[100px] text-center'>
                                {t("cartPage.cart.subtotal")}
                            </p>
                            <p className='text-blue-900 text-xl font-semibold hidden md2:block w-[100px] text-center'>
                                {t("cartPage.cart.remove")}
                            </p>
                        </div>
                        {/* I map here to put the Cards*/}

                        {meals.map((meal) => (
                            <Card
                                mealObject={meal}
                                onUpdateQuantity={updateQuantity}
                                onRemoveFromCart={removeFromCart}
                                key={meal.id}
                            />
                        ))}

                        {/*<p>{t("cartPage.cart.message")}</p>*/}
                    </div>

                    {/* Checkout Card Section */}
                    <div className='flex flex-col w-full xl2:w-1/3 h-fit gap-4 p-4'>
                        <p className='text-blue-900 text-xl font-semibold'>
                            {t("cartPage.cart.summary")}
                        </p>
                        <div className='flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm'>
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-600'>
                                    {t("cartPage.cart.totalMeals")}
                                </p>
                                <p className='text-end font-bold'>
                                    {totalMeals}
                                </p>
                            </div>
                            <hr className='bg-gray-200 h-0.5' />
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-600'>
                                    {t("cartPage.cart.averagePayPerMeal")}
                                </p>
                                <div>
                                    <p className='text-end font-bold'>
                                        {Number.isNaN(
                                            totalCartPrice / totalMeals
                                        )
                                            ? "$0"
                                            : `$${(
                                                  totalCartPrice / totalMeals
                                              ).toFixed(2)}`}
                                    </p>
                                </div>
                            </div>

                            <hr className='bg-gray-200 h-0.5' />
                            <div className='flex flex-row justify-between'>
                                <p className='text-gray-600'>
                                    {t("cartPage.cart.total")}
                                </p>
                                <div>
                                    <p className='text-end font-bold'>
                                        ${totalCartPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Checkout
                                    Total={totalCartPrice.toFixed(2)}
                                    cart={meals}
                                />
                                {/* <button >
                                 {t("cartPage.cart.donate")} 
                                
                            </button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col text-center justify-center mx-4 my-4'>
                    <div className='flex justify-center'>
                        <Link href='/meals'>
                            <img
                                className={`hover:transform hover:rotate-12 duration-300  ${
                                    hoverOver &&
                                    "transform rotate-12 duration-300"
                                }`}
                                src='/images/cart/cart.png'
                            />
                        </Link>
                    </div>
                    <p className='font-semibold text-4xl mb-8'>
                        {t("cartPage.cart.message")}
                    </p>
                    <p className=' text-2xl'>
                        {t("cartPage.cart.message2")}
                        <Link
                            className='pointer-cursor hover:text-blue-500'
                            href='/meals'
                            onMouseOver={() => setHoverOver(true)}
                            onMouseLeave={() => setHoverOver(false)}
                        >
                            {" "}
                            {t("cartPage.cart.message3")}
                        </Link>{" "}
                    </p>
                </div>
            )}
        </Layout>
    );
}
export default Cart;

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
