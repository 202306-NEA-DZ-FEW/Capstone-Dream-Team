import renderer from "react-test-renderer";

import BlogCard from "../blogCard";
const blog = {
    id: "1",
    data: {
        title: "Sample Title 1",
        content: "Sample Content 1",
        publish_date: "2023-10-31",
    },
};
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
it("renders correctly", () => {
    const tree = renderer.create(<BlogCard blog={blog} />).toJSON();
    expect(tree).toMatchSnapshot();
});
