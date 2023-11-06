import renderer from "react-test-renderer";
import Slider from "../Slider";

it("rend correctement", () => {
    const tree = renderer.create(<Slider />).toJSON();
    expect(tree).toMatchSnapshot();
});
