import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function VotingContainer(): JSX.Element {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        Sir Vote-a-lot
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default VotingContainer;
