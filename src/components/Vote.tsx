import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { observer } from "mobx-react";
import VoteSkeleton from "./VoteSkeleton";

// Types
import VotingPageStore from "../store/VotingPageStore";
import { QuestionOptions } from "../types/voting-data";

// Constants
import { MIN_NUMBER_OF_OPTIONS } from "../constants/default.constants";

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginTop: "12px",
  marginBottom: "60px"
}));
const VoteContainer = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  display: "flex",
  padding: theme.spacing(1.5),
  height: "100%",
}));
const PollFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
}));

function Vote({ store }: { store: VotingPageStore }): JSX.Element {
  const {
    question,
    getQuestionOptionsLength,
    questionOptions,
    increaseVoteCounter,
    isOptionsBelowMin
  } = store;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  return (
    <VoteContainer>
      <OptionsTitle color={question ? "" : "lightgray"} variant="h6">
        {question
          ? question
          : "Question and options will appear here when they're created."}
      </OptionsTitle>
      {getQuestionOptionsLength >= MIN_NUMBER_OF_OPTIONS ? (
        <RadioGroup
          defaultChecked
          defaultValue={selectedOptionIndex}
          value={selectedOptionIndex}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedOptionIndex(parseInt(e.target.value, 10))
          }
        >
          {questionOptions.map((options: QuestionOptions, i: number) => (
            <FormControlLabel
              key={options.id}
              value={i}
              control={<Radio />}
              label={options.title}
            />
          ))}
        </RadioGroup>
      ) : (
        <VoteSkeleton />
      )}
      <PollFooter>
        <Button
          disabled={isOptionsBelowMin}
          variant="contained"
          onClick={() => increaseVoteCounter(selectedOptionIndex)}
        >
          VOTE
        </Button>
      </PollFooter>
    </VoteContainer>
  );
}

export default observer(Vote);
