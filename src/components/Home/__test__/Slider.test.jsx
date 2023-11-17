import renderer from "react-test-renderer";
import Slider from "../HeroSection";

it("rend correctement", () => {
    const tree = renderer.create(<Slider />).toJSON();
    expect(tree).toMatchSnapshot();
});
