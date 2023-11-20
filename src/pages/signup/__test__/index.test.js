import renderer from "react-test-renderer";
import Enter from "../index";

// Mock the Firebase services
jest.mock("@/util/firebase", () => ({
    //getAuth: jest.fn(),
    auth: { currentUser: jest.fn() },
}));

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));

// Mock the useRouter hook
jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

it("renders correctly", () => {
    //getAuth.mockReturnValue();

    const tree = renderer.create(<Enter />).toJSON();
    expect(tree).toMatchSnapshot();
});
