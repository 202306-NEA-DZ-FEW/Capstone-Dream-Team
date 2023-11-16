import renderer from "react-test-renderer";

import StatCard from "../statCard";

it("renders correctly", () => {
    const tree = renderer.create(<StatCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
