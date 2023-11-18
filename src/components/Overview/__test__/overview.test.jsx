import renderer from "react-test-renderer";

import Overview from "../overview";
// Mock the child components
jest.mock("../chartGraph", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("../statCardList", () => ({ __esModule: true, default: jest.fn() }));
it("renders correctly", () => {
    const tree = renderer.create(<Overview />).toJSON();
    expect(tree).toMatchSnapshot();
});
