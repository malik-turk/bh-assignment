import { useState } from 'react';
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
import { MAX_NUMBER_OF_OPTIONS, MAX_FIELD_CHAR_LENGTH } from '../constants/default.constants';
import { OPTIONS_BELOW_MIN_NUMBER, QUESTIONS_EMPTY_MESSAGE } from '../constants/tooltip-messages.constants';
import { QuestionOptions } from '../types/voting-data';
import { POLL_ADD_BUTTON, POLL_RESET_BUTTON } from '../constants/test-ids.constants';

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
    max-height: 65vh;
    overflow: hidden;
    overflow-y: scroll;
    border: 1px dashed #eeeeee;
    padding: 0px 8px 8px;

    ::-webkit-scrollbar {
        display: none;
    }
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
        resetQuestionOptions,
        updateQuestionOption,
        isOptionsBelowMin,
        maxOptionsReached
    } = store;
    const [newOption, setNewOption] = useState<string>('');

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
            voteCount: 0
        });
        setNewOption('');
    };

    /**
     * Update option within answers array
     * @param i index of the option
     * @param title title of the option
     */
    const handleUpdateOption = (i: number, title: string): void => {
        updateQuestionOption(i, title);
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
                inputProps={{ maxLength: MAX_FIELD_CHAR_LENGTH }}
                autoFocus
            />
            <OptionsTitle variant="body1">
                Answers:
            </OptionsTitle>
            <OptionsContainer>
                {
                    questionOptions.map((option: QuestionOptions, i: number) => (
                        <Box key={option.id} display="flex" paddingTop={1}>
                            <TextField
                                placeholder="Type an answer"
                                variant="outlined"
                                fullWidth
                                value={option.title}
                                inputProps={{ maxLength: MAX_FIELD_CHAR_LENGTH }}
                                onChange={(e) => handleUpdateOption(i, e.target.value)}
                            />
                            <Tooltip title={isOptionsBelowMin ? OPTIONS_BELOW_MIN_NUMBER : ''} placement="bottom">
                                {/* ButtonContainer added here since Tooltip is not working with disabled buttons */}
                                <ButtonContainer>
                                    <Button
                                        sx={{ marginLeft: 1 }}
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeQuestionOption(i)}
                                        disabled={isOptionsBelowMin}
                                    >
                                        <CloseIcon color={isOptionsBelowMin ? 'disabled' : 'error'} />
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
                            inputProps={{ maxLength: MAX_FIELD_CHAR_LENGTH }}
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
                                    data-testid={POLL_ADD_BUTTON}
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
                <Button
                    data-testid={POLL_RESET_BUTTON}
                    onClick={() => resetQuestionOptions()}
                    variant="contained"
                    disabled={!question}
                >
                    RESET
                </Button>
            </PollFooter>
        </PollContainer>
    );
}

export default observer(Poll);
