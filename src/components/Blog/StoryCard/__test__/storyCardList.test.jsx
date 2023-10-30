import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import StoryCardList from "../storyCardList";
import i18n from "../../../../util/i18n";
const articles = [
    {
        title: "Sample Title 1",
        content: "Sample Content 1",
        publish_date: "2023-10-30",
    },
    {
        title: "Sample Title 2",
        content: "Sample Content 2",
        publish_date: "2023-10-31",
    },
];

it("renders correctly", () => {
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <StoryCardList
                    articles={articles}
                    numToShow={2}
                    language='en'
                />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
