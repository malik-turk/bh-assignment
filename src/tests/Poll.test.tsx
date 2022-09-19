import { render, screen, act } from "@testing-library/react";
import Poll from "../components/Poll";
import VotingPageStore from "../store/VotingPageStore";

// Constants
import { POLL_ADD_BUTTON, POLL_RESET_BUTTON } from '../constants/test-ids.constants';

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
}));

test("enable add button when the question is added", () => {
  const store = new VotingPageStore();

  store.addQuestion('What is the value of x?');
  render(<Poll store={store} />);

  const pollScreenBtn = screen.getByTestId(POLL_ADD_BUTTON);
  expect(pollScreenBtn).toBeEnabled();
});

test("should remove question and options if reset button is clicked", () => {
  const store = new VotingPageStore();

  store.addQuestion('What is the value of x?');
  store.addQuestionOption({
    title: '3.14',
    id: 'option-1',
    voteCount: 0
  });
  render(<Poll store={store} />);

  const pollScreenBtn = screen.getByTestId(POLL_RESET_BUTTON);
  act(() => pollScreenBtn.click());

  expect(store.question).toEqual('');
  expect(store.questionOptions.length).toEqual(0);
});
