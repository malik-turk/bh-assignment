import { render } from "@testing-library/react";
import VoteSkeleton from "../components/VoteSkeleton";

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

test("renders the landing page", () => {
  render(<VoteSkeleton />);
});
