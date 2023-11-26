import renderer from "react-test-renderer";

import EmailTemplate from "../email-template";
const object = [
    "mouloud",
    "mouloud@gmail.com",
    25,
    [{ name: "Sushi", restaurantName: "Big Burger", quantity: 4, price: 23 }],
];

it("renders correctly", () => {
    const tree = renderer.create(<EmailTemplate object={object} />).toJSON();
    expect(tree).toMatchSnapshot();
});
