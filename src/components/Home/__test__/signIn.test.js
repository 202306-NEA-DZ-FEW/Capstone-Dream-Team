import renderer from "react-test-renderer";
import SignIn from "../signIn";
import { getAuth } from "@/util/firebase";

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

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));

it("renders correctly", () => {
    getAuth.mockReturnValue();
    const tree = renderer.create(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
});
