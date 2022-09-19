import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { observer } from "mobx-react";
import { Bar } from "react-chartjs-2";

// Types
import VotingPageStore from "../store/VotingPageStore";
import { QuestionOptions } from "../types/voting-data";

// Constants
import { options } from "../constants/chart.constants";

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginTop: "12px",
  marginBottom: "60px",
}));
const ChartContainer = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  padding: theme.spacing(1.5),
  height: "100%",
}));

// Register chart items
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function Chart({ store }: { store: VotingPageStore }): JSX.Element {
  const { questionOptions, question } = store;

  const data = {
    labels: questionOptions.map((options: QuestionOptions) => options.title),
    datasets: [
      {
        data: questionOptions.map(
          (options: QuestionOptions) => options.voteCount
        ),
        backgroundColor: "#82ca9d",
      },
    ],
  };

  return (
    <ChartContainer>
      <OptionsTitle color={question ? "" : "lightgray"} variant="h6">
        {question
          ? question
          : "Question and options will appear here when they're created."}
      </OptionsTitle>
      <Bar options={options} data={data} />
    </ChartContainer>
  );
}

export default observer(Chart);
