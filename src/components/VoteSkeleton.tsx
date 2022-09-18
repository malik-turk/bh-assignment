import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

// Constants
import { OPTIONS_BELOW_MIN_NUMBER } from "../constants/tooltip-messages.constants";

function VoteSkeleton(): JSX.Element {
  return (
    <>
      <Typography variant="caption" component="div">
        <Skeleton />
      </Typography>
      <Typography variant="caption" component="div">
        <Skeleton />
      </Typography>
      <Typography paddingTop={1} variant="caption" component="div">
        {OPTIONS_BELOW_MIN_NUMBER}
      </Typography>
    </>
  );
}

export default VoteSkeleton;
