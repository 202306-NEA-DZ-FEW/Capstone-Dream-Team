import renderer from "react-test-renderer";

import { db } from "@/util/firebase";

import CartIcon from "../cartIcon";

// Mock the Firestore collection and its methods
jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
}));

// Mock the Firestore instance
jest.mock("@/util/firebase", () => ({
    db: {
        collection: jest.fn(),
    },
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

jest.mock("next-i18next", () => ({
    useTranslation: jest.fn().mockReturnValue({ t: jest.fn() }),
}));

describe("CartIcon Component", () => {
    it("renders correctly", () => {
        // Mock Firestore behavior
        db.collection.mockReturnValue({
            where: jest.fn(() => ({ get: jest.fn() })),
            add: jest.fn(),
        });

        const tree = renderer.create(<CartIcon />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
