import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
    margin: '24px 0 0',
    fontWeight: 500
}));

export default function Poll(): JSX.Element {
  return (
    <Box flexDirection="column" padding="12px" marginTop={5}>
        <TextField label="Question" variant="outlined" fullWidth />
        <OptionsTitle variant="body1">
            Answers:
        </OptionsTitle>
        <Box display="flex" marginTop={1}>
            <TextField placeholder="Type an answer" variant="outlined" fullWidth />
            <Button sx={{ marginLeft: 1 }} variant="outlined">
                <CloseIcon />
            </Button>
        </Box>
        <Box display="flex" marginTop={1}>
            <TextField placeholder="Type an answer" variant="outlined" fullWidth />
            <Button sx={{ marginLeft: 1 }} variant="outlined">
                <AddIcon />
            </Button>
        </Box>
    </Box>
  );
}
