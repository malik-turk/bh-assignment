import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Types
import { ChartData } from "../types/chart-data";

// Styled components
const OptionsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginTop: '12px',
  marginBottom: '60px'
}));
const ChartContainer = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  padding: theme.spacing(1.5),
  height: '100%'
}));

const chartData: ChartData[] = [
  {
    count: 30,
    name: 3.144
  },
  {
    count: 5,
    name: 3.144
  },
  {
    count: 10,
    name: 3.144
  }
];

function Chart(): JSX.Element {
  return (
    <ChartContainer>
      <OptionsTitle variant="h6">What is the value of x?</OptionsTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default Chart;
