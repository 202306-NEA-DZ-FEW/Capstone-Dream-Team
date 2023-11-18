import renderer from "react-test-renderer";

import { getAuth } from "@/util/firebase";

import Sponsors from "../Sponsors";

// Mock the Firebase services
jest.mock("@/util/firebase", () => ({
    getAuth: jest.fn(),
}));
jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

it("rend correctement", () => {
    const tree = renderer.create(<Sponsors />).toJSON();
    expect(tree).toMatchSnapshot();
});
