import { useRouter } from "next/router";
import renderer from "react-test-renderer";

import StoryCard from "../storyCard";
const story = {
    id: "1",
    data: {
        title: "Sample Title 1",
        content: "Sample Content 1",
        publish_date: "2023-10-31",
    },
};
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));
it("renders correctly", () => {
    useRouter.mockReturnValue({
        locale: "en", // Mock the locale property
    });
    const tree = renderer
        .create(<StoryCard story={story} index={1} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
