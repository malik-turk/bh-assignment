import { render } from "@testing-library/react";
import App from "../App";

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

test("renders the landing page", () => {
  render(<App />);
});
