import renderer from "react-test-renderer";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase functions
import { getAuth } from "firebase/auth"; // Import getAuth function

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(), // Mock getAuth function
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
}));

import { I18nextProvider } from "react-i18next";
import i18n from "@/util/i18n";
import Sidemenu from "../../Sidemenu";

jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

it("renders correctly", () => {
    // Mock the usage of getAuth if it's being used within Sidemenu component
    // getAuth.mockReturnValue(...);

    const tree = renderer
        .create(
            <I18nextProvider i18n={i18n}>
                <Sidemenu language='en' />
            </I18nextProvider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
