import renderer from "react-test-renderer";

import EmailTemplate from "../email-template";

const object = [
    "mouloud",
    "mouloud@gmail.com",
    25,
    [{ name: "Sushi", restaurantName: "Big Burger", quantity: 4, price: 23 }],
];
const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${26}-${11}-${2023}`;
};
jest.mock("../email-template", () => {
    const actualModule = jest.requireActual("../email-template");
    return {
        ...actualModule,
        __esModule: true,
        default: ({ object }) => {
            const [name, email, total, cart] = object;
            const today = new Date("2023-11-26");
            const formattedDate = formatDate(today);
            return actualModule.default({
                object: [name, email, total, cart, formattedDate],
            });
        },
    };
});

it("renders correctly", () => {
    const tree = renderer.create(<EmailTemplate object={object} />).toJSON();
    expect(tree).toMatchSnapshot();
});
