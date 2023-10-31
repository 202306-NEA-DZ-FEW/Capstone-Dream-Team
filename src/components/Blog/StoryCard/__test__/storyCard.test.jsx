import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import StoryCard from "../storyCard";
import i18n from "../../../../util/i18n";
const article = {
    title: "Sample Title 1",
    content: "Sample Content 1",
    publish_date: "2023-10-31",
};

it("renders correctly", () => {
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <StoryCard language='en' article={article} index={1} />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
