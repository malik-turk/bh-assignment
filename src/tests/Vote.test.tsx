import { render, screen, act } from "@testing-library/react";
import Vote from "../components/Vote";
import VotingPageStore from "../store/VotingPageStore";

// Constants
import { VOTE_RADIO_BUTTON_PREFIX, VOTE_BUTTON } from '../constants/test-ids.constants';

jest.mock("react-chartjs-2", () => ({
    Bar: () => null,
}));

test('vote button should be desabled if options are less than 2', () => {
    const store = new VotingPageStore(); 
   render(<Vote store={store} />);

   const firstRadioButton = screen.getByTestId(VOTE_BUTTON);
   expect(firstRadioButton).toBeDisabled();
});

test("enable add button when the question is added", async () => {
    const store = new VotingPageStore();

    store.addQuestion('What is the value of x?');
    store.addQuestionOption({
        title: '3.14',
        id: 'option-1',
        voteCount: 0
    });
    store.addQuestionOption({
        title: '3.14',
        id: 'option-2',
        voteCount: 0
    });
    render(<Vote store={store} />);

    const firstRadioButton = await screen.findByTestId(`${VOTE_RADIO_BUTTON_PREFIX}-0`);
    const muiLabelValue = firstRadioButton.querySelector('.MuiTypography-root');

    expect(muiLabelValue?.textContent).toEqual('3.14');
});
