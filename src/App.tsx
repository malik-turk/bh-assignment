import { ThemeProvider } from "@mui/material";

// Pages
import VotingPage from "./pages/VotingPage";

// Custom Theme
import { appTheme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <VotingPage />
    </ThemeProvider>
  );
}

export default App;
