import {
    collection,
    setDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { db } from "@/util/firebase";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddToCartButton({ mealObject }) {
    const [visitorID, setVisitorID] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    // Referance to "cart" collection in firebase
    const cartCollection = collection(db, "cart");

    useEffect(() => {
        // Function to retrieve the unique identifier from the cookie
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        // Retrieve the unique identifier from the cookie
        const visitorID = getCookie("visitorID");

        // If the unique identifier exists, put it in the state
        if (visitorID) {
            setVisitorID(visitorID);
        } else {
            // If the visitorID doesn't exist, create it
            const uniqueID = uuidv4();
            // Set the unique identifier in a cookie
            document.cookie = `visitorID=${uniqueID}`; // add experiation
            // Put it in the state
            setVisitorID(uniqueID);
        }
    }, []);

    // Funtion to check if the meal is in the cart
    const checkIfInCart = async () => {
        // Check if mealObject and its properties are defined
        if (
            mealObject &&
            mealObject.name &&
            mealObject.price &&
            mealObject.description
        ) {
            const q = query(
                cartCollection,
                where("name", "==", mealObject.name),
                where("price", "==", mealObject.price),
                where("description", "==", mealObject.description),
                where("donor_id", "==", visitorID)
            );

            const querySnapshot = await getDocs(q);
            if (querySnapshot.size > 0) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        } else {
            // Handle the case where mealObject or its properties are undefined
            //console.log("mealObject or its properties are undefined.");
        }
    };

    // Check if the product is in the cart when the component mounts
    useEffect(() => {
        checkIfInCart();
    }, [cartCollection, mealObject]);

    // Listen for changes in the Firebase collection to keep the button updated
    useEffect(() => {
        const unsubscribe = onSnapshot(cartCollection, () => {
            checkIfInCart();
        });

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [cartCollection]);

    // Function to handle button clicking
    const toggleCart = async () => {
        if (isInCart) {
            // If the item is in the cart, remove it
            const q = query(
                cartCollection,
                where("name", "==", mealObject.name),
                where("price", "==", mealObject.price),
                where("description", "==", mealObject.description),
                where("donor_id", "==", visitorID)
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((docSnapshot) => {
                deleteDoc(doc(db, "cart", docSnapshot.id))
                    .then(() => {
                        console.log("Document removed from cart successfully!");
                        setIsInCart(false);
                    })
                    .catch((error) => {
                        console.error(
                            "Error removing document from cart:",
                            error
                        );
                    });
            });
        } else {
            // If the item is not in the cart, add it

            await setDoc(doc(db, "cart"), {
                ...mealObject,
                donor_id: visitorID,
            });

            console.log("Document added to cart successfully!");
            setIsInCart(true);
        }
    };

    return (
        <div>
            <button
                onClick={toggleCart}
                className={`${isInCart ? "bg-red-500" : "bg-blue-500"}`}
            >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
        </div>
    );
}

export default AddToCartButton;