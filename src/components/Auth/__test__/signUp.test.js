import renderer from "react-test-renderer";
import SignUp from "../signUp";

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

it("renders correctly", () => {
    getAuth.mockReturnValue();
    const tree = renderer.create(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
});
