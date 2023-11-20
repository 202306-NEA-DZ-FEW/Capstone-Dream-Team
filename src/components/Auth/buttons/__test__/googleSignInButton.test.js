import renderer from "react-test-renderer";
import SignInWithGoogleButton from "../googleSignInButton";
import { getAuth } from "@/util/firebase";

// Mock the Firebase services
jest.mock("@/util/firebase", () => ({
    getAuth: jest.fn(),
}));

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));

it("renders correctly", () => {
    getAuth.mockReturnValue();
    const tree = renderer.create(<SignInWithGoogleButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
