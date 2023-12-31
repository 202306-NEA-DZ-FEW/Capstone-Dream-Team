import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import BlogCardList from "../blogCardList";
import i18n from "../../../../util/i18n";
const blogs = [
    {
        id: "1",
        data: {
            title: "Sample Title 1",
            content: "Sample Content 1",
            publish_date: "2023-10-30",
        },
    },
    {
        id: "2",
        data: {
            title: "Sample Title 2",
            content: "Sample Content 2",
            publish_date: "2023-10-31",
        },
    },
];
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));
jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));
it("renders correctly", () => {
    const tree = renderer
        .create(<BlogCardList blogs={blogs} numToShow={2} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
