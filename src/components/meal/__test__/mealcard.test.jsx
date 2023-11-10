import Mealcard from "../mealcard";
import renderer from "react-test-renderer";
import i18n from "../../../util/i18n";
import { I18nextProvider } from "react-i18next";
import { getAuth } from "@/util/firebase";

// Mock the Firebase services
jest.mock("@/util/firebase", () => ({
    getAuth: jest.fn(),
    initializeApp: jest.fn(), // Mock initializeApp to avoid Firebase initialization
}));

// Mock the AddToCartButton component
jest.mock("../../Cart/addToCartButton", () => {
    return function AddToCartButton() {
        return <div>AddToCartButton component</div>;
    };
});

// Mock the useRouter hook
jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

const price = "400";
const maxMeals = "25";
const name = "Msemen";
const imageUrl = "https://via.placeholder.com/444x530";
const mealDetail = {
    description: "Msemen",
    imageUrl: "https://via.placeholder.com/444x530",
    maxMeals: "25",
    name: "Msemen",
    price: "400",
    quantity: "1",
    restaurantId: "RyOYSd3J67hHqnKWC0dcp7N05Jd2",
};
const mealObject = {
    description: "Msemen",
    imageUrl: "https://via.placeholder.com/444x530",
    maxMeals: "25",
    name: "Msemen",
    price: "400",
    quantity: "1",
    restaurantId: "RyOYSd3J67hHqnKWC0dcp7N05Jd2",
};

it("renders correctly", () => {
    // Mock Firebase services
    getAuth.mockReturnValue();
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <Mealcard
                    name={name}
                    price={price}
                    maxMeals={maxMeals}
                    imageUrl={imageUrl}
                    mealDetail={mealDetail}
                    mealObject={mealDetail}
                />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
