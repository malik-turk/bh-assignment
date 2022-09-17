import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginTop: '12px',
  marginBottom: '60px'
}));
const ChartContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(5),
  height: '100%'
}));
// Temporary
const ChartPlaceholder = styled('div')(({ theme }) => ({
  height: '400px',
  width: '100%',
  background: '#dfdede'
}));

function Chart(): JSX.Element {
  return (
    <ChartContainer>
      <OptionsTitle variant="h6">What is the value of x?</OptionsTitle>
      {/* Temporary */}
      <ChartPlaceholder />
    </ChartContainer>
  )
}

export default Chart;
