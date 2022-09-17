import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Poll from '../components/Poll';
import Vote from '../components/Vote';
import Chart from '../components/Chart';

// Types
import { CustomStyles } from '../types/mui-types';
import { Spacing } from '@mui/system';

const gridItemStyles: CustomStyles = {
    border: '1px solid #dfdede'
};
const gridContainerStyles = (spacing: Spacing): CustomStyles => ({
    paddingTop: spacing(12),
    height: '100vh'
});

function VotingContainer(): JSX.Element {
    return (
        <>
            <AppBar color="primary">
                <Toolbar>
                    <Typography color="white" variant="h6" component="div">
                        Sir Vote-a-lot
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container sx={({ spacing }) => gridContainerStyles(spacing)}>
                <Grid item xs={4} sx={gridItemStyles}>
                    <Poll />
                </Grid>
                <Grid item xs={4} sx={gridItemStyles}>
                    <Vote />
                </Grid>
                <Grid item xs={4} sx={gridItemStyles}>
                    <Chart />
                </Grid>
            </Grid>
        </>
    )
}

export default VotingContainer;
