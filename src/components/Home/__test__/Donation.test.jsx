import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import i18n from "@/util/i18n";

import Donation from "../Donation";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <Donation language='en' />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
