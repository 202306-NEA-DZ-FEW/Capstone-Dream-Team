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

function Cart() {
    //const [mealObject, setMealObject] = useState({});

    /*useEffect(() => {
  const fetchMealData = async () => {
    const docRef = doc(db, "meal", "0u1KPSVJy697wvUZ611rh8fD6S");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setMealObject(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  fetchMealData();


}, []);*/

    //console.log(mealObject)

    const { t } = useTranslation("common");
    const [meals, setMeals] = useState([]);

    // const visitorID = "8ddb9194-5002-431d-8851-b70b3ea173b9";

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
            // const visitorID = "8ddb9194-5002-431d-8851-b70b3ea173b9";

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
        // You can remove the product from the Firebase collection here
        // and the real-time listener will automatically update the page.
        // Example:
        // deleteDoc(doc(db, "Products", productToRemove.id));

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
        /*<div>
  <Card mealObject={mealObject} />
</div>*/

        /*<div class="flex items-center bg-red-500 rounded-lg p-4 mb-4 shadow-md w-3/5">

  <div class="w-16 h-16 mr-4">
    <img src="meal-image.jpg" alt="Meal Image" className="w-full h-full object-cover rounded-lg" />
  </div>


  <div class=" w-80">

    <p class="text-lg font-semibold mb-1">Meal Name</p>


    <p class="text-sm text-gray-500 mb-2">Meal Information</p>

  </div>

  <p class="text-lg font-semibold mr-2">$10.99</p>


  <p class="text-gray-500">x2</p>



  <p class="text-lg font-semibold mt-2">$21.98</p>

</div>
*/

        <Layout>
            <div class='flex flex-col md:flex-row w-screen h-full  py-7 pl-2 pr-2'>
                {/* Header Section */}
                <div class='w-full flex flex-col h-fit gap-4 p-4'>
                    <div class='flex flex-col md:flex-row gap-3 justify-between pl-4 pr-4 h-14 border-b-2'>
                        <div class='  gap-6'>
                            <p class='text-blue-900 text-xl font-semibold w-[376px]'>
                                {t("cartPage.cart.meal")}
                            </p>
                        </div>
                        <p class='text-blue-900 text-xl font-semibold hidden md:block w-[100px] text-center'>
                            {t("cartPage.cart.price")}
                        </p>
                        <p class='text-blue-900 text-xl font-semibold hidden md:block w-[100px] text-center'>
                            {t("cartPage.cart.quantity")}
                        </p>
                        <p class='text-blue-900 text-xl font-semibold hidden md:block w-[100px] text-center'>
                            {t("cartPage.cart.subtotal")}
                        </p>
                        <p class='text-blue-900 text-xl font-semibold hidden md:block w-[100px] text-center'>
                            {t("cartPage.cart.remove")}
                        </p>
                    </div>
                    {/* I map here to put the Cards*/}
                    {visitorID && meals.length !== 0 ? (
                        meals.map((meal) => (
                            <Card
                                mealObject={meal}
                                onUpdateQuantity={updateQuantity}
                                onRemoveFromCart={removeFromCart}
                                key={meal.id}
                            />
                        ))
                    ) : (
                        <p>{t("cartPage.cart.message")}</p>
                    )}
                </div>

                {/* Checkout Card Section */}
                <div class='flex flex-col w-full md:w-1/3 h-fit gap-4 p-4'>
                    <p class='text-blue-900 text-xl font-semibold'>
                        {t("cartPage.cart.summary")}
                    </p>
                    <div class='flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm'>
                        <div class='flex flex-row justify-between'>
                            <p class='text-gray-600'>
                                {t("cartPage.cart.totalMeals")}
                            </p>
                            <p class='text-end font-bold'>{totalMeals}</p>
                        </div>
                        <hr class='bg-gray-200 h-0.5' />
                        <div class='flex flex-row justify-between'>
                            <p class='text-gray-600'>
                                {t("cartPage.cart.averagePayPerMeal")}
                            </p>
                            <div>
                                <p class='text-end font-bold'>
                                    {Number.isNaN(totalCartPrice / totalMeals)
                                        ? "$0"
                                        : `$${(
                                              totalCartPrice / totalMeals
                                          ).toFixed(2)}`}
                                </p>
                                {/*<p class="text-gray-600 text-sm font-normal">Arrives on Jul 16</p>*/}
                            </div>
                        </div>
                        {/*<hr class="bg-gray-200 h-0.5" />
          <div class="flex flex-row justify-between">
            <p class="text-gray-600">Discount Coupon</p>
            <a class="text-gray-500 text-base underline" href="#">Add</a>
  </div>*/}
                        <hr class='bg-gray-200 h-0.5' />
                        <div class='flex flex-row justify-between'>
                            <p class='text-gray-600'>
                                {t("cartPage.cart.total")}
                            </p>
                            <div>
                                <p class='text-end font-bold'>
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
