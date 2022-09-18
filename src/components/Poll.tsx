import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { observer } from "mobx-react"

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import VotingPageStore from '../store/VotingPageStore';

// Constants
import { MAX_NUMBER_OF_OPTIONS } from '../constants/default.constants';

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
    margin: '24px 0 0',
    fontWeight: 500
}));
const PollContainer = styled(Box)(({ theme }) => ({
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(1.5),
    height: '100%'
}));
const PollFooter = styled(Box)(({ theme }) => ({
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
}));
const OptionsCounter = styled(Typography)``;

function Poll({ store }: { store: VotingPageStore }): JSX.Element {
  const { question, addQuestion, getQuestionOptionsLength } = store;

  return (
    <PollContainer>
        <TextField
            label="Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => addQuestion(e.target.value)}
        />
        <OptionsTitle variant="body1">
            Answers:
        </OptionsTitle>
        <Box display="flex" marginTop={1}>
            <TextField
                placeholder="Type an answer"
                variant="outlined"
                fullWidth
            />
            <Button sx={{ marginLeft: 1 }} variant="outlined" color="error">
                <CloseIcon color="error" />
            </Button>
        </Box>
        <Box display="flex" marginTop={1}>
            <TextField placeholder="Type an answer" variant="outlined" fullWidth />
            <Button sx={{ marginLeft: 1 }} variant="outlined" color="success">
                <AddIcon color="success" />
            </Button>
        </Box>
        <PollFooter>
            <OptionsCounter variant="body1">
                {getQuestionOptionsLength} / {MAX_NUMBER_OF_OPTIONS} possible answers
            </OptionsCounter>
            <Button variant="contained">RESET</Button>
        </PollFooter>
    </PollContainer>
  );
}

export default observer(Poll);
