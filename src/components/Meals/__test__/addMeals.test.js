import renderer from "react-test-renderer";
import AddMeals from "../addMeals";

jest.mock("@/util/firebase", () => ({}));

it("renders correctly", () => {
    const tree = renderer.create(<AddMeals />).toJSON();
    expect(tree).toMatchSnapshot();
});
