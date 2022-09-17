import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    marginTop: '12px',
    marginBottom: '60px'
}));
const VoteContainer = styled(Box)(({ theme }) => ({
    flexDirection: 'column',
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(5),
    height: '100%'
}));

function Vote(): JSX.Element {
  return (
    <VoteContainer>
        <OptionsTitle variant="h6">What is the value of x?</OptionsTitle>
        <RadioGroup
            defaultValue="female"
            name="radio-buttons-group"
        >
        <FormControlLabel value="3.14" control={<Radio />} label="3.14" />
        <FormControlLabel value="3.1432" control={<Radio />} label="3.1432" />
        <FormControlLabel value="3.142222" control={<Radio />} label="3.142222" />
      </RadioGroup>
    </VoteContainer>
  )
}

export default Vote;
