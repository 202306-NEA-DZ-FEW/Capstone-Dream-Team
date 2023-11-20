import Mealcard from "./mealcard";
import Mealbar from "./mealbar";
import React, { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../util/firebase"; // Replace with your Firebase config import
import Bar from "./Bar";
import ReactPaginate from "react-paginate";
import { useTranslation } from "next-i18next";

export default function Meals() {
    const [rest, setRest] = useState([]);
    const [search, setSearch] = useState("");
    const { t } = useTranslation("common");

    useEffect(() => {
        async function fetchMeals() {
            const restaurantCollection = collection(db, "restaurant");
            const mealCollection = collection(db, "meals");
            try {
                const querySnapshot = await getDocs(restaurantCollection);
                const data = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const restaurant = doc.data();
                        const restaurantId = doc.id;

                        // Fetch details for each meal using restaurant_id
                        const mealQuery = query(
                            mealCollection,
                            where("restaurantId", "==", restaurantId)
                        );
                        const mealSnapshot = await getDocs(mealQuery);

                        const mealDetails = mealSnapshot.docs.map((mealDoc) => {
                            const mealData = mealDoc.data();
                            return {
                                price: mealData.price,
                                maxMeals: mealData.maxMeals,
                                name: mealData.name,
                                description: mealData.name,
                                imageUrl: mealData.imageUrl,
                                restaurantName: mealData.restaurantName,
                                restaurantId: mealData.restaurantId,
                                quantity: 1,
                            };
                        });

                        return {
                            Name: restaurant.restaurantName,
                            email: restaurant.email,
                            current_restaurant_Id: restaurant.restaurantId,
                            image: restaurant.image,
                            mealDetails: mealDetails,
                        };
                    })
                );
                setRest(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMeals();
    }, []);

    //const [users, setUsers] = useState(JsonData.slice(0, 50));
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 2;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = rest
        .filter((restaurant) => {
            return search.toLowerCase() === ""
                ? restaurant
                : restaurant.Name.toLowerCase().includes(search);
        })
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((restaurant, index) => {
            return (
                <div className=' mb-5 mt-10 mx-auto ' key={index}>
                    <div className=' pl-3 pr-3 '>
                        <Mealbar
                            name={restaurant.Name}
                            current_restaurant_Id={
                                restaurant.current_restaurant_Id
                            }
                            image={restaurant.image}
                        />
                    </div>
                    <div className='pb-10 pt-5 xl:mx-1 flex justify-center items-center '>
                        <div className='grid center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg2:grid-cols-4 gap-20 md:gap-8 lg:gap-8 lg2:gap-2'>
                            {restaurant.mealDetails
                                .slice(0, 4)
                                .map((mealDetail, mealIndex) => (
                                    <div
                                        className='flex md:mb-10'
                                        key={mealIndex}
                                    >
                                        <Mealcard
                                            price={mealDetail.price}
                                            maxMeals={mealDetail.maxMeals}
                                            name={mealDetail.name}
                                            imageUrl={mealDetail.imageUrl}
                                            mealDetail={mealDetail}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            );
        });

    const pageCount = Math.ceil(rest.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            {/* <Bar /> */}
            {/**search bar*/}
            <div className='py-4 mx-4 md:mx-6'>
                <div className='mt-4 pb-4 flex space-x-3 border-b border-gray-200 dark:border-gray-700'>
                    <div>
                        <svg
                            className='fill-stroke text-gray-600 dark:text-white'
                            width={20}
                            height={20}
                            viewBox='0 0 20 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z'
                                stroke='currentColor'
                                strokeWidth='1.25'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M19.0004 19.0004L14.6504 14.6504'
                                stroke='currentColor'
                                strokeWidth='1.25'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                    <input
                        type='text'
                        placeholder={t("mealsPage.Search")}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        className='focus:outline-none w-full bg-transparent text-sm text-gray-600'
                    />
                </div>
            </div>

            {/* {rest
                .filter((restaurant) => {
                    return search.toLowerCase() === ""
                        ? restaurant
                        : restaurant.Name.toLowerCase().includes(search);
                })
                .map((restaurant, index) => (
                    <div className=' mb-5 mt-10 mx-auto ' key={index}>
                        <div className=' pl-3 pr-3 '>
                            <Mealbar
                                name={restaurant.Name}
                                current_restaurant_Id={
                                    restaurant.current_restaurant_Id
                                }
                                image={restaurant.image}
                            />
                        </div>
                        <div className='pb-10 pt-5 xl:mx-1 flex justify-center items-center '>
                            <div className='grid center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg2:grid-cols-4 gap-20 md:gap-8 lg:gap-8 lg2:gap-2'>
                                {restaurant.mealDetails
                                    .slice(0, 4)
                                    .map((mealDetail, mealIndex) => (
                                        <div
                                            className='flex md:mb-10'
                                            key={mealIndex}
                                        >
                                            <Mealcard
                                                price={mealDetail.price}
                                                maxMeals={mealDetail.maxMeals}
                                                name={mealDetail.name}
                                                imageUrl={mealDetail.imageUrl}
                                                mealDetail={mealDetail}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}*/}

            {displayUsers}

            <div className='mb-5'>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={
                        "flex items-center justify-center space-x-2"
                    }
                    previousLinkClassName={
                        "px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                    }
                    nextLinkClassName={
                        "px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                    }
                    disabledClassName={"cursor-not-allowed opacity-50"}
                    activeClassName={"bg-blue-700 text-white"}
                    pageClassName={
                        "px-4 py-2 border border-gray-300 rounded-full hover:bg-blue-400"
                    }
                />
            </div>
        </div>
    );
}
