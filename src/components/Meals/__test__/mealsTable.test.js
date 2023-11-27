import renderer from "react-test-renderer";
import MealsTable from "../mealsTable";

const meals = [
    {
        name: "Sushi",
        id: 5,
        maxMeals: 34,
        imageUrl: "",
        price: 5,
    },
];

it("renders correctly", () => {
    const tree = renderer.create(<MealsTable meals={meals} />).toJSON();
    expect(tree).toMatchSnapshot();
});
