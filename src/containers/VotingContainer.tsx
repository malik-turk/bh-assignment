import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Poll from '../components/Poll';
import Vote from '../components/Vote';
import Chart from '../components/Chart';

function VotingContainer(): JSX.Element {
    return (
        <>
            <AppBar sx={{ position: 'relative' }} color="primary">
                <Toolbar>
                    <Typography color="white" variant="h6" component="div">
                        Sir Vote-a-lot
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={4} sx={{ height: '100%' }}>
                    <Poll />
                </Grid>
                <Grid item xs={4} sx={{ borderLeft: '1px solid #dfdede' }}>
                    <Vote />
                </Grid>
                <Grid item xs={4} sx={{ borderLeft: '1px solid #dfdede' }}>
                    <Chart />
                </Grid>
            </Grid>
        </>
    )
}

export default VotingContainer;
