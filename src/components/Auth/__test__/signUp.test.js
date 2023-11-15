import { I18nextProvider } from "react-i18next";
import renderer from "react-test-renderer";

import { getAuth } from "@/util/firebase";

import SignUp from "../signUp";
import i18n from "../../../util/i18n";
// Mock the Firebase services
jest.mock("@/util/firebase", () => ({
    getAuth: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

it("renders correctly", () => {
    getAuth.mockReturnValue();
    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <SignUp />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
