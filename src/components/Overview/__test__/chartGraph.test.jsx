import renderer from "react-test-renderer";

import ChartGraph from "../chartGraph";

// Mock the next-i18next useTranslation hook
jest.mock("next-i18next", () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

// Mock the Firebase auth and Firestore functions
jest.mock("@/util/firebase", () => ({
    auth: {
        onAuthStateChanged: jest.fn(),
    },
    db: {
        collection: jest.fn(),
        onSnapshot: jest.fn(),
    },
}));

it("renders correctly", () => {
    const tree = renderer.create(<ChartGraph />).toJSON();
    expect(tree).toMatchSnapshot();
});
