import renderer from "react-test-renderer";
import SignUpWithGoogleButton from "../googleSignUpButton";
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
    const tree = renderer.create(<SignUpWithGoogleButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
