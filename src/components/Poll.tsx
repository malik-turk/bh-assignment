import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { observer } from "mobx-react"
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import VotingPageStore from '../store/VotingPageStore';

// Constants
import { MAX_NUMBER_OF_OPTIONS, MIN_NUMBER_OF_OPTIONS } from '../constants/default.constants';
import { OPTIONS_BELOW_MIN_NUMBER, QUESTIONS_EMPTY_MESSAGE } from '../constants/tooltip-messages.constants';
import { QuestionOptions } from '../types/voting-data';

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
    margin: '24px 0 0',
    fontWeight: 500
}));
const PollContainer = styled(Box)(({ theme }) => ({
    flexDirection: 'column',
    display: 'flex',
    padding: theme.spacing(1.5),
    height: '100%',
}));
const PollFooter = styled(Box)(({ theme }) => ({
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
}));
const OptionsCounter = styled(Typography)``;
const OptionsContainer = styled('span')`
    height: 65vh;
    overflow: hidden;
    overflow-y: scroll;
`;
const ButtonContainer = styled('div')`
    display: flex;
`;

function Poll({ store }: { store: VotingPageStore }): JSX.Element {
    const {
        question,
        addQuestion,
        addQuestionOption,
        getQuestionOptionsLength,
        questionOptions,
        removeQuestionOption,
        resetQuestionOptions
    } = store;
    const [newOption, setNewOption] = useState<string>('');
    const isOptionBelowMin: boolean = useMemo(() => getQuestionOptionsLength < MIN_NUMBER_OF_OPTIONS, [getQuestionOptionsLength]);
    const maxOptionsReached: boolean = useMemo(() => getQuestionOptionsLength === MAX_NUMBER_OF_OPTIONS, [getQuestionOptionsLength]);

    /**
     * Add new option to answers array
     * Prevent adding if question field is empty
     * Prevent adding if last field is empty
     * Prevent adding if max options number reached
     * @returns { void }
     */
    const handleNewOption = (): void => {
        if (!question || !newOption || maxOptionsReached) return;

        addQuestionOption({
            id: uuidv4(),
            title: newOption,
        });
        setNewOption('');
    };

    /**
     * Handle keyboard selection for enter key
     * @param {React.KeyboardEvent} e keyboard event
     */
    const handleKeyboardSelection = (e: React.KeyboardEvent) => {
        if (e.keyCode !== 13) return;

        handleNewOption();
    };

    return (
        <PollContainer>
            <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={question}
                onChange={(e) => addQuestion(e.target.value)}
                autoFocus
            />
            <OptionsTitle variant="body1">
                Answers:
            </OptionsTitle>
            <OptionsContainer>
                {
                    questionOptions.map((option: QuestionOptions, i: number) => (
                        <Box key={option.id} display="flex" paddingTop={1}>
                            <TextField placeholder="Type an answer" variant="outlined" fullWidth value={option.title} />
                            <Tooltip title={isOptionBelowMin ? OPTIONS_BELOW_MIN_NUMBER : ''} placement="bottom">
                                {/* ButtonContainer added here since Tooltip is not working with disabled buttons */}
                                <ButtonContainer>
                                    <Button
                                        sx={{ marginLeft: 1 }}
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeQuestionOption(i)}
                                        disabled={isOptionBelowMin}
                                    >
                                        <CloseIcon color={isOptionBelowMin ? 'disabled' : 'error'} />
                                    </Button>
                                </ButtonContainer>
                            </Tooltip>
                        </Box>
                    ))
                }
                <>
                    <Box display="flex" paddingTop={1}>
                        <TextField
                            placeholder="Type an answer"
                            variant="outlined"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            onKeyDown={handleKeyboardSelection}
                            fullWidth
                        />
                        <Tooltip title={!question ? QUESTIONS_EMPTY_MESSAGE : ''} placement="bottom">
                            {/* ButtonContainer added here since Tooltip is not working with disabled buttons */}
                            <ButtonContainer>
                                <Button
                                    sx={{ marginLeft: 1 }}
                                    variant="outlined"
                                    color="success"
                                    onClick={handleNewOption}
                                    disabled={!question || maxOptionsReached}
                                >
                                    <AddIcon color="inherit" />
                                </Button>
                            </ButtonContainer>
                        </Tooltip>
                    </Box>
                </>
            </OptionsContainer>
            <PollFooter>
                <OptionsCounter variant="body1">
                    {getQuestionOptionsLength} / {MAX_NUMBER_OF_OPTIONS} possible answers
                </OptionsCounter>
                <Button onClick={() => resetQuestionOptions()} variant="contained">RESET</Button>
            </PollFooter>
        </PollContainer>
    );
}

export default observer(Poll);
