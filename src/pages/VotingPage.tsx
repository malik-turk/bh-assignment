import VotingContainer from "../containers/VotingContainer";
import VotingPageStore from "../store/VotingPageStore";

function VotingPage(): JSX.Element {
  const votingStore: VotingPageStore = new VotingPageStore();

  return (
    <VotingContainer store={votingStore} />
  )
}

export default VotingPage;
