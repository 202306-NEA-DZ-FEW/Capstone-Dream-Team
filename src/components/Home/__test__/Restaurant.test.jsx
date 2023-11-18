import renderer from "react-test-renderer";

import Restaurant from "../Restaurant";

it("rend correctement", () => {
    const tree = renderer.create(<Restaurant />).toJSON();
    expect(tree).toMatchSnapshot();
});
