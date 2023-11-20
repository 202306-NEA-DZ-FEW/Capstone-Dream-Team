import renderer from "react-test-renderer";
import ResetPassword from "../resetPassword";

// Mock the Firebase services
jest.mock("@/util/firebase", () => ({}));

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));

it("renders correctly", () => {
    const tree = renderer.create(<ResetPassword />).toJSON();
    expect(tree).toMatchSnapshot();
});
