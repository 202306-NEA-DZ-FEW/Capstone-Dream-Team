import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import { auth } from "@/util/firebase";
import i18n from "@/util/i18n";

import Navbar from "../Navbar";

// Mock the currentUser object as null for testing non-existence
jest.mock("@/util/firebase", () => ({
    auth: {
        currentUser: null,
    },
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));
it("renders correctly", () => {
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <Navbar language='en' />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
